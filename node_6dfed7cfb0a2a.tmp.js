require('dotenv').config()
 
const deduplicar = require('./deduplicar.js');
const chamarAPI = require('./sources/remotive.js');
const notificar = require('./notificar.js');
const cron = require('node-cron')

async function main() {
    const vagas = await chamarAPI();
    const deduplicação = await deduplicar(vagas);
    const notificação = await notificar(deduplicação)
    console.log(deduplicação);
}

cron.schedule('0 8 * * *', main, { timezone: 'America/Sao_Paulo' })