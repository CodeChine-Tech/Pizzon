const http = require('http');

console.log('Starting pickup request...');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Yjc2MjAwZjJjMTEyY2Q0ZGVmZGM1NiIsInJvbGUiOiJSaWRlciIsImlhdCI6MTc3MzYyNTg1NywiZXhwIjoxNzc0MjMwNjU3fQ.h5x3P86tX6WHObOU0MpJ21nGbKJxV0mMQsjW8F-nkWc';
const orderId = '69b761d4f2c112cd4defdc51';

const options = {
  hostname: 'localhost',
  port: 5000,
  path: `/api/orders/${orderId}/pickup`,
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

const req = http.request(options, (res) => {
  console.log('Response status:', res.statusCode);
  let body = '';
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    console.log('Response body:', body);
  });
});

req.on('error', (err) => {
  console.error('Request error:', err.message);
});

req.end();
