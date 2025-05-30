var express = require("express");
var router = express.Router();

var aulaController = require("../controllers/aulaController");

router.get("/retornar/:idCurso,:idAula", function (req, res) {
    aulaController.retornar(req, res);
});

module.exports = router;