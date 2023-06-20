const { Router } = require("express");

const BoardController = require("../controllers/board.controller")
const upload = require("../middlewares/upload")

const router = Router();

router.get("/", BoardController.listPage);
router.get("/board/create", BoardController.createPage);
router.get("/board/:id/edit", BoardController.updatePage);
router.post("/board", upload.single('img'), BoardController.addNew);


module.exports = router;
