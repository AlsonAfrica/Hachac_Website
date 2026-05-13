import { useState } from "react";

interface Event {
  id: number;
  date: string;
  month: string;
  year: string;
  title: string;
  location: string;
  category: string;
  description: string;
  image: string;
  attendees: number;
}

const events: Event[] = [
  {
    id: 1,
    date: "14",
    month: "NOV",
    year: "2024",
    title: "Youth Leadership Summit",
    location: "Kampala, Uganda",
    category: "Leadership",
    description:
      "Three days of intensive workshops uniting 200 young leaders from across East Africa to share ideas, build networks, and commit to community action.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
    attendees: 214,
  },
  {
    id: 2,
    date: "03",
    month: "SEP",
    year: "2024",
    title: "Tech for Good Hackathon",
    location: "Nairobi, Kenya",
    category: "Technology",
    description:
      "48-hour hackathon where youth teams built digital solutions for food security, education access, and clean water distribution.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80",
    attendees: 98,
  },
  {
    id: 3,
    date: "22",
    month: "JUN",
    year: "2024",
    title: "Community Harvest Festival",
    location: "Entebbe, Uganda",
    category: "Community",
    description:
      "A celebration of the urban garden programme's first harvest, bringing together families, donors, and local leaders to share food and stories.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80",
    attendees: 430,
  },
  {
    id: 4,
    date: "15",
    month: "MAR",
    year: "2024",
    title: "Sponsorship Gala Night",
    location: "Johannesburg, SA",
    category: "Partnerships",
    description:
      "An elegant evening connecting HACHAC Foundation with corporate partners, celebrating shared milestones and launching new sponsorship tiers.",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=900&q=80",
    attendees: 156,
  },
  {
    id: 5,
    date: "08",
    month: "FEB",
    year: "2024",
    title: "Girls in STEM Workshop",
    location: "Accra, Ghana",
    category: "Education",
    description:
      "Full-day workshop introducing 80 teenage girls to coding, robotics, and science through hands-on projects led by female STEM professionals.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900&q=80",
    attendees: 82,
  },
  {
    id: 6,
    date: "19",
    month: "OCT",
    year: "2023",
    title: "Change Makers Awards",
    location: "Kampala, Uganda",
    category: "Recognition",
    description:
      "Annual awards ceremony honouring outstanding community members, youth volunteers, and partner organisations driving change from the ground up.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&q=80",
    attendees: 310,
  },
];

const categories = ["All", "Leadership", "Technology", "Community", "Partnerships", "Education", "Recognition"];

const categoryColors: Record<string, string> = {
  Leadership:   "#3f4dd1",
  Technology:   "#0ea87e",
  Community:    "#e84c1e",
  Partnerships: "#9333ea",
  Education:    "#d97706",
  Recognition:  "#db2777",
};

