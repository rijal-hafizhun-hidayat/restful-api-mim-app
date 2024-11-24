import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const memeTypes = await prisma.meme_type.createMany({
    data: [
      {
        id: 1,
        name: "dark",
        background_color: "bg-gray-100",
        text_color: "text-gray-800",
      },
      {
        id: 2,
        name: "politics",
        background_color: "bg-yellow-100",
        text_color: "text-yellow-800",
      },
      {
        id: 3,
        name: "critic",
        background_color: "bg-indigo-100",
        text_color: "text-indigo-800",
      },
      {
        id: 4,
        name: "social",
        background_color: "bg-blue-100",
        text_color: "text-blue-800",
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
