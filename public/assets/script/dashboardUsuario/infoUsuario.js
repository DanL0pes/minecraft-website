const emailVar = sessionStorage.EMAIL_USUARIO;
const senhaVar = sessionStorage.SENHA_USUARIO;
let xp;
let nome;
let foto;
let rank;

async function entrar() {
    console.log(emailVar, senhaVar);
    if (emailVar == "" || senhaVar == "") {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
        return false;
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    await fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                usuarioObj = json;
                foto = usuarioObj.foto;
                nome = usuarioObj.nome;
                xp = usuarioObj.xp;
                adicionarDados();
            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");
                console.error(texto);
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}
entrar()


b_nome_usuario = document.getElementById('nome_usuario');
b_rank_usuario = document.getElementById('rank_usuario');
b_foto_usuario = document.getElementById('foto_perfil');
b_rank = document.getElementById('rank');
b_xp = document.getElementById('xp');

function adicionarDados() {
    if (emailVar != null && nome != null) {
        b_nome_usuario.innerHTML = nome;
        if (b_xp != undefined) {
            b_xp.innerHTML = xp;
        }
        b_foto_usuario.src = `..${foto}`;
        if (xp <= 500) {
            rank = 'Novato';
        } else if (xp <= 1000) {
            rank = 'Experiente';
        } else if (xp > 1000) {
            rank = 'Mestre';
        }
        b_rank_usuario.innerHTML = rank;
        b_rank_usuario.classList.add(rank.toLowerCase());
        if (b_rank != undefined) {
            b_rank.innerHTML = rank;
            b_rank.classList.add(rank.toLowerCase());
        }
        document.querySelector('.logout').addEventListener('click', () => {
            sessionStorage.clear();
            window.location = '../index.html'
        })
    } else {
        window.location = "../login.html";
    }
}



