import type { PreviewKind } from "@/lib/data";

/*
 * Code-drawn previews for each project card. Numbers shown are real project figures;
 * waveforms and bars marked "illustrative" are decorative.
 */
export function ProjectPreview({ kind }: { kind: PreviewKind }) {
  switch (kind) {
    case "rtl":
      return <RtlPreview />;
    case "pipeline":
      return <PipelinePreview />;
    case "firmware":
      return <FirmwarePreview />;
    case "analog":
      return <AnalogPreview />;
    case "rover":
      return <RoverPreview />;
    case "lstm":
      return <LstmPreview />;
  }
}

function Frame({ label, meta, children }: { label: string; meta?: string; children: React.ReactNode }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex flex-col font-mono text-[11.5px] leading-5">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative flex items-center justify-between border-b border-zinc-800/80 px-4 py-2 text-[10.5px] uppercase tracking-[0.14em] text-zinc-500">
        <span>{label}</span>
        {meta && <span className="hidden sm:inline">{meta}</span>}
      </div>
      <div className="relative min-h-0 flex-1 px-4 py-3">{children}</div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-zinc-950 to-transparent" />
    </div>
  );
}

function RtlPreview() {
  return (
    <Frame label="verif · pytest" meta="icarus 14.0 · cocotb 2.1">
      <p className="text-zinc-300">
        <span className="text-emerald-400">❯</span> python -m pytest -v
      </p>
      <p className="text-zinc-500">collected 3 items</p>
      {[
        ["alu", "33%"],
        ["regfile", "66%"],
        ["imm_gen", "100%"],
      ].map(([block, pct]) => (
        <p key={block} className="flex gap-2 text-zinc-400 transition-colors group-hover/glow:text-zinc-300">
          <span className="truncate">test_unit[{block}]</span>
          <span className="h-0 min-w-3 flex-1 translate-y-2.5 border-b border-dotted border-zinc-800" />
          <span className="text-emerald-400">PASSED</span>
          <span className="w-9 text-right text-zinc-600">{pct}</span>
        </p>
      ))}
      <p className="mt-1 text-zinc-500">
        ref model: python · vectors: <span className="text-zinc-300">12,000+</span> · seeded
      </p>
      <p className="mt-1 text-emerald-400">===== 3 passed in 11.98s =====</p>
      <div className="mt-3 flex h-6 items-end gap-[3px]">
        {WALKING_ONES.map((high, i) => (
          <span
            key={i}
            className={high ? "h-full w-full rounded-[1px] bg-emerald-400/70" : "h-1 w-full rounded-[1px] bg-zinc-800"}
          />
        ))}
      </div>
    </Frame>
  );
}

// One-hot pattern suggesting the walking-ones immediate sweep.
const WALKING_ONES = Array.from({ length: 32 }, (_, i) => i === 11);

const STAGES = [
  { name: "scrape", detail: "selenium · driver cycling", value: "idempotent", fill: "100%" },
  { name: "enrich", detail: "osm overpass api", value: "geo footprints", fill: "100%" },
  { name: "load", detail: "sqlalchemy → sqlite/wal", value: "2,341 venues", fill: "100%" },
  { name: "estimate", detail: "scikit-learn", value: "350+ backfilled", fill: "72%" },
  { name: "score", detail: "last.fm + spotify", value: "244 artists", fill: "54%" },
];

function PipelinePreview() {
  return (
    <Frame label="etl · stages" meta="re-runnable">
      <ol className="space-y-2">
        {STAGES.map((stage, i) => (
          <li key={stage.name} className="grid grid-cols-[1.25rem_4.25rem_1fr_auto] items-center gap-2">
            <span className="text-zinc-600">{i + 1}</span>
            <span className="text-zinc-200">{stage.name}</span>
            <span className="relative h-1.5 overflow-hidden rounded-full bg-zinc-800/80">
              <span className="absolute inset-y-0 left-0 rounded-full bg-emerald-400/60" style={{ width: stage.fill }} />
              <span className="absolute inset-y-0 left-0 w-1/4 animate-scan bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover/glow:opacity-100" />
            </span>
            <span className="text-right text-zinc-400">{stage.value}</span>
          </li>
        ))}
      </ol>
      <p className="mt-3 truncate text-zinc-500">
        <span className="text-emerald-400">✓</span> append-safe writes · WebDriverWait · 100 pg / 60 min cycle
      </p>
    </Frame>
  );
}

const MOTORS = [
  { id: "M1", lo: 0.35, hi: 0.9, delay: "0s" },
  { id: "M2", lo: 0.3, hi: 0.85, delay: "-0.4s" },
  { id: "M3", lo: 0.4, hi: 0.8, delay: "-0.9s" },
  { id: "M4", lo: 0.35, hi: 0.9, delay: "-1.3s" },
  { id: "M5", lo: 0.25, hi: 0.75, delay: "-1.7s" },
  { id: "M6", lo: 0.3, hi: 0.85, delay: "-2.1s" },
];

