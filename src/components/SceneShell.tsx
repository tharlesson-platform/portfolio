import { Component, lazy, Suspense, useEffect, useState, type ErrorInfo, type ReactNode } from "react";
import { ArchitectureFallback } from "../three/ArchitectureFallback";

const CloudArchitectureScene = lazy(() => import("../three/CloudArchitectureScene"));

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // A versão estática preserva a mensagem visual quando WebGL não está disponível.
  }

  render() {
    return this.state.failed ? <ArchitectureFallback /> : this.props.children;
  }
}

export function SceneShell() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const connection = (navigator as NavigatorWithConnection).connection;
    const compactViewport = window.matchMedia("(max-width: 42rem)").matches;
    if (connection?.saveData || compactViewport) return;

    const load = () => setReady(true);
    const requestIdle = window.requestIdleCallback;
    if (typeof requestIdle === "function") {
      const id = requestIdle(load, { timeout: 900 });
      return () => window.cancelIdleCallback(id);
    }
    const id = globalThis.setTimeout(load, 120);
    return () => globalThis.clearTimeout(id);
  }, []);

  return (
    <div
      className="scene-shell"
      role="img"
      aria-label="Topologia abstrata de uma plataforma cloud: núcleo de controle, camadas de governança e nós conectados por telemetria."
      data-visual-reveal
      data-parallax
    >
      <div className="scene-shell__glow" aria-hidden="true" />
      <SceneBoundary>
        <Suspense fallback={<ArchitectureFallback />}>
          {ready ? <CloudArchitectureScene /> : <ArchitectureFallback />}
        </Suspense>
      </SceneBoundary>
      <div className="scene-label scene-label--top" aria-hidden="true"><span />OBSERVAR</div>
      <div className="scene-label scene-label--right" aria-hidden="true"><span />ENTREGAR</div>
      <div className="scene-label scene-label--bottom" aria-hidden="true"><span />RECUPERAR</div>
      <div className="scene-label scene-label--left" aria-hidden="true"><span />PROVISIONAR</div>
      <div className="scene-status" aria-hidden="true">
        <span className="status-dot" />
        CONTROL PLANE · HEALTHY
      </div>
    </div>
  );
}
