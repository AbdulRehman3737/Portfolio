import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CaseFileDetail from "@/components/board/CaseFileDetail";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Abdul Rehman`,
    description: project.blurb,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <Nav />
      <main className="corkboard min-h-screen">
        <div className="folder-card mx-auto max-w-[760px] px-6 pt-11 pb-16 sm:px-9" style={{ marginTop: "6.5rem" }}>
          <CaseFileDetail project={project} />
        </div>
      </main>
      <Footer />
    </>
  );
}
