-- AlterTable
ALTER TABLE "entries" ADD COLUMN     "register_id" TEXT;

-- CreateTable
CREATE TABLE "registers" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "registers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "entries" ADD CONSTRAINT "entries_register_id_fkey" FOREIGN KEY ("register_id") REFERENCES "registers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
