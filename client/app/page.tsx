import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SportsCategory from "@/components/SportsCategory";
import PhotoGallery from "@/components/PhotoGallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <SportsCategory />
      <PhotoGallery />
      <Footer />
    </main>
  );
}
