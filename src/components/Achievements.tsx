import { useEffect, useRef } from "react";
import "./styles/Achievements.css";
import { config } from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const achieveMeta: Record<string, { icon: string; color: string; bg: string; accent: string }> = {
  "ML Excellence":     { icon: "🧠", color: "#818cf8", bg: "rgba(129,140,248,0.12)", accent: "#818cf8" },
  "LeetCode 700+":     { icon: "⚡", color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  accent: "#fbbf24" },
  "GeeksForGeeks DSA": { icon: "📘", color: "#22c55e", bg: "rgba(34,197,94,0.12)",   accent: "#4ade80" },
  "LeetCode T-Shirt":  { icon: "👕", color: "#f97316", bg: "rgba(249,115,22,0.12)",  accent: "#fb923c" },
  "NPTEL Certified":   { icon: "🎓", color: "#c084fc", bg: "rgba(192,132,252,0.12)", accent: "#d8b4fe" },
};

const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
);

const Achievements = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ach-tag-badge",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".ach-section", start: "top 82%" } });

      gsap.fromTo(".ach-headline span",
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.1,
          scrollTrigger: { trigger: ".ach-section", start: "top 80%" } });

      // First card (hero) — slides from left
      gsap.fromTo(".ach-card-hero",
        { opacity: 0, x: -60, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.85, ease: "power3.out", delay: 0.25,
          scrollTrigger: { trigger: ".ach-grid", start: "top 82%" } });

      // Remaining cards — stagger from right
      gsap.fromTo(".ach-card-small",
        { opacity: 0, x: 50, scale: 0.94 },
        { opacity: 1, x: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", delay: 0.3,
          scrollTrigger: { trigger: ".ach-grid", start: "top 82%" } });

      // Icon pop-in
      gsap.fromTo(".ach-icon",
        { scale: 0, rotate: -20 },
        { scale: 1, rotate: 0, duration: 0.55, stagger: 0.09,
          ease: "back.out(2)", delay: 0.4,
          scrollTrigger: { trigger: ".ach-grid", start: "top 82%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const [hero, ...rest] = config.achievements;
  const heroMeta = achieveMeta[hero.title] ?? { icon: "🏆", color: "#a78bfa", bg: "rgba(167,139,250,0.12)", accent: "#c4b5fd" };

  return (
    <div className="ach-section section-container" id="achievements" ref={sectionRef}>
      {/* Orbs */}
      <div className="ach-orb ach-orb-1" />
      <div className="ach-orb ach-orb-2" />

      <div className="ach-inner">
        {/* Badge */}
        <span className="ach-tag-badge">🏆 Milestones & Recognition</span>

        {/* Headline */}
        <div className="ach-headline">
          <h2><span>My</span> <span className="ach-gradient-text">Achievements</span></h2>
        </div>
        <p className="ach-desc-text">
          Every milestone earned through relentless effort, competitive drive, and a love for problem-solving.
        </p>

        {/* Grid — hero left, 2×2 right */}
        <div className="ach-grid">

          {/* Hero card */}
          <div
            className="ach-card ach-card-hero"
            style={{ "--ach-color": heroMeta.color, "--ach-bg": heroMeta.bg } as React.CSSProperties}
          >
            <div className="ach-card-top-bar" style={{ background: heroMeta.accent }} />
            <div className="ach-icon">{heroMeta.icon}</div>
            <div className="ach-star-row">
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: heroMeta.color }}><StarIcon /></span>
              ))}
            </div>
            <h3 className="ach-card-title">{hero.title}</h3>
            <p className="ach-card-desc">{hero.description}</p>
            <div className="ach-hero-badge" style={{ color: heroMeta.color, background: heroMeta.bg, borderColor: heroMeta.color + "44" }}>
              🥇 Top Achievement
            </div>
          </div>

          {/* Small cards 2×2 */}
          <div className="ach-small-grid">
            {rest.map((item, i) => {
              const m = achieveMeta[item.title] ?? { icon: "🏆", color: "#a78bfa", bg: "rgba(167,139,250,0.12)", accent: "#c4b5fd" };
              return (
                <div
                  key={i}
                  className="ach-card ach-card-small"
                  style={{ "--ach-color": m.color, "--ach-bg": m.bg } as React.CSSProperties}
                >
                  <div className="ach-card-top-bar" style={{ background: m.accent }} />
                  <div className="ach-small-row">
                    <div className="ach-icon ach-icon-sm">{m.icon}</div>
                    <h3 className="ach-card-title ach-title-sm">{item.title}</h3>
                  </div>
                  <p className="ach-card-desc ach-desc-sm">{item.description}</p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Achievements;
