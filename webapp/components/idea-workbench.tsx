"use client";

import { useMemo, useState } from "react";
import { IngredientPalette } from "./idea-palette";

type Blueprint = {
  id: string;
  title: string;
  narrative: string;
  pulse: number;
  resonance: number;
  ingredients: string[];
  catalysts: readonly string[];
};

const foundations = [
  {
    id: "nebula",
    title: "Nebula Playground",
    mantra: "Turn liminal spaces into multi-sensory rituals.",
    cadence: "Orbiting between ritual, spectacle, and quiet reflection.",
    catalysts: ["immersive lighting", "ambient sound choreography"],
  },
  {
    id: "synthesis",
    title: "Synthesis Atelier",
    mantra: "Fuse analog crafts with adaptive intelligence.",
    cadence: "Blending tactile mastery with living data streams.",
    catalysts: ["craft robotics", "AI-guided craftsmanship"],
  },
  {
    id: "evergreen",
    title: "Evergreen Engine",
    mantra: "Design circular systems that feel alive.",
    cadence: "Harvest, remix, regenerate, repeat.",
    catalysts: ["biofabricated textiles", "community micro-grids"],
  },
  {
    id: "lighthouse",
    title: "Lighthouse Broadcast",
    mantra: "Send micro broadcasts that activate collective imagination.",
    cadence: "A rhythm of whispers, sparks, and bold reveals.",
    catalysts: ["programmable typography", "AR signal beacons"],
  },
] as const;

const ingredientPools = {
  mediums: [
    "modular pop-up pavilion",
    "multi-sensory tunnel",
    "responsive stage",
    "floating projection mesh",
    "holographic kiosk",
  ],
  energies: [
    "feral wonder",
    "slow awe",
    "playful rebellion",
    "tender futurism",
    "lucid dreaming",
  ],
  audiences: [
    "nocturnal commuters",
    "micro-communities",
    "urban pollinators",
    "intergenerational makers",
    "remote collaborators",
  ],
  rituals: [
    "dusk-time activation",
    "modular storytelling circles",
    "first-touch ceremony",
    "collective sketch jam",
    "spontaneous remix hour",
  ],
};

const adjectives = [
  "Adaptive",
  "Auroral",
  "Hyperspatial",
  "Modular",
  "Tactile",
  "Interstellar",
  "Regenerative",
  "Euphoric",
];

const nouns = [
  "Catalyst",
  "Garden",
  "Signal",
  "Atrium",
  "Choreography",
  "Atlas",
  "Symphony",
  "Fabric",
];

function randomFrom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

function buildIdea(customIngredients: string[]): Blueprint {
  const allIngredients = [
    randomFrom(ingredientPools.mediums),
    randomFrom(ingredientPools.energies),
    randomFrom(ingredientPools.audiences),
    randomFrom(ingredientPools.rituals),
  ];

  const optionalCustom = customIngredients.length
    ? customIngredients[Math.floor(Math.random() * customIngredients.length)]
    : undefined;

  if (optionalCustom) {
    allIngredients.splice(1, 0, optionalCustom);
  }

  const pickFoundation = randomFrom(foundations);

  return {
    id: createId(),
    title: `${randomFrom(adjectives)} ${randomFrom(nouns)}`,
    narrative: `${pickFoundation.mantra} ${pickFoundation.cadence}`,
    pulse: Math.round(48 + Math.random() * 42),
    resonance: Math.round(50 + Math.random() * 45),
    ingredients: allIngredients,
    catalysts: pickFoundation.catalysts,
  };
}

