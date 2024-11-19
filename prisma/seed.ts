import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const memeTypes = await prisma.meme_type.createMany({
    data: [
      {
        id: 1,
        name: "dark",
      },
      {
        id: 2,
        name: "politics",
      },
      {
        id: 3,
        name: "critic",
      },
      {
        id: 4,
        name: "social",
      },
    ],
  });
  console.log(memeTypes);
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
