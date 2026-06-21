-- CreateEnum
CREATE TYPE "SpiritualNoteSubmission" AS ENUM ('MORNINGPRAYER', 'NOONPRAYER', 'NIGHTPRAYER', 'LITURGY', 'BIBLE');

-- CreateTable
CREATE TABLE "SpiritualNote" (
    "userId" TEXT NOT NULL,
    "submission" "SpiritualNoteSubmission" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpiritualNote_pkey" PRIMARY KEY ("userId","date")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpiritualNote_userId_submission_date_key" ON "SpiritualNote"("userId", "submission", "date");

-- AddForeignKey
ALTER TABLE "SpiritualNote" ADD CONSTRAINT "SpiritualNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