export function IdeaWorkbench() {
  const initialIdea = useMemo(() => buildIdea([]), []);
  const [currentIdea, setCurrentIdea] = useState<Blueprint>(initialIdea);
  const [mixHistory, setMixHistory] = useState<Blueprint[]>([initialIdea]);
  const [customIngredient, setCustomIngredient] = useState("");
  const [customIngredients, setCustomIngredients] = useState<string[]>([]);

  const activeIngredients = useMemo(
    () => Array.from(new Set([...currentIdea.ingredients, ...customIngredients])),
    [currentIdea.ingredients, customIngredients],
  );

  const handleAddIngredient = () => {
    const trimmed = customIngredient.trim().toLowerCase();
    if (!trimmed) return;

    const formatted = trimmed
      .split(" ")
      .map((piece) => piece.charAt(0).toUpperCase() + piece.slice(1))
      .join(" ");

    setCustomIngredients((prev) =>
      prev.includes(formatted) ? prev : [...prev, formatted],
    );
    setCustomIngredient("");
  };

  return (
    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.1fr_minmax(280px,0.9fr)] lg:gap-12">
      <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_80px_-60px_rgba(10,20,65,0.85)] backdrop-blur">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
              live synthesis
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-50 md:text-4xl">
              {currentIdea.title}
            </h2>
          </div>
          <div className="flex gap-3">
            <StatPill label="Pulse" value={currentIdea.pulse} tone="emerald" />
            <StatPill
              label="Resonance"
              value={currentIdea.resonance}
              tone="sky"
            />
          </div>
        </div>

        <p className="text-base leading-relaxed text-slate-200/80 md:text-lg">
          {currentIdea.narrative}
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <PanelCard title="Active Ingredients">
            <ul className="space-y-3 text-sm text-slate-200/80">
              {currentIdea.ingredients.map((ingredient, index) => (
                <li
                  key={`${ingredient}-${index}`}
                  className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-slate-900/60 p-3.5 transition hover:border-emerald-300/40 hover:bg-slate-900/90"
                >
                  <span className="h-2 w-2 rounded-full bg-gradient-to-br from-emerald-400 to-teal-300" />
                  <span className="font-medium text-slate-50">{ingredient}</span>
                </li>
              ))}
            </ul>
          </PanelCard>

          <PanelCard title="Catalysts">
            <ul className="space-y-3 text-sm text-slate-200/80">
              {currentIdea.catalysts.map((catalyst) => (
                <li
                  key={catalyst}
                  className="flex items-center gap-3 rounded-2xl border border-white/5 bg-slate-900/60 p-3.5"
                >
                  <span className="h-2 w-2 rounded-full bg-gradient-to-br from-sky-400 to-indigo-300" />
                  <span>{catalyst}</span>
                </li>
              ))}
            </ul>
          </PanelCard>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1 rounded-2xl border border-white/5 bg-slate-900/60 p-3.5">
            <label className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Inject your own ingredient
            </label>
            <div className="mt-2 flex items-center gap-3">
              <input
                value={customIngredient}
                onChange={(event) => setCustomIngredient(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleAddIngredient();
                  }
                }}
                placeholder="e.g. bio-luminescent clay"
                className="flex-1 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/10"
              />
              <button
                type="button"
                onClick={handleAddIngredient}
                className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 px-4 py-3 text-sm font-semibold text-emerald-950 transition hover:scale-[1.02]"
              >
                Add
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const nextIdea = buildIdea(customIngredients);
              setCurrentIdea(nextIdea);
              setMixHistory((prev) => {
                const filtered = prev.filter((entry) => entry.id !== nextIdea.id);
                return [nextIdea, ...filtered].slice(0, 5);
              });
            }}
            className="flex h-full min-h-[64px] items-center justify-center rounded-2xl border border-emerald-400/50 bg-emerald-500/10 px-6 text-base font-semibold text-emerald-200 backdrop-blur transition hover:border-emerald-300 hover:bg-emerald-400/20"
          >
            Remix Again
          </button>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.35em] text-slate-500">
            Recent blueprints
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {mixHistory.slice(1).map((idea) => (
              <button
                key={idea.id}
                onClick={() => {
                  setCurrentIdea(idea);
                  setMixHistory((prev) => {
                    const filtered = prev.filter((entry) => entry.id !== idea.id);
                    return [idea, ...filtered].slice(0, 5);
                  });
                }}
                className="rounded-2xl border border-white/5 bg-slate-900/50 p-4 text-left transition hover:border-emerald-400/40 hover:bg-slate-900/90"
              >
                <h4 className="text-sm font-semibold text-slate-100">
                  {idea.title}
                </h4>
                <p className="mt-2 text-xs text-slate-400 line-clamp-3">
                  {idea.narrative}
                </p>
              </button>
            ))}
            {!mixHistory.slice(1).length && (
              <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-500">
                Generate a few mixes to populate your archive.
              </div>
            )}
          </div>
        </div>
      </section>

      <aside className="space-y-6">
        <IngredientPalette selected={activeIngredients} pulse />
        <RadiantTimeline history={mixHistory} />
      </aside>
    </div>
  );
}

type StatPillProps = {
  label: string;
  value: number;
  tone: "emerald" | "sky";
};

function StatPill(props: StatPillProps) {
  const { label, value, tone } = props;
  const gradients =
    tone === "emerald"
      ? "from-emerald-400/30 via-emerald-500/40 to-teal-500/50"
      : "from-sky-400/30 via-blue-500/40 to-indigo-500/50";

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 px-4 py-2 text-center text-xs uppercase tracking-[0.25em] text-slate-400">
      <div
        className={`mt-1 rounded-full bg-gradient-to-r ${gradients} px-4 py-2 text-base font-semibold text-white`}
      >
        {value}
      </div>
      <span className="mt-1 block font-medium tracking-[0.15em] text-slate-500">
        {label}
      </span>
    </div>
  );
}

type PanelCardProps = {
  title: string;
  children: React.ReactNode;
};

function PanelCard(props: PanelCardProps) {
  const { title, children } = props;

  return (
    <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5">
      <h3 className="text-xs uppercase tracking-[0.35em] text-slate-400">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

type RadiantTimelineProps = {
  history: Blueprint[];
};

function RadiantTimeline(props: RadiantTimelineProps) {
  const { history } = props;

  if (!history.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 text-sm text-slate-400">
        Generate ideas to activate your synthesis timeline.
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/80 p-6">
      <h3 className="text-xs uppercase tracking-[0.35em] text-slate-400">
        Resonance Timeline
      </h3>
      <div className="mt-6 space-y-5">
        {history.map((idea, index) => (
          <div key={idea.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-gradient-to-br from-emerald-400 to-teal-300 shadow-[0_0_20px_rgba(16,185,129,0.6)]" />
              {index !== history.length - 1 && (
                <div className="mt-1 w-px flex-1 bg-gradient-to-b from-emerald-400/40 via-slate-600/40 to-transparent" />
              )}
            </div>
            <div className="flex-1 rounded-2xl border border-white/5 bg-slate-900/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/80">
                {new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <h4 className="mt-2 text-sm font-semibold text-slate-100">
                {idea.title}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-3">
                {idea.narrative}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-emerald-200">
                  Pulse {idea.pulse}
                </span>
                <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-sky-200">
                  Resonance {idea.resonance}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
