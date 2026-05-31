require('dotenv').config()

const chamarAPI = require('./sources/remotive.js')

async function main() {
    const vagas = await chamarAPI();
    console.log(vagas);
}

main();