/*
  Warnings:

  - Added the required column `title` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Folder" ADD COLUMN     "description" TEXT,
ADD COLUMN     "has_reached_limit" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title" TEXT NOT NULL;
