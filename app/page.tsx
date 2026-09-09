import ResumeLayout from "@/components/resume/ResumeLayout";
import Hero from "@/components/resume/Hero";
import Experience from "@/components/resume/Experience";
import Projects from "@/components/resume/Projects";
import Toolkit from "@/components/resume/Toolkit";
import Education from "@/components/resume/Education";

export default function Home() {
  return (
    <ResumeLayout>
      <Hero />
      <Experience />
      <Projects />
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <Toolkit />
        <Education />
      </div>
    </ResumeLayout>
  );
}
