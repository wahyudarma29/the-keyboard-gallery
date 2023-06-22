const { Router } = require("express");

const BoardController = require("../controllers/board.controller")

const upload = require("../middlewares/upload")

const router = Router();

router.get("/", BoardController.listPage);
router.get("/", BoardController.userBoardList);
router.get("/board/add", BoardController.createPage);
router.get("/board/:id/details", BoardController.detailPage);
router.get("/board/:id/edit", BoardController.updatePage);
router.get("/my-gallery", BoardController.userBoardList);
router.get("/my-favorites", BoardController.likedBoardList);

router.post("/board", upload.single('img'), BoardController.addNew);
router.post("/board/:id/like", BoardController.likeBoard);
router.post("/board/:id/update", upload.single('img'), BoardController.update);

module.exports = router;
