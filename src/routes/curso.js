var express = require("express");
var router = express.Router();

var cursoController = require("../controllers/cursoController");

router.get("/listar/:pesquisa", function (req, res) {
    cursoController.listar(req, res);
});
router.get("/listar/", function (req, res) {
    cursoController.listar(req, res);
});
router.get("/listar/usuario/:idUsuario", function (req, res) {
    cursoController.listar(req, res);
});

module.exports = router;