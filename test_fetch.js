const axios = require('axios');

async function testFetch() {
  try {
    const res = await axios.get('http://localhost:5001/api/contacts');
    console.log("FETCHED DATA:", JSON.stringify(res.data.data, null, 2));
  } catch (err) {
    console.error(err.message);
  }
}
testFetch();
