/*
  Warnings:

  - You are about to drop the column `value` on the `account` table. All the data in the column will be lost.
  - Added the required column `amount` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account" DROP COLUMN "value",
ADD COLUMN     "amount" INTEGER NOT NULL;
