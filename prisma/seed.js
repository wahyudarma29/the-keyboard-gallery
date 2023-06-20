const { PrismaClient } = require("@prisma/client");
// const { generateHash } = require("../lib/bcrypt");

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      id: "abc123",
      username: "admin",
      password: "admin123"
    }
  })

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
