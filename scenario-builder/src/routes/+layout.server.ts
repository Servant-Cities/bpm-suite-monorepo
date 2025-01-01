import type { LayoutServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: LayoutServerLoad = async () => {

	const response = await prisma.scenario.findMany();

	return { scenarios: response };
};
