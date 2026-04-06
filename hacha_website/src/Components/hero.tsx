// HacHacHero.tsx
// Replace the background-image URL in .mask-word with your own photo.

export default function HacHacHero() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .hero {
          width: 100%;
          min-height: 100svh;
          background: #F8F8FF;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 60px 24px;
        }

        /* ── Masked text ── */
        .mask-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          width: 100%;
          max-width: 1100px;
        }

        /*
          CSS background-clip: text trick —
          the photo is visible ONLY through the letter shapes.
          Replace the background-image URL with your own image.
        */
        .mask-word {
          font-family: 'Anton', sans-serif;
          font-size: clamp(90px, 20vw, 200px);
          font-weight: 400;           
          letter-spacing: 0.01em;
          line-height: 0.92;
          text-transform: uppercase;

          /* Image-through-text effect */
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          background-image: url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=85');
          background-size: cover;
          background-repeat: no-repeat;

          display: block;
          width: 100%;
          text-align: center;
          user-select: none;
          animation: revealMask 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /* Offset the background position on the second row so different
           faces/areas appear through FOUNDATION vs HACHAC */
        .mask-word:first-child {
          background-position: center 25%;
          animation-delay: 0s;
        }

        .mask-word:last-child {
          background-position: center 65%;
          animation-delay: 0.14s;
        }

        @keyframes revealMask {
          from { opacity: 0; clip-path: inset(0 0 100% 0); }
          to   { opacity: 1; clip-path: inset(0 0 0% 0); }
        }

        /* ── Tagline ── */
        .hero-tagline {
          margin-top: 36px;
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(11px, 1.3vw, 14px);
          font-weight: 500;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #aaa49c;
          text-align: center;
          animation: fadeUp 1.6s ease both;
          animation-delay: 0.4s;
        }

        /* ── CTA ── */
        .hero-cta {
          margin-top: 24px;
          padding: 12px 40px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #1a1a1a;
          background: transparent;
          border: 1.5px solid #1a1a1a;
          border-radius: 2px;
          cursor: pointer;
          animation: fadeUp 1.8s ease both;
          animation-delay: 0.6s;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .hero-cta:hover {
          background: #1a1a1a;
          color: #ffffff;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="hero">
        <div className="mask-block">
          {/*
            To use your own image, replace the inline style backgroundImage
            on each span (or update the CSS .mask-word background-image above).

            Example with a local import:
              import photo from "./assets/your-photo.jpg";
              <span className="mask-word" style={{ backgroundImage: `url(${photo})` }}>
          */}
          <span className="mask-word">HACHAC</span>
          <span className="mask-word">FOUNDATION</span>
        </div>

        <p className="hero-tagline">Empowering communities · Building futures</p>
        {/* <button className="hero-cta">Learn more</button> */}
      </section>
    </>
  );
}