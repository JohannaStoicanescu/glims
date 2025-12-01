/*
  Warnings:

  - A unique constraint covering the columns `[folder_id,name]` on the table `UnauthenticatedUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UnauthenticatedUser_folder_id_name_key" ON "public"."UnauthenticatedUser"("folder_id", "name");
