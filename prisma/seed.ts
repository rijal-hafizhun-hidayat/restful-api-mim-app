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
      {
        id: 5,
        name: "other",
        background_color: "bg-slate-100",
        text_color: "text-slate-800",
      },
    ],
  });

  const user = await prisma.user.createMany({
    data: [
      {
        id: 1,
        name: "admin",
        email: "admin@gmail.com",
        password:
          "$argon2id$v=19$m=65536,t=2,p=1$gbeDqrnOu39J7WmVAe+jC4/6y6wHu81SOPELbwxaJ7M$Wznj+VARyCqJzz5HGNe9djenbP9DPN/4c1tK2412nSo",
      },
    ],
  });

  const role = await prisma.role.createMany({
    data: [
      {
        id: 1,
        name: "admin",
      },
    ],
  });

  const userRole = await prisma.user_role.createMany({
    data: [
      {
        id: 1,
        user_id: 1,
        role_id: 1,
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
