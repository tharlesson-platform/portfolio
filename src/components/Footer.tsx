import { ArrowUp, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { Container, Tooltip } from "./ui";

export function Footer() {
  return (
    <footer className="footer">
      <Container className="footer__inner">
        <div className="footer__brand">
          <span className="brand__mark">TS</span>
          <div>
            <strong>Tharlesson Souza</strong>
            <p>Site Reliability · Platform Engineering · Cloud Architecture</p>
          </div>
        </div>
        <div className="footer__links" aria-label="Redes e contato">
          <Tooltip label="GitHub — abre em nova aba">
            <a href="https://github.com/tharlesson-platform" target="_blank" rel="noreferrer" aria-label="GitHub de Tharlesson"><GitHubIcon /></a>
          </Tooltip>
          <Tooltip label="LinkedIn — abre em nova aba">
            <a href="https://www.linkedin.com/in/tharlesson/" target="_blank" rel="noreferrer" aria-label="LinkedIn de Tharlesson"><LinkedInIcon /></a>
          </Tooltip>
          <Tooltip label="Enviar e-mail">
            <a href="mailto:tharlesson@msn.com" aria-label="Enviar e-mail para Tharlesson"><Mail /></a>
          </Tooltip>
          <a className="footer__top" href="#inicio" aria-label="Voltar ao início"><ArrowUp /></a>
        </div>
      </Container>
      <Container className="footer__legal">
        <span>© {new Date().getFullYear()} Tharlesson Souza</span>
        <span>Construído como uma plataforma: observável, acessível e intencional.</span>
      </Container>
    </footer>
  );
}
