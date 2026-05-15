/*
  Warnings:

  - You are about to drop the column `excuse` on the `Attendance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "excuse",
ADD COLUMN     "note" TEXT;
