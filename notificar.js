async function notificar(vagas) {
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`

    for (const vaga of vagas) {
        const texto = `💼 ${vaga.titulo}\n 🌍 ${vaga.localizacao}\n 🏢 ${vaga.empresa}\n ⏰ ${vaga.publicacao}\n 📂 ${vaga.categoria}\n 📦 ${vaga.tipo}\n 🔗 ${vaga.link}`

        try {
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: process.env.TELEGRAM_CHAT_ID,
                    text: texto
                })
            })
        } catch (error) {
            console.error(`Erro ao notificar vaga ${vaga.id}:`, error.message)
        }
    }
}

module.exports = notificar