function FirmwarePreview() {
  return (
    <Frame label="esp32 · drive controller" meta="ledc pwm">
      <div className="grid h-full grid-cols-[1fr_auto] gap-5">
        <ul className="space-y-[7px]">
          {MOTORS.map((motor) => (
            <li key={motor.id} className="flex items-center gap-2.5">
              <span className="w-5 text-zinc-400">{motor.id}</span>
              <span className="relative h-2 flex-1 overflow-hidden rounded-sm bg-zinc-800/80">
                <span
                  className="absolute inset-0 origin-left animate-pwm rounded-sm bg-gradient-to-r from-emerald-500/40 to-emerald-400/80"
                  style={
                    {
                      "--pwm-lo": motor.lo,
                      "--pwm-hi": motor.hi,
                      animationDelay: motor.delay,
                    } as React.CSSProperties
                  }
                />
              </span>
            </li>
          ))}
          <li className="pt-1 text-[10px] text-zinc-600">duty cycle · illustrative</li>
        </ul>
        <dl className="grid grid-cols-[auto_auto] content-start gap-x-3 gap-y-[7px] border-l border-zinc-800 pl-4 text-[11px] leading-4">
          <dt className="text-zinc-500">logic rail</dt>
          <dd className="text-right text-zinc-200">isolated</dd>
          <dt className="text-zinc-500">motor rail</dt>
          <dd className="text-right text-zinc-200">7.4 V</dd>
          <dt className="text-zinc-500">hc-sr04</dt>
          <dd className="text-right text-zinc-200">median</dd>
          <dt className="text-zinc-500">obstacle</dt>
          <dd className="text-right text-zinc-200">stop @ 20 cm</dd>
          <dt className="text-zinc-500">dead-man</dt>
          <dd className="text-right text-emerald-400">armed</dd>
        </dl>
      </div>
    </Frame>
  );
}

const SPECS = [
  ["open-loop gain", "≥ 60 dB"],
  ["bandwidth", "≥ 500 kHz"],
  ["input resistance", "≥ 100 kΩ"],
  ["output swing", "≥ 1.5 Vpp"],
  ["gain loss @ 10 kΩ‖2 pF", "≤ 10 %"],
  ["dc power", "< 1 mW"],
];

function AnalogPreview() {
  return (
    <Frame label="spec compliance · spice" meta="3.3 V · gf 180nm">
      <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-3/4 w-full opacity-40">
        <path d="M0 18 H110 C135 18 145 30 160 52 S185 78 200 80" fill="none" stroke="rgb(52 211 153)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d="M0 18 H200" stroke="rgb(63 63 70)" strokeDasharray="3 3" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <table className="relative w-full border-separate border-spacing-y-[3px]">
        <tbody>
          {SPECS.map(([param, target]) => (
            <tr key={param}>
              <td className="truncate text-zinc-400">{param}</td>
              <td className="text-right text-zinc-200">{target}</td>
              <td className="w-12 text-right text-emerald-400">met</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Frame>
  );
}

const ROVER_LOG = [
  ["deps", "dependency chain", "resolved"],
  ["launch", "launch-file config", "fixed"],
  ["iface", "packages ↔ hardware", "integrated"],
  ["drive", "6-wheel drive system", "online"],
];

function RoverPreview() {
  return (
    <Frame label="ros 2 humble · bring-up" meta="ubuntu 22.04">
      <div className="space-y-1.5">
        {ROVER_LOG.map(([tag, what, result], i) => (
          <p key={tag} className="flex items-center gap-2">
            <span className="w-14 text-zinc-500">[{tag}]</span>
            <span className="truncate text-zinc-300">{what}</span>
            <span className="h-0 min-w-3 flex-1 translate-y-1 border-b border-dotted border-zinc-800" />
            <span className={i === ROVER_LOG.length - 1 ? "text-emerald-400" : "text-zinc-400"}>{result}</span>
          </p>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-2.5">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className="flex flex-col items-center gap-1">
            <span className="size-3.5 rounded-full border-2 border-emerald-400/70 border-t-transparent transition-transform duration-700 group-hover/glow:rotate-[360deg]" />
            <span className="text-[9px] text-zinc-600">w{i + 1}</span>
          </span>
        ))}
      </div>
    </Frame>
  );
}

// Deterministic pseudo price series; the "predicted" line lags and smooths the actual one.
const ACTUAL = Array.from({ length: 48 }, (_, i) => 40 + 14 * Math.sin(i / 6) + 6 * Math.sin(i / 2.3) + i * 0.35);
const PREDICTED = ACTUAL.map((_, i) => {
  const window = ACTUAL.slice(Math.max(0, i - 3), i + 1);
  return window.reduce((a, b) => a + b, 0) / window.length;
});

function toPath(series: number[]) {
  const max = Math.max(...ACTUAL) + 4;
  const min = Math.min(...ACTUAL) - 4;
  return series
    .map((v, i) => `${i === 0 ? "M" : "L"}${((i / (series.length - 1)) * 200).toFixed(1)} ${(((max - v) / (max - min)) * 90).toFixed(1)}`)
    .join(" ");
}

function LstmPreview() {
  const split = 200 * 0.8;
  return (
    <Frame label="aapl · next-day close" meta="illustrative">
      <div className="flex gap-4 text-[10.5px] text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="h-px w-4 bg-zinc-300" /> actual
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-px w-4 border-t border-dashed border-emerald-400" /> predicted
        </span>
        <span className="ml-auto">window 30d · split 80/20</span>
      </div>
      <svg viewBox="0 0 200 90" preserveAspectRatio="none" className="mt-2 h-[7.5rem] w-full overflow-visible">
        <rect x={split} y="0" width={200 - split} height="90" fill="rgb(52 211 153 / 0.05)" />
        <line x1={split} x2={split} y1="0" y2="90" stroke="rgb(63 63 70)" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
        <path d={toPath(ACTUAL)} fill="none" stroke="rgb(212 212 216)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
        <path d={toPath(PREDICTED)} fill="none" stroke="rgb(52 211 153)" strokeWidth="1.25" strokeDasharray="4 3" vectorEffect="non-scaling-stroke" />
      </svg>
      <p className="mt-1 flex justify-between text-[10.5px] text-zinc-500">
        <span>train</span>
        <span>test · rmse</span>
      </p>
    </Frame>
  );
}
