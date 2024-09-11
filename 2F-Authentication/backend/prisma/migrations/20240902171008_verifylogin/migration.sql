/*
  Warnings:

  - A unique constraint covering the columns `[verifylogin]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verifylogin" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_verifylogin_key" ON "User"("verifylogin");
