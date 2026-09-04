/*
  Warnings:

  - A unique constraint covering the columns `[subject,termId,userId]` on the table `Result` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Result_subject_termId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Result_subject_termId_userId_key" ON "Result"("subject", "termId", "userId");
