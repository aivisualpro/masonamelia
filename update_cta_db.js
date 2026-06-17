require('dotenv').config();
const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URL;

async function run() {
  if (!mongoUrl) {
    console.error("No MONGO_URL found");
    return;
  }
  try {
    await mongoose.connect(mongoUrl);
    const db = mongoose.connection.db;
    const res = await db.collection('contacts').updateOne(
      {},
      {
        $set: {
          acquisition_cta_line1_white: "Direct DB Edit White",
          acquisition_cta_line1_blue: "Direct Blue"
        }
      }
    );
    console.log("Updated count:", res.modifiedCount);
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}
run();
