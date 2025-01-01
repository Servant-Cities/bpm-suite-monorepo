// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import data from '../src/lib/data.json' assert { type: 'json' };

const prisma = new PrismaClient();

async function main() {
	console.log(`Start seeding ...`);

	for await (const collection of Object.keys(data)) {
		console.warn('-----------------------------')
		console.info(collection)
		console.warn('-----------------------------')
		for await (const entity of data[collection]) {
			await prisma[collection].create({ data: entity }).catch(err => console.error(entity, err))
		}
	}

	console.log(`Seeding finished.`);
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
