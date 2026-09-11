import Bracket from "./Bracket";
import FadeUp from "./FadeUp";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/projects";

export default function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section>
      <Bracket>Projects</Bracket>
      <div className="flex flex-col gap-6">
        <FadeUp>
          <ProjectCard project={featured} featured />
        </FadeUp>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {rest.map((project, i) => (
            <FadeUp key={project.slug} index={i + 1}>
              <ProjectCard project={project} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
