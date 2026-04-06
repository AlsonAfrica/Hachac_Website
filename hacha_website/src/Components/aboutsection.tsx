// AboutSection.tsx
// Left: accordion photo cards | Right: sticky parallax marquee words

import { useState, useEffect, useRef } from "react";
import leadershipImage from "../assets/hero-pics/leader.jpg"
import techImage from "../assets/hero-pics/tech.jpg"
import partnershiImage from "../assets/hero-pics/partnership.jpg"
import advanceImage from "../assets/hero-pics/advancement.jpg"

interface Story {
  id: number;
  name: string;
  description: string;
  image: string;
  position?: string;
}

const stories: Story[] = [
  {
    id: 1,
    name: "Change Makers Initiative",
    description:
      "Empowering grassroots leaders across Uganda to deliver meals, dignity, and hope to families living in poverty.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    position: "center center",
  },
  {
    id: 2,
    name: "Leadership Academy",
    description:
      "Training the next generation of community champions through mentorship, skills, and values-based education.",
    image: leadershipImage,
    position: "center 20%",
  },
  {
    id: 3,
    name: "Tech Department",
    description:
      "Bridging the digital divide by equipping youth with tools, training, and access to the modern economy.",
    image: techImage,
    position: "center 15%",
  },
  {
    id: 4,
    name: "Youth Advancement Program",
    description:
      "Turning vacant spaces into thriving community gardens, sports hubs, and safe learning environments.",
    image: advanceImage,
    position: "center 10%",
  },
  {
    id: 5,
    name: "Sponsorship & Partnerships",
    description:
      "Building lasting bonds with organisations and donors who share our vision for a more equitable world.",
    image: partnershiImage,
    position: "center 20%",
  },
];

// Words that scroll vertically in the right panel
const parallaxLines = [
  { text: "COMMUNITY", accent: false },
  { text: "IMPACT", accent: true },
  { text: "DIGNITY", accent: false },
  { text: "YOUTH", accent: false },
  { text: "HOPE", accent: true },
  { text: "CHANGE", accent: false },
  { text: "FUTURE", accent: true },
  { text: "TOGETHER", accent: false },
];

