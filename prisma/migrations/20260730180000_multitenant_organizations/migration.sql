-- Multi-tenant: introduces Organization + Role, and scopes User/Client to an org.
--
-- Runs as a single transaction (Prisma's default for a migration file):
-- 1) create Organization + seed the 4 real orgs with fixed ids
-- 2) add orgId as nullable on User/Client
-- 3) backfill every existing row (today's single tenant) into "primecontrol"
-- 4) create the 4 default org-owner accounts
-- 5) only now make orgId required and add the FKs/unique index
-- This avoids a two-deploy dance: by the time NOT NULL is enforced, every
-- row already has a value.

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'MEMBER');

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isPlatform" BOOLEAN NOT NULL DEFAULT false,
    "corDestaque" TEXT,
    "corSidebar" TEXT,
    "corTexto" TEXT,
    "corFundo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- Seed the 4 organizations (fixed ids, so we can reference them below).
INSERT INTO "Organization" ("id", "name", "slug", "isPlatform", "updatedAt") VALUES
  ('234dfbc6ac709a68472aba2e', 'Blendz', 'blendz', true, CURRENT_TIMESTAMP),
  ('e7d6879d2e9fc192931b20ed', 'Typic', 'typic', false, CURRENT_TIMESTAMP),
  ('93c2e9a2393eb42e80987376', 'Prime Control', 'primecontrol', false, CURRENT_TIMESTAMP),
  ('746e2d332f1565319c30e396', 'Squadra', 'squadra', false, CURRENT_TIMESTAMP);

-- AlterTable (nullable for now — backfilled below before the NOT NULL is applied)
ALTER TABLE "Client" ADD COLUMN "orgId" TEXT;

-- AlterTable (nullable for now — backfilled below before the NOT NULL is applied)
ALTER TABLE "User" ADD COLUMN "orgId" TEXT,
ADD COLUMN "role" "Role" NOT NULL DEFAULT 'MEMBER';

-- Every row that existed before multi-tenancy belongs to Prime Control.
UPDATE "User" SET "orgId" = '93c2e9a2393eb42e80987376' WHERE "orgId" IS NULL;
UPDATE "Client" SET "orgId" = '93c2e9a2393eb42e80987376' WHERE "orgId" IS NULL;

-- Drop the old globally-unique username index — uniqueness is now per-org.
DROP INDEX "User_username_key";

-- Default owner account for each organization (password: 12345678).
INSERT INTO "User" ("id", "orgId", "username", "passwordHash", "role", "updatedAt") VALUES
  ('8fc03a07730abe2708f83bf9', '234dfbc6ac709a68472aba2e', 'rafaelcichini', 'd881b05d3b8c623fb7b8a47ca5eea456:331bad77e17b0b1c60f2624b7adb2cf3534a8bd815d8572bb24487f84b1b855e250dba1f5b235982726db2a4696a316976d933196b1f4144ce7b235aeb9a3cf0', 'OWNER', CURRENT_TIMESTAMP),
  ('574120a7ee316aa50ade2d03', 'e7d6879d2e9fc192931b20ed', 'typic', 'd881b05d3b8c623fb7b8a47ca5eea456:331bad77e17b0b1c60f2624b7adb2cf3534a8bd815d8572bb24487f84b1b855e250dba1f5b235982726db2a4696a316976d933196b1f4144ce7b235aeb9a3cf0', 'OWNER', CURRENT_TIMESTAMP),
  ('7a002950c94a800e0bef5286', '93c2e9a2393eb42e80987376', 'primecontrol', 'd881b05d3b8c623fb7b8a47ca5eea456:331bad77e17b0b1c60f2624b7adb2cf3534a8bd815d8572bb24487f84b1b855e250dba1f5b235982726db2a4696a316976d933196b1f4144ce7b235aeb9a3cf0', 'OWNER', CURRENT_TIMESTAMP),
  ('ffba524da3d05f89aea08aee', '746e2d332f1565319c30e396', 'squadra', 'd881b05d3b8c623fb7b8a47ca5eea456:331bad77e17b0b1c60f2624b7adb2cf3534a8bd815d8572bb24487f84b1b855e250dba1f5b235982726db2a4696a316976d933196b1f4144ce7b235aeb9a3cf0', 'OWNER', CURRENT_TIMESTAMP);

-- Every row now has an orgId — safe to require it.
ALTER TABLE "Client" ALTER COLUMN "orgId" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "orgId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_orgId_username_key" ON "User"("orgId", "username");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
