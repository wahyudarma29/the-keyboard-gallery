/*
  Warnings:

  - You are about to drop the `Layout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `layoutId` on the `Keyboard` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Layout_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Layout";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Keyboard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "img" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Keyboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Keyboard" ("brand", "createdAt", "desc", "id", "img", "name", "price", "updatedAt", "userId") SELECT "brand", "createdAt", "desc", "id", "img", "name", "price", "updatedAt", "userId" FROM "Keyboard";
DROP TABLE "Keyboard";
ALTER TABLE "new_Keyboard" RENAME TO "Keyboard";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
