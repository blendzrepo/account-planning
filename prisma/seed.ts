import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const org = await prisma.organization.findUnique({ where: { slug: "primecontrol" } });
  if (!org) {
    throw new Error(
      'Organização "primecontrol" não encontrada — rode as migrations antes de seedar.'
    );
  }

  await prisma.client.deleteMany({ where: { orgId: org.id } });

  const azul = await prisma.client.create({
    data: {
      orgId: org.id,
      name: "Azul Linhas Aéreas",
      tag: "AZUL",
      receitaContratada: 10_300_000,
      renovacaoAberta: 1_630_000,
      npsLabel: "—",
      tempoRelacao: "~6 anos",
      historicoRelacionamento:
        "Cliente desde 2020 (~6 anos). 17 contratos ganhos, ~R$ 10,3 mi acumulados em QA, RPA CoE e testes Oracle.",
      produtosContratados:
        "Célula de Continuous Testing; RPA Center of Excellence; Testing Services (funcional, automação e performance); testes Oracle Fusion Cloud ERP/UAT; licença Perfecto.io.",
      posicaoCompetitiva: "",
      riscosPontosAtencaoResumo:
        "Renovação 2026 em negociação (fecha 30/09/2026). Perdas recentes em Azul Cargo: Cargo Express AI, BID Correio, Radar de Ofertas.",
      diferenciaisConcorrencia:
        "Conhecimento acumulado do ambiente Azul (Site, Wallet, Portal B2B, Azul Cargo e Oracle) e histórico de 17 entregas em ~6 anos de parceria.",
      cadenciaReunioes: "",
      participantesChave: "",
      revisaoPlano: "",
      stakeholders: {
        create: [
          {
            nome: "Christian Delamare",
            cargo: "IT General Manager",
            papel: "DECISOR",
            poder: "ALTO",
            order: 0,
          },
          {
            nome: "Daniel Sonego",
            cargo: "Gerente Geral de Tecnologia",
            papel: "DECISOR",
            poder: "ALTO",
            order: 1,
          },
          {
            nome: "Paulo Jorge",
            cargo: "Gerente de Soluções de Negócios",
            papel: "INFLUENCIADOR",
            poder: "MEDIO",
            order: 2,
          },
          {
            nome: "Josimar Santos",
            cargo: "IT Manager",
            papel: "INFLUENCIADOR",
            poder: "MEDIO",
            order: 3,
          },
          {
            nome: "Rodrigo Casseano",
            cargo: "Coord. Arquitetura de TI",
            papel: "INFLUENCIADOR",
            poder: "MEDIO",
            order: 4,
          },
          {
            nome: "Mariza Camargo",
            cargo: "Analista de Compras Estratégicas",
            papel: "COMPRAS",
            poder: "MEDIO",
            order: 5,
          },
        ],
      },
      riscos: {
        create: [
          {
            risco: "Não renovar a plataforma Device Farm",
            impacto: "Alto",
            sinaisAlerta: "Contrato vence em 2026",
            responsavel: "Diego Santos",
            order: 0,
          },
          {
            risco: "Perdas recorrentes em RFPs grandes",
            impacto: "Médio",
            sinaisAlerta: "Histórico de losses em RFP",
            responsavel: "Diego Santos",
            order: 1,
          },
        ],
      },
      swotItems: {
        create: [
          {
            tipo: "FORCA",
            texto:
              "Relacionamento de ~6 anos; 17 contratos entregues (~R$ 10,3 mi); atuação consolidada em QA, RPA CoE e testes Oracle; ampla rede de contatos em TI.",
            order: 0,
          },
          {
            tipo: "OPORTUNIDADE",
            texto:
              "Expansão em Azul Cargo, canais digitais (Site, Wallet, B2B) e IA/automação; projeto Oracle Fusion Cloud ERP.",
            order: 0,
          },
          {
            tipo: "AMEACA",
            texto:
              "Renovação 2026 sob negociação; perdas recentes em Azul Cargo; pressão de procurement e concorrência.",
            order: 0,
          },
        ],
      },
      propostaItems: {
        create: [
          { tipo: "DOR", texto: "Qualidade e velocidade de releases nos canais digitais", order: 0 },
          { tipo: "DOR", texto: "Risco na migração Oracle Fusion Cloud ERP", order: 1 },
          { tipo: "DOR", texto: "Necessidade de automação (RPA) e testes contínuos", order: 2 },
          { tipo: "SOLUCAO", texto: "Célula de Continuous Testing dedicada", order: 0 },
          { tipo: "SOLUCAO", texto: "Testes integrados e UAT do Oracle Cloud", order: 1 },
          { tipo: "SOLUCAO", texto: "RPA Center of Excellence + testes de performance", order: 2 },
        ],
      },
    },
  });

  const vivo = await prisma.client.create({
    data: {
      orgId: org.id,
      name: "Vivo (Telefônica Brasil)",
      tag: "VIVO",
      renovacaoAberta: 7_064_057,
      cadenciaReunioes: "",
      participantesChave: "Diego Santos (Prime Control) · Christian Delamare / Daniel Sonego (Azul)",
      revisaoPlano: "",
      objetivos: {
        create: [
          {
            objetivo: "Renovar a plataforma Device Farm 2026",
            metrica: "Valor do contrato",
            baseline: "R$ 7,06 mi (aberto)",
            prazo: "30/11/2026",
            order: 0,
          },
          {
            objetivo: "Expandir IA/automação de testes",
            metrica: "Nova receita (R$)",
            baseline: "—",
            order: 1,
          },
        ],
      },
      oportunidades: {
        create: [
          {
            nome: "Renovação Device Farm",
            solucao: "Plataforma Device Farm",
            valorPotencial: 7_064_057,
            estagio: "Renovação (aberta)",
            order: 0,
          },
          {
            nome: "Testes da URA Autopilot",
            solucao: "QA",
            valorPotencial: 3_000_000,
            estagio: "Aberto",
            order: 1,
          },
          {
            nome: "NOC de CX",
            solucao: "Monitoramento",
            valorPotencial: 2_500_000,
            estagio: "Qualificação",
            order: 2,
          },
          {
            nome: "IA / Automação de testes (4 frentes)",
            solucao: "QA + IA",
            valorPotencial: 800_000,
            estagio: "Aberto",
            order: 3,
          },
        ],
      },
      acoes: {
        create: [
          {
            iniciativa: "Fechar a Renovação Device Farm 2026",
            objetivoRelacionado: "Renovar contrato",
            responsavel: "Diego Santos",
            prazo: "30/11/2026",
            status: "Em andamento",
            order: 0,
          },
        ],
      },
      kpis: {
        create: [],
      },
    },
  });

  console.log({ azul: azul.id, vivo: vivo.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
