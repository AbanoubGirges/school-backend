-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'FATHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthdate" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "whatsapp" INTEGER NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "homeNumber" INTEGER NOT NULL,
    "schoolName" TEXT NOT NULL,
    "eductaionType" TEXT NOT NULL,
    "educationYear" INTEGER NOT NULL,
    "confessionFather" TEXT NOT NULL,
    "litrugyDate" TIMESTAMP(3) NOT NULL,
    "servantPrepYear" INTEGER NOT NULL,
    "serviceType" TEXT NOT NULL,
    "registerDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profilePicture" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
