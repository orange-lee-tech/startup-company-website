import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { withBasePath } from "@/lib/site";

const HomeHeroServicesStage = () => {
  const backgroundImage = `url('${withBasePath("/images/jiuchen/background.webp")}')`;

  return (
    <div className="relative overflow-hidden bg-[#123066]">
      {/* 移动端：保留建筑氛围，但不让图片压住文字与横向卡片 */}
      <div
        className="absolute inset-0 z-0 bg-no-repeat opacity-100 lg:hidden"
        style={{
          backgroundImage,
          backgroundPosition: "72% top",
          backgroundSize: "auto 96%",
        }}
      />

      {/* 桌面端：竖图靠右完整展示，避免被 cover 放大后只剩局部 */}
      <div
        className="absolute inset-0 z-0 hidden bg-no-repeat opacity-100 lg:block"
        style={{
          backgroundImage,
          backgroundPosition: "right center",
          backgroundSize: "auto 100%",
        }}
      />

      {/* 左侧阅读暗幕：深色区继续抬亮，降低与浅色区的落差 */}
      <div className="absolute inset-0 z-0 bg-linear-to-r from-[#0D2754]/68 via-[#17407E]/38 to-[#17407E]/6" />

      {/* 顶部暗幕：只保留导航可读性，不再整体压黑 */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-[#0D2754]/30 via-[#123066]/4 to-[#183E78]/24" />

      {/* 建筑冷色调增强：保留科技感和国际化气质 */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_74%_28%,rgba(51,172,255,0.22),transparent_34%)]" />

      {/* 夕阳暖光保留：让画面不至于过冷、过压抑 */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_78%_72%,rgba(255,198,87,0.24),transparent_30%)]" />

      {/* 底部局部过渡：从案例区深蓝，经蓝灰和灰蓝，落到师资区浅蓝灰 */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-[42%] bg-linear-to-b from-transparent via-[#5577A6]/48 to-[#E4EAF3]" />

      <div className="relative z-10">
        <Hero />
        <Features />
        <Testimonials />
        <div className="h-24 bg-linear-to-b from-[#234A80]/20 via-[#A8B8D0]/35 to-[#E4EAF3] md:h-28" />
      </div>
    </div>
  );
};

export default HomeHeroServicesStage;
