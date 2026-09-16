import { About } from "@/components/about";
import { Capabilities } from "@/components/capabilities";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Projects />
        <Capabilities />
        <Experience />
        <About />
      </main>
      <SiteFooter />
    </>
  );
}
