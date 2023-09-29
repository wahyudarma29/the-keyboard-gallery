const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class BoardController {
  static async list(req, res) {
    const result = await prisma.keyboard.findMany()
    res.json(result)
  }

  static async detail(req, res) {
    try {
      const result = await prisma.keyboard.findUnique({
        where: {
          id: req.params.id
        },
      })
      if(!result){
        throw "Data is not exists!"        
      } else {
        res.json(result)
      }
    } catch (error) {
        res.json({message: error})
    }
  }

  static async add(req, res) {
    try {
      const result = await prisma.keyboard.create({
        data: {
          name : req.body.name,
          brand: req.body.brand,
          desc : req.body.desc,
          price: Number(req.body.price),
          img: req.file.filename,
          layout: req.body.layout,
          userId: 1,
        }
      });
      res.json(result);
    } catch (error) {
      req.json({message: error})
    }
  }

  static async update(req, res) {
    try {
      const result = await prisma.keyboard.update({
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
      res.json(result);
    } catch (error) {
      req.json({message: error})
    }
  }
}

module.exports = BoardController;
