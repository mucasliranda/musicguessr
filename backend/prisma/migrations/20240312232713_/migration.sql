/*
  Warnings:

  - Added the required column `number` to the `Round` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Round" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "musicId" TEXT NOT NULL,
    "music" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "tries" INTEGER DEFAULT 0,
    "finished" BOOLEAN DEFAULT false,
    CONSTRAINT "Round_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Round" ("finished", "gameId", "id", "music", "musicId", "tries") SELECT "finished", "gameId", "id", "music", "musicId", "tries" FROM "Round";
DROP TABLE "Round";
ALTER TABLE "new_Round" RENAME TO "Round";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
