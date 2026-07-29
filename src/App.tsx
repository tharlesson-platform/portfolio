import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Check,
  CloudCog,
  Code2,
  GitPullRequestArrow,
  Network,
  Radar,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { capabilityGroups, caseStudies, knowledgeCards } from "./content";
import { ContactModal } from "./components/ContactModal";
import { Footer } from "./components/Footer";
import { GitHubIcon } from "./components/icons";
import { Navbar } from "./components/Navbar";
import { SceneShell } from "./components/SceneShell";
import {
  Accordion,
  Badge,
  Button,
  ButtonLink,
  Card,
  Container,
  SectionHeading,
  Tooltip,
} from "./components/ui";
import { useGsapAnimations } from "./hooks/useGsapAnimations";

const proofItems = [
  { icon: CloudCog, label: "Cloud", value: "Arquitetura que nasce operável" },
  { icon: Workflow, label: "Delivery", value: "GitOps com risco controlado" },
  { icon: Radar, label: "Reliability", value: "Evidência antes da decisão" },
  { icon: ShieldCheck, label: "Governance", value: "Automação com guardrails" },
];

const methodSteps = [
  {
    index: "01",
    title: "Descobrir",
    description: "Mapear dependências, risco, fluxo de mudança e sinais que realmente explicam o sistema.",
    icon: Network,
  },
  {
    index: "02",
    title: "Desenhar",
    description: "Transformar requisitos técnicos e de negócio em uma arquitetura que o time consegue operar.",
    icon: Blocks,
  },
  {
    index: "03",
    title: "Automatizar",
    description: "Versionar infraestrutura, entrega e controles com caminhos de rollback explícitos.",
    icon: GitPullRequestArrow,
  },
  {
    index: "04",
    title: "Evoluir",
    description: "Medir confiabilidade, custo e experiência do desenvolvedor para orientar o próximo ciclo.",
    icon: Activity,
  },
];

