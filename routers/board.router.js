const { Router } = require("express");

const BoardController = require("../controllers/board.controller")

const router = Router();

router.get("/", BoardController.listPage);
router.get("/board/create", BoardController.createPage);
router.get("/board/:id/edit", BoardController.updatePage);



module.exports = router;
