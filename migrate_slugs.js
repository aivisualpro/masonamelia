/**
 * One-time migration: Generate slugs for all existing aircraft.
 * Extracts the first word from the title, lowercases it.
 * Handles duplicates by appending -2, -3, etc.
 *
 * Usage: node migrate_slugs.js
 */
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://admin_db_user:N36etR5qV9ERTdwY@cluster0.ummmkan.mongodb.net/mainDb";

async function run() {
  await mongoose.connect(MONGO_URL);
  console.log('Connected to MongoDB');

  const Aircraft = mongoose.model('Aircraft', new mongoose.Schema({}, { strict: false }), 'aircrafts');

  const aircrafts = await Aircraft.find({ isDeleted: { $ne: true } }).lean();
  console.log(`Found ${aircrafts.length} aircraft to process`);

  const usedSlugs = new Set();
  let updated = 0;
  let skipped = 0;

  for (const ac of aircrafts) {
    // Skip if already has a slug
    if (ac.slug) {
      usedSlugs.add(ac.slug);
      skipped++;
      continue;
    }

    const title = ac.title || '';
    const firstWord = title.trim().split(/\s+/)[0] || '';
    let baseSlug = firstWord.toLowerCase().replace(/[^a-z0-9-]/g, '');

    if (!baseSlug) {
      console.log(`  SKIP (no valid slug): ${ac._id} "${title}"`);
      skipped++;
      continue;
    }

    // Ensure uniqueness
    let slug = baseSlug;
    let counter = 2;
    while (usedSlugs.has(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    usedSlugs.add(slug);

    await Aircraft.updateOne({ _id: ac._id }, { $set: { slug } });
    console.log(`  ${ac._id}: "${title}" → ${slug}`);
    updated++;
  }

  console.log(`\\nDone! Updated: ${updated}, Skipped: ${skipped}`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
