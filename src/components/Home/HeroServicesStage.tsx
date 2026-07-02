import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { withBasePath } from "@/lib/site";

const HomeHeroServicesStage = () => {
  const backgroundImage = `url('${withBasePath("/images/jiuchen/background.png")}')`;

  return (
    <div className="relative overflow-hidden bg-[#020817]">
      {/* 移动端：保留建筑氛围，但不让图片压住文字与横向卡片 */}
      <div
        className="absolute inset-0 z-0 bg-no-repeat opacity-90 lg:hidden"
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

      {/* 左侧阅读暗幕：主要服务文字区域，不压死右侧建筑 */}
      <div className="absolute inset-0 z-0 bg-linear-to-r from-[#020817]/96 via-[#07142F]/78 to-[#020817]/28" />

      {/* 顶部暗幕：保证透明导航栏、Logo、菜单文字清晰 */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-[#020817]/60 via-[#020817]/22 to-[#020817]/78" />

      {/* 建筑冷色调增强：保留科技感和国际化气质 */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_74%_28%,rgba(51,172,255,0.16),transparent_30%)]" />

      {/* 夕阳暖光保留：让画面不至于过冷、过压抑 */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_78%_72%,rgba(255,198,87,0.18),transparent_26%)]" />

      {/* 底部收口：让案例摘要结束处自然过渡到后续浅色板块 */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-[22%] bg-linear-to-b from-transparent to-[#020817]" />

      <div className="relative z-10">
        <Hero />
        <Features />
        <Testimonials />
      </div>
    </div>
  );
};

export default HomeHeroServicesStage;
