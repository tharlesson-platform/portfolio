export type CaseStudy = {
  id: string;
  index: string;
  category: string;
  title: string;
  summary: string;
  problem: string;
  architecture: string;
  decisions: string[];
  impact: string;
  stack: string[];
  repositories: { label: string; href: string }[];
  signal: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "gitops",
    index: "01",
    category: "Platform Engineering",
    title: "GitOps para EKS com promoção progressiva e capacidade elástica.",
    summary:
      "Uma plataforma de entrega em que Git define o estado desejado, Argo CD reconcilia ambientes e Argo Rollouts controla risco durante a promoção.",
    problem:
      "Ambientes Kubernetes crescem rápido; sem uma fonte de verdade e gates claros, deploy, rollback e capacidade viram decisões manuais e difíceis de auditar.",
    architecture:
      "Terraform provisiona a base, ApplicationSet organiza aplicações, Kustomize separa ambientes, Argo Rollouts governa a promoção e Karpenter ajusta capacidade.",
    decisions: [
      "Git como fonte de verdade para estado e promoção",
      "Separação explícita entre bootstrap, addons e workloads",
      "Readiness e rollback integrados ao caminho de entrega",
    ],
    impact:
      "O resultado é um caminho de entrega reproduzível, com mudança revisável, rollback compreensível e escala desacoplada do deploy da aplicação.",
    stack: ["AWS EKS", "Argo CD", "Argo Rollouts", "Terraform", "Kustomize", "Karpenter"],
    repositories: [
      { label: "argocd", href: "https://github.com/tharlesson-platform/argocd" },
      { label: "gitops", href: "https://github.com/tharlesson-platform/gitops" },
      { label: "karpenter", href: "https://github.com/tharlesson-platform/karpenter" },
    ],
    signal: "deploy → análise → promoção → rollback",
  },
  {
    id: "reliability",
    index: "02",
    category: "Site Reliability Engineering",
    title: "Ferramentas operacionais que transformam sinais dispersos em decisão.",
    summary:
      "CLIs orientadas a evidências para diagnóstico AWS, construção de timeline e avaliação de readiness antes de upgrades Kubernetes.",
    problem:
      "Durante incidentes e mudanças críticas, dados ficam distribuídos entre consoles, logs e pessoas. O custo real aparece na correlação manual e na falta de rastreabilidade.",
    architecture:
      "Coletores especializados geram bundles portáteis; a camada de análise separa fato, hipótese e recomendação; a saída permanece legível por humanos e automação.",
    decisions: [
      "Evidência coletada antes da recomendação",
      "Saídas determinísticas para auditoria e postmortem",
      "Read-only por padrão nas rotinas de diagnóstico",
    ],
    impact:
      "A operação ganha um fluxo consistente para investigar, registrar contexto e preparar decisões sem depender de memória individual ou navegação improvisada.",
    stack: ["Python", "AWS", "Kubernetes", "CLI", "JSON", "Runbooks"],
    repositories: [
      { label: "aws-sre-doctor", href: "https://github.com/tharlesson-platform/aws-sre-doctor" },
      {
        label: "incident-timeline-builder",
        href: "https://github.com/tharlesson-platform/incident-timeline-builder",
      },
      {
        label: "upgrade-readiness",
        href: "https://github.com/tharlesson-platform/kubernetes-upgrade-readiness-analyzer",
      },
    ],
    signal: "coletar → correlacionar → decidir → registrar",
  },
  {
    id: "iac",
    index: "03",
    category: "Cloud Architecture",
    title: "Infraestrutura legada convertida em mudança governada.",
    summary:
      "Uma cadeia de IaC que parte da descoberta e importação, consolida padrões em módulos e entrega revisão antes de qualquer aplicação.",
    problem:
      "Recursos existentes sem estado confiável aumentam drift e tornam cada mudança uma exceção. Importar sem modularizar apenas transfere a complexidade.",
    architecture:
      "O fluxo descobre recursos, gera configuração de import, normaliza módulos por domínio e usa Atlantis para expor plan e apply no processo de revisão.",
    decisions: [
      "Importação separada por módulo e responsabilidade",
      "State remoto e locking como requisitos de base",
      "Plan visível no pull request antes do apply",
    ],
    impact:
      "A infraestrutura passa a ter histórico, revisão e padrão de evolução, reduzindo mudanças opacas e criando uma base reutilizável entre contas e ambientes.",
    stack: ["Terraform", "AWS", "Atlantis", "GitHub", "S3", "DynamoDB"],
    repositories: [
      { label: "terraform-import", href: "https://github.com/tharlesson-platform/terraform-import" },
      { label: "terraform-modules", href: "https://github.com/tharlesson-platform/terraform-modules" },
      { label: "atlantis", href: "https://github.com/tharlesson-platform/atlantis" },
    ],
    signal: "descobrir → importar → modularizar → governar",
  },
  {
    id: "observability",
    index: "04",
    category: "Observability & FinOps",
    title: "Telemetria e automação como produto da plataforma.",
    summary:
      "Observabilidade como código e automações SRE para aproximar operação, confiabilidade, governança e custo.",
    problem:
      "Dashboards isolados não criam confiabilidade. Sem padrões e ownership, alertas geram ruído e tarefas repetitivas continuam consumindo a capacidade do time.",
    architecture:
      "OpenTelemetry padroniza sinais, dashboards e alertas são versionados, e rotinas serverless executam tarefas operacionais com guardrails e trilha de auditoria.",
    decisions: [
      "Telemetria tratada como artefato versionável",
      "Automação com limites, logs e operação segura",
      "Custo analisado junto de confiabilidade e ownership",
    ],
    impact:
      "A plataforma oferece sinais consistentes e remove toil de rotinas conhecidas, permitindo que o time concentre energia em decisões de maior valor.",
    stack: ["OpenTelemetry", "Prometheus", "Grafana", "CloudWatch", "Lambda", "EventBridge"],
    repositories: [
      { label: "observabilidade", href: "https://github.com/tharlesson-platform/observabilidade" },
      { label: "sre-automations", href: "https://github.com/tharlesson-platform/sre-automations" },
    ],
    signal: "instrumentar → observar → automatizar → otimizar",
  },
];

