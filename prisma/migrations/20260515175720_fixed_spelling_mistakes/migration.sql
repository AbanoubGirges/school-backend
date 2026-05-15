/*
  Warnings:

  - You are about to drop the column `eductaionType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `litrugyDate` on the `User` table. All the data in the column will be lost.
  - Added the required column `educationType` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `liturgyDate` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "eductaionType",
DROP COLUMN "litrugyDate",
ADD COLUMN     "educationType" TEXT NOT NULL,
ADD COLUMN     "liturgyDate" TIMESTAMP(3) NOT NULL;
