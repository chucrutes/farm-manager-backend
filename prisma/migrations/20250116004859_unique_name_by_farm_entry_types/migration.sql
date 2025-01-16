/*
  Warnings:

  - A unique constraint covering the columns `[name,farm_id]` on the table `entry_types` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "entry_types_name_farm_id_key" ON "entry_types"("name", "farm_id");
