const twilio = require('twilio');

const sendWhatsApp = async (to, message) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const client = twilio(accountSid, authToken);

    const result = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: `whatsapp:${to}`,
      body: message
    });

    console.log(`WhatsApp sent ✅ SID: ${result.sid}`);
    return result;

  } catch (error) {
    console.error('WhatsApp error:', error.message);
  }
};

module.exports = sendWhatsApp;