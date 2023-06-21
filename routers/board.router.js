const { Router } = require("express");

const BoardController = require("../controllers/board.controller")
const upload = require("../middlewares/upload")

const router = Router();

router.get("/", BoardController.listPage);
router.get("/board/add", BoardController.createPage);
router.get("/board/:id/edit", BoardController.updatePage);
router.get("/board/:id/details", BoardController.detailPage);
router.post("/board", upload.single('img'), BoardController.addNew);
router.post("/board/:id/update", upload.single('img'), BoardController.update);

module.exports = router;
