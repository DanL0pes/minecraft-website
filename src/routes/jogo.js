var express = require("express");
var router = express.Router();

var jogoController = require("../controllers/jogoController");

router.get("/retornar/", function (req, res) {
    jogoController.retornar(req, res);
});
router.get("/ranking/", function (req, res) {
    jogoController.ranking(req, res);
});
router.get("/estatistica/:idUsuario", function (req, res) {
    jogoController.estatistica(req, res);
});
router.get("/tentativas/:idUsuario,:idJogo", function (req, res) {
    jogoController.tentativas(req, res);
});
router.get("/tentativas/:idUsuario,:idJogo", function (req, res) {
    jogoController.tentativas(req, res);
});
router.get("/tentar/:idUsuario,:idJogo,:correto", function (req, res) {
    jogoController.tentar(req, res);
});
router.get("/quantidade/:idUsuario", function (req, res) {
    jogoController.listarJogos(req, res);
});

module.exports = router;