var express = require("express");
var router = express.Router();

var repostaController = require("../controllers/respostaController");

router.get("/listar/:idPergunta", function (req, res) {
    repostaController.listar(req, res);
});

module.exports = router;