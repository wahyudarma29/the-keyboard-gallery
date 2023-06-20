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
}

module.exports = BoardController;