export const capabilityGroups = [
  {
    title: "Arquitetura cloud",
    eyebrow: "DESENHAR",
    description:
      "Topologias AWS multiambiente, redes, identidade, dados e workloads planejados para operar — não apenas para provisionar.",
    technologies: ["AWS", "VPC", "EKS", "ECS", "RDS", "ElastiCache", "CloudFront"],
  },
  {
    title: "Plataformas internas",
    eyebrow: "HABILITAR",
    description:
      "Golden paths, self-service, contratos de plataforma e padrões que reduzem carga cognitiva sem esconder o que importa.",
    technologies: ["Kubernetes", "Argo CD", "Helm", "Kustomize", "GitHub Actions", "Jenkins"],
  },
  {
    title: "Confiabilidade",
    eyebrow: "OPERAR",
    description:
      "SLOs, resposta a incidentes, diagnóstico, capacity planning e runbooks para transformar falhas em aprendizado operacional.",
    technologies: ["SRE", "SLO / SLI", "OpenTelemetry", "Prometheus", "Grafana", "CloudWatch"],
  },
  {
    title: "Governança e eficiência",
    eyebrow: "CONTROLAR",
    description:
      "Infraestrutura como código, gestão de risco, FinOps e automação segura para escalar com rastreabilidade e controle.",
    technologies: ["Terraform", "GitOps", "Policy as Code", "FinOps", "IAM", "Tagging"],
  },
];

export const knowledgeCards = [
  {
    type: "Trilha aberta",
    title: "Plano de estudos SRE",
    description: "Um caminho estruturado de fundamentos, prática, automação, observabilidade e operação.",
    href: "https://github.com/tharlesson-platform/plano_estudos_sre",
    meta: "35 estrelas no GitHub",
  },
  {
    type: "Laboratório",
    title: "Terraform import",
    description: "Uma abordagem prática para trazer infraestrutura AWS existente para um fluxo de IaC governado.",
    href: "https://github.com/tharlesson-platform/terraform-import",
    meta: "Shell · AWS · Terraform",
  },
  {
    type: "Open source",
    title: "AWS SRE Doctor",
    description: "Troubleshooting operacional orientado a evidências para reduzir o tempo até uma hipótese útil.",
    href: "https://github.com/tharlesson-platform/aws-sre-doctor",
    meta: "Python · CLI · Incident response",
  },
];
