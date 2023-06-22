const { Router } = require("express");

const UserController = require("../controllers/user.controller")

const router = Router();

router.get("/register", UserController.registerPage)
router.post("/register", UserController.register)

module.exports = router; 