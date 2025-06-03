var aulaModel = require("../models/aulaModel");

function retornar(req, res) {
    let idAula = req.params.idAula;
    let idCurso = req.params.idCurso;

    aulaModel.retornar(idAula, idCurso).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os aulas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function calendarioAulasFeitas(req, res){
    let idUsuario = req.params.idUsuario;

    aulaModel.calendarioAulasFeitas(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os aulas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function concluirAula(req, res){
    let idCurso = req.params.idCurso;
    let idAula = req.params.idAula;
    let idUsuario = req.body.idUsuario;

    aulaModel.concluirAula(idCurso, idAula, idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os aulas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {retornar, calendarioAulasFeitas, concluirAula}