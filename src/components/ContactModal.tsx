import { CheckCircle2, Send } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Button, InputField, Modal } from "./ui";

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ subject?: string; message?: string }>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const messageId = useId();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = {
      subject: subject.trim().length < 4 ? "Conte em poucas palavras sobre o contexto." : undefined,
      message: message.trim().length < 12 ? "Inclua objetivo, desafio ou oportunidade." : undefined,
    };
    setErrors(nextErrors);
    if (nextErrors.subject || nextErrors.message) return;

    setLoading(true);
    window.setTimeout(() => {
      const body = `${message.trim()}\n\nEnviado a partir do portfólio de Tharlesson Souza.`;
      window.location.href = `mailto:tharlesson@msn.com?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(body)}`;
      setLoading(false);
      setSent(true);
    }, 350);
  };

  return (
    <Modal open={open} onClose={onClose} title="Qual plataforma precisamos destravar?">
      <p className="modal__intro">
        Compartilhe o contexto. Seu cliente de e-mail será aberto para revisão — nada é enviado automaticamente.
      </p>
      <form className="contact-form" onSubmit={submit} noValidate>
        <InputField
          label="Assunto"
          value={subject}
          onChange={(event) => { setSubject(event.target.value); setErrors((value) => ({ ...value, subject: undefined })); }}
          placeholder="Ex.: modernização de uma plataforma AWS"
          error={errors.subject}
          autoComplete="off"
        />
        <label className={`field ${errors.message ? "field--error" : ""}`} htmlFor={messageId}>
          <span className="field__label">Contexto</span>
          <textarea
            id={messageId}
            rows={5}
            value={message}
            onChange={(event) => { setMessage(event.target.value); setErrors((value) => ({ ...value, message: undefined })); }}
            placeholder="O que existe hoje, onde está o risco e qual resultado você busca?"
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message ? <span className="field__error">{errors.message}</span> : <span className="field__hint">Sem formulário externo e sem armazenamento de dados.</span>}
        </label>
        <div className="contact-form__footer">
          <div className="form-status" aria-live="polite">
            {sent ? <><CheckCircle2 aria-hidden="true" /> Rascunho preparado.</> : "Resposta direta, sem triagem automática."}
          </div>
          <Button type="submit" icon={Send} loading={loading}>Preparar e-mail</Button>
        </div>
      </form>
    </Modal>
  );
}
