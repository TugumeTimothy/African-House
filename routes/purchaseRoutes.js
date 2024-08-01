const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const mobilemoney = require('../airtelMobileMoney');
const Order = require('../models/orderModel');

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).send('Product not found');
    } else {
      res.render('purchase', { product });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching product');
  }
});

router.get('/pay/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).send('Product not found');
    } else {
      // Render the payment page with the product data
      res.render('payment', { product });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching product');
  }
});

router.post('/pay/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).send('Product not found');
    }

    const { amount, phoneNumber, reference } = req.body;
    if (!amount || !phoneNumber || !reference) {
      res.status(400).send('Missing required fields: amount, phoneNumber, and/or reference');
    }

    const paymentRequest = await mobilemoney.generatePaymentRequest(amount, phoneNumber, reference);
    const paymentUrl = paymentRequest.url;

    // Create a new order and save it
    const order = new Order({ product: productId, status: 'pending' });
    await order.save();

    res.redirect(paymentUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating payment request');
  }
});

router.get('/payment/verify', async (req, res) => {
  try {
    const transactionId = req.query.transactionId;
    const orderId = req.query.orderId;

    if (!transactionId || !orderId) {
      res.status(400).send('Missing transactionId or orderId');
    }

    const paymentStatus = await mobilemoney.verifyPayment(transactionId);

    if (paymentStatus.data.status === 'success') {
      // Payment was successful, update the order status
      const order = await Order.findById(orderId);
      order.status = 'paid';
      await order.save();

      res.send('Payment successful!');
    } else {
      res.send('Payment failed!');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error verifying payment');
  }
});

module.exports = router;