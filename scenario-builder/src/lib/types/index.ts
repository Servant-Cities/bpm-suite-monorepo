import type { Activity, Connection, Scenario } from '@prisma/client';

export type InteractiveActivity = Activity & {
	scenario: Scenario;
	nextActivities: Array<Connection>;
	previousActivities: Array<Connection>;
};

export type ActivityCell = InteractiveActivity & {
	rowIndex: number;
	columnIndex: number;
}
export type ActivitiesRow = Array<ActivityCell | undefined>
export type ActivitiesGridPositions = Array<ActivitiesRow>