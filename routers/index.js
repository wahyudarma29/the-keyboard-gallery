const { Router } = require("express");

const oardRouter = require("./board.router")

const router = Router()

router.get("/about", (req, res) => {
  res.render("pages/about");
});

router.use(oardRouter);

module.exports = router;