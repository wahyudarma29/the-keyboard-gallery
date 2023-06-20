const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class BoardController {
  static async listPage(req, res) {
    res.render("pages/index")
  }

  static async createPage(req, res) {
    res.render("pages/board/add")
  }

  static async updatePage(req, res) {
    res.render("pages/board/update")
  }

  static async detailPage(req, res) {
    res.render("pages/board/detail")
  }

  static async addNew(req, res) {
    try {
      await prisma.keybaord.create({
        data: {
          name : req.body.name,
          brand: req.body.brand,
          desc : req.body.desc,
          price: Number(req.body.price),
          img:req.file.filename,
          layoutId: req.body.layout,
          userId: req.body.userId,
        }
      });
    } catch (error) {
      req.flash("error", error)
      res.redirect("/board/add")
    }
    res.redirect("/");
  }
}

module.exports = BoardController;
