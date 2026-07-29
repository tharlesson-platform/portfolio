import {
  ChevronDown,
  LoaderCircle,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

export function Container({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`container ${className}`} {...props} />;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <header className={`section-heading section-heading--${align}`} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      <p className="section-heading__description">{description}</p>
    </header>
  );
}

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "signal" | "amber" }) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}

export function Card({ className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return <article className={`card ${className}`} {...props} />;
}

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  icon?: LucideIcon;
  loading?: boolean;
}>(function Button({ className = "", variant = "primary", icon: Icon, loading, children, disabled, ...props }, ref) {
  return (
    <button
      ref={ref}
      className={`button button--${variant} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      <span>{children}</span>
      {loading ? <LoaderCircle className="button__spinner" aria-hidden="true" /> : Icon ? <Icon aria-hidden="true" /> : null}
    </button>
  );
});

export function ButtonLink({
  children,
  href,
  variant = "primary",
  icon: Icon,
  external = false,
  className = "",
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  icon?: LucideIcon;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      className={`button button--${variant} ${className}`}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span>{children}</span>
      {Icon ? <Icon aria-hidden="true" /> : null}
    </a>
  );
}

export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  const id = useId();
  return (
    <span className="tooltip" aria-describedby={id}>
      {children}
      <span className="tooltip__content" id={id} role="tooltip">{label}</span>
    </span>
  );
}

export function Dropdown({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="dropdown">
      <summary>{label}<ChevronDown aria-hidden="true" /></summary>
      <div className="dropdown__panel">{children}</div>
    </details>
  );
}

export function Accordion({
  items,
}: {
  items: { eyebrow: string; title: string; description: string; technologies: string[] }[];
}) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="accordion" data-stagger>
      {items.map((item, index) => {
        const open = index === openIndex;
        const panelId = `capability-panel-${index}`;
        return (
          <article className={`accordion__item ${open ? "is-open" : ""}`} key={item.title}>
            <button
              className="accordion__trigger"
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? -1 : index)}
            >
              <span className="accordion__eyebrow">{item.eyebrow}</span>
              <span className="accordion__title">{item.title}</span>
              <span className="accordion__icon" aria-hidden="true"><ChevronDown /></span>
            </button>
            <div className="accordion__panel" id={panelId} hidden={!open}>
              <p>{item.description}</p>
              <div className="tag-list">
                {item.technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="contact-modal-title"
      onClose={onClose}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="modal__panel">
        <header className="modal__header">
          <div>
            <p className="eyebrow">INICIAR CONVERSA</p>
            <h2 id="contact-modal-title">{title}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Fechar janela">
            <X aria-hidden="true" />
          </button>
        </header>
        {children}
      </div>
    </dialog>
  );
}

export function InputField({
  label,
  hint,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string; error?: string }) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  return (
    <label className={`field ${error ? "field--error" : ""}`} htmlFor={id}>
      <span className="field__label">{label}</span>
      <input id={id} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : hint ? hintId : undefined} {...props} />
      {error ? <span className="field__error" id={errorId}>{error}</span> : hint ? <span className="field__hint" id={hintId}>{hint}</span> : null}
    </label>
  );
}