export default function AboutSection() {
  const [active, setActive] = useState<number>(1);
  const [scrollY, setScrollY] = useState(0);
  const [missionOpen, setMissionOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, -rect.top / (rect.height - window.innerHeight));
      setScrollY(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = missionOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [missionOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Section wrapper ── */
        .about-section {
          width: 100%;
          background: #f5f2ed;
          font-family: 'DM Sans', sans-serif;
          /* tall enough to give parallax room to scroll */
          min-height: 220vh;
        }

        /* ── Sticky two-column layout ── */
        .about-inner {
          position: sticky;
          top: 0;
          height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
        }

        /* ════════════════════════
           LEFT COLUMN — accordion cards
        ════════════════════════ */
        .about-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 32px 60px 48px;
          gap: 24px;
        }

        .about-left-header {
          margin-bottom: 8px;
        }

        .about-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #3f4dd1;
          margin-bottom: 10px;
        }

        .about-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(28px, 3.6vw, 48px);
          font-weight: 400;
          color: #1a1a1a;
          line-height: 1.05;
          letter-spacing: 0.02em;
        }

        .about-title .accent { color: #E63327; }
        .about-title .accent:nth-child(2n) { color: #F5C518; }
        .about-title .accent:nth-child(3n) { color: #4CAF50; }
        .about-title .accent:nth-child(4n) { color: #A0A0A0; }
        .about-title .accent:nth-child(5n) { color: #3f4dd1; }
        .about-title .accent:nth-child(6n) { color: #1a1a1a; }

        /* ── Accordion cards ── */
        .cards-row {
          display: flex;
          align-items: stretch;
          gap: 15px;
          height: 340px;
        }

        .story-card {
          position: relative;
          border-radius: 999px;
          overflow: hidden;
          cursor: pointer;
          flex-shrink: 0;
          transition:
            flex 0.52s cubic-bezier(0.4, 0, 0.2, 1),
            border-radius 0.52s cubic-bezier(0.4, 0, 0.2, 1);
          flex: 0 0 52px;
        }

        .story-card.active {
          flex: 1 1 auto;
          border-radius: 32px;
        }

        .story-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.52s ease;
          pointer-events: none;
        }

        .story-card:hover .story-img { transform: scale(1.05); }

        .story-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.74) 0%, rgba(0,0,0,0.15) 50%, transparent 100%);
          opacity: 0;
          transition: opacity 0.38s ease;
          pointer-events: none;
        }

        .story-card.active .story-gradient { opacity: 1; }

        .story-expand-icon {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          color: #1a1a1a;
          opacity: 0;
          transform: scale(0.7);
          transition: opacity 0.28s ease, transform 0.28s ease;
          pointer-events: none;
        }

        .story-card.active .story-expand-icon {
          opacity: 1;
          transform: scale(1);
        }

        .story-content {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 20px 18px 22px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.32s ease 0.14s, transform 0.32s ease 0.14s;
          pointer-events: none;
        }

        .story-card.active .story-content {
          opacity: 1;
          transform: translateY(0);
        }

        .story-name {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 5px;
          line-height: 1.25;
        }

        .story-desc {
          font-size: 12px;
          line-height: 1.55;
          color: rgba(255,255,255,0.8);
        }

        /* ════════════════════════
           RIGHT COLUMN — parallax words
        ════════════════════════ */
        .about-right {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 48px 60px 32px;
          overflow: hidden;
          border-left: 1px solid rgba(0,0,0,0.07);
        }

        /* Fade masks top & bottom */
        .about-right::before,
        .about-right::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: 120px;
          z-index: 2;
          pointer-events: none;
        }
        .about-right::before { top: 0;    background: linear-gradient(to bottom, #f5f2ed, transparent); }
        .about-right::after  { bottom: 0; background: linear-gradient(to top,    #f5f2ed, transparent); }

        .parallax-track {
          display: flex;
          flex-direction: column;
          gap: 0px;
          will-change: transform;
          /* translateY driven by JS scroll */
        }

        .parallax-word {
          font-family: 'Anton', sans-serif;
          font-size: clamp(44px, 5.5vw, 72px);
          font-weight: 400;
          letter-spacing: 0.02em;
          line-height: 1.05;
          color: #d4cfc7;
          transition: color 0.3s ease;
          white-space: nowrap;
          user-select: none;
        }

        .parallax-word.accent { color: #3f4dd1; }

        /* Blurb beneath the words */
        .about-blurb {
          position: absolute;
          bottom: 60px;
          left: 32px;
          right: 48px;
          z-index: 3;
        }

        .about-blurb p {
          font-size: clamp(13px, 1.2vw, 15px);
          color: #7a7468;
          line-height: 1.7;
          max-width: 340px;
        }

        .about-blurb-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 18px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #1a1a1a;
          background: none;
          border: 1.5px solid #1a1a1a;
          border-radius: 2px;
          padding: 10px 24px;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .about-blurb-cta:hover {
          background: #1a1a1a;
          color: #f5f2ed;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .about-section { min-height: unset; }
          .about-inner {
            position: relative;
            height: auto;
            grid-template-columns: 1fr;
          }
          .about-left { padding: 60px 24px 40px; }
          .about-right { padding: 40px 24px 60px; border-left: none; border-top: 1px solid rgba(0,0,0,0.07); }
          .cards-row { height: 280px; }
          .about-blurb { position: relative; bottom: unset; left: unset; right: unset; margin-top: 32px; }
          .parallax-track { transform: none !important; }
          .parallax-word { font-size: clamp(36px, 8vw, 56px); }
        }

        @media (max-width: 480px) {
          .cards-row { height: 220px; gap: 5px; }
          .story-card { flex: 0 0 34px; }
        }

        /* ════════════════════════
           MISSION DRAWER
        ════════════════════════ */

        /* Overlay */
        .mission-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 13, 10, 0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 200;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s ease;
        }
        .mission-overlay.open {
          opacity: 1;
          pointer-events: all;
        }

        /* Drawer panel — slides up from bottom */
        .mission-drawer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 201;
          background: #ffffff;
          border-radius: 24px 24px 0 0;
          max-height: 88vh;
          overflow-y: auto;
          transform: translateY(100%);
          transition: transform 0.42s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 0 0 48px;
        }
        .mission-drawer.open {
          transform: translateY(0);
        }

        /* Drag handle */
        .drawer-handle {
          display: flex;
          justify-content: center;
          padding: 16px 0 8px;
          cursor: pointer;
        }
        .drawer-handle-bar {
          width: 40px;
          height: 4px;
          border-radius: 2px;
          background: #d4cfc7;
        }

        /* Drawer header */
        .drawer-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 8px 36px 24px;
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }
        .drawer-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 400;
          color: #1a1a1a;
          letter-spacing: 0.02em;
          line-height: 1.05;
        }
        .drawer-title .accent { color: #3f4dd1; }

        .drawer-close {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #f5f2ed;
          border: none;
          cursor: pointer;
          font-size: 18px;
          color: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 4px;
          transition: background 0.18s ease;
        }
        .drawer-close:hover { background: #e8e4de; }

        /* Drawer body */
        .drawer-body {
          padding: 32px 36px 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .drawer-section-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #3f4dd1;
          margin-bottom: 10px;
        }

        .drawer-section-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(18px, 2.2vw, 26px);
          font-weight: 400;
          color: #1a1a1a;
          letter-spacing: 0.02em;
          margin-bottom: 14px;
        }

        .drawer-section-text {
          font-size: 14px;
          line-height: 1.75;
          color: #6b6560;
        }

        /* Values pills */
        .drawer-values {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 20px;
        }
        .drawer-pill {
          padding: 6px 16px;
          border-radius: 999px;
          border: 1.5px solid #3f4dd1;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: #3f4dd1;
          background: transparent;
        }

        /* Stats row */
        .drawer-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 32px;
          padding-top: 28px;
          border-top: 1px solid rgba(0,0,0,0.07);
          grid-column: 1 / -1;
        }
        .drawer-stat {
          text-align: center;
        }
        .drawer-stat-number {
          font-family: 'Anton', sans-serif;
          font-size: clamp(28px, 3.5vw, 42px);
          font-weight: 400;
          color: #1a1a1a;
          line-height: 1;
        }
        .drawer-stat-number .accent { color: #3f4dd1; }
        
        .drawer-stat-label {
          font-size: 12px;
          color: #9a9080;
          margin-top: 4px;
          letter-spacing: 0.06em;
        }

        @media (max-width: 640px) {
          .drawer-body { grid-template-columns: 1fr; gap: 28px; padding: 24px 20px 0; }
          .drawer-header { padding: 8px 20px 20px; }
          .drawer-stats { grid-template-columns: repeat(3, 1fr); gap: 10px; }
        }
      `}</style>

      <section className="about-section" ref={sectionRef}>
        <div className="about-inner">

          {/* ══ LEFT ══ */}
          <div className="about-left">
            <div className="about-left-header">
              <p className="about-label">Who we are</p>
              <h2 className="about-title">About </h2>
              <h2 className="about-title">
                <span className="accent">H</span>
                <span className="accent">A</span>
                <span className="accent">C</span>
                <span className="accent">H</span>
                <span className="accent">A</span>
                <span className="accent">C</span>
              </h2>
            </div>

            <div className="cards-row">
              {stories.map((story) => {
                const isActive = active === story.id;
                return (
                  <div
                    key={story.id}
                    className={`story-card${isActive ? " active" : ""}`}
                    onClick={() => setActive(story.id)}
                    onMouseEnter={() => setActive(story.id)}
                    role="button"
                    aria-label={story.name}
                  >
                    <img
                      className="story-img"
                      src={story.image}
                      alt={story.name}
                      style={{ objectPosition: story.position }}
                    />
                    <div className="story-gradient" />
                    <div className="story-expand-icon">↗</div>
                    <div className="story-content">
                      <p className="story-name">{story.name}</p>
                      <p className="story-desc">{story.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ══ RIGHT ══ */}
          <div className="about-right">
            {/* Parallax word track — translateY driven by scroll */}
            <div
              className="parallax-track"
              style={{
                transform: `translateY(${-scrollY * 340}px)`,
                transition: "transform 0.05s linear",
              }}
            >
              {parallaxLines.map((line, i) => (
                <p
                  key={i}
                  className={`parallax-word${line.accent ? " accent" : ""}`}
                >
                  {line.text}
                </p>
              ))}
            </div>

            {/* Static blurb pinned to bottom */}
            <div className="about-blurb">
              <p>
                HACHAC Foundation is a people-first organisation committed to
                unlocking potential in youth and underserved communities across
                Africa — through education, technology, and lasting partnerships.
              </p>
              <button className="about-blurb-cta" onClick={() => setMissionOpen(true)}>
                Our mission ↗
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ══ MISSION DRAWER ══ */}
      {/* Overlay */}
      <div
        className={`mission-overlay${missionOpen ? " open" : ""}`}
        onClick={() => setMissionOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className={`mission-drawer${missionOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Our Mission"
      >
        {/* Drag handle */}
        <div className="drawer-handle" onClick={() => setMissionOpen(false)}>
          <div className="drawer-handle-bar" />
        </div>

        {/* Header */}
        <div className="drawer-header">
          <h2 className="drawer-title">
            OUR <span className="accent">MISSION</span>
          </h2>
          <button
            className="drawer-close"
            onClick={() => setMissionOpen(false)}
            aria-label="Close mission drawer"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="drawer-body">

          {/* Left col */}
          <div>
            <p className="drawer-section-label">What we stand for</p>
            <h3 className="drawer-section-title">Unlocking human potential across Africa</h3>
            <p className="drawer-section-text">
              HACHAC (Help a child have a career) Foundation exists to dismantle the barriers that prevent young people
              and underserved communities from reaching their full potential. We believe
              that every individual — regardless of background — deserves access to
              education, opportunity, and dignified living.
            </p>
            <p className="drawer-section-text" style={{ marginTop: 14 }}>
              Through our programmes we invest in people: equipping them with skills,
              connecting them with resources, and amplifying their voices so they can
              shape the futures of their own communities.
            </p>

            <div className="drawer-values">
              {["Dignity", "Equity", "Empowerment", "Innovation", "Ubuntu"].map((v) => (
                <span key={v} className="drawer-pill">{v}</span>
              ))}
            </div>
          </div>

          {/* Right col */}
          <div>
            <p className="drawer-section-label">How we work</p>
            <h3 className="drawer-section-title">Programmes built on community trust</h3>
            <p className="drawer-section-text">
              We partner with local leaders, schools, and organisations who understand
              the unique needs of their communities. Our five core programmes — from the
              Change Makers Initiative to our Sponsorship &amp; Partnerships desk — are
              designed to complement each other and create lasting systemic change.
            </p>
            <p className="drawer-section-text" style={{ marginTop: 14 }}>
              We measure our success not just in numbers but in stories: the girl who
              finished school, the young man who launched a business, the family that
              finally has enough to eat.
            </p>
          </div>

          {/* Stats full-width row */}
          <div className="drawer-stats">
            {[
              { number: "100+", label: "Lives impacted" },
              { number: "5",    label: "Core programmes" },
              { number: "2+",   label: "Years of service" },
            ].map((stat) => (
              <div key={stat.label} className="drawer-stat">
                <p className="drawer-stat-number">
                  <span className="accent">{stat.number}</span>
                </p>
                <p className="drawer-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}