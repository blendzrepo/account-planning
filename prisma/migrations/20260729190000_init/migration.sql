
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "PapelStakeholder" AS ENUM ('DECISOR', 'INFLUENCIADOR', 'COMPRAS', 'USUARIO', 'PATROCINADOR');

-- CreateEnum
CREATE TYPE "NivelPoder" AS ENUM ('ALTO', 'MEDIO', 'BAIXO');

-- CreateEnum
CREATE TYPE "SwotTipo" AS ENUM ('FORCA', 'FRAQUEZA', 'OPORTUNIDADE', 'AMEACA');

-- CreateEnum
CREATE TYPE "PropostaTipo" AS ENUM ('DOR', 'SOLUCAO');

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tag" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "receitaContratada" DOUBLE PRECISION,
    "renovacaoAberta" DOUBLE PRECISION,
    "npsLabel" TEXT,
    "tempoRelacao" TEXT,
    "historicoRelacionamento" TEXT,
    "produtosContratados" TEXT,
    "posicaoCompetitiva" TEXT,
    "riscosPontosAtencaoResumo" TEXT,
    "diferenciaisConcorrencia" TEXT,
    "cadenciaReunioes" TEXT,
    "participantesChave" TEXT,
    "revisaoPlano" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stakeholder" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cargo" TEXT,
    "papel" "PapelStakeholder" NOT NULL DEFAULT 'USUARIO',
    "poder" "NivelPoder" NOT NULL DEFAULT 'MEDIO',
    "agenda" TEXT,
    "estrategia" TEXT,
    "linkedinHighlight" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stakeholder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Objetivo" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "objetivo" TEXT NOT NULL,
    "metrica" TEXT,
    "baseline" TEXT,
    "meta" TEXT,
    "prazo" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Objetivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Oportunidade" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "solucao" TEXT,
    "valorPotencial" DOUBLE PRECISION,
    "estagio" TEXT,
    "probabilidade" INTEGER,
    "proximoPasso" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Oportunidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Risco" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "risco" TEXT NOT NULL,
    "impacto" TEXT,
    "probabilidade" TEXT,
    "sinaisAlerta" TEXT,
    "mitigacao" TEXT,
    "responsavel" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Risco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SwotItem" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "tipo" "SwotTipo" NOT NULL,
    "texto" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SwotItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropostaValorItem" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "tipo" "PropostaTipo" NOT NULL,
    "texto" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropostaValorItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcaoPlano" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "iniciativa" TEXT NOT NULL,
    "objetivoRelacionado" TEXT,
    "responsavel" TEXT,
    "prazo" TEXT,
    "recursos" TEXT,
    "status" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcaoPlano_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetricaKpi" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "kpi" TEXT NOT NULL,
    "meta" TEXT,
    "frequencia" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MetricaKpi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stakeholder" ADD CONSTRAINT "Stakeholder_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Objetivo" ADD CONSTRAINT "Objetivo_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Oportunidade" ADD CONSTRAINT "Oportunidade_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risco" ADD CONSTRAINT "Risco_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SwotItem" ADD CONSTRAINT "SwotItem_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropostaValorItem" ADD CONSTRAINT "PropostaValorItem_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcaoPlano" ADD CONSTRAINT "AcaoPlano_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricaKpi" ADD CONSTRAINT "MetricaKpi_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

