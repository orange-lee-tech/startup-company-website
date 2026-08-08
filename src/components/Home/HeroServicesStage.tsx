import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import type { StudentCase } from "@/data/cases";
import { withBasePath } from "@/lib/site";
import type { Feature } from "@/types/feature";

type HomeHeroServicesStageProps = {
  features: Feature[];
  featuredCases: StudentCase[];
};

const HomeHeroServicesStage = ({
  features,
  featuredCases,
}: HomeHeroServicesStageProps) => {
  const backgroundImage = `url('${withBasePath("/images/jiuchen/background.webp")}')`;

  return (
    <div className="relative overflow-hidden bg-[#123066]">
      <div
        className="absolute inset-0 z-0 bg-no-repeat opacity-100 lg:hidden"
        style={{
          backgroundImage,
          backgroundPosition: "72% top",
          backgroundSize: "auto 96%",
        }}
      />

      <div
        className="absolute inset-0 z-0 hidden bg-no-repeat opacity-100 lg:block"
        style={{
          backgroundImage,
          backgroundPosition: "right center",
          backgroundSize: "auto 100%",
        }}
      />

      <div className="absolute inset-0 z-0 bg-linear-to-r from-[#0D2754]/68 via-[#17407E]/38 to-[#17407E]/6" />
      <div className="absolute inset-0 z-0 bg-linear-to-b from-[#0D2754]/30 via-[#123066]/4 to-[#183E78]/24" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_74%_28%,rgba(51,172,255,0.22),transparent_34%)]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_78%_72%,rgba(255,198,87,0.24),transparent_30%)]" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-[42%] bg-linear-to-b from-transparent via-[#5577A6]/48 to-[#E4EAF3]" />

      <div className="relative z-10">
        <Hero />
        <Features features={features} />
        <Testimonials featuredCases={featuredCases} />
        <div className="h-24 bg-linear-to-b from-[#234A80]/20 via-[#A8B8D0]/35 to-[#E4EAF3] md:h-28" />
      </div>
    </div>
  );
};

export default HomeHeroServicesStage;
