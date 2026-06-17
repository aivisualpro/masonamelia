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
    console.log("Connected to MongoDB");
    const db = mongoose.connection.db;
    const contact = await db.collection('contacts').findOne();
    console.log("CONTACT DOCUMENT:", JSON.stringify(contact, null, 2));
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}
inspect();
