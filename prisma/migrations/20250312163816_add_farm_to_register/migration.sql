/*
  Warnings:

  - Added the required column `end_date` to the `registers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farm_id` to the `registers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `registers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registers" ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "farm_id" TEXT NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "total_expense" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "total_income" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "registers" ADD CONSTRAINT "registers_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
