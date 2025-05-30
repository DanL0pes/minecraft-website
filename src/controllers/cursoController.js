var cursoModel = require("../models/cursoModel");

function listar(req, res) {
    let pesquisa = req.params.pesquisa;
    if(pesquisa == undefined){
        pesquisa = '';
    }
    cursoModel.listar(pesquisa).then(function (resultado) {
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

function listarUsuario(req, res) {
    let usuario = req.params.idUsuario;
    cursoModel.listarUsuario(usuario).then(function (resultado) {
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

module.exports = {listar, listarUsuario}