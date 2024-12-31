// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import data from "../src/lib/data.json" assert { type: "json" }

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  console.log(data)

  console.log(`Seeding finished.`)
  return
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })