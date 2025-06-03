let dadosAula;
const idCurso = sessionStorage.ID_CURSO;
const idAula = sessionStorage.ID_AULA;
const idUsuario = sessionStorage.ID_USUARIO;

if(idCurso == undefined || idAula == undefined){
    window.location = './cursos.html';
}
const tituloCurso = document.getElementById('nome_curso');
const barraProgresso = document.getElementById('barra');
const porcentagemProgresso = document.getElementById('porcentagem');
const tituloAula = document.getElementById('titulo_aula');
const conteudoAula = document.getElementById('conteudo_aula');
let qtdeAulas;

async function pegarCurso(){
    dadosCurso = await fetch(`/cursos/retornar/${idCurso}`).then(async function (awnser) {
        if (awnser.ok) {
            return awnser.json();
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (awnser) {
        console.error(awnser);
    });
    tituloCurso.innerText = `${dadosCurso[0].nome}`;
    porcentagemProgresso.innerText = (idAula-1) / dadosCurso[0].qtde_aulas * 100 + '%';
    barraProgresso.style.width = (idAula-1) / dadosCurso[0].qtde_aulas * 100 + '%';
    qtdeAulas = dadosCurso[0].qtde_aulas;
}
pegarCurso();

async function pegarAula(){
    dadosAula = await fetch(`/aulas/retornar/${idAula},${idCurso}`).then(async function (awnser) {
        if (awnser.ok) {
            return awnser.json();
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (awnser) {
        console.error(awnser);
    });
    tituloAula.innerText = `Aula ${idAula} - ${dadosAula[0].nome}`
    conteudoAula.innerText = `${dadosAula[0].conteudo}`
    console.log(dadosAula)
}
pegarAula();

function concluirAula(){
    let proxAula = 'proxima';
    if(qtdeAulas == idAula){
        proxAula = 'ultima-aula';
    }
    modal(`Aula ${idAula} Concluída!`, 'Obrigado por fazer o curso!', proxAula);
}

const modalAcao = document.getElementById('modalAcao');
const modalAcao_container = document.getElementById('modalAcao_container')
const modalAcao_titulo = document.getElementById('modalAcao_titulo');
const modalAcao_desc = document.getElementById('modalAcao_desc');
function modal(titulo, desc, proximaAula){
    modalAcao.style.display = 'flex';
    modalAcao_titulo.innerText = titulo;
    modalAcao_desc.innerText = desc;
    if(proximaAula == 'proxima'){
        modalAcao_container.innerHTML = `
                    <button class="btn-red" onclick="fecharModal()">Voltar</button>
                    <button class="btn-green" onclick="proxAula()">Próx. Aula</button>
            `
    } else if(proximaAula == 'ultima-aula'){
        modalAcao_container.innerHTML = `
                    <button class="btn-red" onclick="fecharModal()">Voltar</button>
                    <button class="btn-green" onclick="finalizarCurso()">Finalizar Curso</button>
            `
    } else if(proximaAula == 'concluido'){
        modalAcao_container.innerHTML = `
                    <button class="btn-red" onclick="concluir()">Voltar para Dash</button>
            `
    }
}
function fecharModal(){
    modalAcao.style.display = 'none';
    modalAcao_titulo.innerText = '';
    modalAcao_desc.innerText = '';
    modalAcao_container = '';
}

function concluir(){
    window.location = './dashboard.html'
}

async function proxAula(){
    await fetch(`/aulas/concluir/${idCurso},${idAula}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario: idUsuario
        })
    }).then(async function (awnser) {
        if (awnser.ok) {
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (awnser) {
        console.error(awnser);
    });    

    sessionStorage.ID_CURSO = idCurso;
    sessionStorage.ID_AULA = Number(idAula)+1;
    window.location.reload();    
}

function finalizarCurso(){
    fetch(`/cursos/finalizar/${idUsuario},${idCurso}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async function (awnser) {
        if (awnser.ok) {
            modal(`Curso Concluído!`, 'Parabéns pela sua conclusão!!', 'concluido');
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (awnser) {
        console.error(awnser);
    }); 
}