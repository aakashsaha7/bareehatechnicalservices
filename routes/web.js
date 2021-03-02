const mongoose = require('mongoose')

const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')


// // Middlewares 
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')

function initRoutes(app) {

    app.get('/', homeController().index)

    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    app.post('/logout', authController().logout)

    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)


    app.get('/services', (req, res) => {
        res.status(200).render('services')
    })

    // booking 
    app.get('/book', (req, res) => {
        res.status(200).render('book')
    })

    // booking for post request
    // // Define kitty Schema 
const BookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    book: String
   });

//    model
 var Booking = mongoose.model('Booking', BookingSchema);
 
app.post('/book',(req,res)=>{
    var myData = new Booking(req.body);
    // console.log(req.body);
    myData.save().then(()=>{
        res.render('thank');
    }).catch((err)=>{
        res.status(400).send("Something went wrong, Item was not saved to the DataBase")
        // console.log(err);
    })
     
 })

 

     app.get('/about', (req, res) => {
        res.status(200).render('about')
    })

    app.get('/work', (req, res) => {
        res.status(200).render('work')
    })

    app.get('/contact', (req, res) => {
        res.status(200).render('contact')
    })

    app.post('/logout', authController().logout)

    
    // // Define kitty Schema 
    const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
   });

//    model
 var Contact = mongoose.model('Contact', ContactSchema);
 
app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    console.log(req.body);
    myData.save().then(()=>{
        res.send("Successfully, this item has been saved to the DataBase")
    }).catch((err)=>{
        res.status(400).send("Something went wrong, Item was not saved to the DataBase")
        console.log(err);
    })
     
 })
 
//  all company work

// For Floor_Work
app.get('/floor', (req, res) => {
    res.status(200).render('CompanyWork/floorwork')
})

// for Wall Tiling 
app.get('/wall', (req, res) => {
    res.status(200).render('CompanyWork/wall_tiling')
})

// for Plumbing 
app.get('/plumbing', (req, res) => {
    res.status(200).render('CompanyWork/plumbing')
})

// for Plaster Work 
app.get('/plasterWork', (req, res) => {
    res.status(200).render('CompanyWork/plaster_work')
})

// for WallPaper FIxing 
app.get('/fixing', (req, res) => {
    res.status(200).render('CompanyWork/wallpaper_fixing')
})

//  for False Ceiling & Light Partitions Installion
app.get('/installation', (req, res) => {
    res.status(200).render('CompanyWork/false_ceiling_light_partitions_installion')
})


//  for Ac Services
app.get('/ac', (req, res) => {
    res.status(200).render('CompanyWork/ac_services')
})
//  For  Ventilation System 
app.get('/ventilation', (req, res) => {
    res.status(200).render('CompanyWork/ventilation_system')
})
 
// For Building Cleaning Services 
app.get('/building', (req, res) => {
    res.status(200).render('CompanyWork/building_cleaning_services')
})

// For Electrical Fitting & Fixatures Services 
app.get('/fixatures', (req, res) => {
    res.status(200).render('CompanyWork/electrical_fitting_fixatures_services')
})

// For Thank You Page 
app.get('/thank', (req, res) => {
    res.status(200).render('thank')
})

// for Painting Contracting 
app.get('/painting', (req, res) => {
    res.status(200).render('CompanyWork/painting_contracting')
})

// for Sanitary Installation
app.get('/sanitary', (req, res) => {
    res.status(200).render('CompanyWork/sanitary')
})


}

module.exports = initRoutes;

