/*
  Warnings:

  - You are about to drop the column `expoPushToken` on the `FailedNotification` table. All the data in the column will be lost.
  - Added the required column `type` to the `FailedNotification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FailedNotification" DROP COLUMN "expoPushToken",
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;
