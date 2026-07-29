import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { hashPassword } from "../src/lib/password";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Contas iniciais do time. Só são criadas se ainda não existirem — nunca
// sobrescrevem a senha de um usuário que já trocou a sua.
const DEFAULT_USERS = [
  { username: "admin", password: "12345678" },
  { username: "everton.arantes", password: "12345678" },
  { username: "prime.control", password: "12345678" },
];

async function main() {
  for (const u of DEFAULT_USERS) {
    const existing = await prisma.user.findUnique({ where: { username: u.username } });
    if (existing) {
      console.log(`usuário "${u.username}" já existe, mantendo como está`);
      continue;
    }
    const passwordHash = await hashPassword(u.password);
    await prisma.user.create({ data: { username: u.username, passwordHash } });
    console.log(`usuário "${u.username}" criado`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
