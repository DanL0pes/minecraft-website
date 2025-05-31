function abrirCursos(tipo){
    let cards; 
    if(tipo == 'andamento'){
        cards = document.getElementById('cards-andamento'); 
    }
    if(cards.classList.contains('aberto')){
        cards.classList.remove('aberto');
    }else{
        cards.classList.add('aberto');
    }
}

const cursosContainer = document.querySelector('#todosCursosContainer')
function exibirCursos(pesquisa) {
    if(pesquisa == undefined){
        pesquisa = '';
    }
    fetch(`/cursos/listar/${pesquisa}`).then(function (awnser) {
        if (awnser.ok) {
            if (awnser.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }
            cursosContainer.innerHTML = '';
            awnser.json().then(function (awnser) {
                for (let i = 0; i < awnser.length; i++) {
                    const curso = awnser[i];

                    cursosContainer.innerHTML += `
                            <div class="curso">
                                <div class="curso-nome">
                                    <h3>${curso.nome}</h3>
                                    <div class="especificacoes">
                                        <h4 class="xp">100xp</h4>
                                        <h4>${curso.qtde_aulas} Aulas | ${curso.duracao} min</h4>
                                    </div>
                                </div>
                                <div class="curso-desc">
                                    <p>${curso.tipo}</p>
                                    <button class="btn-green">Inscrever-se</button>
                                </div>
                            </div>
                    `;
                }

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}
exibirCursos();

const iptPesquisa = document.getElementById('ipt_pesquisa_curso');
iptPesquisa.addEventListener('change',() => {
    exibirCursos(iptPesquisa.value);
})

async function retornarAula(idCurso, idAula){
    let dadosAula = await fetch(`/aulas/retornar/${idCurso},${idAula}`).then(async function (awnser) {
        if (awnser.ok) {
            return awnser.json();
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (awnser) {
        console.error(awnser);
    });
    return dadosAula[0];
}

const cursosAndamentoContainer = document.querySelector('#cards-andamento')
function exibirCursosUsuario() {
    const idUsuario = sessionStorage.ID_USUARIO;
    fetch(`/cursos/listar/usuario/${idUsuario}`).then(function (awnser) {
        if (awnser.ok) {
            if (awnser.status == 204) {
                cursosAndamentoContainer.innerHTML = "Nenhum curso em andamento!";
            }
            cursosAndamentoContainer.innerHTML = '';
            awnser.json().then(async function (awnser) {
                for (let i = 0; i < awnser.length; i++) {
                    const curso = awnser[i];
                    const progresso = curso.aulas_feitas / curso.qtde_aulas * 100
                    const aula = await retornarAula(curso.curso_id, curso.aulas_feitas+1);

                    cursosAndamentoContainer.innerHTML += `
                            <div class="curso">
                                <div class="curso-nome">
                                    <h3>${curso.nome}</h3>
                                </div>
                                <div class="curso-progresso">
                                    <span class='progresso-curso'>
                                        <div class="progresso-bar" id="progresso-curso-${curso.curso_id}"></div>
                                    </span>
                                    <p>Progresso: ${progresso}%</p>
                                    <div class="continuar">
                                        <div>
                                            <p>Aula ${curso.aulas_feitas+1} | ${aula.duracao} min</p>
                                            <p>
                                                ${aula.nome}
                                            </p>
                                        </div>
                                        <button class="btn-green">Continuar</button>
                                    </div>
                                </div>
                            </div>
                    `;
                    document.getElementById(`progresso-curso-${curso.curso_id}`).style.width = progresso+'%';
                }

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (awnser) {
        console.error(awnser);
    });
}
exibirCursosUsuario();
