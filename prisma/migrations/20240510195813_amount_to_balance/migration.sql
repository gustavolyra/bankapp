/*
  Warnings:

  - You are about to drop the column `amount` on the `account` table. All the data in the column will be lost.
  - Added the required column `balance` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account" DROP COLUMN "amount",
ADD COLUMN     "balance" INTEGER NOT NULL;
