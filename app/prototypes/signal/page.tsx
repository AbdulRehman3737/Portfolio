import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Toolkit from "./components/Toolkit";
import Education from "./components/Education";
import ChromeLayer from "./components/ChromeLayer";

export default function SignalPage() {
  return (
    <div className="signal-root">
      <Hero />
      <div className="mx-auto max-w-[1100px] px-6 pb-32 sm:px-10">
        <Experience />
        <Projects />
        <Toolkit />
        <Education />
      </div>
      <ChromeLayer />
    </div>
  );
}
