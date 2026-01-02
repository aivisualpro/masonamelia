require('dotenv').config();
const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URL;// || "mongodb+srv://sagheer:nP0LPJVyAzTJd8gz@mason-amelia-cluster.l2yvyfn.mongodb.net/";

async function inspect() {
  if (!mongoUrl) {
    console.error("No MONGO_URL found");
    return;
  }
  
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");
    
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log("Collections:");
    for (const col of collections) {
      console.log(`- ${col.name}`);
      // Get one document to infer schema
      const sample = await db.collection(col.name).findOne();
      console.log(`  Sample:`, JSON.stringify(sample, null, 2));
    }
    
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error:", err);
  }
}

inspect();
