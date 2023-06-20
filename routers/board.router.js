const { Router } = require("express");

const BoardController = require("../controllers/board.controller")

const router = Router();

router.get("/", BoardController.listPage);

module.exports = router;
