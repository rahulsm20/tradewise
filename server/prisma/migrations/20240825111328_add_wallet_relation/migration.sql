/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Web3Wallet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Web3Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Web3Wallet" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Web3Wallet_userId_key" ON "Web3Wallet"("userId");

-- AddForeignKey
ALTER TABLE "Web3Wallet" ADD CONSTRAINT "Web3Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
