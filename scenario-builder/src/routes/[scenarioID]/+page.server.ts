import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
	const response = await prisma.activity.findMany({
		where: { scenarios: {some: {id: params.scenarioID}} },
		include: { previousActivities: true, nextActivities: true, scenarios: true }
	});

	return { activities: response };
};
