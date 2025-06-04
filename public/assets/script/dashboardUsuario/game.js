const itemFrames = document.querySelectorAll(".item_frame");
let itemPos = 0;
const items = []
let contagem = 1;
let estado = 'jogando';

const rankContainer = document.getElementById('ranking_container')
async function ranking(){
    rankContainer.innerHTML = '';
    let dadosRanking = await fetch(`/jogo/ranking/`).then(async function (awnser) {
        if (awnser.ok) {
            return awnser.json();
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (awnser) {
        console.error(awnser);
    });
    for(let i = 0; i < dadosRanking.length; i++){
        let icone;
        let pos;
        if(i == 0){
            pos = 'primeiro';
            icone = 'Gold';
        } else if(i == 1){
            pos = 'segundo';
            icone = 'Iron';
        } else if(i == 2){
            pos = 'terceiro';
            icone = 'Coal';
        }
        rankContainer.innerHTML += `
            <div class="top ${pos}">
                <img class="icone" src="..${dadosRanking[i].foto}" alt="">
                <h3>${dadosRanking[i].nome}</h3>
                <h2>${dadosRanking[i].qtde_acertos} Acertos</h2>
                <img class="pos" src="../assets/images/${icone}.png" alt="">
            </div>
        `;
    }
}
ranking();

const idUsuario = sessionStorage.ID_USUARIO;
const acertoStat = document.getElementById('acerto');
const erroStat = document.getElementById('erro');
async function estatistica(){
    acertoStat.innerText = '';
    erroStat.innerText = '';
    let dadosStat = await fetch(`/jogo/estatistica/${idUsuario}`).then(async function (awnser) {
        if (awnser.ok) {
            return awnser.json();
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (awnser) {
        console.error(awnser);
    });
    if(!dadosStat[0].qtde_acertos){
        acertoStat.innerText = 0;
    } else{
        acertoStat.innerText = dadosStat[0].qtde_acertos;
    }
    erroStat.innerText = dadosStat[0].total_tentativas - dadosStat[0].qtde_acertos; 
}
estatistica();

const jogoStat = document.getElementById('jogo');
async function quantidadeJogo(){
    jogoStat.innerText = '';
    let dadosStat = await fetch(`/jogo/quantidade/${idUsuario}`).then(async function (awnser) {
        if (awnser.ok) {
            return awnser.json();
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (awnser) {
        console.error(awnser);
    });
    jogoStat.innerText = dadosStat[0].qtde_jogos; 
}
quantidadeJogo();

let idJogo;
const itemsCorreto = [null, null, null, null, null, null, null, null, null];
async function retornarJogoDia(){
    let dadosJogo = await fetch(`/jogo/retornar/`).then(async function (awnser) {
        if (awnser.ok) {
            return awnser.json();
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (awnser) {
        console.error(awnser);
    });
    for(let i = 0; i < dadosJogo.length; i++){
        idJogo = dadosJogo[0].id;
        itemsCorreto[dadosJogo[i].pos - 1] = dadosJogo[i].nome.toLowerCase();
        console.log(itemsCorreto);
    }
    retornarTentativas();
}
retornarJogoDia();

async function retornarTentativas(){
    let dadosTentativas = await fetch(`/jogo/tentativas/${idUsuario},${idJogo}`).then(async function (awnser) {
        if (awnser.ok) {
            return awnser.json();
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (awnser) {
        console.error(awnser);
    });
    for(let i = 0; i < dadosTentativas.length; i++){
        contagem = dadosTentativas[i].tentativa;
        document.getElementById(`div_tentativa_${contagem}`).innerHTML += `
            <div class='descricao_tentativa'>
                <p>Oi</p>
            </div>
        `;
        if(dadosTentativas[i].acerto == 1){
            document.getElementById(`div_tentativa_${contagem}`).style.backgroundColor = '#0b7a26';
        }else{
            document.getElementById(`div_tentativa_${contagem}`).style.backgroundColor = '#da2222';
        }
        if(dadosTentativas[i].acerto == 1 || contagem == 5){
            document.getElementById('btnGame').setAttribute('disabled', "true")
            estado = 'fim';
            return;
        }
    }
}

function inicioDrag(event) {
    event.dataTransfer.setData("src", event.target.src);
    event.dataTransfer.setData("item", event.target.id);
}
function permitirDrop(event) {
    event.preventDefault();
}
function drop(event) {
    event.preventDefault();
    const target = event.target;
    target.src = event.dataTransfer.getData("src");
    items[target.id] = event.dataTransfer.getData("item");
}

function limparItem(event) {
    const target = event.target;
    target.src = './assets/images/Vazio.png';
}

async function check() {
    const corErradoCraft = '#ec7c7c';
    const corCertoCraft = '#81e9b0';
    let qtdeCorreto = 0;

    if (estado == 'fim') {
        return;
    }

    if (items[0] != itemsCorreto[0]) {
        item_1.style.backgroundColor = corErradoCraft;
    } else {
        item_1.style.backgroundColor = corCertoCraft;
        qtdeCorreto++;
    }
    if (items[1] != itemsCorreto[1]) {
        item_2.style.backgroundColor = corErradoCraft;
    } else {
        item_2.style.backgroundColor = corCertoCraft;
        qtdeCorreto++;
    }
    if (items[2] != itemsCorreto[2]) {
        item_3.style.backgroundColor = corErradoCraft;
    } else {
        item_3.style.backgroundColor = corCertoCraft;
        qtdeCorreto++;
    }
    if (items[3] != itemsCorreto[3]) {
        item_4.style.backgroundColor = corErradoCraft;
    } else {
        item_4.style.backgroundColor = corCertoCraft;
        qtdeCorreto++;
    }
    if (items[4] != itemsCorreto[4]) {
        item_5.style.backgroundColor = corErradoCraft;
    } else {
        item_5.style.backgroundColor = corCertoCraft;
        qtdeCorreto++;
    }
    if (items[5] != itemsCorreto[5]) {
        item_6.style.backgroundColor = corErradoCraft;
    } else {
        item_6.style.backgroundColor = corCertoCraft;
        qtdeCorreto++;
    }
    if (items[6] != itemsCorreto[6]) {
        item_7.style.backgroundColor = corErradoCraft;
    } else {
        item_7.style.backgroundColor = corCertoCraft;
        qtdeCorreto++;
    }
    if (items[7] != itemsCorreto[7]) {
        item_8.style.backgroundColor = corErradoCraft;
    } else {
        item_8.style.backgroundColor = corCertoCraft;
        qtdeCorreto++;
    }
    if (items[8] != itemsCorreto[8]) {
        item_9.style.backgroundColor = corErradoCraft;
    } else {
        item_9.style.backgroundColor = corCertoCraft;
        qtdeCorreto++;
    }

    if(qtdeCorreto > 0){
        document.getElementById(`div_tentativa_${contagem}`).style.backgroundColor = '#da2222';
    }

    document.getElementById(`div_tentativa_${contagem}`).innerHTML += `
        <div class='descricao_tentativa'>
            <p>Corretos: ${qtdeCorreto}</p>
            <p>Incorretos: ${9 - qtdeCorreto}</p>
        </div>
        `;

    if (qtdeCorreto == 9) {
        document.getElementById(`div_tentativa_${contagem}`).style.backgroundColor = '#0b7a26';
        await fetch(`/jogo/tentar/${idUsuario},${idJogo},1`).then(async function (awnser) {
            if (awnser.ok) {
                console.log(awnser.json());
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (awnser) {
            console.error(awnser);
        });
    } else {
        await fetch(`/jogo/tentar/${idUsuario},${idJogo},0`).then(async function (awnser) {
            if (awnser.ok) {
                console.log(awnser.json());
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (awnser) {
            console.error(awnser);
        });
    }
    estatistica();
    ranking();
    if (contagem == 5 || qtdeCorreto == 9) {
        document.getElementById('btnGame').setAttribute('disabled', "true")
        estado = 'fim';
        return;
    }
    itemPos = 0;
    console.log(contagem);
    contagem++;
}