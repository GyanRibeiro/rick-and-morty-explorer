const containerPersonagens = document.querySelector('#containerPersonagens');
let paginacao = document.querySelector('#paginacao');
let pagina = 1;

let allpersonagens = [];

let nomePesquisa = document.querySelector('#personagemName');
let pesquisar = document.querySelector('#pesquisar');

async function getPersons () {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${pagina}`)
        const data = await response.json();

        allpersonagens = data.results;

        renderizarPersonagens(allpersonagens);

        if (allpersonagens.length > 0) {
            InformaçõesPersonagemClicado(allpersonagens[0]);
        }
        
    } catch {
        
    }

}

function renderizarPersonagens (allpersonagens) {
    allpersonagens.forEach((dt)=>{
        const personagens = document.createElement('img');
        personagens.classList.add("img-personagens")
        personagens.src = dt.image;
        containerPersonagens.appendChild(personagens)

        personagens.addEventListener('click', ()=> InformaçõesPersonagemClicado(dt))
    });
}

function InformaçõesPersonagemClicado(dt) {
    document.querySelector('#personagemFoto').textContent = dt.name;
    document.querySelector('#especie').innerHTML = `${dt.status} - ${dt.species}`;
    document.querySelector('.vidaPersonagem').src = dt.image;
    document.querySelector('#location').textContent= dt.location.name;
    document.querySelector('#criadoDt').textContent = dt.created

    console.log(dt)
}

async function pesquisarPersonagem () {

    const nome = nomePesquisa.value.toLowerCase();

    if (nome == "") return alert("Preencha o campo vazio!");

    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${nome}`);
        const data = await response.json();

        allpersonagens = data.results;

        renderizarPersonagens(allpersonagens);

        if (allpersonagens.length > 0) {
            InformaçõesPersonagemClicado(allpersonagens[0]);
        }

        nomePesquisa.value = "";

    } catch {

    }
}

getPersons();

paginacao.addEventListener('click', ()=>{
    pagina++;
    getPersons();
});

pesquisar.addEventListener('click', pesquisarPersonagem);