var express = require("express");
var router = express.Router();

var perguntaController = require("../controllers/perguntaController");

router.get("/listar", function (req, res) {
    perguntaController.listar(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    perguntaController.publicar(req, res);
});

router.put("/editar/:idUsuario/:idPergunta", function (req, res) {
    perguntaController.editar(req, res);
});

router.delete("/arquivar/:idUsuario/:idPergunta", function (req, res) {
    perguntaController.arquivar(req, res);
});

module.exports = router;