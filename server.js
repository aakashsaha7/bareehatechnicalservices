

require('dotenv').config()
const express = require('express')
const app = express();
const path = require('path');
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose')
const HostName = '127.0.0.1';
const PORT = process.env.PORT || 8000;
const session = require('express-session');
// const { Session } = require('inspector');
// const { MongoStore } = require('connect-mongo');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo')(session)
const passport = require('passport')
const Emitter = require('events')

/// Database connection
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});


// session store 
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

// Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)

// Session config 
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store:mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //24 hours
    // cookie: { maxAge: 1000 * 15 } 
}))

//passport config
const passportInit = require('./app/config/passport');
const { Passport } = require('passport');
passportInit(passport);
app.use(passport.initialize())
app.use(passport.session())

// express flash 
app.use(flash())


// Assets 
app.use(express.static('public'))
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

// Global Middleware 
app.use((req,res,next)=>{
  res.locals.session = req.session;
  res.locals.user = req.user;
  next()
}) 

// set a Template engine 
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

app.use((req, res) => {
        res.status(404).render('errors/404')
    })

 const server = app.listen(PORT, HostName, () => {
    console.log(`listennig on port http://127.0.0.1:8000`);
})

