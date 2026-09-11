import type { ReactNode } from "react";

export default function Bracket({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-8 text-xs uppercase text-text-faint" style={{ letterSpacing: "0.15em" }}>
      [ {children} ]
    </h2>
  );
}
