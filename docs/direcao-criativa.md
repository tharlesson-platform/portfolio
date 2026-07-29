# Direção criativa — Control Plane

## 1. Conceito visual

**Ideia central:** transformar o portfólio em uma interface de observação de uma plataforma viva. O visitante não entra em um currículo; entra em um *control plane* no qual arquitetura, fluxo de entrega, confiabilidade e impacto aparecem como partes conectadas do mesmo sistema.

O visual combina espaço negativo, superfícies de baixa luminosidade, linhas de topologia e sinais cromáticos pontuais. A sofisticação vem da precisão: poucos elementos, hierarquia firme, animações curtas e informação real. A linguagem lembra observabilidade e arquitetura cloud sem copiar dashboards nem recorrer ao clichê “terminal hacker”.

O conceito conversa com a marca porque traduz os atributos centrais em forma:

- confiabilidade: estrutura estável, contraste alto e movimento controlado;
- escala: topologia em camadas, grid amplo e composição modular;
- automação: fluxos conectados e transições que mostram causa e efeito;
- governança: etiquetas, estados, linhas e artefatos verificáveis;
- elegância técnica: materiais escuros, tipografia precisa e cor usada como sinal.

## 2. Estrutura da experiência

1. **Navegação / status global** — orienta, apresenta a marca e mantém o CTA principal acessível sem competir com o conteúdo.
2. **Hero / manifesto** — comunica em poucos segundos o posicionamento: “Eu construo plataformas cloud que escalam com segurança, automação e confiabilidade.” A cena 3D representa o sistema, não um ornamento.
3. **Prova imediata** — quatro sinais objetivos de atuação: arquitetura, entrega, operação e governança. Serve ao recrutador que escaneia a página em menos de dois minutos.
4. **Cases em destaque** — apresenta projetos como decisões de engenharia: contexto, problema, arquitetura, decisões e efeito operacional. É o centro da narrativa.
5. **Sistema de capacidades** — organiza conhecimentos por resultados que produzem, evitando uma “nuvem de logos”.
6. **Método de plataforma** — mostra a sequência descobrir, desenhar, automatizar e operar. Comunica maturidade e liderança técnica.
7. **Conhecimento aberto** — conecta laboratórios, documentação, trilhas de estudo e projetos open source.
8. **CTA de contato** — converte interesse em conversa sobre arquitetura, modernização, consultoria, mentoring ou oportunidade profissional.
9. **Footer** — fecha com navegação útil, canais diretos, disponibilidade e assinatura de marca.

Não haverá depoimentos sem fonte verificável, métricas inventadas, logos decorativos nem seção “sobre mim” biográfica. A credibilidade virá dos artefatos e das decisões expostas.

## 3. Hierarquia visual

1. **Primeiro:** a promessa principal, em duas linhas de grande escala, com o verbo “construo” e o resultado “plataformas confiáveis”.
2. **Segundo:** a cena 3D e seus sinais de plataforma — núcleo, camadas e conexões — validando visualmente a promessa.
3. **Terceiro:** o CTA “Explorar cases” e a prova resumida de atuação.
4. **Depois:** cada case começa pelo problema e pela decisão, seguindo para tecnologia e impacto.
5. **Por fim:** método, conteúdo aberto e contato.

O percurso alterna grandes áreas de respiro com blocos densos de evidência. A linha de leitura é majoritariamente vertical; deslocamentos laterais só aparecem nos cases para sugerir progressão entre camadas da plataforma.

## 4. Sistema tipográfico

- **Fonte principal:** Manrope Variable. Geométrica, sóbria e legível; entrega presença editorial sem parecer uma landing page genérica de SaaS.
- **Fonte técnica:** IBM Plex Mono. Restrita a metadados, estados, categorias, números e pequenos rótulos de arquitetura.
- **Fallback:** `Inter`, `system-ui`, `sans-serif` para a principal; `ui-monospace`, `SFMono-Regular`, `monospace` para a técnica.

Escala responsiva baseada em `clamp()`:

- H1: 64–112 px, peso 600, entrelinha 0,92–0,98, tracking negativo;
- H2: 42–72 px, peso 600, entrelinha 1,0;
- H3: 28–40 px, peso 600, entrelinha 1,1;
- H4: 22–28 px, peso 600;
- H5: 18–22 px, peso 600;
- H6: 14–16 px, peso 700, caixa alta apenas quando atuar como rótulo;
- corpo grande: 18–22 px, entrelinha 1,55;
- corpo: 16–18 px, entrelinha 1,65;
- legenda técnica: 11–13 px, IBM Plex Mono, tracking de 0,08–0,14 em.

O espaçamento vertical entre título e texto segue uma razão de 0,35–0,5 da altura visual do título. Nenhuma linha de leitura de corpo ultrapassa aproximadamente 68 caracteres.

## 5. Paleta

| Token | HEX | RGB | Uso |
|---|---:|---:|---|
| Ink | `#05070B` | `5, 7, 11` | fundo principal |
| Obsidian | `#0A0E15` | `10, 14, 21` | superfícies elevadas |
| Steel | `#111824` | `17, 24, 36` | cards e estados interativos |
| Frost | `#F4F7FB` | `244, 247, 251` | texto principal |
| Mist | `#A7B1C0` | `167, 177, 192` | texto secundário |
| Signal cyan | `#58D6FF` | `88, 214, 255` | fluxo saudável, foco e links |
| Electric iris | `#7C82FF` | `124, 130, 255` | profundidade e plataforma |
| Amber | `#FFB45C` | `255, 180, 92` | atenção e decisão crítica |
| Success | `#5DE2A5` | `93, 226, 165` | estados positivos verificáveis |
| Error | `#FF6B79` | `255, 107, 121` | erro e validação negativa |

Gradientes:

- atmosfera do hero: `radial-gradient(circle at 72% 28%, rgba(88,214,255,.12), transparent 32%), radial-gradient(circle at 82% 60%, rgba(124,130,255,.10), transparent 38%)`;
- sinal de marca: `linear-gradient(120deg, #F4F7FB 10%, #58D6FF 58%, #7C82FF 100%)`;
- superfície: `linear-gradient(145deg, rgba(255,255,255,.07), rgba(255,255,255,.018))`;
- linha de energia: `linear-gradient(90deg, transparent, #58D6FF, #7C82FF, transparent)`.

A cor não identifica tecnologia. Ela identifica função: cyan para fluxo e foco; iris para escala e profundidade; amber para decisão; verde e vermelho somente para estados semânticos.

## 6. Uso do 3D

### Onde usar

Somente no hero, como uma topologia abstrata de plataforma: núcleo central, três anéis de governança e nós orbitais conectados. Cada camada representa **provisionar**, **entregar**, **observar** e **recuperar**. O movimento lento comunica estabilidade; a resposta sutil ao ponteiro comunica que a plataforma é operável; pulsos nas conexões comunicam automação e telemetria.

### Onde não usar

- atrás de textos longos ou CTAs;
- em todos os cards ou transições de seção;
- como fundo persistente durante toda a rolagem;
- em mobile quando a capacidade gráfica ou preferência de movimento indicar redução;
- para reproduzir logos, nuvens, servidores ou objetos literais.

### Regras técnicas

- geometria procedural, sem GLTF e sem texturas externas;
- um único canvas e uma única cena;
- DPR adaptativo limitado a 1,5;
- sombras suaves apenas em desktop e mapa reduzido;
- renderização pausada fora da viewport ou com a aba oculta;
- versão estática para `prefers-reduced-motion` e dispositivos de baixa capacidade;
- carregamento após o conteúdo crítico, em chunk independente;
- meta de 60 FPS, com degradação automática para 30 FPS antes de reduzir qualidade visual.

## 7. Validação da Etapa 1

- A promessa principal aparece antes da lista de tecnologias: **consistente**.
- O 3D explica arquitetura, governança e telemetria: **consistente**.
- Os cases têm prioridade sobre uma biografia extensa: **consistente**.
- A cor possui função semântica e não decorativa: **consistente**.
- A experiência atende leitura rápida e exploração profunda: **consistente**.
- A direção evita template, dashboard genérico e estética hacker: **consistente**.
- A solução admite redução de movimento e degradação gráfica: **consistente**.

**Gate da Etapa 1: aprovado para implementação.**
