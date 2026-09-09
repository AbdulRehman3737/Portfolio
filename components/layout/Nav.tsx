import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-20 flex h-[var(--nav-h)] items-center px-6">
      <Link
        href="/"
        className="chip flex items-center gap-2 px-4 py-2 text-[0.78rem] text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={14} />
        Back to the board
      </Link>
    </nav>
  );
}
