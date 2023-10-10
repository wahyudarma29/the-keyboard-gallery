const { Router } = require("express");
const BoardApiController = require("../controllers/boardApi.controller")
const upload = require("../middlewares/upload")

const router = Router();

router.get("/api/", BoardApiController.list);
router.post("/api/board/add", BoardApiController.add);
router.get("/api/board/:id/details", BoardApiController.detail);
router.put("/api/board/:id/edit", BoardApiController.update);

module.exports = router;