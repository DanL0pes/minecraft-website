var express = require("express");
var router = express.Router();

var cursoController = require("../controllers/cursoController");

router.get("/listar/:usuario,:pesquisa", function (req, res) {
    cursoController.listar(req, res);
});
router.get("/listar/:usuario,", function (req, res) {
    cursoController.listar(req, res);
});
router.get("/listar/usuario/:idUsuario", function (req, res) {
    cursoController.listarUsuario(req, res);
});
router.get("/concluido/:idUsuario", function (req, res) {
    cursoController.listarCursosConcluidos(req, res);
});
router.get("/retornar/:idCurso", function (req, res) {
    cursoController.retornar(req, res);
});
router.post("/inscrever/usuario", function (req, res) {
    cursoController.inscrever(req, res);
});
router.post("/finalizar/:idUsuario,:idCurso", function (req, res) {
    cursoController.finalizar(req, res);
});

module.exports = router;