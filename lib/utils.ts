export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function pad(n: number) {
  return String(n).padStart(2, "0");
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Smooth-scrolls to a section (the fixed header is offset by scroll-margin on the target). */
export function scrollToId(id: string, { flash = false }: { flash?: boolean } = {}) {
  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";

  if (id === "top") {
    window.scrollTo({ top: 0, behavior });
    history.replaceState(null, "", window.location.pathname);
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior, block: "start" });
  history.replaceState(null, "", `#${id}`);

  if (flash && !prefersReducedMotion()) {
    el.animate(
      [
        { boxShadow: "0 0 0 1px rgb(52 211 153 / 0.7), 0 0 40px rgb(52 211 153 / 0.15)" },
        { boxShadow: "0 0 0 1px rgb(52 211 153 / 0), 0 0 40px rgb(52 211 153 / 0)" },
      ],
      { duration: 1800, delay: 450, easing: "ease-out" },
    );
  }
}

export function downloadResume(href: string, fileName: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
