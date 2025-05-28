const perguntaContainer = document.querySelector('.perguntas_container');
let comentariosContainer;
let btnVerComentarios;
const idUsuario = sessionStorage.ID_USUARIO;

async function exibirComentarios(fkPergunta, fkUsuario) {
    let res = '';
    let resultados = await fetch(`/respostas/listar/${fkPergunta}`).then(async function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                return `<p>Ainda não possui comentários... Seja o primeiro :D</p>
                    <div class="ipt_enviar input_comentario">
                            <input type="text" placeholder="Comentário..." id="ipt_comentario">
                            <button class="material-symbols-outlined" onclick="comentar(${fkPergunta}, ${fkUsuario})">send</button>
                            </div>
                    </div>`;
            }

            await resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                for (let i = 0; i < resposta.length; i++) {
                    console.log(resposta[i]);
                    res += `<div class="comentario">
                            <div class="usuario_info">
                                <img src="..${resposta[i].foto}" alt="">
                                <p>${resposta[i].nome} <span class="mestre">rank</span></p>
                            </div>
                            <p>${resposta[i].descricao}</p>
                        </div>`;
                    console.log(res);
                }
                res += `
                    <div class="ipt_enviar input_comentario">
                            <input type="text" placeholder="Comentário..." id="ipt_comentario">
                            <button class="material-symbols-outlined" onclick="comentar(${fkPergunta}, ${fkUsuario})">send</button>
                            </div>
                    </div>
                `
            });
            return res;
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
    return resultados;
}
function exibirPerguntas() {
    fetch("/perguntas/listar").then(function (awnser) {
        if (awnser.ok) {
            if (awnser.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }
            perguntaContainer.innerHTML = '';
            awnser.json().then(async function (awnser) {
                console.log("Dados recebidos: ", JSON.stringify(awnser));
                for (let i = 0; i < awnser.length; i++) {
                    var publicacao = awnser[i];

                    let comentario = await exibirComentarios(publicacao.id, publicacao.fkUsuario);

                    console.log(publicacao.id);
                    console.log(comentario);
                    perguntaContainer.innerHTML += `
                    <div class="pergunta pixel-border">
                        <div class="usuario_info">
                        <img src="..${publicacao.foto}" alt="">
                        <p>${publicacao.nome} <span class="mestre">rank</span></p>
                            </div>
                            <h2 class="titulo_pergunta">${publicacao.titulo}</h2>
                            <p class="desc_pergunta">${publicacao.descricao}</p>
                            <button class="btn_ver_comentarios" onclick="abaComentarios(event, ${i})" id="btn_ver_comentarios">Ver comentários</button>
                            <div class="comentarios_container" id="box_comentarios_${publicacao.id}">
                            ${comentario}
                        </div>
                    `;
                    containerComentarios = document.querySelectorAll('.comentarios_container');
                }

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}
exibirPerguntas();


function abaComentarios(event, id) {
    if (containerComentarios[id].style.display == 'none') {
        containerComentarios[id].style.display = 'flex';
        event.target.innerText = 'Ocultar comentários';
    } else {
        containerComentarios[id].style.display = 'none';
        event.target.innerText = 'Ver comentários';
    }
}

const modalPergunta = document.getElementById('modalPerguntar');
function fazerPergunta() {
    modalPerguntar.style.display = 'flex';
}
function fecharPergunta() {
    modalPerguntar.style.display = 'none';
}

async function perguntar(){
    var idUsuario = sessionStorage.ID_USUARIO;

    var corpo = {
        titulo: document.getElementById("ipt_titulo").value,
        descricao: document.getElementById("ipt_descricao").value
    }

    fetch(`/perguntas/publicar/${idUsuario}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(corpo)
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            fecharPergunta();
            exibirPerguntas();            
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

async function exibirComentariosPorId(idPergunta){
}

function comentar(idPergunta, fkUsuario){

    var idUsuario = sessionStorage.ID_USUARIO;

    var corpo = {
        comentario: document.getElementById("ipt_comentario").value,
        idUsuario: idUsuario,
    }

    fetch(`/respostas/comentar/${fkUsuario},${idPergunta}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(corpo)
    }).then(async function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            fecharPergunta();
            const comentarios = await exibirComentarios(idPergunta, fkUsuario); 
            document.getElementById(`box_comentarios_${idPergunta}`).innerHTML = comentarios;
            console.log(comentarios);
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}