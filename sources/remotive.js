require('dotenv').config()

async function fetchWithRetry(url){
    const delays = [1000, 3000, 7000]
    
    for(let i = 0; i<=2; i++){
        try{
            let resultado = await fetch(url);
            if(resultado.ok === true){
                return await resultado.json()
                     
            }
        }
        catch(error){
            if( i== 2){
                throw error
            }
            else { 
                await new Promise(r => setTimeout(r, delays[i]))
            }

        }
    }
}



async function chamarAPI(){
    try {
        let dados = await fetchWithRetry('https://remotive.com/api/remote-jobs')
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
    const palavrasChaveLocalizacao = ["brazil", "brasil", "worldwide", "world", "remote", "south america", "latin america", "latam", "anywhere"]
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
    return filtroStacks
    
    } 
    catch(error) {
        console.log(error)
    }
  

}


module.exports = chamarAPI;


