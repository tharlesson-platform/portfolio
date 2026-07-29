import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { GitHubIcon } from "./icons";
import { Button, Dropdown } from "./ui";

const links = [
  { href: "#cases", label: "Cases" },
  { href: "#capacidades", label: "Capacidades" },
  { href: "#metodo", label: "Método" },
];

export function Navbar({ onContact }: { onContact: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar" data-nav-reveal>
      <div className="navbar__inner container">
        <a className="brand" href="#inicio" aria-label="TS — Tharlesson Souza, voltar ao início" onClick={closeMenu}>
          <span className="brand__mark">TS</span>
          <span className="brand__name">Tharlesson Souza</span>
        </a>

        <nav id="mobile-navigation" className={`nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Navegação principal">
          {links.map((link) => <a href={link.href} key={link.href} onClick={closeMenu}>{link.label}</a>)}
          <Dropdown label="Explorar">
            <a href="#conhecimento" onClick={closeMenu}>Conhecimento aberto</a>
            <a href="https://github.com/tharlesson-platform" target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight aria-hidden="true" />
            </a>
          </Dropdown>
          <div className="nav-links__mobile-actions">
            <a href="https://github.com/tharlesson-platform" target="_blank" rel="noreferrer"><GitHubIcon /> GitHub</a>
            <Button onClick={() => { closeMenu(); onContact(); }}>Iniciar conversa</Button>
          </div>
        </nav>

        <div className="navbar__actions">
          <Button variant="secondary" onClick={onContact}>Iniciar conversa</Button>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
