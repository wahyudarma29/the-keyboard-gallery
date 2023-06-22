const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class BoardController {
  static async listPage(req, res) {
    const result = await prisma.keyboard.findMany({
      include:{
        user: {
          select:{
            username:true,
          }
        },
      }
    })
    res.render("pages/index", {boards: result})
  }

  static async userBoardList(req, res) {
    const result = await prisma.keyboard.findMany({
      where:{
        userId: req.user.id
      }
    })
    res.render("pages/userBoards", {boards: result})
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
          _count:{
            select:{
              usersfav:true,
            }
          }
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
          userId: req.user.id,
        }
      });
      res.redirect("/");
    } catch (error) {
      req.flash("error", error)
      res.redirect("/board/add")
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

  static async likeBoard(req, res) {
    try {
        await prisma.userFavorites.create({
          data: {
              userId: req.user.id,
              keyboardId: req.params.id
          }
        });
        res.redirect(`/board/${req.params.id}/details`);
    } catch (error) {
      console.log(error)
      res.redirect(`/board/${req.body.keyboardId}/details`)
    }
  }

  static async likedBoardList(req, res) {
    try {
      const result = await prisma.userFavorites.findMany({
        where: {
            userId: req.user.id
        },
        include:{
          keyboard: true
        }
      });
      res.render("pages/boards/likedBoards", {boards: result});
    } catch (error) {
      req.flash("error", error)
      res.redirect("/")
    }
  }
}

module.exports = BoardController;