export default function EventsSection() {
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = filter === "All" ? events : events.filter((e) => e.category === filter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Section ── */
        .events-section {
          width: 100%;
          background: #f5f2ed;
          padding: 100px 48px 120px;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Header ── */
        .events-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 48px;
          gap: 24px;
          flex-wrap: wrap;
        }

        .events-header-left {}

        .events-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #3f4dd1;
          margin-bottom: 10px;
        }

        .events-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(36px, 5.5vw, 64px);
          font-weight: 400;
          color: #0f0d0a;
          line-height: 1;
          letter-spacing: 0.02em;
        }

        .events-title .accent { color: #3f4dd1; }
        .events-title .accent:nth-child(2n) { color: #e84c1e; }
        .events-title .accent:nth-child(3n) { color: #F5C518; }
        .events-title .accent:nth-child(4n) { color: #4CAF50; }
        .event-title .accent:nth-child(5n) { color: #A0A0A0; }
        .events-title .accent:nth-child(6n) { color: #111111; }

        .events-subtitle {
          font-size: 14px;
          color: #6b6560;
          line-height: 1.65;
          max-width: 320px;
          margin-top: 14px;
        }

        /* ── Filter pills ── */
        .events-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }

        .filter-pill {
          padding: 7px 18px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.15);
          background: grey;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.45);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-pill:hover {
          border-color: rgba(255,255,255,0.35);
          color: rgba(160, 172, 187, 0.62);
        }

        .filter-pill.active {
          background: #3f4dd1;
          border-color: #3f4dd1;
          color: #0f0d0a;
        }

        /* ── Divider ── */
        .events-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin-bottom: 48px;
        }

        /* ── Grid ── */
        .events-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }

        /* ── Event card ── */
        .event-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 3 / 4;
          background: #1a1714;
        }

        /* Round corners on edge cards */
        .event-card:first-child  { border-radius: 20px 0 0 20px; }
        .event-card:last-child   { border-radius: 0 20px 20px 0; }
        .event-card:only-child   { border-radius: 20px; }

        /* When only 1 or 2 cards, fix radius */
        .events-grid:has(.event-card:nth-child(2):last-child) .event-card:first-child { border-radius: 20px 0 0 20px; }
        .events-grid:has(.event-card:nth-child(2):last-child) .event-card:last-child  { border-radius: 0 20px 20px 0; }

        .event-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                      filter 0.4s ease;
          filter: brightness(0.55) saturate(0.8);
        }

        .event-card:hover .event-img {
          transform: scale(1.07);
          filter: brightness(0.35) saturate(0.6);
        }

        /* Category badge */
        .event-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          padding: 5px 12px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #ffffff;
          z-index: 2;
          transition: opacity 0.3s ease;
        }

        /* Date block */
        .event-date-block {
          position: absolute;
          top: 20px;
          right: 20px;
          text-align: right;
          z-index: 2;
          transition: opacity 0.3s ease;
        }

        .event-date-num {
          font-family: 'Anton', sans-serif;
          font-size: 36px;
          color: #ffffff;
          line-height: 1;
          letter-spacing: 0.02em;
        }

        .event-date-meta {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.5);
          margin-top: 2px;
        }

        /* Bottom content — always visible */
        .event-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 28px 22px 24px;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
          z-index: 2;
        }

        .event-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(18px, 1.8vw, 22px);
          font-weight: 400;
          color: #ffffff;
          letter-spacing: 0.02em;
          line-height: 1.1;
          margin-bottom: 6px;
        }

        .event-location {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.06em;
        }

        /* Hover reveal — description + stats */
        .event-hover-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 24px 22px;
          z-index: 3;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s;
          pointer-events: none;
        }

        .event-card:hover .event-hover-content {
          opacity: 1;
          transform: translateY(0);
        }

        .event-desc {
          font-size: 13px;
          line-height: 1.65;
          color: rgba(255,255,255,0.82);
          margin-bottom: 20px;
        }

        .event-attendees {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
        }

        .event-attendees-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3f4dd1;
          flex-shrink: 0;
        }

        .event-attendees strong {
          color: #ffffff;
          font-weight: 600;
        }

        /* Arrow on hover */
        .event-arrow {
          position: absolute;
          bottom: 22px;
          right: 20px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          color: #ffffff;
          z-index: 4;
          opacity: 0;
          transform: scale(0.7) rotate(-45deg);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .event-card:hover .event-arrow {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }

        /* ── Footer count ── */
        .events-footer {
          margin-top: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .events-count {
          font-size: 13px;
          color: #4a4540;
          letter-spacing: 0.06em;
        }

        .events-count strong {
          color: #ffffff;
          font-weight: 600;
        }

        .events-more-btn {
          padding: 11px 32px;
          border-radius: 2px;
          border: 1.5px solid rgba(255,255,255,0.2);
          background: transparent;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
        }

        .events-more-btn:hover {
          border-color: #ffffff;
          color: #ffffff;
          background: rgba(255,255,255,0.06);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .events-section { padding: 72px 24px 80px; }
          .events-grid { grid-template-columns: repeat(2, 1fr); }
          .event-card:nth-child(2n+1):last-child { border-radius: 0 0 20px 20px; }
        }

        @media (max-width: 560px) {
          .events-grid { grid-template-columns: 1fr; gap: 12px; }
          .event-card { border-radius: 16px !important; aspect-ratio: 4 / 3; }
          .events-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <section className="events-section">

        {/* ── Header ── */}
        <div className="events-header">
          <div className="events-header-left">
            <p className="events-label">What we've done</p>
            <h2 className="events-title">
              PREVIOUS 
              <span className="accent">E</span>
              <span className="accent">V</span>
              <span className="accent">E</span>
              <span className="accent">N</span>
              <span className="accent">T</span>
              <span className="accent">S</span>
            </h2>
            <p className="events-subtitle">
              Moments that moved communities, sparked ideas, and brought people together.
            </p>
          </div>

          <div className="events-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-pill${filter === cat ? " active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="events-divider" />

        {/* ── Grid ── */}
        <div className="events-grid">
          {filtered.map((event, idx) => {
            const isFirst = idx === 0;
            const isLast  = idx === filtered.length - 1;
            const radius  = [
              isFirst ? "20px" : "0",
              isLast  ? "20px" : "0",
              isLast  ? "20px" : "0",
              isFirst ? "20px" : "0",
            ].join(" ");

            return (
              <div
                key={event.id}
                className={`event-card ${hovered === event.id ? "active" : ""}`}
                style={{ borderRadius: radius }}
                onMouseEnter={() => setHovered(event.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <img
                  className="event-img"
                  src={event.image}
                  alt={event.title}
                />

                {/* Category badge */}
                <span
                  className="event-badge"
                  style={{ background: categoryColors[event.category] ?? "#3f4dd1" }}
                >
                  {event.category}
                </span>

                {/* Date */}
                <div className="event-date-block">
                  <p className="event-date-num">{event.date}</p>
                  <p className="event-date-meta">{event.month} {event.year}</p>
                </div>

                {/* Always-visible bottom */}
                <div className="event-bottom">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-location">📍 {event.location}</p>
                </div>

                {/* Hover reveal */}
                <div className="event-hover-content">
                  <p className="event-desc">{event.description}</p>
                  <div className="event-attendees">
                    <span className="event-attendees-dot" />
                    <span><strong>{event.attendees.toLocaleString()}</strong> attendees</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="event-arrow">↗</div>
              </div>
            );
          })}
        </div>

        {/* ── Footer ── */}
        {/* <div className="events-footer">
          <p className="events-count">
            Showing <strong>{filtered.length}</strong> of <strong>{events.length}</strong> events
          </p>
          <button className="events-more-btn">View all events ↗</button>
        </div> */}

      </section>
    </>
  );
}
