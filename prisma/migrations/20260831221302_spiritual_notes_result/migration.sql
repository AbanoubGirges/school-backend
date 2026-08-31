/*
  Warnings:

  - The values [SPIRITUAL_NOTE] on the enum `ResultSubject` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ResultSubject_new" AS ENUM ('BIBLE', 'SERVICE_TOPICS', 'DOCTRINE', 'CHURCH_HISTORY', 'RITUALS', 'HYMNS', 'MEMORIZATION_TEXTS', 'ATTENDANCE_GRADE', 'SPIRITUAL_NOTES');
ALTER TABLE "Result" ALTER COLUMN "subject" TYPE "ResultSubject_new" USING ("subject"::text::"ResultSubject_new");
ALTER TYPE "ResultSubject" RENAME TO "ResultSubject_old";
ALTER TYPE "ResultSubject_new" RENAME TO "ResultSubject";
DROP TYPE "public"."ResultSubject_old";
COMMIT;
