const { Router } = require("express");

const auth = require("../middlewares/auth")

const authRouter = require("./auth.router")
const boardRouter = require("./board.router")

const router = Router()

router.use(authRouter)
router.use(auth)

router.get("/about", (req, res) => {
  res.render("pages/about");
});

router.use(boardRouter);

module.exports = router;