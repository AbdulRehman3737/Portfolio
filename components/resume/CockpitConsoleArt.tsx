const ROWS = [
  { label: "Driver offers", on: true },
  { label: "Surge pricing", on: true },
  { label: "Landmark offers", on: false },
  { label: "Banners", on: true },
  { label: "Dispatch rules", on: false },
];

/**
 * Bespoke fallback for Cockpit's no-screenshot slot: an abstract schematic of the
 * actual product (a permission-gated config console for ride-hailing ops modules),
 * not a generic lock icon. One toggle animates on a slow cycle; the shared root
 * `prefers-reduced-motion` rule in app/globals.css already freezes it for anyone
 * who has that preference set.
 */
export default function CockpitConsoleArt() {
  return (
    <div
      className="flex h-full w-full flex-col justify-center gap-3 p-6"
      role="img"
      aria-label="Schematic of Cockpit's permission-gated configuration rows"
    >
      {ROWS.map((row, i) => (
        <div key={row.label} className="flex items-center gap-3">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: "var(--signal-cyan)", opacity: row.on ? 1 : 0.35 }}
            aria-hidden="true"
          />
          <span className="signal-mono flex-1 text-[0.7rem] uppercase tracking-[0.08em]" style={{ color: "var(--signal-text-faint)" }}>
            {row.label}
          </span>
          <span
            className="relative inline-flex h-3.5 w-7 shrink-0 rounded-full"
            style={{ background: row.on ? "rgba(141,210,239,0.25)" : "rgba(242,237,228,0.08)" }}
            aria-hidden="true"
          >
            <span
              className={`absolute top-0.5 h-2.5 w-2.5 rounded-full ${i === 0 ? "signal-cockpit-toggle" : ""}`}
              style={{
                background: "var(--signal-cyan)",
                left: row.on ? "calc(100% - 0.75rem)" : "0.125rem",
              }}
            />
          </span>
        </div>
      ))}
    </div>
  );
}
