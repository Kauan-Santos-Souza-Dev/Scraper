require('dotenv').config()

async function fetchWithRetry(url) {
    const delays = [1000, 3000, 7000]

    for (let i = 0; i <= 2; i++) {
        try {
            const resultado = await fetch(url, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
            })

            if (resultado.ok) return await resultado.json()
            throw new Error(`Erro HTTP: ${resultado.status}`)

        } catch (error) {
            if (i === 2) throw error
            await new Promise(r => setTimeout(r, delays[i]))
        }
    }
}

async function chamarAPI() {
    try {
        const dados = await fetchWithRetry('https://remotive.com/api/remote-jobs?category=software-dev')

        if (!dados || !dados.jobs) return []

        const normalizar = dados.jobs.map(vaga => ({
            titulo:          vaga.title,
            id:              vaga.id,
            tipo:            vaga.job_type,
            data_publicacao: vaga.publication_date,
            localizacao:     vaga.candidate_required_location,
            categoria:       vaga.category,
            salario:         vaga.salary,
            tags:            vaga.tags,
            empresa:         vaga.company_name,
            link:            vaga.url,
            fonte:           'Remotive',
            descricao:       vaga.description
        }))

        const europeKeywords = ['europe', 'emea', 'germany', 'uk', 'netherlands',
                                'spain', 'ireland', 'portugal', 'poland', 'france',
                                'austria', 'sweden']

        const filtrarLocalizacao = normalizar.filter(vaga => {
            const local = (vaga.localizacao || '').toLowerCase()
            return europeKeywords.some(keyword => local.includes(keyword))
        })

        const keywords = (process.env.KEYWORDS || '')
            .split(',')
            .map(k => k.trim().toLowerCase())
            .filter(k => k)

        const filtrarStack = filtrarLocalizacao.filter(vaga =>
            keywords.some(keyword =>
                (vaga.titulo   || '').toLowerCase().includes(keyword) ||
                (vaga.descricao || '').toLowerCase().includes(keyword)
            )
        )

        return filtrarStack

    } catch (error) {
        console.error('Erro no chamarAPI:', error)
        return []
    }
}

module.exports = chamarAPI