const itemFrames = document.querySelectorAll(".item_frame");
let itemPos = 0;
const items = []
let contagem = 1;
let estado = 'jogando';

// Arrastar e Soltar Item
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

// Limpar item no click
function limparItem(event) {
    const target = event.target;
    target.src = './assets/images/Vazio.png';
}

// Check Resposta
function check() {
    if (contagem == 1) {
        div_tentativa.style.display = "flex";
    }

    const corErradoCraft = '#ec7c7c';
    const corCertoCraft = '#81e9b0';
    let corretoFrase = '';
    let qtdeCorreto = 0;

    if (estado == 'fim') {
        return;
    }

    if (items[0] != 'cobblestone') {
        item_1.style.backgroundColor = corErradoCraft;
    } else {
        item_1.style.backgroundColor = corCertoCraft;
        qtdeCorreto++;
    }
    if (items[1] != 'cobblestone') {
        item_2.style.backgroundColor = corErradoCraft;
    } else {
        item_2.style.backgroundColor = corCertoCraft;
        qtdeCorreto++;
    }
    if (items[2] != 'cobblestone') {
        item_3.style.backgroundColor = corErradoCraft;
    } else {
        item_3.style.backgroundColor = corCertoCraft;
        qtdeCorreto++;
    }
    if (items[3] != null) {
        item_4.style.backgroundColor = corErradoCraft;
    } else {
        item_4.style.backgroundColor = corCertoCraft;
        qtdeCorreto++;
    }
    if (items[4] != 'stick') {
        item_5.style.backgroundColor = corErradoCraft;
    } else {
        item_5.style.backgroundColor = corCertoCraft;
        qtdeCorreto++;
    }
    if (items[5] != null) {
        item_6.style.backgroundColor = corErradoCraft;
    } else {
        item_6.style.backgroundColor = corCertoCraft;
        qtdeCorreto++;
    }
    if (items[6] != null) {
        item_7.style.backgroundColor = corErradoCraft;
    } else {
        item_7.style.backgroundColor = corCertoCraft;
        qtdeCorreto++;
    }
    if (items[7] != 'stick') {
        item_8.style.backgroundColor = corErradoCraft;
    } else {
        item_8.style.backgroundColor = corCertoCraft;
        qtdeCorreto++;
    }
    if (items[8] != null) {
        item_9.style.backgroundColor = corErradoCraft;
    } else {
        item_9.style.backgroundColor = corCertoCraft;
        qtdeCorreto++;
    }

    if (qtdeCorreto == 9) {
        corretoFrase = `<b>Crafting Correto!</b>`
        img_res.style.backgroundColor = '#81e9b0';
    }

    div_tentativa.innerHTML += `
        <div class='tentativa'>
            <h3>Tentativa ${contagem}:</h3>
            <p>Corretos: ${qtdeCorreto}</p>
            <p>Incorretos: ${9 - qtdeCorreto}</p>
            ${corretoFrase}
        </div>
        `;
    if (contagem == 5 || qtdeCorreto == 9) {
        div_tentativa.innerHTML += `
            <div class='tentativa'>
                <h2>Jogo Finalizado!</h2>
            </div>
            `;
        estado = 'fim';
        img_res.innerHTML = `
            <img src="../assets/images/stone_pickaxe.webp">
            `;
        return;
    }
    itemPos = 0;

    contagem++;
}