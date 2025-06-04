var jogoModel = require("../models/jogoModel");

function retornar(req, res) {
    let dataAtual = new Date();
    let dataFormatada = dataAtual.getFullYear()+'-'+("0" + (dataAtual.getMonth() + 1)).slice(-2)+'-'+dataAtual.getDay;
    console.log(dataFormatada);
    jogoModel.retornar(dataFormatada).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os cursos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function ranking(req, res) {
    jogoModel.ranking().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os cursos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function estatistica(req, res) {
    idUsuario = req.params.idUsuario;
    jogoModel.estatistica(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os cursos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function tentativas(req, res) {
    idUsuario = req.params.idUsuario;
    idJogo = req.params.idJogo;
    jogoModel.tentativas(idUsuario, idJogo).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os cursos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function tentar(req, res) {
    idUsuario = req.params.idUsuario;
    idJogo = req.params.idJogo;
    correto = req.params.correto;
    jogoModel.tentar(idUsuario, idJogo, correto).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os cursos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarJogos(req, res) {
    idUsuario = req.params.idUsuario;
    jogoModel.listarJogos(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os cursos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {retornar, ranking, estatistica, tentativas, tentar, listarJogos}