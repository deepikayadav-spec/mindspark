const frame = "w-full max-w-sm mx-auto h-auto";
const stroke = "stroke-slate-400 dark:stroke-slate-500";
const fill = "fill-slate-700 dark:fill-slate-300";
const accent = "stroke-indigo-500";
const accentFill = "fill-indigo-500";

function Label({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" className={`${fill} text-[10px]`} fontSize="10">
      {children}
    </text>
  );
}

/** Illustrations are decorative: they restate the setup, never give the answer away. */
export function Visual({ name }: { name: string }) {
  switch (name) {
    case "fork":
      return (
        <svg viewBox="0 0 220 110" className={frame} role="img" aria-label="A forked road with a single islander standing at the junction">
          <path d="M110 100 L110 62 M110 62 L50 20 M110 62 L170 20" className={`${stroke} fill-none`} strokeWidth="3" />
          <circle cx="110" cy="70" r="6" className={accentFill} />
          <Label x={40} y={14}>city?</Label>
          <Label x={180} y={14}>swamp?</Label>
        </svg>
      );

    case "cards":
      return (
        <svg viewBox="0 0 240 80" className={frame} role="img" aria-label="Four cards showing A, K, 4 and 7">
          {["A", "K", "4", "7"].map((t, i) => (
            <g key={t}>
              <rect x={10 + i * 58} y={10} width="44" height="60" rx="6" className={`${stroke} fill-white dark:fill-slate-800`} strokeWidth="2" />
              <text x={32 + i * 58} y={48} textAnchor="middle" className={fill} fontSize="22" fontWeight="600">
                {t}
              </text>
            </g>
          ))}
        </svg>
      );

    case "square-quadrants":
      return (
        <svg viewBox="0 0 120 120" className="w-40 mx-auto h-auto" role="img" aria-label="A 2 by 2 square divided into four unit cells">
          <rect x="10" y="10" width="100" height="100" className={`${stroke} fill-none`} strokeWidth="2" />
          <path d="M60 10 V110 M10 60 H110" className={`${stroke} fill-none`} strokeDasharray="4 4" strokeWidth="1.5" />
          {[
            [30, 40], [80, 30], [45, 85], [90, 92], [70, 70],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" className={accentFill} />
          ))}
        </svg>
      );

    case "coin-tree":
      return (
        <svg viewBox="0 0 240 120" className={frame} role="img" aria-label="A tree of two coin flips with four leaf outcomes">
          <path d="M120 18 L60 55 M120 18 L180 55 M60 55 L30 95 M60 55 L90 95 M180 55 L150 95 M180 55 L210 95" className={`${stroke} fill-none`} strokeWidth="2" />
          <Label x={120} y={14}>flip</Label>
          <Label x={56} y={52}>H</Label>
          <Label x={186} y={52}>T</Label>
          {[["HH", 30], ["HT", 90], ["TH", 150], ["TT", 210]].map(([t, x]) => (
            <g key={t as string}>
              <circle cx={x as number} cy={100} r="12" className="fill-indigo-500/15 stroke-indigo-500" strokeWidth="1.5" />
              <text x={x as number} y={104} textAnchor="middle" className={fill} fontSize="10" fontWeight="600">{t}</text>
            </g>
          ))}
        </svg>
      );

    case "base-rate":
      return (
        <svg viewBox="0 0 240 90" className={frame} role="img" aria-label="A large population bar with a tiny sick fraction and a larger false-positive fraction">
          <rect x="10" y="20" width="220" height="24" className="fill-slate-200 dark:fill-slate-700" rx="4" />
          <rect x="10" y="20" width="2" height="24" className="fill-rose-500" rx="1" />
          <Label x={40} y={58}>sick</Label>
          <rect x="10" y="56" width="11" height="14" className="fill-rose-500" rx="2" />
          <rect x="10" y="56" width="0" height="14" className="fill-none" />
          <text x={120} y={14} textAnchor="middle" className={fill} fontSize="10">100,000 people</text>
        </svg>
      );

    case "monty":
      return (
        <svg viewBox="0 0 240 100" className={frame} role="img" aria-label="Three doors, the third one open showing a goat">
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={20 + i * 72} y={12} width="52" height="76" rx="4" className={`${stroke} ${i === 2 ? "fill-slate-200 dark:fill-slate-700" : "fill-white dark:fill-slate-800"}`} strokeWidth="2" />
              <text x={46 + i * 72} y={56} textAnchor="middle" className={fill} fontSize="16">
                {i === 2 ? "🐐" : i + 1}
              </text>
            </g>
          ))}
          <path d="M46 96 L46 92" className={accent} strokeWidth="2" />
          <Label x={46} y={99}>your pick</Label>
        </svg>
      );

    case "halving":
      return (
        <svg viewBox="0 0 240 70" className={frame} role="img" aria-label="A bar repeatedly halved">
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="10" y={8 + i * 15} width={200 / 2 ** i} height="10" rx="3" className="fill-indigo-500" opacity={1 - i * 0.18} />
          ))}
          <Label x={225} y={40}>log n</Label>
        </svg>
      );

    case "nested-loop":
      return (
        <svg viewBox="0 0 160 160" className="w-44 mx-auto h-auto" role="img" aria-label="An n by n grid of operations">
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={8 + c * 25} y={8 + r * 25} width="20" height="20" rx="3" className="fill-indigo-500" opacity={0.25 + ((r + c) % 3) * 0.2} />
            ))
          )}
        </svg>
      );

    case "graph":
      return (
        <svg viewBox="0 0 220 120" className={frame} role="img" aria-label="A small network of six connected nodes">
          <path d="M30 60 L80 25 M30 60 L80 95 M80 25 L140 25 M80 95 L140 95 M140 25 L190 60 M140 95 L190 60 M80 25 L80 95" className={`${stroke} fill-none`} strokeWidth="2" />
          {[[30, 60], [80, 25], [80, 95], [140, 25], [140, 95], [190, 60]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="10" className={i === 0 || i === 5 ? accentFill : "fill-slate-400 dark:fill-slate-500"} />
          ))}
          <Label x={30} y={88}>start</Label>
          <Label x={190} y={88}>end</Label>
        </svg>
      );

    case "neuron":
      return (
        <svg viewBox="0 0 240 110" className={frame} role="img" aria-label="Two weighted inputs feeding a neuron that outputs through an activation">
          <path d="M55 32 L120 55 M55 78 L120 55 M155 55 L205 55" className={`${stroke} fill-none`} strokeWidth="2" />
          <circle cx="40" cy="32" r="14" className="fill-slate-200 dark:fill-slate-700" />
          <circle cx="40" cy="78" r="14" className="fill-slate-200 dark:fill-slate-700" />
          <text x="40" y="36" textAnchor="middle" className={fill} fontSize="11">x₁</text>
          <text x="40" y="82" textAnchor="middle" className={fill} fontSize="11">x₂</text>
          <circle cx="137" cy="55" r="18" className="fill-indigo-500/20 stroke-indigo-500" strokeWidth="2" />
          <text x="137" y="59" textAnchor="middle" className={fill} fontSize="11">Σ</text>
          <Label x={85} y={34}>w₁</Label>
          <Label x={85} y={86}>w₂</Label>
          <Label x={215} y={59}>out</Label>
        </svg>
      );

    case "loss-curve":
      return (
        <svg viewBox="0 0 240 100" className={frame} role="img" aria-label="A loss curve that oscillates and diverges">
          <path d="M15 85 H225 M15 85 V12" className={`${stroke} fill-none`} strokeWidth="1.5" />
          <path d="M20 70 L50 40 L70 75 L95 25 L115 82 L140 12 L160 88 L185 5" className={`${accent} fill-none`} strokeWidth="2.5" />
          <Label x={215} y={97}>epoch</Label>
        </svg>
      );

    case "percent-bar":
      return (
        <svg viewBox="0 0 240 80" className={frame} role="img" aria-label="A bar halved, then doubled back to full">
          <rect x="15" y="14" width="210" height="18" rx="4" className="fill-indigo-500" />
          <rect x="15" y="44" width="105" height="18" rx="4" className="fill-rose-500" />
          <Label x={232} y={28}>100</Label>
          <Label x={128} y={58}>50</Label>
        </svg>
      );

    case "growth-curve":
      return (
        <svg viewBox="0 0 240 100" className={frame} role="img" aria-label="An exponential curve that stays flat then rises sharply">
          <path d="M15 85 H225 M15 85 V10" className={`${stroke} fill-none`} strokeWidth="1.5" />
          <path d="M18 84 C 110 83, 160 78, 190 55 S 210 18, 218 12" className={`${accent} fill-none`} strokeWidth="2.5" />
          <Label x={212} y={97}>day 30</Label>
        </svg>
      );

    default:
      return null;
  }
}
