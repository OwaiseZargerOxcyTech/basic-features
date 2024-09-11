/*
  Warnings:

  - You are about to drop the column `password` on the `Document` table. All the data in the column will be lost.
  - Added the required column `phone` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "password",
ADD COLUMN     "phone" TEXT NOT NULL;
