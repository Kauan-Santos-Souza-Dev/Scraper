require('dotenv').config()

const cron      = require('node-cron')
const chamarAPI = require('./sources/remotive.js')
const deduplicar = require('./deduplicar.js')
const notificar  = require('./notificar.js')

async function main() {
    try {
        console.log(`[${new Date().toLocaleString('pt-BR')}] Iniciando busca de vagas...`)

        const vagas = await chamarAPI()
        console.log(`-> Vagas na API: ${vagas.length}`)

        const novas = await deduplicar(vagas)
        console.log(`-> Novas (sem duplicatas): ${novas.length}`)

        await notificar(novas)
        console.log('-> Concluído.')

    } catch (error) {
        console.error('Erro no main:', error)
    }
}

main()

cron.schedule('0 8 * * *', main, { timezone: 'America/Sao_Paulo' })