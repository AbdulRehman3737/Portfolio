import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/projects";

export default function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section>
      <h2 className="section-label mb-6">Projects</h2>
      <div className="flex flex-col gap-5">
        <ProjectCard project={featured} featured />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
