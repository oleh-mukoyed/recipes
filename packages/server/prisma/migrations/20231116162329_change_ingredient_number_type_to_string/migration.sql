/*
  Warnings:

  - You are about to alter the column `number` on the `Ingredient` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "number" SET DATA TYPE VARCHAR(255);
