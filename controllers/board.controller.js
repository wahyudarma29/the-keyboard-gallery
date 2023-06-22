const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class BoardController {
  static async listPage(req, res) {
    const result = await prisma.keyboard.findMany()
    res.render("pages/index", {boards: result})
  }

  static async createPage(req, res) {
    res.render("pages/boards/add")
  }

  static async updatePage(req, res) {
    try {
      const result = await prisma.keyboard.findUnique({
        where: {
          id: req.params.id
        }
      })

      if(!result){
        throw "Data is not exists!"        
      } else {
        res.render("pages/boards/edit", { board: result })
      }
    } catch (error) {
      req.flash("error", error)
      res.redirect("/")
    }
  }

  static async detailPage(req, res) {
    try {
      const result = await prisma.keyboard.findUnique({
        where: {
          id: req.params.id
        },
        include:{
          user: {
            select:{
              username:true,
            }
          },
        }
      })
      if(!result){
        throw "Data is not exists!"        
      } else {
        res.render("pages/boards/details", {board: result})
      }
    } catch (error) {
      req.flash("error", error)
      res.redirect("/")
    }
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
          userId: req.user.userId,
        }
      });
      res.redirect("/");
    } catch (error) {
      req.flash("error", error)
      res.redirect("/board/create")
    }
  }

  static async update(req, res) {
    try {
      await prisma.keyboard.update({
        where: {
          id: req.params.id,
        },
        data: {
          name : req.body.name,
          brand: req.body.brand,
          desc : req.body.desc,
          price: Number(req.body.price),
          img: req.file.filename,
          layout: req.body.layout,
          userId: req.user.userId,
        }
      });
      res.redirect("/");
    } catch (error) {
      req.flash("error", error)
      res.redirect(`/board/${req.params.id}/edit`)
    }
  }
}

module.exports = BoardController;
