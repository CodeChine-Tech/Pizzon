const http = require('http');

const data = JSON.stringify({
  items: [{ productId: '69ac3ce5c86626ad936c330d', size: 'Small', quantity: 1 }],
  customer: {
    name: 'Test User',
    phone: '1234567890',
    address: 'Test Address',
    email: 'tooliso100@gmail.com'
  }
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/orders',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    console.log('Status', res.statusCode);
    console.log(body);
  });
});

req.on('error', (err) => {
  console.error('Request error:', err.message);
});

req.write(data);
req.end();
