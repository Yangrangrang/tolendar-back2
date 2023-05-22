/*
  Warnings:

  - You are about to drop the column `endDate` on the `Calendar` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Calendar` table. All the data in the column will be lost.
  - Added the required column `end` to the `Calendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Calendar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Calendar" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL;
