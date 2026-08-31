/*
  Warnings:

  - A unique constraint covering the columns `[subject,termId]` on the table `Result` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Result_subject_termId_key" ON "Result"("subject", "termId");
