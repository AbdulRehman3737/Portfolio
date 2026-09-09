import Board from "@/components/board/Board";
import { profile } from "@/lib/profile";

export default function Home() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-5 py-4 sm:px-8">
        <span className="font-display text-[0.85rem]">{profile.name}</span>
        <span className="stamp-label hidden sm:block">Investigation in progress</span>
      </div>
      <main>
        <Board />
      </main>
    </>
  );
}
