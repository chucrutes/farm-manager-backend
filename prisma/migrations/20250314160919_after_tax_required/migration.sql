/*
  Warnings:

  - You are about to drop the `farm_plans` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `after_tax` on table `entries` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PlanStatuses" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "Plans" AS ENUM ('FREE', 'BASIC', 'PREMIUM', 'FREEMIUM');

-- DropForeignKey
ALTER TABLE "farm_plans" DROP CONSTRAINT "farm_plans_farm_id_fkey";

-- AlterTable
ALTER TABLE "entries" ALTER COLUMN "after_tax" SET NOT NULL,
ALTER COLUMN "after_tax" SET DEFAULT 0;

-- DropTable
DROP TABLE "farm_plans";

-- DropEnum
DROP TYPE "FarmPlanStatuses";

-- DropEnum
DROP TYPE "FarmPlans";

-- DropEnum
DROP TYPE "Types";

-- CreateTable
CREATE TABLE "user_plans" (
    "user_id" TEXT NOT NULL,
    "status" "PlanStatuses" NOT NULL,
    "plan" "Plans" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_plans_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "user_plans" ADD CONSTRAINT "user_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
