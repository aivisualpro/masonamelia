const axios = require('axios');

async function testFetch() {
  try {
    const res = await axios.get('http://localhost:5001/api/contacts');
    const contact = res.data.data;
    const ctaKeys = Object.keys(contact).filter(k => k.includes('cta'));
    console.log("FETCHED CTA KEYS FROM API:");
    ctaKeys.forEach(k => {
      console.log(`- ${k}: "${contact[k]}"`);
    });
  } catch (err) {
    console.error(err.message);
  }
}
testFetch();
