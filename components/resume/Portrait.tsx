import Image from "next/image";

export default function Portrait() {
  return (
    <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface">
      <Image
        src="/portrait.jpg"
        alt="Portrait of Abdul Rehman"
        fill
        priority
        sizes="(min-width: 1024px) 300px, 100vw"
        className="object-cover"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(11,11,13,0) 60%, rgba(11,11,13,0.5) 100%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
