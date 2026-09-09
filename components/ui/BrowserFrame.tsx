import type { ReactNode } from "react";

export default function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  let host = url;
  try {
    host = new URL(url).host;
  } catch {
    // keep raw url as fallback
  }

  return (
    <div className="overflow-hidden rounded-[calc(var(--radius)-2px)] border border-white/10 bg-[#151719]">
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#5c6369]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#5c6369]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#5c6369]/70" />
        </div>
        <div className="mono-label flex-1 truncate rounded-full bg-black/25 px-3 py-1 text-center text-[0.65rem] text-ink-faint">
          {host}
        </div>
      </div>
      <div className="relative aspect-[16/10] bg-[#111214]">{children}</div>
    </div>
  );
}
