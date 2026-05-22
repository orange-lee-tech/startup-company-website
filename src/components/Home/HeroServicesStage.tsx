import Features from "@/components/Features";
import Hero from "@/components/Hero";
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

      <div className="absolute inset-0 z-0 bg-linear-to-r from-[#020817]/96 via-[#07142F]/84 to-[#061B3A]/36" />
      <div className="absolute inset-0 z-0 bg-linear-to-b from-black/15 via-[#020817]/35 to-[#020817]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_24%_24%,rgba(0,47,167,0.28),transparent_34%)]" />

      <div className="relative z-10">
        <Hero />
        <Features />
      </div>
    </div>
  );
};

export default HomeHeroServicesStage;