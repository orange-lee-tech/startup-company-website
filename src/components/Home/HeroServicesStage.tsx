import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { withBasePath } from "@/lib/site";

const HomeHeroServicesStage = () => {
  return (
    <div className="relative overflow-hidden bg-[#020817]">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-95"
        style={{
          backgroundImage: `url('${withBasePath("/images/jiuchen/background.png")}')`,
        }}
      />

      <div className="absolute inset-0 z-0 bg-linear-to-r from-[#020817]/96 via-[#07142F]/86 to-[#061B3A]/42" />
      <div className="absolute inset-0 z-0 bg-linear-to-b from-black/10 via-[#020817]/45 to-[#020817]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_22%_18%,rgba(0,47,167,0.3),transparent_34%)]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_82%_56%,rgba(32,146,255,0.14),transparent_32%)]" />

      <div className="relative z-10">
        <Hero />
        <Features />
        <Testimonials />
      </div>
    </div>
  );
};

export default HomeHeroServicesStage;