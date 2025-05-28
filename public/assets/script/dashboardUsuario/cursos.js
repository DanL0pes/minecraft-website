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
                console.log("Dados recebidos: ", JSON.stringify(awnser));
                for (let i = 0; i < awnser.length; i++) {
                    const curso = awnser[i];
                    console.log(curso);

                    cursosContainer.innerHTML += `
                            <div class="curso">
                                <div class="curso-nome">
                                    <h3>${curso.nome}</h3>
                                    <div class="especificacoes">
                                        <h4 class="xp">100xp</h4>
                                        <h4>${curso.qtde_aulas} Aulas | ${curso.duracao}h</h4>
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