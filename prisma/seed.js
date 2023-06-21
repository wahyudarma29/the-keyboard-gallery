const { PrismaClient } = require("@prisma/client");
const { generateHash } = require("../helper/bcrypt");

const prisma = new PrismaClient();
const keyboards = [
  {
    name: "Keycult Np. 1 rev 2",
    brand: "Keycult",
    desc: "The best keyboard in the world right now. Built with very good material and has a very exceptional typing feel",
    price: 4000,
    img: "https://static1.squarespace.com/static/5f68da90297b94613c756dd6/61161bed175a163a5e386e54/61771d5ab3b4ce029171f3c3/1635196270820/LXI03682.jpg?format=1500w",
    layout: "TKL",
    userId: "user1"
  },
  {
    name: "Space65 R2 Cybervoyager",
    brand: "GrayStudio",
    desc: "The best keyboard in the world right now. Built with very good material and has a very exceptional typing feel",
    price: 800,
    img: "https://i.imgur.com/bgWVZ9B.jpg",
    layout: "65",
    userId: "user2"
  },
  {
    name: "Matrixlab ME",
    brand: "Matrixlab",
    desc: "The best keyboard in the world right now. Built with very good material and has a very exceptional typing feel",
    price: 2000,
    img: "https://images.squarespace-cdn.com/content/v1/5f68da90297b94613c756dd6/1648710961389-NGJ9D4QT1INLPXRHAMWD/LXI04603+1.jpg?format=1500w",
    layout: "TKL",
    userId: "user1"
  },
];

async function main() {
  
  const users = [
    {id:"user1",username: "wahyu123", password: await generateHash("pass123")},
    {id:"user2",username: "darma456", password: await generateHash("pass123")}
  ]

  for(user of users){
    await prisma.user.create({
      data:user
    })
  }

  keyboards.forEach(async (keyboard) => {
    await prisma.keyboard.create({
      data: keyboard,
    });
  });

  console.log("Seed data success");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
