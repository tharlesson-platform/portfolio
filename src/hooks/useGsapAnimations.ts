import { useEffect, type RefObject } from "react";

export function useGsapAnimations(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!rootRef.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compactViewport = window.matchMedia("(max-width: 42rem)").matches;
    if (reducedMotion || compactViewport) {
      rootRef.current.querySelectorAll<HTMLElement>("[data-reveal], [data-hero-reveal]").forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
      });
      return;
    }

    let cleanup: () => void = () => undefined;
    let cancelled = false;
    let started = false;

    const startAnimations = () => {
      if (started) return;
      started = true;
      window.clearTimeout(startTimer);
      window.removeEventListener("scroll", startAnimations);

      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
        if (cancelled || !rootRef.current) return;
        const gsap = gsapModule.default;
        const ScrollTrigger = triggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
            gsap.from(element, {
              opacity: 0,
              y: 38,
              duration: 0.78,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 86%", once: true },
            });
          });

          gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((container) => {
            gsap.from(container.children, {
              opacity: 0,
              y: 30,
              duration: 0.68,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: container, start: "top 84%", once: true },
            });
          });

          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
            gsap.fromTo(
              element,
              { yPercent: -4 },
              {
                yPercent: 5,
                ease: "none",
                scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 0.7 },
              },
            );
          });
        });

        cleanup = () => context.revert();
      });
    };

    const startTimer = window.setTimeout(startAnimations, 1800);
    window.addEventListener("scroll", startAnimations, { once: true, passive: true });

    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
      window.removeEventListener("scroll", startAnimations);
      cleanup();
    };
  }, [rootRef]);
}
