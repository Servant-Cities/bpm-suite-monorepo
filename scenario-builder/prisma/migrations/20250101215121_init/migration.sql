-- CreateTable
CREATE TABLE "Scenario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "trigger" TEXT NOT NULL,
    CONSTRAINT "Activity_trigger_fkey" FOREIGN KEY ("trigger") REFERENCES "Trigger" ("value") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Connection" (
    "nextActivityId" TEXT NOT NULL,
    "previousActivityId" TEXT NOT NULL,

    PRIMARY KEY ("previousActivityId", "nextActivityId"),
    CONSTRAINT "Connection_nextActivityId_fkey" FOREIGN KEY ("nextActivityId") REFERENCES "Activity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Connection_previousActivityId_fkey" FOREIGN KEY ("previousActivityId") REFERENCES "Activity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Trigger" (
    "value" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "reserved" BOOLEAN NOT NULL,
    "extends" TEXT,
    CONSTRAINT "Trigger_extends_fkey" FOREIGN KEY ("extends") REFERENCES "Trigger" ("value") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ActivityToScenario" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ActivityToScenario_A_fkey" FOREIGN KEY ("A") REFERENCES "Activity" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ActivityToScenario_B_fkey" FOREIGN KEY ("B") REFERENCES "Scenario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_value_key" ON "Trigger"("value");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityToScenario_AB_unique" ON "_ActivityToScenario"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityToScenario_B_index" ON "_ActivityToScenario"("B");
