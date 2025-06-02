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
router.post("/inscrever/usuario", function (req, res) {
    cursoController.inscrever(req, res);
});

module.exports = router;