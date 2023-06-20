const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class BoardController {
  static async listPage(req, res) {
    res.render("pages/index")
  }

  static async createPage(req, res) {
    res.render("pages/boards/add")
  }

  static async updatePage(req, res) {
    res.render("pages/boards/update")
  }

  static async detailPage(req, res) {
    res.render("pages/boards/detail")
  }

  static async addNew(req, res) {
    try {
      await prisma.keyboard.create({
        data: {
          name : req.body.name,
          brand: req.body.brand,
          desc : req.body.desc,
          price: Number(req.body.price),
          img: req.file.filename,
          layout: req.body.layout,
          userId: "abc123",
        }
      });
      res.redirect("/");
    } catch (error) {
      console.log(error)
      res.redirect("/board/create")
    }
  }
}

module.exports = BoardController;
