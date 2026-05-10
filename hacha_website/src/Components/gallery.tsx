import { useState } from "react";
import hachacTeam from "../assets/gallery-pics/team.jpg"
import children from "../assets/gallery-pics/youth.jpg"
import items from "../assets/gallery-pics/event.jpg"

interface GalleryItem {
  id: number;
  image: string;
  caption: string;
  span: "tall" | "wide" | "normal";
}

const gallery: GalleryItem[] = [
  {
    id: 1,
    image: children,
    caption: "Youth Leadership Summit 2026",
    span: "tall",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80",
    caption: "Girls in STEM Workshop",
    span: "normal",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    caption: "Tech for Good Hackathon",
    span: "normal",
  },
  {
    id: 4,
    image: hachacTeam,
    caption: "Hachac Team",
    span: "wide",
  },
  {
    id: 5,
    image: items,
    caption: "ABB Sponsorship",
    span: "normal",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    caption: "Sponsorship Awards Ceremony",
    span: "tall",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80",
    caption: "Annual Partners Dinner",
    span: "normal",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80",
    caption: "Leadership Academy Graduation",
    span: "wide",
  },
];

// Partner logos — using placeholder text logos; replace src with actual logo images
const partners = [
  { name: "Bontle ba Lefatshe Community Project", logo: null },
  { name: "LORE Academy",         logo: null },
  { name: "EnviroCentric", logo: null },
  { name: "All4Youth",    logo: null },
  { name: "Logiscool",   logo: null },
  { name: "Afroplaneteerz", logo: null },
  { name: "HashTheory",      logo: null },
];

const partnersLoop = [...partners, ...partners];

