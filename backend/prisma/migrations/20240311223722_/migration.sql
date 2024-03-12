/*
  Warnings:

  - Added the required column `finished` to the `Round` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musicId` to the `Round` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tries` to the `Round` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Round" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "musicId" TEXT NOT NULL,
    "music" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "tries" INTEGER NOT NULL,
    "finished" BOOLEAN NOT NULL,
    CONSTRAINT "Round_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Round" ("gameId", "id", "music") SELECT "gameId", "id", "music" FROM "Round";
DROP TABLE "Round";
ALTER TABLE "new_Round" RENAME TO "Round";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
