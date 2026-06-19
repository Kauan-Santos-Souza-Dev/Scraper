async function notificar(vagas) {
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`

    async function enviar(texto) {
        const resposta = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id:    process.env.TELEGRAM_CHAT_ID,
                text:       texto,
                parse_mode: 'Markdown'
            })
        })

        if (!resposta.ok) {
            const erro = await resposta.json()
            throw new Error(`Telegram API: ${JSON.stringify(erro)}`)
        }
    }

    if (vagas.length === 0) {
        try {
            await enviar('🏢 Não há vagas novas hoje')
        } catch (error) {
            console.error('Erro ao notificar (sem vagas):', error)
        }
        return
    }

    for (const vaga of vagas) {
        const texto = [
            `💼 *${vaga.titulo}*`,
            `🏢 ${vaga.empresa}`,
            `🌍 ${vaga.localizacao}`,
            `📂 ${vaga.categoria}`,
            `📦 ${vaga.tipo}`,
            `⏰ ${vaga.data_publicacao}`,
            `🔗 ${vaga.link}`
        ].join('\n')

        try {
            await enviar(texto)
        } catch (error) {
            console.error(`Erro ao notificar vaga ${vaga.id}:`, error)
        }
    }
}

module.exports = notificar