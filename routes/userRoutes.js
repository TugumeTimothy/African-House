const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv=require('dotenv')
dotenv.config()
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10); // Generate salt asynchronously
    const hash = await bcrypt.hash(password, salt); // Pass the salt to the hash function
    const user = new User({ username, password: hash });
    await user.save();
    res.status(201).json(user);
    //res.render('User successful SignUp')
    //res.redirect('/index.html');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      //alert("Invalid username or password")
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      //alert("Invalid username or password")
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    try {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });
      //res.json({ token });
      res.status(200).json({token});
      //console.log("Login status Code "+res.statusCode)
    } catch (jwtError) {
      console.error(jwtError);
      res.status(500).json({ message: 'Error generating token' });
    }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;