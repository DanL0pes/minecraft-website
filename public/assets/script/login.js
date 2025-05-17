function mudarFormulario(id) {
    const lados = document.querySelectorAll(".lado");
    const titulo = document.getElementById("titulo_form");
    const textoTitulo = id.toUpperCase();

    lados.forEach(lado => {
        if (lado.id == id) {
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
                sessionStorage.FOTO_USUARIO = json.foto;
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

let fotoPerfil;
let nomeFotoPerfil = '';
function editarFotoPerfil(fotoFile, fotoPreview) {
    alert('editar')
    const novoNome = `user-${Date.now() * (Math.round(Math.random() * 1E9))}.${fotoFile.type.substring((fotoFile.type.indexOf('/') + 1), (fotoFile.type.length))}`;
    fotoPerfil = new File([fotoFile], novoNome, { type: fotoFile.type });
    fotoPreview.src = (URL.createObjectURL(fotoFile));
    console.log(fotoPerfil);
    nomeFotoPerfil = novoNome;
    console.log(nomeFotoPerfil);
}


function cadastrar(nomeVar, emailVar, senhaVar, confirmacaoSenhaVar) {
    var motivoVar = 'Circuito';

    // Verificando se há algum campo em branco
    if (
        nomeVar == "" ||
        emailVar == "" ||
        senhaVar == "" ||
        confirmacaoSenhaVar == ""
    ) {
        return false;
    } else {
        setInterval(sumirMensagem, 5000);
    }

    if (nomeVar.length < 1) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "Nome inválido, no minímo 2 caracteres";
        finalizarAguardar();
        return false;
    }

    if (emailVar.indexOf('@') == -1 || emailVar.indexOf('.') == -1) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "Email inválido";
        finalizarAguardar();
        return false;
    }

    if (senhaVar.length < 7) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "Senha inválida, no minimo 7 caracteres";
        finalizarAguardar();
        return false;
    }

    if (senhaVar != confirmacaoSenhaVar) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "Senhas nao sao iguais";
        finalizarAguardar();
        return false;
    }

    formData = new FormData();
    if (fotoPerfil != undefined) {
        formData.append("fotoPerfil", fotoPerfil);

        fetch("/usuarios/upload/foto-perfil", {
            method: "POST",
            body: formData,
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    console.log("Foto enviada com sucesso!");
                } else {
                    throw "Houve um erro ao tentar enviar a foto!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    } else {
        nomeFotoPerfil = 'default.png';
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            fotoServer: nomeFotoPerfil,
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            motivoServer: motivoVar,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                cardErro.style.display = "block";

                mensagem_erro.innerHTML =
                    "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                setTimeout(() => {
                    mudarFormulario('login');
                }, "2000");
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

    return false;
}