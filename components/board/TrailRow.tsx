import { forwardRef } from "react";
import type { ReactNode } from "react";

const TrailRow = forwardRef<HTMLDivElement, { side: "left" | "right"; children: ReactNode }>(
  function TrailRow({ side, children }, ref) {
    return (
      <div
        className={`relative mb-20 flex flex-col pl-9 pr-3 lg:mb-28 lg:flex-row lg:pl-0 lg:pr-0 lg:gap-[6%] ${
          side === "right" ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div ref={ref} className="lg:w-[58%]">
          {children}
        </div>
        <div className="hidden lg:block lg:w-[36%]" aria-hidden="true" />
      </div>
    );
  },
);

export default TrailRow;
