import { useEffect, useRef } from "react";
import "./styles/Certifications.css";
import { config } from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Icon + colour per issuer */
const issuerMeta: Record<string, { emoji: string; color: string; bg: string }> = {
  GeeksForGeeks: { emoji: "🟢", color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
  CodeTech:      { emoji: "⚡", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  NPTEL:         { emoji: "🎓", color: "#818cf8", bg: "rgba(129,140,248,0.12)" },
};

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M3.75 2a.75.75 0 0 0 0 1.5h7.44L2.22 12.47a.75.75 0 1 0 1.06 1.06L12.25 4.56v7.44a.75.75 0 0 0 1.5 0V2.75A.75.75 0 0 0 13 2H3.75Z"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2Z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cert-tag-badge",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".cert-section-new", start: "top 82%" } });

      gsap.fromTo(".cert-headline span",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.1,
          scrollTrigger: { trigger: ".cert-section-new", start: "top 80%" } });

      gsap.fromTo(".cert-new-card",
        { opacity: 0, y: 60, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.13,
          ease: "power3.out", delay: 0.2,
          scrollTrigger: { trigger: ".cert-new-grid", start: "top 82%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="cert-section-new section-container" id="certifications" ref={sectionRef}>
      {/* Background orbs */}
      <div className="cert-orb cert-orb-1" />
      <div className="cert-orb cert-orb-2" />

      <div className="cert-inner">
        {/* Badge */}
        <span className="cert-tag-badge">🏅 Verified Credentials</span>

        {/* Headline */}
        <div className="cert-headline">
          <h2><span>My</span> <span className="cert-gradient-text">Certifications</span></h2>
        </div>
        <p className="cert-desc-text">
          Proof of expertise — earned through dedication, consistency, and real-world application.
        </p>

        {/* Grid */}
        <div className="cert-new-grid">
          {config.certifications.map((cert, i) => {
            const meta = issuerMeta[cert.issuer] ?? { emoji: "📜", color: "#a78bfa", bg: "rgba(167,139,250,0.1)" };
            return (
              <div className="cert-new-card" key={cert.id}>
                {/* Top glow accent */}
                <div className="cert-card-glow" style={{ background: meta.color }} />

                {/* Number watermark */}
                <span className="cert-card-num">0{i + 1}</span>

                {/* Header row */}
                <div className="cert-card-header">
                  <div className="cert-shield-wrap" style={{ color: meta.color, background: meta.bg, borderColor: meta.color + "44" }}>
                    <ShieldIcon />
                  </div>
                  <div>
                    <div className="cert-issuer-tag" style={{ color: meta.color, background: meta.bg, borderColor: meta.color + "44" }}>
                      {meta.emoji} {cert.issuer}
                    </div>
                    <h3 className="cert-card-title">{cert.title}</h3>
                  </div>
                </div>

                {/* Divider */}
                <div className="cert-card-sep" style={{ background: `linear-gradient(90deg, ${meta.color}55, transparent)` }} />

                {/* Description */}
                <p className="cert-card-desc">{cert.description}</p>

                {/* Verify link */}
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-verify-link"
                  style={{ color: meta.color }}
                  data-cursor="disable"
                >
                  View Certificate <ArrowIcon />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
