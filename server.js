// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv=require('dotenv')
dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;
const prodRouter=require('./routes/productRoutes')
const userRouter=require('./routes/userRoutes')
const pug=require('pug')
//const Product = require('./Models/productModel');


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))
//const apiRouter =express.Router();
// Middleware
//app.use(express.static('public', { mime: true }));
app.use(cors());
app.use(cors({
  origin: ['http://localhost:5000'], // replace with the URL of your client application
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
// Middleware to parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: true }));

//app.use(express.static(path.join(__dirname, 'uploads')));
//app.use(express.static('public'));

app.use('/uploads',express.static('uploads'))

mongoose.connect('mongodb://localhost:27017/african_art_marketplace')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Use the routes
app.use('/api/products', prodRouter);
app.use('/api/users', userRouter);

//Basic route for tests
app.get('/rt',(req,res)=>{
  
console.log('SECRET_KEY:', process.env.SECRET_KEY);
console.log('posted')
})


// Starting Point
app.get('/home', async (req, res) => {
  //const products = await Product.find();
 res.render('home')
});
app.get('/signup', async (req, res) => {
  //const products = await Product.find();
 res.render('signup')
});
app.get('/login', async (req, res) => {
  //const products = await Product.find();
 res.render('login')
});
app.get('/product_upload', async (req, res) => {
  //const products = await Product.find();
 res.render('product_upload')
});

app.get('/uploadfile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'product_upload.html'));
});
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory
//app.use('/api',router)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});