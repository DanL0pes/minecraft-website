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
        console.log("Houve um erro ao buscar os cursos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {retornar}