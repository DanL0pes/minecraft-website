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
                sessionStorage.XP_USUARIO = json.xp;
                sessionStorage.DATA_CADASTRO = json.dt_cadastro;
                abrirModal('sucess', 'Login realizado com sucesso!')
                window.location = "/dashboardUsuario/dashboard.html";

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                abrirModal('error', texto)
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
    if(fotoFile == null){
        abrirModal('warn', 'Selecione uma foto.');
        return;
    }
    const novoNome = `user-${Date.now() * (Math.round(Math.random() * 1E9))}.${fotoFile.type.substring((fotoFile.type.indexOf('/') + 1), (fotoFile.type.length))}`;
    fotoPerfil = new File([fotoFile], novoNome, { type: fotoFile.type });
    fotoPreview.src = (URL.createObjectURL(fotoFile));
    console.log(fotoPerfil);
    nomeFotoPerfil = novoNome;
    console.log(nomeFotoPerfil);
    abrirModal('sucess', 'Foto alterada!')
}

modalResultado = document.getElementById('modalResultado');
cardResultado = document.querySelector('.cardModalResultado');
modalIcon = document.querySelector('#modal-icon');
modalTitulo = document.querySelector('#modal-titulo');
modalDesc = document.querySelector('#modal-descricao');
function abrirModal(tipo, desc){
    cardResultado.id = tipo;
    if(tipo == 'warn'){
        modalTitulo.innerHTML = 'Atenção';
        modalIcon.innerHTML = 'exclamation';
    } else if(tipo == 'error'){
        modalTitulo.innerHTML = 'Erro';
        modalIcon.innerHTML = 'error';
    } else if(tipo == 'sucess'){
        modalTitulo.innerHTML = 'Sucesso';
        modalIcon.innerHTML = 'check';
    }
    modalDesc.innerHTML = desc;
    modalResultado.style.display = 'flex';
}
function fecharModal(){
    cardResultado.id = '';
    modalTitulo.innerHTML = '';
    modalDesc.innerHTML = '';
    modalResultado.style.display = 'none';
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
        abrirModal('warn', 'Preencha todos os campos!');
        return false;
    } 

    if (nomeVar.length < 1) {
        abrirModal('warn', 'Nome inválido, no minímo 2 caracteres');
        return false;
    }

    if (emailVar.indexOf('@') == -1 || emailVar.indexOf('.') == -1) {
        abrirModal('warn', 'Email inválido, coloque um email válido.');
        return false;
    }

    if (senhaVar.length < 7) {
        abrirModal('warn', 'Senha inválida, no minimo 7 caracteres');
        return false;
    }

    if (senhaVar != confirmacaoSenhaVar) {
        abrirModal('warn', 'Senhas não correspondentes.');
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
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                abrirModal('sucess', 'Cadastro realizado com sucesso! Redirecionando para tela de Login...');
                mudarFormulario('login');
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            abrirModal('error', resposta);
        });

    return false;
}