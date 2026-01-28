import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectsMasonry from "@/components/ProjectsMasonry";
import VideoGallery from "@/components/VideoGallery";
import Contact from "@/components/Contact";
import FloatingNav from "@/components/FloatingNav";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-dark flex flex-col items-center w-full overflow-hidden">
      <FloatingNav />
      <Hero />
      <div className="w-full relative z-10 bg-brand-dark/50 backdrop-blur-3xl">
        <About />
        <ProjectsMasonry />
        <VideoGallery />
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
