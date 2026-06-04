const { readFile, writeFile } = require('fs/promises')

async function deduplicar(vagasFiltradas) {
    
    let idsVistos = []
    try {
        const conteudo = await readFile('./seen.json', 'utf8')
        idsVistos = JSON.parse(conteudo)
    } catch {
       
    }

    const vagasNovas = []

    for (const vaga of vagasFiltradas) {
        if (idsVistos.includes(vaga.id)) {
            
        } else {
            vagasNovas.push(vaga)
            idsVistos.push(vaga.id)
        }
    }

    await writeFile('./seen.json', JSON.stringify(idsVistos), 'utf8')
    return vagasNovas
}

module.exports = deduplicar





