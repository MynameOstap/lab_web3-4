/*
  Warnings:

  - You are about to drop the column `type` on the `animal` table. All the data in the column will be lost.
  - Added the required column `type_animal` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `animal` DROP COLUMN `type`,
    ADD COLUMN `type_animal` ENUM('dog', 'cat', 'hamster', 'parrot') NOT NULL;
