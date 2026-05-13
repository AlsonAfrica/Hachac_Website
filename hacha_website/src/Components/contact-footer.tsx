// ContactFooter.tsx
// Contact form + footer with map embed, social icons, and side image.
// Replace the Google Maps embed src with your own location.

import { useState } from "react";

export default function ContactFooter() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  // const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const socials = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100069141347199",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/hachacfoundation/",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    // {
    //   name: "X / Twitter",
    //   href: "#",
    //   icon: (
    //     <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    //       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    //     </svg>
    //   ),
    // },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/hachac-foundation-7b9033330/",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    // {
    //   name: "YouTube",
    //   href: "#",
    //   icon: (
    //     <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    //       <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.96-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    //       <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0f0d0a" />
    //     </svg>
    //   ),
    // },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ═══════════════════════════
           CONTACT SECTION
        ═══════════════════════════ */
        .contact-section {
          width: 100%;
          background: #faf8f5;
          padding: 100px 48px;
          font-family: 'DM Sans', sans-serif;
        }

        .contact-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        /* ── Left: info + map ── */
        .contact-left {}

        .contact-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #3f4dd1;
          margin-bottom: 10px;
        }

        .contact-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(32px, 4.5vw, 56px);
          font-weight: 400;
          color: #1a1a1a;
          line-height: 1.02;
          letter-spacing: 0.02em;
          margin-bottom: 20px;
        }

        .contact-title .accent { color: #3f4dd1; }
        .contact-title .accent:nth-child(2n) { color: #E63327; }
        .contact-title .accent:nth-child(3n) { color: #F5C518; }
        .contact-title .accent:nth-child(4n) { color: #4CAF50; }
        .contact-title .accent:nth-child(5n) { color: #A0A0A0; }
        .contact-title .accent:nth-child(6n) { color: #1a1a1a; }
    

        .contact-blurb {
          font-size: 14px;
          color: #7a7468;
          line-height: 1.75;
          max-width: 380px;
          margin-bottom: 36px;
        }

        /* Info rows */
        .contact-info-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 36px;
        }

        .contact-info-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .contact-info-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #f0ede8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .contact-info-text p:first-child {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #aaa49c;
          margin-bottom: 3px;
        }

        .contact-info-text p:last-child {
          font-size: 14px;
          color: #1a1a1a;
          font-weight: 500;
        }

        /* Map embed */
        .contact-map {
          width: 100%;
          height: 240px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e8e4de;
          margin-bottom: 28px;
        }

        .contact-map iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        /* Social icons row */
        .contact-socials {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .contact-socials-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #aaa49c;
          margin-right: 4px;
        }

        .social-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid #e0dcd6;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7a7468;
          cursor: pointer;
          transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
          text-decoration: none;
        }

        .social-btn:hover {
          background: #3f4dd1;
          color: #ffffff;
          border-color: #3f4dd1;
          transform: translateY(-2px);
        }

        /* ── Right: form ── */
        .contact-form-wrap {
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid #e8e4de;
          padding: 40px 36px 44px;
        }

        .form-title {
          font-family: 'Anton', sans-serif;
          font-size: 24px;
          font-weight: 400;
          color: #1a1a1a;
          letter-spacing: 0.02em;
          margin-bottom: 28px;
        }

        /* Field group */
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }

        .form-group.no-mb { margin-bottom: 0; }

        .form-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #aaa49c;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1.5px solid #e8e4de;
          background: #faf8f5;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1a1a1a;
          outline: none;
          transition: border-color 0.18s ease, background 0.18s ease;
          appearance: none;
        }

        .form-input::placeholder,
        .form-textarea::placeholder { color: #c8c3bc; }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: #3f4dd1;
          background: #ffffff;
        }

        .form-textarea {
          resize: none;
          height: 130px;
          line-height: 1.6;
        }

        .form-submit {
          width: 100%;
          padding: 14px 24px;
          border-radius: 10px;
          border: none;
          background: #1a1a1a;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #ffffff;
          cursor: pointer;
          margin-top: 20px;
          transition: background 0.2s ease, transform 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .form-submit:hover { background: #3f4dd1; transform: translateY(-1px); }
        .form-submit:active { transform: translateY(0); }

        /* Success state */
        .form-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 48px 24px;
          gap: 16px;
        }

        .form-success-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #eef0fd;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }

        .form-success h3 {
          font-family: 'Anton', sans-serif;
          font-size: 22px;
          font-weight: 400;
          color: #1a1a1a;
          letter-spacing: 0.02em;
        }

        .form-success p {
          font-size: 14px;
          color: #7a7468;
          line-height: 1.65;
          max-width: 280px;
        }

        /* ═══════════════════════════
           FOOTER
        ═══════════════════════════ */
        .footer {
          width: 100%;
          background: #0f0d0a;
          font-family: 'DM Sans', sans-serif;
          color: #ffffff;
        }

        .footer-top {
          padding: 72px 48px 56px;
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 48px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          max-width: 1300px;
          margin: 0 auto;
        }

        /* ── Brand col ── */
        .footer-brand {}

        .footer-logo {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-bottom: 20px;
        }

        .footer-logo-row1 {
          font-family: 'Anton', sans-serif;
          font-size: 22px;
          font-weight: 400;
          letter-spacing: 0.04em;
          line-height: 1;
          display: flex;
        }

        /* Individual letter colours matching the brand */
        .fl-h1 { color: #F5C518; }
        .fl-a1 { color: #E63327; }
        .fl-c1 { color: #3BAEE8; }
        .fl-h2 { color: #ffffff; }
        .fl-a2 { color: #A0A0A0; }
        .fl-c2 { color: #4CAF50; }

        .footer-logo-row2 {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          display: flex;
        }

        .footer-brand-text {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          line-height: 1.7;
          max-width: 260px;
          margin-bottom: 24px;
        }

        /* Small side image */
        .footer-side-img {
          width: 100%;
          max-width: 240px;
          height: 130px;
          object-fit: cover;
          border-radius: 12px;
          opacity: 0.6;
          filter: grayscale(0.3);
          transition: opacity 0.3s ease;
        }

        .footer-side-img:hover { opacity: 0.85; }

        /* ── Nav cols ── */
        .footer-col-title {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 18px;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
          list-style: none;
        }

        .footer-links a {
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: color 0.18s ease;
        }

        .footer-links a:hover { color: #ffffff; }

        /* ── Footer bottom ── */
        .footer-bottom {
          padding: 24px 48px;
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer-copy {
          font-size: 12px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.04em;
        }

        .footer-socials {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-social-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.12);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          text-decoration: none;
          transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
        }

        .footer-social-btn:hover {
          background: #3f4dd1;
          color: #ffffff;
          border-color: #3f4dd1;
        }

        .footer-policy-links {
          display: flex;
          gap: 20px;
        }

        .footer-policy-links a {
          font-size: 12px;
          color: rgba(255,255,255,0.25);
          text-decoration: none;
          transition: color 0.18s ease;
        }

        .footer-policy-links a:hover { color: rgba(255,255,255,0.6); }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .contact-inner { grid-template-columns: 1fr; gap: 56px; }
          .footer-top { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 640px) {
          .contact-section { padding: 72px 20px; }
          .contact-form-wrap { padding: 28px 20px 32px; }
          .form-row { grid-template-columns: 1fr; }
          .footer-top { grid-template-columns: 1fr; padding: 48px 24px 40px; gap: 32px; }
          .footer-bottom { padding: 20px 24px; flex-direction: column; align-items: flex-start; }
          .footer-policy-links { flex-wrap: wrap; gap: 12px; }
        }
      `}</style>

      {/* ═══════════════════ CONTACT SECTION ═══════════════════ */}
      <section className="contact-section">
        <div className="contact-inner">

          {/* ── Left: info + map + socials ── */}
          <div className="contact-left">
            <p className="contact-label">Get in touch</p>
            <h2 className="contact-title">
           LET'S <span className="accent">C</span>
                <span className="accent">O</span>
                <span className="accent">N</span>
                <span className="accent">N</span>
                <span className="accent">E</span>
                <span className="accent">C</span>
                <span className="accent">T</span>
            </h2>
            <p className="contact-blurb">
              Have a question, want to partner with us, or simply want to learn more
              about HACHAC Foundation? We'd love to hear from you.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-row">
                <div className="contact-info-icon">📍</div>
                <div className="contact-info-text">
                  <p>Address</p>
                  <p>Soweto, Jabavu Skills Center, 313 Diokane Street</p>
                </div>
              </div>
              <div className="contact-info-row">
                <div className="contact-info-icon">✉️</div>
                <div className="contact-info-text">
                  <p>Email</p>
                  <p>info@hachacfoundation.org</p>
                </div>
              </div>
              <div className="contact-info-row">
                <div className="contact-info-icon">📞</div>
                <div className="contact-info-text">
                  <p>Phone</p>
                  <p>+27 65 918 1911</p>
                </div>
              </div>
            </div>

            {/* Map embed — replace src with your Google Maps embed URL */}
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps?q=Jabavu+Skills+Center,+313+Diokane+Street&output=embed"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="HACHAC Foundation location"
              />
            </div>

            {/* Social icons */}
            <div className="contact-socials">
              <span className="contact-socials-label">Follow us</span>
              {socials.map((s) => (
                <a key={s.name} href={s.href} className="social-btn" aria-label={s.name} title={s.name}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="form-success">
                <div className="form-success-icon">✓</div>
                <h3>MESSAGE SENT</h3>
                <p>Thank you for reaching out. Our team will get back to you within 2 business days.</p>
              </div>
            ) : (
              <>
                <h3 className="form-title">SEND A MESSAGE</h3>

                <div className="form-row">
                  <div className="form-group no-mb">
                    <label className="form-label">Full name</label>
                    <input
                      className="form-input"
                      name="name"
                      type="text"
                      placeholder="Name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group no-mb">
                    <label className="form-label">Email address</label>
                    <input
                      className="form-input"
                      name="email"
                      type="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select
                    className="form-select"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select a subject…</option>
                    <option value="partnership">Partnership enquiry</option>
                    <option value="sponsorship">Sponsorship</option>
                    <option value="volunteer">Volunteer opportunities</option>
                    <option value="media">Media & press</option>
                    <option value="general">General enquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-textarea"
                    name="message"
                    placeholder="Tell us how we can help…"
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button className="form-submit" onClick={handleSubmit}>
                  Send message ↗
                </button>
              </>
            )}
          </div>

        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="footer">
        <div className="footer-top">

          {/* Brand col */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-row1">
                <span className="fl-h1">H</span>
                <span className="fl-a1">A</span>
                <span className="fl-c1">C</span>
                <span className="fl-h2">H</span>
                <span className="fl-a2">A</span>
                <span className="fl-c2">C</span>
              </div>
              <div className="footer-logo-row2">
                {"Foundation".split("").map((ch, i) => (
                  <span key={i}>{ch}</span>
                ))}
              </div>
            </div>

            <p className="footer-brand-text">
              A people-first foundation committed to unlocking potential in youth and
              underserved communities across Africa — through education, technology,
              and lasting partnerships.
            </p>

            {/* Small side image — replace src with your own */}
            <img
              className="footer-side-img"
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=75"
              alt="HACHAC Foundation community"
            />
          </div>

          {/* Nav col — Programmes */}
          <div>
            <p className="footer-col-title">Programmes</p>
            <ul className="footer-links">
              <li><a href="#">Change Makers Initiative</a></li>
              <li><a href="#">Leadership Academy</a></li>
              <li><a href="#">Tech Department</a></li>
              <li><a href="#">Youth Advancement</a></li>
              <li><a href="#">Sponsorship & Partnerships</a></li>
            </ul>
          </div>

          {/* Nav col — Organisation */}
          <div>
            <p className="footer-col-title">Organisation</p>
            <ul className="footer-links">
              <li><a href="#">About HACHAC</a></li>
              <li><a href="#">Our Mission</a></li>
              <li><a href="#">Previous Events</a></li>
              <li><a href="#">Gallery</a></li>
              <li><a href="#">Stories</a></li>
            </ul>
          </div>

          {/* Nav col — Get involved */}
          <div>
            <p className="footer-col-title">Get Involved</p>
            <ul className="footer-links">
              <li><a href="#">Become a Partner</a></li>
              <li><a href="#">Volunteer</a></li>
              <li><a href="#">Donate</a></li>
              <li><a href="#">Media & Press</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

        </div>

        {/* Footer bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} HACHAC Foundation. All rights reserved.
          </p>

          <div className="footer-socials">
            {socials.map((s) => (
              <a key={s.name} href={s.href} className="footer-social-btn" aria-label={s.name} title={s.name}>
                {s.icon}
              </a>
            ))}
          </div>

          {/* <div className="footer-policy-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Cookie Settings</a>
          </div> */}
        </div>
      </footer>
    </>
  );
}