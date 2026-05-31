async function chamarAPI(){
    try {
        let resposta = await fetch('https://remotive.com/api/remote-jobs');
        const dados =  await resposta.json()
        const normalizar = dados.jobs.map((vagas) => {
            return {
                titulo: vagas.title,
                id: vagas.id,
                tipo: vagas.job_type,
                publicacao: vagas.publication_date,
                localizacao: vagas.candidate_required_location,
                categoria: vagas.category,
                salario: vagas.salary,
                empresa: vagas.company_name,
                link: vagas.url,
                logo: vagas.company_logo,
                fonte: "Remotive",
                descricao: vagas.description,

            }
        })    
    const palavrasChaveLocalizacao = ["brazil", "brasil", "worldwide", "world", "remote", "south america", "latin america", "latam"]
    const filtrar = normalizar.filter((filtro) => {
    const local = (filtro.localizacao || "").toLowerCase();
    return palavrasChaveLocalizacao.some(keyword => local.includes(keyword))
});            
        const keywords = process.env.KEYWORDS.split(",").map(k => k.trim())

        const filtroStacks = filtrar.filter(vaga => keywords.some(keyword => {
    const tituloMatch = (vaga.titulo || "").toLowerCase().includes(keyword);
    const descricaoMatch = (vaga.descricao || "").toLowerCase().includes(keyword);
    
    return tituloMatch || descricaoMatch;
}));
    return filtroStacks;
    } 
    catch(error) {
        console.log(error)
    }
  

}




module.exports = chamarAPI;

//Agora vou aplicar os filtros, isso deve filtrar e retornar somente as vagas que aceitem brasileiros.
//Decidi aplicar dentro da função chamarAPI pois o "normalizar" existe somente dentro dentro da função chamarAPI, não tenho certeza se é o correto a se fazer nem onde exatamente colocar mas devo tentar.
// vou usar um array.filter.

