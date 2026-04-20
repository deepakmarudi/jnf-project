const fs = require('fs');
const raw = fs.readFileSync('jnf_test_response.json', 'utf8');
console.log(raw.substring(0, 100)); // Just check if it's Unauthenticated
