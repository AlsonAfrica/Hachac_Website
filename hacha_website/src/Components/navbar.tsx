// ReflexNavbar.tsx — HACHAC Foundation
// Uses your exact JSX structure with smooth-scroll navigation added.

import { useState, useEffect } from "react";

// Each link maps label → section id in App.tsx
const navLinks = [
  { label: "Home",     id: "home" },
  { label: "About",    id: "about" },
  { label: "Events",   id: "events" },
  { label: "Gallery",  id: "gallery" },
  { label: "Contact Us", id: "contact" },
];

export default function ReflexNavbar() {
  const [activeLink, setActiveLink] = useState("Home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  // Smooth scroll to the matching section id, then mark active
  const handleNavClick = (label: string, id: string) => {
    setActiveLink(label);
    setDrawerOpen(false);
    const el = document.getElementById(id);
    if (el) {
      // Offset by navbar height so section isn't hidden behind it
      const navHeight = 64;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { font-family: 'DM Sans', sans-serif; }

        /* ── Navbar ── */
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          padding: 0 32px;
          background: #ffffff;
          border-bottom: 1.5px solid #e8e8e4;
          font-family: 'DM Sans', sans-serif;
          transition: box-shadow 0.25s ease;
        }

        .navbar.scrolled {
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
        }

        /* ── Logo ── */
        .logo {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1px;
          text-decoration: none;
          flex-shrink: 0;
          line-height: 1;
        }

        .logo-row1 {
          display: flex;
          align-items: baseline;
          font-family: 'DM Sans', sans-serif;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .logo-row2 {
          display: flex;
          align-items: baseline;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.3px;
        }

        /* HACHAC letter colours */
        .h1  { color: #F5C518; }
        .a1  { color: #E63327; }
        .c1  { color: #3BAEE8; }
        .h2  { color: #111111; }
        .a2  { color: #A0A0A0; }
        .c2  { color: #4CAF50; }

        /* Foundation letter colours */
        .f1  { color: #E63327; }
        .o1  { color: #F5C518; }
        .u1  { color: #3BAEE8; }
        .n1  { color: #4CAF50; }
        .d1  { color: #E63327; }
        .aa1 { color: #111111; }
        .t1  { color: #A0A0A0; }
        .i1  { color: #9C27B0; }
        .o2  { color: #3BAEE8; }
        .n2  { color: #A0A0A0; }

        /* ── Desktop nav links ── */
        .nav-links-desktop {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin-left: 40px;
        }

        .nav-item { position: relative; }

        .nav-link {
          display: block;
          padding: 8px 14px;
          font-size: 14.5px;
          font-weight: 500;
          color: #888880;
          letter-spacing: -0.1px;
          border-radius: 6px;
          transition: color 0.18s ease;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
        }

        .nav-link:hover { color: #111111; }
        .nav-link.active { color: #111111; font-weight: 600; }

        .active-dot {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          border-radius: 2px;
          background: #8dc63f;
        }

        /* ── Hamburger ── */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 40px;
          height: 40px;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 8px;
          transition: background 0.15s ease;
          padding: 0;
          flex-shrink: 0;
        }

        .hamburger:hover { background: #f0f0ec; }

        .hamburger-line {
          width: 22px;
          height: 2px;
          background: #111111;
          border-radius: 2px;
          transform-origin: center;
          transition: transform 0.25s ease, opacity 0.2s ease;
        }

        .hamburger.open .hamburger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open .hamburger-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open .hamburger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Drawer overlay ── */
        .drawer-overlay {
          display: none;
          position: fixed;
          inset: 64px 0 0 0;
          background: rgba(0,0,0,0.18);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          z-index: 90;
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .drawer-overlay.visible { opacity: 1; }

        /* ── Mobile drawer ── */
        .drawer {
          position: fixed;
          top: 64px;
          left: 0; right: 0;
          z-index: 95;
          background: #ffffff;
          border-bottom: 1.5px solid #e8e8e4;
          padding: 8px 16px 20px;
          transform: translateY(-8px);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease;
        }

        .drawer.open { transform: translateY(0); opacity: 1; pointer-events: all; }

        .drawer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-bottom: 16px;
        }

        .drawer-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 12px 16px;
          font-size: 15px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          color: #888880;
          background: none;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.14s ease, color 0.14s ease;
        }

        .drawer-link:hover { background: #f5f5f2; color: #111; }
        .drawer-link.active { background: #f5f5f2; color: #111; font-weight: 600; }

        .drawer-active-dot {
          width: 6px; height: 6px;
          border-radius: 2px;
          background: #8dc63f;
          flex-shrink: 0;
        }

        .drawer-divider { height: 1px; background: #e8e8e4; margin: 8px 0 16px; }

        .drawer-demo-btn {
          display: block;
          width: 100%;
          padding: 12px 20px;
          font-size: 14.5px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          color: #111111;
          background: #f0f0ec;
          border: 1.5px solid #ddddd8;
          border-radius: 10px;
          cursor: pointer;
          text-align: center;
          transition: background 0.16s ease;
        }

        .drawer-demo-btn:hover { background: #e6e6e0; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .navbar { padding: 0 16px; }
          .nav-links-desktop { display: none; }
          .hamburger { display: flex; }
          .drawer-overlay { display: block; }
        }

        @media (min-width: 769px) {
          .drawer { display: none; }
          .drawer-overlay { display: none; }
        }
      `}</style>

      {/* Backdrop overlay */}
      <div
        className={`drawer-overlay${drawerOpen ? " visible" : ""}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Navbar */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Logo — clicking scrolls to #home */}
          <a
            href="#"
            className="logo"
            onClick={(e) => { e.preventDefault(); handleNavClick("Home", "home"); }}
          >
            <span className="logo-row1">
              <span className="h1">H</span>
              <span className="a1">A</span>
              <span className="c1">C</span>
              <span className="h2">H</span>
              <span className="a2">A</span>
              <span className="c2">C</span>
            </span>
            <span className="logo-row2">
              <span className="f1">F</span>
              <span className="o1">o</span>
              <span className="u1">u</span>
              <span className="n1">n</span>
              <span className="d1">d</span>
              <span className="aa1">a</span>
              <span className="t1">t</span>
              <span className="i1">i</span>
              <span className="o2">o</span>
              <span className="n2">n</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="nav-links-desktop">
            {navLinks.map((link) => (
              <li key={link.label} className="nav-item">
                <button
                  className={`nav-link${activeLink === link.label ? " active" : ""}`}
                  onClick={() => handleNavClick(link.label, link.id)}
                >
                  {link.label}
                </button>
                {activeLink === link.label && <span className="active-dot" />}
              </li>
            ))}
          </ul>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger${drawerOpen ? " open" : ""}`}
          onClick={() => setDrawerOpen((o) => !o)}
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={drawerOpen}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`drawer${drawerOpen ? " open" : ""}`} aria-hidden={!drawerOpen}>
        <ul className="drawer-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                className={`drawer-link${activeLink === link.label ? " active" : ""}`}
                onClick={() => handleNavClick(link.label, link.id)}
              >
                {link.label}
                {activeLink === link.label && <span className="drawer-active-dot" />}
              </button>
            </li>
          ))}
        </ul>
        <div className="drawer-divider" />
        {/* <button
          className="drawer-demo-btn"
          onClick={() => handleNavClick("Contact Us", "contact")}
        >
          Get in touch
        </button> */}
      </div>
    </>
  );
}