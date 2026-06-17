require('dotenv').config();
const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URL;

async function inspect() {
  if (!mongoUrl) {
    console.error("No MONGO_URL found");
    return;
  }
  try {
    await mongoose.connect(mongoUrl);
    const db = mongoose.connection.db;
    const contact = await db.collection('contacts').findOne();
    const ctaKeys = Object.keys(contact).filter(k => k.includes('cta'));
    console.log("CTA KEYS IN DB:");
    ctaKeys.forEach(k => {
      console.log(`- ${k}: "${contact[k]}"`);
    });
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}
inspect();
