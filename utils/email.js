const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOrderConfirmation = async (toEmail, order) => {
  try {
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const orderId = order._id.toString().slice(-6).toUpperCase();

    const mailOptions = {
      from: `"Pizzon 🍕" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: `✅ Order Confirmed! #${orderId} — Pizzon`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          
          <!-- Header -->
          <div style="background-color: #C0392B; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px;">🍕 PIZZON</h1>
            <p style="color: #FFD700; margin: 5px 0 0 0; font-style: italic;">Order Fast. Eat Fresh. Deliver Smart.</p>
          </div>

          <!-- Body -->
          <div style="background-color: #f9f9f9; padding: 30px; border: 1px solid #ddd;">
            
            <h2 style="color: #1A1A2E;">Assalam o Alaikum ${order.customer.name}! 👋</h2>
            <p style="color: #555; font-size: 16px;">
              ✅ Your order has been <strong>placed successfully!</strong> 
              We are preparing your delicious pizza right now! 🍕
            </p>

            <!-- Order Details Box -->
            <div style="background: white; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #C0392B; margin-top: 0;">📦 Order Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="background: #1A1A2E;">
                  <th style="color: white; padding: 10px; text-align: left;">Item</th>
                  <th style="color: white; padding: 10px; text-align: center;">Size</th>
                  <th style="color: white; padding: 10px; text-align: center;">Qty</th>
                  <th style="color: white; padding: 10px; text-align: right;">Price</th>
                </tr>
                ${order.items.map((item, i) => `
                  <tr style="background: ${i % 2 === 0 ? '#FFF5F5' : 'white'};">
                    <td style="padding: 10px; color: #333;">${item.product?.name || 'Pizza'}</td>
                    <td style="padding: 10px; color: #333; text-align: center;">${item.size}</td>
                    <td style="padding: 10px; color: #333; text-align: center;">${item.quantity}</td>
                    <td style="padding: 10px; color: #333; text-align: right;">$${item.price.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </table>
              
              <div style="text-align: right; margin-top: 15px; padding-top: 15px; border-top: 2px solid #C0392B;">
                <strong style="font-size: 18px; color: #C0392B;">
                  Total: $${order.totalPrice.toFixed(2)}
                </strong>
              </div>
            </div>

            <!-- Customer Info -->
            <div style="background: white; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #C0392B; margin-top: 0;">📍 Delivery Details</h3>
              <p style="margin: 5px 0; color: #555;"><strong>Name:</strong> ${order.customer.name}</p>
              <p style="margin: 5px 0; color: #555;"><strong>Phone:</strong> ${order.customer.phone}</p>
              <p style="margin: 5px 0; color: #555;"><strong>Address:</strong> ${order.customer.address}</p>
            </div>

            <!-- Order Info -->
            <div style="background: #1A1A2E; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <p style="color: #FFD700; margin: 5px 0;">📦 Order ID: <strong>#${orderId}</strong></p>
              <p style="color: white; margin: 5px 0;">📍 Status: <strong>Pending ⏳</strong></p>
              <p style="color: white; margin: 5px 0;">⏱️ Estimated Time: <strong>30-45 minutes</strong></p>
            </div>

            <p style="color: #555; font-size: 14px; text-align: center;">
              Thank you for ordering from Pizzon! 🙏<br/>
              If you have any questions, contact us at 
              <a href="mailto:${process.env.EMAIL_USER}" style="color: #C0392B;">${process.env.EMAIL_USER}</a>
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #C0392B; padding: 15px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: white; margin: 0; font-size: 13px;">
              🍕 Pizzon — Order Fast. Eat Fresh. Deliver Smart.
            </p>
          </div>

        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent ✅ to ${toEmail}`);

  } catch (error) {
    console.error('Email error:', error.message);
  }
};

// Status update email
const sendStatusUpdate = async (toEmail, order, status) => {
  try {
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const orderId = order._id.toString().slice(-6).toUpperCase();

    const statusMessages = {
      Preparing: { emoji: "👨‍🍳", text: "Your order is being prepared!", color: "#E67E22" },
      Ready: { emoji: "✅", text: "Your order is ready! Rider is on the way!", color: "#27AE60" },
      Delivered: { emoji: "🎉", text: "Your order has been delivered! Enjoy!", color: "#27AE60" },
      Cancelled: { emoji: "❌", text: "Your order has been cancelled.", color: "#E74C3C" }
    };

    const statusInfo = statusMessages[status];
    if (!statusInfo) return;

    const mailOptions = {
      from: `"Pizzon 🍕" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: `${statusInfo.emoji} Order #${orderId} — ${status} | Pizzon`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #C0392B; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">🍕 PIZZON</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border: 1px solid #ddd;">
            <h2 style="color: ${statusInfo.color};">${statusInfo.emoji} Order Update!</h2>
            <p style="font-size: 16px; color: #555;">${statusInfo.text}</p>
            <div style="background: #1A1A2E; border-radius: 8px; padding: 20px;">
              <p style="color: #FFD700; margin: 5px 0;">📦 Order ID: <strong>#${orderId}</strong></p>
              <p style="color: white; margin: 5px 0;">📍 Status: <strong>${status} ${statusInfo.emoji}</strong></p>
            </div>
            <p style="color: #555; text-align: center; margin-top: 20px;">Shukriya! 🙏</p>
          </div>
          <div style="background: #C0392B; padding: 15px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: white; margin: 0; font-size: 13px;">🍕 Pizzon — Order Fast. Eat Fresh. Deliver Smart.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Status email sent ✅ to ${toEmail}`);

  } catch (error) {
    console.error('Status email error:', error.message);
  }
};

const sendEmail = async (to, subject, html) => {
  try {
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"Pizzon 🍕" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent ✅ to ${to}`);
  } catch (error) {
    console.error('Email error:', error.message);
    throw error; // Re-throw so the calling code knows it failed
  }
};

module.exports = { sendOrderConfirmation, sendStatusUpdate, sendEmail };