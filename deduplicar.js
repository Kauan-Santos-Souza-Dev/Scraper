const fs   = require('fs')
const path = require('path')

const SEEN_PATH = path.join(__dirname, 'seen.json')
const TTL_MS    = 30 * 24 * 60 * 60 * 1000  

function lerSeen() {
    try {
        return JSON.parse(fs.readFileSync(SEEN_PATH, 'utf-8'))
    } catch {
        return []
    }
}

function salvarSeen(seen) {
    fs.writeFileSync(SEEN_PATH, JSON.stringify(seen, null, 2))
}

function limparAntigos(seen) {
    const limite = Date.now() - TTL_MS
    return seen.filter(entrada => entrada.timestampSeen > limite)
}

async function deduplicar(vagas) {
    let seen = lerSeen()
    seen = limparAntigos(seen) 
    
    const seenIds = new Set(seen.map(e => `${e.id}-${e.fonte}`))

    const novas = vagas.filter(vaga => !seenIds.has(`${vaga.id}-${vaga.fonte}`))

    const novasEntradas = novas.map(vaga => ({
        id:           vaga.id,
        fonte:        vaga.fonte,
        timestampSeen: Date.now()
    }))

    salvarSeen([...seen, ...novasEntradas])

    return novas
}

module.exports = deduplicar