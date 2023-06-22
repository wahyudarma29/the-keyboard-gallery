const { PrismaClient } = require("@prisma/client");
const { generateHash } = require("../helper/bcrypt");
const prisma = new PrismaClient();

class UserController {
  static async register(req, res) {
    try {
      await prisma.user.create({
        data: {
          username: req.body.username,
          password: await generateHash(req.body.password)
        }
      });
      redirect("/login")
    } catch (error) {
      req.flash("error", error)
      res.redirect("/board/create")
    }
  }

  static async registerPage(req, res) {
    res.render("pages/user/register", {isLoggedIn: false})
  }
}

module.exports = UserController;
