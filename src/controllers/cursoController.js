var cursoModel = require("../models/cursoModel");

function listar(req, res) {
    let pesquisa = req.params.pesquisa;
    let usuario = req.params.usuario;
    if(pesquisa == undefined){
        pesquisa = '';
    }
    cursoModel.listar(pesquisa, usuario).then(function (resultado) {
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

function listarCursosConcluidos(req, res) {
    let usuario = req.params.idUsuario;
    cursoModel.listarCursosConcluidos(usuario).then(function (resultado) {
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

function retornar(req, res) {
    let curso = req.params.idCurso;
    cursoModel.retornar(curso).then(function (resultado) {
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

function inscrever(req, res) {
    const usuario = req.body.usuarioId;
    const curso = req.body.cursoId;
    cursoModel.inscrever(usuario, curso).then(function (resultado) {
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

function finalizar(req, res) {
    idUsuario = req.params.idUsuario;
    idCurso = req.params.idCurso;
    cursoModel.finalizar(idUsuario, idCurso).then(function (resultado) {
        if (resultado) {
            res.status(200).json(resultado);
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os cursos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {listar, listarUsuario, retornar, inscrever, finalizar, listarCursosConcluidos}