const http = require('http');

const registerData = JSON.stringify({
  name: 'Test Rider',
  email: 'test.rider@example.com',
  password: 'Password123!',
  role: 'Rider'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(registerData)
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => (body += chunk));
  res.on('end', () => {
    console.log('Register status', res.statusCode);
    console.log(body);

    // Now login
    const loginData = JSON.stringify({
      email: 'test.rider@example.com',
      password: 'Password123!'
    });

    const loginOptions = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(loginData)
      }
    };

    const loginReq = http.request(loginOptions, (loginRes) => {
      let loginBody = '';
      loginRes.on('data', (chunk) => (loginBody += chunk));
      loginRes.on('end', () => {
        console.log('Login status', loginRes.statusCode);
        console.log(loginBody);
      });
    });

    loginReq.on('error', (err) => {
      console.error('Login request error:', err.message);
    });

    loginReq.write(loginData);
    loginReq.end();
  });
});

req.on('error', (err) => {
  console.error('Register request error:', err.message);
});

req.write(registerData);
req.end();
