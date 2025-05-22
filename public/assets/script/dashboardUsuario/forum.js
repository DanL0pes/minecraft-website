const perguntaContainer = document.querySelector('.perguntas_container');
let comentariosContainer;
let btnVerComentarios;

async function exibirComentarios(fkPergunta) {
    let res = '';
    let resultados = await fetch(`/respostas/listar/${fkPergunta}`).then(async function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                return '<p>Ainda não possui comentários... Seja o primeiro :D</p>';
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

                    let comentario = await exibirComentarios(publicacao.id);

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
                            <div class="comentarios_container" id="box_comentarios">
                            ${comentario}
                            <div class="ipt_enviar input_comentario">
                                    <input type="text" placeholder="Comentário...">
                                    <button class="material-symbols-outlined">send</button>
                                    </div>
                            </div>
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
function cancelarPergunta() {
    modalPerguntar.style.display = 'none';
}

function perguntar(titulo, descricao){
    
}