export default function GalleryPartnersSection() {
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ═══════════════════════════
           GALLERY SECTION
        ═══════════════════════════ */
        .gallery-section {
          width: 100%;
          background: #faf8f5;
          padding: 100px 48px 80px;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Header ── */
        .gallery-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .gallery-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #3f4dd1;
          margin-bottom: 10px;
        }

        .gallery-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(36px, 5.5vw, 64px);
          font-weight: 400;
          color: #1a1a1a;
          line-height: 1;
          letter-spacing: 0.02em;
        }

        .gallery-title .accent { color: #3f4dd1; }
        .gallery-title .accent:nth-child(2n) { color: #e84c1e; }
        .gallery-title .accent:nth-child(3n) { color: #F5C518; }
        .gallery-title .accent:nth-child(4n) { color: #4CAF50; }
        .gallery-title .accent:nth-child(5n) { color: #A0A0A0; }
        .gallery-title .accent:nth-child(6n) { color: #111111; }

        .gallery-subtitle {
          font-size: 15px;
          color: #7a7468;
          line-height: 1.65;
          max-width: 400px;
          margin: 14px auto 0;
        }

        /* ── Masonry grid ── */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 220px;
          gap: 10px;
        }

        .gallery-item {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          cursor: zoom-in;
          background: #e8e4de;
        }

        /* Span variants */
        .gallery-item.tall   { grid-row: span 2; }
        .gallery-item.wide   { grid-column: span 2; }
        .gallery-item.normal { grid-row: span 1; grid-column: span 1; }

        .gallery-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
          transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1),
                      filter 0.4s ease;
          filter: brightness(0.88);
        }

        .gallery-item:hover .gallery-img {
          transform: scale(1.07);
          filter: brightness(0.5);
        }

        /* Caption overlay */
        .gallery-caption {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 40px 18px 16px;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
          z-index: 2;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.32s ease, transform 0.32s ease;
        }

        .gallery-item:hover .gallery-caption {
          opacity: 1;
          transform: translateY(0);
        }

        .gallery-caption p {
          font-size: 13px;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.3;
        }

        /* Zoom icon */
        .gallery-zoom {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #1a1a1a;
          z-index: 3;
          opacity: 0;
          transform: scale(0.6);
          transition: opacity 0.25s ease, transform 0.25s ease;
          pointer-events: none;
        }

        .gallery-item:hover .gallery-zoom {
          opacity: 1;
          transform: scale(1);
        }

        /* ── Lightbox ── */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.92);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.28s ease;
        }

        .lightbox-overlay.open {
          opacity: 1;
          pointer-events: all;
        }

        .lightbox-img {
          max-width: 90vw;
          max-height: 85vh;
          border-radius: 12px;
          object-fit: contain;
          transform: scale(0.92);
          transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
        }

        .lightbox-overlay.open .lightbox-img {
          transform: scale(1);
        }

        .lightbox-close {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          color: #ffffff;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.18s ease;
        }

        .lightbox-close:hover { background: rgba(255,255,255,0.22); }

        .lightbox-caption {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.08em;
          white-space: nowrap;
        }

        /* ═══════════════════════════
           PARTNERS SECTION
        ═══════════════════════════ */
        .partners-section {
          width: 100%;
          background: #ffffff;
          padding: 72px 0 80px;
          border-top: 1px solid #eeebe5;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        .partners-header {
          text-align: center;
          margin-bottom: 52px;
          padding: 0 48px;
        }

        .partners-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #3f4dd1;
          margin-bottom: 10px;
        }

        .partners-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 400;
          color: #1a1a1a;
          letter-spacing: 0.02em;
          line-height: 1;
        }

        .partners-title .accent { color: #3f4dd1; }
        .partners-title .accent:nth-child(2n) { color: #e84c1e; }
        .partners-title .accent:nth-child(3n) { color: #F5C518; }
        .partners-title .accent:nth-child(4n) { color: #4CAF50; }
        .partners-title .accent:nth-child(5n) { color: #A0A0A0; }
        .partners-title .accent:nth-child(6n) { color: #111111; }
        .partners-title .accent:nth-child(7n) { color: #3f4dd1; }
        .partners-title .accent:nth-child(8n) { color: #e84c1e; }

        .partners-subtitle {
          font-size: 14px;
          color: #7a7468;
          max-width: 360px;
          margin: 12px auto 0;
          line-height: 1.6;
        }

        /* ── Marquee track ── */
        .marquee-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        /* Fade edges */
        .marquee-wrapper::before,
        .marquee-wrapper::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        .marquee-wrapper::before { left: 0;  background: linear-gradient(to right, #ffffff, transparent); }
        .marquee-wrapper::after  { right: 0; background: linear-gradient(to left,  #ffffff, transparent); }

        .marquee-track {
          display: flex;
          align-items: center;
          gap: 0;
          width: max-content;
          animation: marquee 28s linear infinite;
        }

        .marquee-track:hover { animation-play-state: paused; }

        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ── Partner logo card ── */
        .partner-card {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 48px;
          height: 88px;
          border-right: 1px solid #eeebe5;
          flex-shrink: 0;
          transition: opacity 0.2s ease;
        }

        .partner-card:hover { opacity: 0.65; }

        .partner-logo-text {
          font-family: 'Anton', sans-serif;
          font-size: 20px;
          font-weight: 400;
          letter-spacing: 0.04em;
          color: #c8c3bc;
          white-space: nowrap;
          transition: color 0.2s ease;
        }

        .partner-card:hover .partner-logo-text { color: #3f4dd1; }

        /* If using real logo images */
        .partner-logo-img {
          height: 32px;
          width: auto;
          object-fit: contain;
          filter: grayscale(1) opacity(0.45);
          transition: filter 0.2s ease;
        }

        .partner-card:hover .partner-logo-img {
          filter: grayscale(0) opacity(1);
        }

        /* ── Second marquee row (reversed) ── */
        .marquee-track.reverse {
          animation-direction: reverse;
          margin-top: 0;
        }

        .marquee-row-gap { height: 1px; background: #eeebe5; }

        /* ── CTA beneath partners ── */
        .partners-cta {
          text-align: center;
          margin-top: 52px;
          padding: 0 48px;
        }

        .partners-cta p {
          font-size: 14px;
          color: #7a7468;
          margin-bottom: 20px;
        }

        .partners-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 36px;
          border-radius: 2px;
          border: 1.5px solid #1a1a1a;
          background: transparent;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #1a1a1a;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .partners-cta-btn:hover {
          background: #1a1a1a;
          color: #ffffff;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .gallery-section { padding: 72px 24px 60px; }
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 200px;
          }
          .gallery-item.wide { grid-column: span 2; }
          .gallery-item.tall { grid-row: span 2; }
        }

        @media (max-width: 560px) {
          .gallery-grid {
            grid-template-columns: 1fr 1fr;
            grid-auto-rows: 160px;
          }
          .gallery-item.wide  { grid-column: span 2; }
          .gallery-item.tall  { grid-row: span 1; }
          .partner-card { padding: 0 28px; }
        }
      `}</style>

      {/* ═══════════════════════════ GALLERY ═══════════════════════════ */}
      <section className="gallery-section">

        <div className="gallery-header">
          <p className="gallery-label">Captured moments</p>

          <h2 className="gallery-title">
            OUR <span className="accent">G</span>
             <span className="accent">A</span>
             <span className="accent">L</span>
             <span className="accent">L</span>
             <span className="accent">E</span>
             <span className="accent">R</span>
             <span className="accent">Y</span>
          </h2>

          <p className="gallery-subtitle">
            A glimpse into the events, people, and places that define HACHAC Foundation.
          </p>
        </div>

        <div className="gallery-grid">
          {gallery.map((item) => (
            <div
              key={item.id}
              className={`gallery-item ${item.span}`}
              onClick={() => setLightbox(item)}
            >
              <img className="gallery-img" src={item.image} alt={item.caption} />
              <div className="gallery-zoom">⤢</div>
              <div className="gallery-caption">
                <p>{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Lightbox */}
      <div
        className={`lightbox-overlay${lightbox ? " open" : ""}`}
        onClick={() => setLightbox(null)}
      >
        {lightbox && (
          <>
            <img
              className="lightbox-img"
              src={lightbox.image}
              alt={lightbox.caption}
              onClick={(e) => e.stopPropagation()}
            />
            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <p className="lightbox-caption">{lightbox.caption}</p>
          </>
        )}
      </div>

      {/* ═══════════════════════════ PARTNERS ═══════════════════════════ */}
      <section className="partners-section">

        <div className="partners-header">
          <p className="partners-label">Who walks with us</p>
          <h2 className="partners-title">
            
            OUR  <span className="accent">P</span>
             <span className="accent">A</span>
             <span className="accent">R</span>
             <span className="accent">T</span>
             <span className="accent">N</span>
             <span className="accent">E</span>
             <span className="accent">R</span>
             <span className="accent">S</span>
          </h2>
          <p className="partners-subtitle">
            We are proud to work alongside organisations that share our commitment to people and purpose.
          </p>
        </div>

        {/* Marquee row 1 — left to right */}
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {partnersLoop.map((partner, i) => (
              <div key={i} className="partner-card">
                {partner.logo ? (
                  <img className="partner-logo-img" src={partner.logo} alt={partner.name} />
                ) : (
                  <span className="partner-logo-text">{partner.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="marquee-row-gap" />

        {/* Marquee row 2 — right to left */}
        <div className="marquee-wrapper">
          <div className="marquee-track reverse">
            {[...partnersLoop].reverse().map((partner, i) => (
              <div key={i} className="partner-card">
                {partner.logo ? (
                  <img className="partner-logo-img" src={partner.logo} alt={partner.name} />
                ) : (
                  <span className="partner-logo-text">{partner.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {/* <div className="partners-cta">
          <p>Interested in partnering with HACHAC Foundation?</p>
          <button className="partners-cta-btn">Become a partner ↗</button>
        </div> */}

      </section>
    </>
  );
}


