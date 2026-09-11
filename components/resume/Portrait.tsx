import Image from "next/image";

export default function Portrait() {
  return (
    <div className="border border-border">
      <div
        className="border-b border-border px-3 py-1.5 text-[0.65rem] uppercase text-text-faint"
        style={{ letterSpacing: "0.1em" }}
      >
        [ Subject ]
      </div>
      <div className="relative aspect-[2/3] w-full">
        <Image
          src="/portrait.jpg"
          alt="Portrait of Abdul Rehman"
          fill
          priority
          sizes="(min-width: 1024px) 280px, 100vw"
          className="object-cover"
          style={{ filter: "grayscale(1) contrast(1.15)" }}
        />
      </div>
    </div>
  );
}
