function mudarFormulario(id) {
    const lados = document.querySelectorAll(".lado");
    const titulo = document.getElementById("titulo_form");
    const textoTitulo = id.toUpperCase();

    lados.forEach(lado => {
        if(lado.id == id) {
            lado.classList.add("ativo");
            titulo.innerHTML = textoTitulo
        } else {
            lado.classList.remove("ativo");
            titulo.innerHTML = textoTitulo;
        }
    });
}

function entrar(emailVar, senhaVar) {
    console.log(emailVar, senhaVar);
    if (emailVar == "" || senhaVar == "") {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
        finalizarAguardar();
        return false;
    }
    else {
        setInterval(sumirMensagem, 5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
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
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;
                alert("Login realizado com sucesso!");
                window.location = "home.html";

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none"
}