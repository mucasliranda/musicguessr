-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "artist" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Round" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "music" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    CONSTRAINT "Round_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
