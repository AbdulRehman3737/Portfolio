export default function SectionHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="signal-display mb-8 text-3xl sm:text-4xl scroll-mt-24">
      {children}
    </h2>
  );
}
