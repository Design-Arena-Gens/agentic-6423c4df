import { IdeaWorkbench } from "../components/idea-workbench";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <GradientBackdrop />
      <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 py-16 sm:px-10 lg:px-16">
        <Hero />
        <IdeaWorkbench />
        <Footer />
      </main>
    </div>
  );
}

function GradientBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[80px]" />
      <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="absolute -bottom-20 right-0 h-[380px] w-[380px] rounded-full bg-purple-500/10 blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(76,201,240,0.08),_transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,10,25,0.9),rgba(8,10,25,0.95))]" />
    </div>
  );
}

function Hero() {
  return (
    <header className="relative mt-6 max-w-3xl space-y-6">
      <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/80">
        Make anything with anything
      </p>
      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
        Agentic Atelier for Inventing Impossible Things
      </h1>
      <p className="text-base text-slate-300 sm:text-lg">
        Drop into an ambient workbench where ingredients, rituals, and catalysts
        collide. Spin up hybrid ideas, inject your own materials, and surface
        living blueprints ready to prototype.
      </p>
      <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-slate-400">
        <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-emerald-200">
          synesthetic design
        </span>
        <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-2 text-sky-200">
          speculative systems
        </span>
        <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-2 text-fuchsia-200">
          playful prototyping
        </span>
      </div>
    </header>
  );
}

function Footer() {
  const badges = [
    { label: "Realtime Remix Engine", tone: "emerald" },
    { label: "Always-On Inspiration Cloud", tone: "sky" },
    { label: "Recombinable Blueprints", tone: "violet" },
  ] as const;

  return (
    <footer className="relative mb-12 mt-8 rounded-3xl border border-white/10 bg-slate-950/80 px-6 py-8 text-sm text-slate-400 backdrop-blur">
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-center">
        <div>
          <h2 className="text-base font-semibold uppercase tracking-[0.3em] text-slate-300">
            perpetual tinkering pledge
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
            Every mix is a launchpad. Save your favourite combinations, export
            them to reality, and keep iterating. The atelier never powers down.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {badges.map((badge) => {
            const toneClass =
              badge.tone === "emerald"
                ? "border-emerald-400/40 text-emerald-200"
                : badge.tone === "sky"
                  ? "border-sky-400/40 text-sky-200"
                  : "border-fuchsia-400/40 text-fuchsia-200";

            return (
              <span
                key={badge.label}
                className={`rounded-full border bg-slate-900/60 px-4 py-2 text-xs uppercase tracking-[0.25em] ${toneClass}`}
              >
                {badge.label}
              </span>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
