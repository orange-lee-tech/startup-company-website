import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { withBasePath } from "@/lib/site";

const HomeHeroServicesStage = () => {
  const backgroundImage = `url('${withBasePath("/images/jiuchen/background.png")}')`;

  return (
    <div className="relative overflow-hidden bg-[#020817]">
      {/* 移动端：图片铺满，保证沉浸感 */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-100 lg:hidden"
        style={{
          backgroundImage,
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
      <div className="absolute inset-0 z-0 bg-linear-to-r from-[#020817]/94 via-[#07142F]/72 to-[#020817]/24" />

      {/* 顶部暗幕：保证透明导航栏、Logo、菜单文字清晰 */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-[#020817]/58 via-[#020817]/18 to-[#020817]/82" />

      {/* 建筑冷色调增强：保留科技感和国际化气质 */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_74%_28%,rgba(51,172,255,0.16),transparent_30%)]" />

      {/* 夕阳暖光保留：让画面不至于过冷、过压抑 */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_78%_72%,rgba(255,198,87,0.18),transparent_26%)]" />

      {/* 底部收口：让案例摘要结束处自然过渡到后续白/灰色板块 */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-[28%] bg-linear-to-b from-transparent to-[#020817]" />

      <div className="relative z-10">
        <Hero />
        <Features />
        <Testimonials />
      </div>
    </div>
  );
};

export default HomeHeroServicesStage;