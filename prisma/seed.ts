import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
// Update
import { Prisma, PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const ticketData: Prisma.TicketCreateInput[] = [
  {
    // id auto generated as defined in schema.prisma
    title: "Ticket 1",
    content: "First ticket from DB.",
    status: "DONE" as const,
  },
  {
    title: "Ticket 2",
    content: "Second ticket from DB.",
    status: "OPEN" as const,
  },
  {
    title: "Ticket 3",
    content: "Third ticket from DB.",
    status: "IN_PROGRESS" as const,
  },
];

export async function main() {
  // Start timer
  const t0 = performance.now();
  console.log("DB Seed: Started ...");

  // Wipe existing data
  await prisma.ticket.deleteMany();

  for (const t of ticketData) {
    await prisma.ticket.create({ data: t });
  }

  // Stop timer
  const t1 = performance.now();
  console.log(`DB Seed: Finished (${t1 - t0}ms)`);
}

main();
