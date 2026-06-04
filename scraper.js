require('dotenv').config()

const deduplicar = require('./deduplicar.js');
const chamarAPI = require('./sources/remotive.js');
const notificar = require('./notificar.js');

async function main() {
    const vagas = await chamarAPI();
    const deduplicação = await deduplicar(vagas);
    const notificação = await notificar(deduplicação)
    console.log(deduplicação);
}

main().catch(console.error);

