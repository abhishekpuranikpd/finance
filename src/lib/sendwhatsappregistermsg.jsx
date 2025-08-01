// import twilio from "twilio";

// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// export async function sendWhatsAppMessage({ to, message }) {
//   return await client.messages.create({
//     from: process.env.TWILIO_WHATSAPP_NUMBER,       // ✅ Must be whatsapp:+14155238886
//     to: `whatsapp:+91${to}`,                         // ✅ Your customer's number
//     body: message,
//   });
// }

export async function sendWhatsAppMessage({ to, message }) {
  const url = `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to: `+91${to}`,
    type: "text",
    text: {
      body: message,
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("WhatsApp API Error:", result);
      throw new Error(result.error?.message || "Failed to send WhatsApp message");
    }

    console.log("WhatsApp message sent:", result);
    return result;
  } catch (err) {
    console.error("Message send failed:", err);
    throw err;
  }
}
