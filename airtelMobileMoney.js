const https = require('https');

const airtelMobileMoneyApiUrl = 'https://openapi.airtel.africa/v2/';
const clientId = '08fac415-6bc8-47e1-a180-37267b94c281';
const clientSecret = '08fac415-6bc8-47e1-a180-37267b94c281';

const generatePaymentRequest = (amount, phoneNumber, reference) => {
  const paymentRequest = {
    'amount': amount,
    'phone_number': phoneNumber,
    'reference': reference,
    'currency': 'UGX',
  };

  const auth = Buffer.from(`${clientId}:${clientSecret}`, 'utf8').toString('base64');
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentRequest),
  };

  return new Promise((resolve, reject) => {
    const req = https.request(`${airtelMobileMoneyApiUrl}payments/request`, options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });
    req.on('error', (err) => {
      reject(err);
    });
    req.end();
  });
};

const verifyPayment = (transactionId) => {
  const auth = Buffer.from(`${clientId}:${clientSecret}`, 'utf8').toString('base64');
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(`${airtelMobileMoneyApiUrl}payments/verify/${transactionId}`, options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });
    req.on('error', (err) => {
      reject(err);
    });
    req.end();
  });
};

module.exports = { generatePaymentRequest, verifyPayment };