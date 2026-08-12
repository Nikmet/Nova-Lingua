import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { WhyAbandon } from "@/components/sections/WhyAbandon";
import { Comparison } from "@/components/sections/Comparison";
import { Quiz } from "@/components/sections/Quiz";
import { Programs } from "@/components/sections/Programs";
import { Teachers } from "@/components/sections/Teachers";
import { Reviews } from "@/components/sections/Reviews";
import { Steps } from "@/components/sections/Steps";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

function App() {
  // clip, not hidden: hidden turns this into a scroll container and puts the
  // sticky header's containing block on it instead of the viewport.
  return (
    <div style={{ overflowX: "clip" }}>
      <Header />
      <Hero />
      <WhyAbandon />
      <Comparison />
      <Quiz />
      <Programs />
      <Teachers />
      <Reviews />
      <Steps />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
