/*
  Warnings:

  - You are about to drop the column `postStatus` on the `JobListing` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_JobListing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "experienceLevel" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "applyUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "expiresAt" DATETIME,
    "postedAt" DATETIME,
    "postedById" TEXT NOT NULL,
    CONSTRAINT "JobListing_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_JobListing" ("applyUrl", "companyName", "createdAt", "description", "experienceLevel", "expiresAt", "id", "location", "postedAt", "postedById", "salary", "shortDescription", "title", "type", "updatedAt") SELECT "applyUrl", "companyName", "createdAt", "description", "experienceLevel", "expiresAt", "id", "location", "postedAt", "postedById", "salary", "shortDescription", "title", "type", "updatedAt" FROM "JobListing";
DROP TABLE "JobListing";
ALTER TABLE "new_JobListing" RENAME TO "JobListing";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
