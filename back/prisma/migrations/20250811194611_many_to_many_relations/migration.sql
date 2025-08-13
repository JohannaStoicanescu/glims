/*
  Warnings:

  - You are about to drop the column `media_id` on the `ReactionType` table. All the data in the column will be lost.
  - You are about to drop the column `reaction_id` on the `ReactionType` table. All the data in the column will be lost.
  - Added the required column `media_id` to the `Reaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reaction_type_id` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ReactionType" DROP CONSTRAINT "ReactionType_media_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReactionType" DROP CONSTRAINT "ReactionType_reaction_id_fkey";

-- AlterTable
ALTER TABLE "public"."Reaction" ADD COLUMN     "media_id" TEXT NOT NULL,
ADD COLUMN     "reaction_type_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."ReactionType" DROP COLUMN "media_id",
DROP COLUMN "reaction_id";

-- CreateTable
CREATE TABLE "public"."_FolderMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FolderMembers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_FolderToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FolderToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_FolderToReactionType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FolderToReactionType_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FolderMembers_B_index" ON "public"."_FolderMembers"("B");

-- CreateIndex
CREATE INDEX "_FolderToTag_B_index" ON "public"."_FolderToTag"("B");

-- CreateIndex
CREATE INDEX "_FolderToReactionType_B_index" ON "public"."_FolderToReactionType"("B");

-- AddForeignKey
ALTER TABLE "public"."Reaction" ADD CONSTRAINT "Reaction_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "public"."Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reaction" ADD CONSTRAINT "Reaction_reaction_type_id_fkey" FOREIGN KEY ("reaction_type_id") REFERENCES "public"."ReactionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FolderMembers" ADD CONSTRAINT "_FolderMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FolderMembers" ADD CONSTRAINT "_FolderMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FolderToTag" ADD CONSTRAINT "_FolderToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FolderToTag" ADD CONSTRAINT "_FolderToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FolderToReactionType" ADD CONSTRAINT "_FolderToReactionType_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FolderToReactionType" ADD CONSTRAINT "_FolderToReactionType_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."ReactionType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
