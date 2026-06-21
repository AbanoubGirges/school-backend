/*
  Warnings:

  - The primary key for the `SpiritualNote` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "SpiritualNote_userId_submission_date_key";

-- AlterTable
ALTER TABLE "SpiritualNote" DROP CONSTRAINT "SpiritualNote_pkey",
ADD CONSTRAINT "SpiritualNote_pkey" PRIMARY KEY ("userId", "date", "submission");
