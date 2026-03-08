/*
  Warnings:

  - You are about to drop the column `url` on the `Media` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[storage_id]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `storage_id` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Media_url_key";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "url",
ADD COLUMN     "storage_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Media_storage_id_key" ON "Media"("storage_id");
