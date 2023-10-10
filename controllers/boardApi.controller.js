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
    } catch (err) {
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
          img: "",
          layout: req.body.layout,
          userId: "user1",
        }
      });
      res.status(201).json(result);
    } catch (err) {
      return res.status(400).json({ message: "Something error", err });
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
          img: "",
          layout: req.body.layout,
          userId: req.user.userId,
        }
      });
      res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ message: "Something error", err });
    }
  }
}

module.exports = BoardController;
