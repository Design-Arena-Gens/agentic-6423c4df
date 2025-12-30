"use client";

import { useMemo } from "react";

type IngredientPaletteProps = {
  selected: string[];
  pulse?: boolean;
};

const basePalette = [
  "augmented reality",
  "bio-mimicry",
  "modular design",
  "zero waste loops",
  "haptic feedback",
  "solar fabrics",
  "community co-creation",
  "AI copilots",
  "generative soundscapes",
  "ambient storytelling",
  "robotic companions",
  "parametric structures",
  "microlearning bursts",
  "edible interfaces",
  "kinetic lighting",
  "adaptive typography",
];

export function IngredientPalette(props: IngredientPaletteProps) {
  const { selected, pulse = false } = props;

  const remainingPalette = useMemo(
    () => basePalette.filter((item) => !selected.includes(item)),
    [selected],
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 shadow-[0_30px_60px_-40px_rgba(8,8,35,0.7)]">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
          Universal Ingredient Library
        </h3>
        <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
          {selected.length} active
        </span>
      </div>

      <div className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
        {selected.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-950/60 px-3 py-2 text-emerald-100 shadow-inner shadow-emerald-900/40"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="mt-6 grid gap-2 text-[13px] leading-tight text-slate-400 sm:grid-cols-2">
        {remainingPalette.map((item) => (
          <div
            key={item}
            className={`rounded-xl border border-white/5 bg-slate-900/60 px-3 py-2 transition ${
              pulse ? "animate-[pulse_2.5s_ease-in-out_infinite]" : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
