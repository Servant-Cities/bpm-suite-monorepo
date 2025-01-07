import type { InteractiveActivity, ActivitiesGridPositions, ActivityCell } from '$lib/types';

const getActivitiesGridPositions = (
	activities: Array<InteractiveActivity>,
	zoom = 1
): {
	grid: ActivitiesGridPositions;
	meta: { flattenPositions: Array<ActivityCell>; columnsNumber: number };
} => {
	if (activities.length === 0)  return {grid: [], meta: {flattenPositions: [], columnsNumber: 0}}
	const xSpaceAround = Math.floor(2 * (1/zoom));
	const ySpaceAround = Math.floor(1 * (1/zoom));
	let rows: ActivitiesGridPositions = [];
	let columnsNumber = xSpaceAround;
	let processedActivities: Array<ActivityCell> = [];

	const placeNextActivities = (
		activity: InteractiveActivity,
		rowIndex: number,
		columnIndex: number
	) => {
		if (rowIndex === rows.length) {
			rows.push([]);
		}
		const activityCell = { ...activity, columnIndex, rowIndex };
		rows[rowIndex][columnIndex] = activityCell;

		processedActivities.push(activityCell);
		if (activity?.nextActivities.length > 0) {
			columnsNumber++;
		}
		activity?.nextActivities.forEach((connection, index) => {
			if (!processedActivities.find(({ id }) => id === connection.nextActivityId)) {
				const nextActivity = activities.find(({ id }) => id === connection.nextActivityId);

				if (nextActivity) {
					placeNextActivities(nextActivity, rowIndex + index, columnIndex + 1);
				}
			}
		});
	};

	placeNextActivities(activities[0], 0, xSpaceAround);

	const centeredGrid: ActivitiesGridPositions = Array.from(
		new Array(ySpaceAround),
		(_) => new Array(columnsNumber + xSpaceAround)
	);
	console.log({ centeredGrid });
	return {
		grid: [...centeredGrid, ...rows, ...centeredGrid],
		meta: { columnsNumber, flattenPositions: processedActivities }
	};
};

export default getActivitiesGridPositions;
