import Hero from "@/components/resume/Hero";
import Experience from "@/components/resume/Experience";
import Projects from "@/components/resume/Projects";
import Toolkit from "@/components/resume/Toolkit";
import Education from "@/components/resume/Education";
import ChromeLayer from "@/components/resume/ChromeLayer";

export default function Home() {
  return (
    <div className="signal-root">
      <Hero />
      <div className="mx-auto max-w-[1100px] px-6 pb-32 sm:px-10">
        <Projects />
        <Experience />
        <Toolkit />
        <Education />
      </div>
      <ChromeLayer />
    </div>
  );
}