function App() {
  const mainRef = useRef<HTMLElement>(null);
  const [activeCaseId, setActiveCaseId] = useState(caseStudies[0].id);
  const [contactOpen, setContactOpen] = useState(false);
  const activeCase = useMemo(
    () => caseStudies.find((item) => item.id === activeCaseId) ?? caseStudies[0],
    [activeCaseId],
  );
  useGsapAnimations(mainRef);

  const navigateCaseTabs = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % caseStudies.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + caseStudies.length) % caseStudies.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = caseStudies.length - 1;
    else return;

    event.preventDefault();
    const nextCase = caseStudies[nextIndex];
    setActiveCaseId(nextCase.id);
    window.requestAnimationFrame(() => document.getElementById(`tab-${nextCase.id}`)?.focus());
  };

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="site-shell">
        <Navbar onContact={() => setContactOpen(true)} />
        <main id="conteudo" ref={mainRef}>
          <section className="hero" id="inicio" aria-labelledby="hero-title">
            <div className="hero__grid-lines" aria-hidden="true" />
            <Container className="hero__inner">
              <div className="hero__content">
                <div className="availability" data-hero-reveal>
                  <span className="status-dot" />
                  DISPONÍVEL PARA DESAFIOS DE PLATAFORMA
                </div>
                <h1 id="hero-title" data-hero-reveal>
                  Eu construo plataformas cloud que <span>escalam com confiança.</span>
                </h1>
                <p className="hero__lead" data-hero-reveal>
                  Arquitetura, automação e confiabilidade conectadas para transformar ambientes complexos em plataformas seguras, governadas e prontas para evoluir.
                </p>
                <div className="hero__actions" data-hero-reveal>
                  <ButtonLink href="#cases" icon={ArrowDown}>Explorar cases</ButtonLink>
                  <Button variant="secondary" icon={ArrowRight} onClick={() => setContactOpen(true)}>Iniciar conversa</Button>
                </div>
                <div className="hero__meta" data-hero-reveal>
                  <span>Site Reliability Engineer</span>
                  <span>Platform Engineer</span>
                  <span>Cloud Architect</span>
                </div>
              </div>
              <div className="hero__visual">
                <SceneShell />
              </div>
            </Container>
            <div className="hero__scroll" aria-hidden="true"><span>SCROLL TO EXPLORE</span><i /></div>
          </section>

          <section className="proof" aria-label="Áreas de atuação">
            <Container>
              <div className="proof__grid" data-stagger>
                {proofItems.map(({ icon: Icon, label, value }) => (
                  <div className="proof__item" key={label}>
                    <Icon aria-hidden="true" />
                    <div><span>{label}</span><strong>{value}</strong></div>
                  </div>
                ))}
              </div>
            </Container>
          </section>

          <section className="section cases" id="cases" aria-labelledby="cases-title">
            <Container>
              <SectionHeading
                id="cases-title"
                eyebrow="01 · SISTEMAS, NÃO SCREENSHOTS"
                title="Engenharia explicada por decisões."
                description="Cada case conecta um problema operacional a uma arquitetura, um conjunto de escolhas e um efeito concreto na forma de entregar ou operar."
              />

              <div className="case-tabs" role="tablist" aria-label="Cases em destaque" data-reveal>
                {caseStudies.map((item, index) => (
                  <button
                    key={item.id}
                    id={`tab-${item.id}`}
                    role="tab"
                    aria-selected={activeCaseId === item.id}
                    aria-controls={`panel-${item.id}`}
                    tabIndex={activeCaseId === item.id ? 0 : -1}
                    onClick={() => setActiveCaseId(item.id)}
                    onKeyDown={(event) => navigateCaseTabs(event, index)}
                  >
                    <span>{item.index}</span>
                    {item.category}
                  </button>
                ))}
              </div>

              <article
                className="case-panel"
                id={`panel-${activeCase.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeCase.id}`}
                key={activeCase.id}
              >
                <div className="case-panel__intro">
                  <div>
                    <Badge tone="signal">{activeCase.category}</Badge>
                    <h3>{activeCase.title}</h3>
                  </div>
                  <p>{activeCase.summary}</p>
                </div>

                <div className="architecture-flow" aria-label={`Fluxo do case: ${activeCase.signal}`}>
                  {activeCase.signal.split(" → ").map((stage, index, stages) => (
                    <div className="architecture-flow__stage" key={stage}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{stage}</strong>
                      {index < stages.length - 1 ? <ArrowRight aria-hidden="true" /> : <Check aria-hidden="true" />}
                    </div>
                  ))}
                </div>

                <div className="case-panel__body">
                  <div className="case-narrative">
                    <div><span className="case-label">PROBLEMA</span><p>{activeCase.problem}</p></div>
                    <div><span className="case-label">ARQUITETURA</span><p>{activeCase.architecture}</p></div>
                    <div className="case-impact"><span className="case-label">EFEITO OPERACIONAL</span><p>{activeCase.impact}</p></div>
                  </div>
                  <aside className="case-decisions">
                    <span className="case-label">DECISÕES-CHAVE</span>
                    <ul>{activeCase.decisions.map((decision) => <li key={decision}><Check aria-hidden="true" />{decision}</li>)}</ul>
                    <div className="tag-list">{activeCase.stack.map((item) => <span className="tag" key={item}>{item}</span>)}</div>
                    <div className="case-repositories">
                      {activeCase.repositories.map((repository) => (
                        <Tooltip key={repository.href} label={`Abrir ${repository.label} no GitHub`}>
                          <a href={repository.href} target="_blank" rel="noreferrer">
                            <GitHubIcon />{repository.label}<ArrowUpRight aria-hidden="true" />
                          </a>
                        </Tooltip>
                      ))}
                    </div>
                  </aside>
                </div>
              </article>
            </Container>
          </section>

          <section className="section capabilities" id="capacidades" aria-labelledby="capabilities-title">
            <Container className="capabilities__grid">
              <div>
                <SectionHeading
                  id="capabilities-title"
                  eyebrow="02 · CAPACIDADES"
                  title="A plataforma é o produto."
                  description="Tecnologias só importam quando reduzem risco, removem atrito ou tornam uma decisão melhor."
                />
                <div className="capabilities__statement" data-reveal>
                  <Code2 aria-hidden="true" />
                  <p>Da primeira linha de Terraform ao último span de uma transação: o sistema precisa permanecer compreensível.</p>
                </div>
              </div>
              <Accordion items={capabilityGroups} />
            </Container>
          </section>

          <section className="section method" id="metodo" aria-labelledby="method-title">
            <Container>
              <SectionHeading
                id="method-title"
                eyebrow="03 · MÉTODO"
                title="Complexidade não desaparece. Ela ganha estrutura."
                description="O trabalho avança em ciclos pequenos, verificáveis e reversíveis — da descoberta ao aprendizado operacional."
                align="center"
              />
              <div className="method__rail" aria-hidden="true"><span /></div>
              <div className="method__grid" data-stagger>
                {methodSteps.map(({ index, title, description, icon: Icon }) => (
                  <Card className="method-card" key={index}>
                    <div className="method-card__top"><span>{index}</span><Icon aria-hidden="true" /></div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </Card>
                ))}
              </div>
            </Container>
          </section>

          <section className="section knowledge" id="conhecimento" aria-labelledby="knowledge-title">
            <Container>
              <div className="knowledge__heading">
                <SectionHeading
                  id="knowledge-title"
                  eyebrow="04 · CONHECIMENTO ABERTO"
                  title="Aprender em público também é engenharia."
                  description="Laboratórios, trilhas e ferramentas que transformam experiência operacional em conhecimento reutilizável."
                />
                <ButtonLink href="https://github.com/tharlesson-platform" external variant="secondary" icon={ArrowUpRight}>Ver todos no GitHub</ButtonLink>
              </div>
              <div className="knowledge__grid" data-stagger>
                {knowledgeCards.map((item, index) => (
                  <a className="knowledge-card" href={item.href} target="_blank" rel="noreferrer" key={item.title}>
                    <div className="knowledge-card__top"><Badge tone={index === 0 ? "amber" : "default"}>{item.type}</Badge><ArrowUpRight aria-hidden="true" /></div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <span className="knowledge-card__meta">{item.meta}</span>
                  </a>
                ))}
              </div>
            </Container>
          </section>

          <section className="contact" id="contato" aria-labelledby="contact-title">
            <Container>
              <div className="contact__panel" data-reveal>
                <div className="contact__signal" aria-hidden="true"><Sparkles /><span /></div>
                <p className="eyebrow">PRÓXIMO DESAFIO</p>
                <h2 id="contact-title">Sua plataforma precisa escalar.<br /><span>Sem perder o controle.</span></h2>
                <p>Vamos conversar sobre arquitetura cloud, modernização, confiabilidade, FinOps ou platform engineering.</p>
                <div className="contact__actions">
                  <Button icon={ArrowRight} onClick={() => setContactOpen(true)}>Iniciar uma conversa</Button>
                  <ButtonLink href="mailto:tharlesson@msn.com" variant="ghost">tharlesson@msn.com</ButtonLink>
                </div>
              </div>
            </Container>
          </section>
        </main>
        <Footer />
      </div>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

export default App;
