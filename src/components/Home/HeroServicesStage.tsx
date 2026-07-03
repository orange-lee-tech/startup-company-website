import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { withBasePath } from "@/lib/site";

const HomeHeroServicesStage = () => {
  const backgroundImage = `url('${withBasePath("/images/jiuchen/background.webp")}')`;

  return (
    <div className="relative overflow-hidden bg-[#0B1F44]">
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

      {/* 左侧阅读暗幕：继续调浅，减少深色滤镜的压迫感 */}
      <div className="absolute inset-0 z-0 bg-linear-to-r from-[#071832]/78 via-[#123066]/46 to-[#123066]/8" />

      {/* 顶部暗幕：只保留导航可读性，不再整体压黑 */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-[#071832]/38 via-[#0B1F44]/6 to-[#0F2B59]/34" />

      {/* 建筑冷色调增强：保留科技感和国际化气质 */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_74%_28%,rgba(51,172,255,0.22),transparent_34%)]" />

      {/* 夕阳暖光保留：让画面不至于过冷、过压抑 */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_78%_72%,rgba(255,198,87,0.24),transparent_30%)]" />

      {/* 底部收口：统一过渡到首页浅色专题底色，避免深浅硬切 */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-[28%] bg-linear-to-b from-transparent via-[#102B5C]/56 to-[#EEF2F8]" />

      <div className="relative z-10">
        <Hero />
        <Features />
        <Testimonials />
        <div className="h-12 bg-linear-to-b from-transparent to-[#EEF2F8] md:h-16" />
      </div>
    </div>
  );
};

export default HomeHeroServicesStage;
