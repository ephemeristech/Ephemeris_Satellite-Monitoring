import Head from "next/head";
import Link from "next/link";
import NextImage from "next/image";
import { useEffect, useState, useRef } from "react";
import { Menu, X, ChevronLeft, ChevronRight, Mail, Send } from "lucide-react";

function useTcaCountdown(initialSeconds) {
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function TcaClock({ initialSeconds }) {
  const formatted = useTcaCountdown(initialSeconds);
  return <span suppressHydrationWarning>{formatted}</span>;
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

const workflowSteps = [
  ["01", "SENSE", "Continuously understand the operational environment.", "Ingest CDMs, ephemerides, orbit updates, spacecraft state, maneuverability, mission constraints, and trusted SSA sources."],
  ["02", "PRIORITIZE", "Know which situations require action.", "AI ranks conjunctions by how likely they are to need a maneuver."],
  ["03", "DECIDE", "Evaluate maneuver options in mission context.", "Weigh timing, collision risk, fuel, mission constraints, and downstream consequences for each decision."],
  ["04", "MANEUVER", "Move from recommendation to operator-approved action.", "Move from alert to maneuver plan with operator approval, logged and traceable."],
  ["05", "LEARN", "Improve with every operational decision.", "Ephemeris learns fleet preferences, constraints, and maneuver behavior from every decision."]
];

const aiCapabilities = [
  ["Predict escalation", "Identify which conjunctions are evolving toward operator intervention."],
  ["Understand mission context", "Evaluate spacecraft constraints, maneuverability, operational priorities, and event history."],
  ["Rank maneuver options", "Compare actions based on risk mitigation and mission tradeoffs."],
  ["Learn operator behavior", "Adapt recommendations based on previous decisions and fleet-specific operating preferences."]
];

const osCharacteristics = [
  ["Unified state", "One updated view of conjunctions, spacecraft state, mission constraints, and maneuvers."],
  ["Decision engine", "AI identifies situations requiring action and evaluates available responses."],
  ["Workflow orchestration", "Move decisions across analysts, mission leads, approvals, coordination, and execution."],
  ["Operational memory", "Every decision and outcome becomes part of the fleet's institutional knowledge."]
];

const useCases = [
  ["Collision Avoidance", "Turn conjunction alerts into timely, defensible maneuver decisions.", "Available today", true],
  ["Station Keeping", "Plan routine orbit corrections while balancing mission objectives and spacecraft resources.", "Platform direction", false],
  ["Orbit Maintenance", "Coordinate maneuvers across mission constraints and fleet operations.", "Platform direction", false],
  ["Constellation Coordination", "Understand maneuver interactions across increasingly autonomous fleets.", "Platform direction", false]
];

const humanControlPoints = [
  ["Explainability", "Every recommendation shows the reasoning and data behind it."],
  ["Approvals", "Nothing executes without operator approval."],
  ["Audit trail", "Every recommendation and decision is logged and traceable."],
  ["Operational memory", "Past decisions shape future recommendations."]
];

const maneuverReasons = [
  ["up", "Miss distance deteriorating"],
  ["up", "Covariance convergence"],
  ["up", "Pc trend"],
  ["check", "Fuel impact within mission constraint"],
  ["check", "No conflict with planned imaging window"]
];

const dashboardMetrics = [
  ["22/24", "Fleet Satellites", "operational"],
  ["47", "Active Conjunctions", "being tracked"],
  ["3", "Critical Alerts", "require action"],
  ["4.2 hrs", "Avg Response Time", "to acknowledge"],
  ["12.4%", "Fuel Budget Used", "this quarter"],
  ["8", "Days Since Critical", "last incident"]
];

const eventRows = [
  ["CDM-2026-04790", "EphSat-3", "IRIDIUM 33 DEB", "critical", "96", "6.8e-4", "85 m", "7h 30m", "active"],
  ["CDM-2026-04821", "EphSat-1A", "COSMOS 2251 DEB", "critical", "94", "1.2e-3", "45 m", "1d 3h", "active"],
  ["CDM-2026-04835", "EphSat-2A", "SL-16 R/B", "critical", "91", "4.5e-4", "120 m", "1d 17h", "maneuver-planned"],
  ["CDM-2026-04842", "EphSat-4A", "FENGYUN 1C DEB", "high", "78", "8.7e-5", "210 m", "1d 11h", "active"],
  ["CDM-2026-04850", "EphSat-1B", "STARLINK-3214", "medium", "52", "2.1e-5", "580 m", "2d 22h", "monitoring"]
];

const alerts = [
  ["Critical", "Critical Conjunction: EphSat-3 / IRIDIUM 33 DEB", "TCA in 7.5 hours. Probability escalated to 6.8e-4. Immediate review required."],
  ["Critical", "Maneuver Window Closing: EphSat-1A", "Decision required within 2 hours for CDM-2026-04821. Miss distance 45m."],
  ["High", "Rising Risk: EphSat-4A / FENGYUN 1C DEB", "Probability increased 3x over the last 24 hours. AI score now 78."],
  ["Medium", "New CDM Received: EphSat-1B / STARLINK-3214", "CDM #3 received. Miss distance stable at 580m. Low co-orbital relative velocity."]
];

const dashboardNav = [
  ["/dashboard", "Overview"],
  ["/alerts", "Alerts"],
  ["/fleet", "Fleet"],
  ["/analytics", "Analytics"],
  ["/audit-log", "Audit Log"],
  ["/settings", "Settings"]
];

const fleetRows = [
  ["EphSat-1A", "LEO Imaging", "Healthy", "11", "22 kg", "1 open event"],
  ["EphSat-1B", "LEO Imaging", "Monitor", "14", "21 kg", "2 open events"],
  ["EphSat-2A", "LEO Relay", "Maneuver Planned", "9", "18 kg", "Burn approved"],
  ["EphSat-3", "LEO Broadband", "Critical Watch", "5", "26 kg", "TCA 7h 30m"],
  ["EphSat-4A", "LEO Science", "Healthy", "28", "19 kg", "Nominal"]
];

const analyticsHighlights = [
  ["Noise Reduction", "87%", "Compared with unfiltered conjunction review"],
  ["Median Review Time", "18 min", "From alert creation to operator acknowledgement"],
  ["Escalations Closed", "31", "High-risk events resolved this month"],
  ["Maneuver Windows Saved", "6", "Cases where prioritization preserved decision time"]
];

const analyticsRows = [
  ["Critical to review", "12 min", "14 min", "-14%"],
  ["High-risk assessment", "21 min", "34 min", "-38%"],
  ["Cross-team escalation", "32 min", "47 min", "-32%"],
  ["Audit package prep", "9 min", "28 min", "-68%"]
];

const auditRows = [
  ["2026-03-20 10:32 UTC", "Sarah Chen", "Approved maneuver review", "CDM-2026-04790", "Logged"],
  ["2026-03-20 09:58 UTC", "Marcus Hill", "Raised risk severity", "CDM-2026-04821", "Logged"],
  ["2026-03-20 09:11 UTC", "Autoprioritizer", "Re-ranked conjunction queue", "Fleet Queue", "System"],
  ["2026-03-20 08:47 UTC", "Alicia Gomez", "Closed monitor-only alert", "CDM-2026-04850", "Logged"],
  ["2026-03-19 21:03 UTC", "Mission Control", "Published end-of-day summary", "Daily Ops", "Archived"]
];

const settingsCards = [
  ["Notification policy", "Critical events page on-call immediately. High-risk alerts notify fleet manager and analyst queue."],
  ["Conjunction scoring", "Events are ranked by time to closest approach, object type, tracking accuracy, and available maneuver margin."],
  ["Audit retention", "Decision records retained for 7 years with export-ready summaries and change history."],
  ["Data sources", "Demo environment simulates CDM ingestion, orbit updates, and operator comments across a 24-satellite fleet."]
];

function SatelliteMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="m13.5 6.5-3.15-3.15a1.2 1.2 0 0 0-1.7 0L6.35 5.65a1.2 1.2 0 0 0 0 1.7L9.5 10.5"></path>
      <path d="M16.5 7.5 19 5"></path>
      <path d="m17.5 10.5 3.15 3.15a1.2 1.2 0 0 1 0 1.7l-2.3 2.3a1.2 1.2 0 0 1-1.7 0L13.5 14.5"></path>
      <path d="M9 21a6 6 0 0 0-6-6"></path>
      <path d="M9.35 10.65a1.2 1.2 0 0 0 0 1.7l2.3 2.3a1.2 1.2 0 0 0 1.7 0l4.3-4.3a1.2 1.2 0 0 0 0-1.7l-2.3-2.3a1.2 1.2 0 0 0-1.7 0z"></path>
    </svg>
  );
}

function useStars() {
  useEffect(() => {
    const canvas = document.querySelector(".stars");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const stars = Array.from({ length: 130 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.25,
      a: Math.random() * 0.8 + 0.2
    }));

    const draw = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of stars) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(191, 219, 254, ${star.a})`;
        ctx.arc(star.x * canvas.width, star.y * canvas.height, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal-on-scroll");
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); observer.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <header className="topbar">
      <div className="legend-strip" aria-hidden="true">
        <span className="legend-item"><span className="legend-dot critical"></span>Critical</span>
        <span className="legend-item"><span className="legend-dot caution"></span>Monitor</span>
        <span className="legend-item"><span className="legend-dot nominal"></span>Nominal</span>
      </div>
      <div className="topbar-inner">
        <Link className="brand" href="/" onClick={close}>
          <img src="/logo.svg" alt="Ephemeris" style={{ height: 28, width: "auto" }} />
        </Link>
        <nav className="topnav" aria-label="Primary">
          <a href="/#platform">Platform</a>
          <a href="/#use-cases">Use Cases</a>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#trust">Trust</a>
          <Link href="/company">Company</Link>
        </nav>
        <div className="topbar-actions">
          <Link className="btn btn-primary btn-desktop-only" href="/contact">Book a Demo</Link>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <a href="/#platform" onClick={close}>Platform</a>
          <a href="/#use-cases" onClick={close}>Use Cases</a>
          <a href="/#how-it-works" onClick={close}>How It Works</a>
          <a href="/#trust" onClick={close}>Trust</a>
          <Link href="/company" onClick={close}>Company</Link>
          <div className="mobile-nav-divider" />
          <Link href="/contact" onClick={close} className="mobile-nav-cta">Book a Demo</Link>
        </nav>
      )}
    </header>
  );
}

export function Layout({ title, description, children, showHeader = true }) {
  useStars();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="site-shell">
        <canvas className="stars" aria-hidden="true"></canvas>
        {showHeader ? <Header /> : null}
        {children}
      </div>
    </>
  );
}

const PRODUCT_URL = "https://ephemeris-nine.vercel.app/";

function AiCapabilityCarousel({ items }) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef(null);

  const go = (i) => setActive(Math.max(0, Math.min(items.length - 1, i)));

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
  };

  return (
    <div
      className="hp-ai-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="AI capabilities"
      onKeyDown={onKeyDown}
    >
      <div className="hp-ai-viewport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="hp-ai-track" style={{ transform: `translateX(-${active * 100}%)` }}>
          {items.map(([title, body], i) => (
            <div
              className="hp-ai-card"
              key={title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}`}
              aria-hidden={i !== active}
            >
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="hp-ai-controls">
        <button
          type="button"
          className="hp-ai-arrow"
          onClick={() => go(active - 1)}
          disabled={active === 0}
          aria-label="Previous capability"
        >
          <ChevronLeft size={18} strokeWidth={2.2} />
        </button>
        <div className="hp-ai-dots">
          {items.map(([title], i) => (
            <button
              type="button"
              key={title}
              className={`hp-ai-dot${i === active ? " active" : ""}`}
              onClick={() => go(i)}
              aria-label={`Go to ${title}`}
              aria-current={i === active}
            />
          ))}
        </div>
        <button
          type="button"
          className="hp-ai-arrow"
          onClick={() => go(active + 1)}
          disabled={active === items.length - 1}
          aria-label="Next capability"
        >
          <ChevronRight size={18} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}

function OrbitalMotif({ className = "", stretch = false }) {
  return (
    <svg
      className={`hp-motif ${className}`}
      viewBox="0 0 800 800"
      preserveAspectRatio={stretch ? "none" : "xMidYMid slice"}
      aria-hidden="true"
    >
      <g stroke="currentColor" fill="none">
        <ellipse cx="400" cy="400" rx="380" ry="150" strokeWidth="1" opacity="0.09" />
        <ellipse cx="400" cy="400" rx="380" ry="80" strokeWidth="1" opacity="0.07" />
        <ellipse cx="400" cy="400" rx="150" ry="380" strokeWidth="1" opacity="0.06" />
        <line x1="400" y1="20" x2="400" y2="780" strokeWidth="1" opacity="0.07" />
        <line x1="20" y1="400" x2="780" y2="400" strokeWidth="1" opacity="0.07" />
        <ellipse cx="400" cy="400" rx="365" ry="145" strokeWidth="1.4" opacity="0.26" transform="rotate(-24 400 400)" />
        <ellipse cx="400" cy="400" rx="300" ry="105" strokeWidth="1.1" opacity="0.18" transform="rotate(16 400 400)" />
        <circle cx="400" cy="400" r="3" fill="currentColor" opacity="0.4" />
      </g>
    </svg>
  );
}

function useCountUp(target, format, duration = 1000) {
  const ref = useRef(null);
  const formatRef = useRef(format);
  formatRef.current = format;
  const [value, setValue] = useState(() => format(0));
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let started = false;
    let cancelled = false;
    const animate = () => {
      if (started) return;
      started = true;
      if (reduce) { setValue(formatRef.current(target)); return; }
      const start = performance.now();
      const tick = (now) => {
        if (cancelled) return;
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(formatRef.current(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { animate(); io.disconnect(); } });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { cancelled = true; io.disconnect(); };
  }, [target, duration]);
  return [ref, value];
}

function useTensionVideo() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const COOLDOWN_MS = 1500;
    const MAX_LOOPS = 3;
    const STORAGE_KEY = "hp-tension-video-last-played";
    let loopsPlayed = 0;
    let playing = false;

    const startCycle = () => {
      let last = 0;
      try { last = Number(sessionStorage.getItem(STORAGE_KEY) || 0); } catch (e) { /* ignore */ }
      const now = Date.now();
      if (now - last < COOLDOWN_MS) return;
      try { sessionStorage.setItem(STORAGE_KEY, String(now)); } catch (e) { /* ignore */ }
      loopsPlayed = 0;
      playing = true;
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    const onEnded = () => {
      loopsPlayed += 1;
      if (loopsPlayed < MAX_LOOPS) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        playing = false;
      }
    };

    video.addEventListener("ended", onEnded);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCycle();
          } else if (playing) {
            video.pause();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(section);

    return () => {
      io.disconnect();
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return { sectionRef, videoRef };
}

function HeroTelemetry() {
  const [missRef, missVal] = useCountUp(3732, (v) => Math.round(v).toLocaleString());
  const [pcRef, pcVal] = useCountUp(1.4, (v) => v.toFixed(1));
  return (
    <div className="hp-telemetry" ref={missRef}>
      <span>TCA <TcaClock initialSeconds={27072} /></span>
      <span className="hp-telemetry-sep" aria-hidden="true">·</span>
      <span>MISS {missVal} km</span>
      <span className="hp-telemetry-sep" aria-hidden="true">·</span>
      <span ref={pcRef}>Pc {pcVal}e-4</span>
      <span className="hp-telemetry-sep" aria-hidden="true">·</span>
      <span className="hp-telemetry-status">STATUS NOMINAL</span>
    </div>
  );
}

function HomeNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="hp-nav">
      <div className="hp-nav-inner">
        <Link href="/" className="hp-nav-brand" onClick={close}>
          <img src="/logo.svg" alt="Ephemeris" style={{ height: 26, width: "auto" }} />
        </Link>
        <nav className="hp-nav-links" aria-label="Primary">
          <a href="#platform">Platform</a>
          <a href="#use-cases">Use Cases</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#trust">Trust</a>
          <Link href="/company">Company</Link>
        </nav>
        <div className="hp-nav-actions">
          <Link href="/contact" className="hp-btn hp-btn-primary hp-btn-sm">Book a Demo</Link>
          <button className="hp-nav-toggle" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="hp-nav-mobile" aria-label="Mobile">
          <a href="#platform" onClick={close}>Platform</a>
          <a href="#use-cases" onClick={close}>Use Cases</a>
          <a href="#how-it-works" onClick={close}>How It Works</a>
          <a href="#trust" onClick={close}>Trust</a>
          <Link href="/company" onClick={close}>Company</Link>
          <Link href="/contact" onClick={close} className="hp-nav-mobile-cta">Book a Demo</Link>
        </nav>
      )}
    </header>
  );
}

function ManeuverPanel() {
  return (
    <div className="hp-maneuver-panel">
      <div className="hp-maneuver-head">
        <div className="hp-maneuver-route">
          <span>COSMOS-2251 DEB</span>
          <span className="hp-maneuver-arrow" aria-hidden="true">&rarr;</span>
          <span>EPHEMERIS-07</span>
        </div>
        <span className="risk-badge critical">Action recommended</span>
      </div>
      <div className="hp-maneuver-subline">Risk escalating</div>
      <div className="hp-maneuver-stats">
        <div className="hp-maneuver-stat">
          <span className="hp-maneuver-stat-label">TCA</span>
          <span className="hp-maneuver-stat-value">19h 42m</span>
        </div>
        <div className="hp-maneuver-stat">
          <span className="hp-maneuver-stat-label">Decision deadline</span>
          <span className="hp-maneuver-stat-value hp-maneuver-stat-urgent">6h 18m</span>
        </div>
      </div>
      <div className="hp-maneuver-rec">
        <div className="hp-maneuver-rec-label">Recommended maneuver</div>
        <div className="hp-maneuver-rec-grid">
          <div className="hp-maneuver-rec-item"><span>+12.4 m</span><small>Along-track</small></div>
          <div className="hp-maneuver-rec-item"><span>0.18 m/s</span><small>Delta-V</small></div>
          <div className="hp-maneuver-rec-item hp-maneuver-rec-item-wide"><span>03:20 to 03:42 UTC</span><small>Execution window</small></div>
        </div>
      </div>
      <div className="hp-maneuver-why">
        <div className="hp-maneuver-why-label">Why Ephemeris recommends action</div>
        {maneuverReasons.map(([type, text]) => (
          <div className="hp-maneuver-reason" key={text}>
            <span className={`hp-maneuver-reason-icon hp-maneuver-reason-${type}`} aria-hidden="true">{type === "up" ? "↑" : "✓"}</span>
            {text}
          </div>
        ))}
      </div>
      <Link href="/contact" className="hp-maneuver-review">Review maneuver <span aria-hidden="true">&rarr;</span></Link>
    </div>
  );
}

function ArchitectureStack() {
  return (
    <div className="hp-stack">
      <div className="hp-stack-tier">
        <div className="hp-stack-tier-label">SSA &amp; Mission Data</div>
        <div className="hp-stack-tier-items">Space-Track &middot; Operator ephemerides &middot; Commercial SSA &middot; Spacecraft telemetry &middot; Mission constraints</div>
      </div>
      <div className="hp-stack-arrow" aria-hidden="true">&darr;</div>
      <div className="hp-stack-tier hp-stack-tier-core">
        <div className="hp-stack-tier-label">Ephemeris: AI Decision Layer</div>
        <div className="hp-stack-tier-items">Understand &middot; Predict &middot; Prioritize &middot; Recommend &middot; Learn</div>
      </div>
      <div className="hp-stack-arrow" aria-hidden="true">&darr;</div>
      <div className="hp-stack-tier">
        <div className="hp-stack-tier-label">Satellite Operations</div>
        <div className="hp-stack-tier-items">Collision Avoidance &middot; Station Keeping &middot; Orbit Maintenance &middot; Fleet Coordination</div>
      </div>
    </div>
  );
}

function HomeClosingFooter() {
  return (
    <footer className="hp-closing">
      <OrbitalMotif className="hp-motif-footer" />
      <div className="hp-container hp-closing-inner reveal-on-scroll">
        <h2>Bring intelligence to every maneuver decision.</h2>
        <Link className="hp-btn hp-btn-primary" href="/contact">Book a Demo</Link>
      </div>
      <div className="hp-container hp-footer-legal">
        <Link href="/" className="hp-footer-brand">
          <img src="/logo.svg" alt="Ephemeris" style={{ height: 20, width: "auto" }} />
        </Link>
        <nav className="hp-footer-links" aria-label="Legal">
          <Link href="/company">Company</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="hp-footer-copy">© Ephemeris. All rights reserved.</div>
      </div>
    </footer>
  );
}

export function HomePage() {
  useStars();
  const tensionVideo = useTensionVideo();
  return (
    <>
      <Head>
        <title>Ephemeris | AI Operating System for Satellite Maneuvering</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Ephemeris turns conjunction alerts into ranked, explainable maneuver decisions for growing fleets."
        />
        <link rel="canonical" href="https://www.ephemeristech.com/" />
        <meta property="og:title" content="Ephemeris | AI Operating System for Satellite Maneuvering" />
        <meta property="og:description" content="Ephemeris turns conjunction alerts into ranked, explainable maneuver decisions for growing fleets." />
        <meta property="og:image" content="https://www.ephemeristech.com/og-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ephemeristech.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ephemeris | AI Operating System for Satellite Maneuvering" />
        <meta name="twitter:description" content="Ephemeris turns conjunction alerts into ranked, explainable maneuver decisions for growing fleets." />
        <meta name="twitter:image" content="https://www.ephemeristech.com/og-image.png" />
      </Head>
      <a href="#hp-main" className="hp-skip-link">Skip to content</a>
      <div className="hp-shell site-shell">
        <canvas className="stars" aria-hidden="true"></canvas>
        <HomeNav />
        <main id="hp-main">
          <section className="hp-hero">
            <OrbitalMotif className="hp-motif-hero" />
            <div className="hp-container hp-hero-grid">
              <div className="hp-hero-inner reveal-on-scroll">
                <HeroTelemetry />
                <h1>The AI operating system for satellite maneuvering.</h1>
                <p>Ephemeris turns conjunction alerts into ranked, explainable maneuver decisions, keeping humans in control.</p>
                <div className="hp-hero-actions">
                  <Link className="hp-btn hp-btn-primary" href="/contact">Book a Demo</Link>
                  <a className="hp-btn hp-btn-outline" href="#platform">See the Platform</a>
                </div>
              </div>
              <div className="hp-hero-visual reveal-on-scroll">
                <ManeuverPanel />
              </div>
            </div>
          </section>

          <section className="hp-tension hp-container reveal-on-scroll" ref={tensionVideo.sectionRef}>
            <video
              ref={tensionVideo.videoRef}
              className="hp-tension-bg-video"
              src="/Satellite_cropped_bottom180.mp4"
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            />
            <div className="hp-tension-scrim" aria-hidden="true"></div>
            <h2>Satellite operators have more data than ever. The bottleneck is deciding when and how to move.</h2>
            <p>Conjunction alerts arrive continuously, and risk shifts as new data comes in. Mission constraints limit which maneuvers work. Operators must decide what needs action, when, and how, in one decision layer.</p>
          </section>

          <section className="hp-ai hp-container reveal-on-scroll">
            <div className="hp-section-heading">
              <h2>AI built around how operators actually maneuver satellites.</h2>
            </div>
            <AiCapabilityCarousel items={aiCapabilities} />
          </section>

          <section className="hp-workflow hp-container reveal-on-scroll" id="how-it-works">
            <h2>How Ephemeris turns data into maneuver decisions</h2>
            <div className="hp-workflow-rail">
              {workflowSteps.map(([step, label, title, body]) => (
                <div className="hp-workflow-step" key={step}>
                  <div className="hp-workflow-index">{step}</div>
                  <div className="hp-workflow-label">{label}</div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="hp-arch hp-container reveal-on-scroll" id="platform">
            <div className="hp-section-heading">
              <h2>Built on the systems you already trust.</h2>
            </div>
            <ArchitectureStack />
            <div className="hp-os-grid">
              {osCharacteristics.map(([title, body]) => (
                <div className="hp-os-item" key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="hp-usecases hp-container reveal-on-scroll" id="use-cases">
            <div className="hp-section-heading">
              <h2>Built for every maneuver decision.</h2>
            </div>
            <div className="hp-usecase-lead">
              <div className="hp-usecase-lead-visual">
                <NextImage
                  src="/conjunction-globe.png"
                  alt="Cesium globe showing the VANGUARD 1 satellite track and a time-of-closest-approach marker over North Africa"
                  fill
                  sizes="(max-width: 900px) 100vw, 640px"
                  className="hp-usecase-lead-img"
                />
              </div>
              <div className="hp-usecase-lead-copy">
                <span className="hp-usecase-tag hp-usecase-tag-live">Available today</span>
                <h3>{useCases[0][0]}</h3>
                <p>{useCases[0][1]}</p>
              </div>
            </div>
            <div className="hp-usecase-grid">
              {useCases.slice(1).map(([title, body, tag]) => (
                <div className="hp-usecase-card" key={title}>
                  <span className="hp-usecase-tag">{tag}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="hp-divider" aria-hidden="true">
            <OrbitalMotif className="hp-motif-divider" stretch />
          </div>

          <section className="hp-humancontrol hp-container reveal-on-scroll">
            <div className="hp-section-heading">
              <h2>AI-powered. Operator-controlled.</h2>
              <p>Ephemeris explains why an event matters, what changed, and which tradeoffs shaped the recommendation. Operators approve the decision. Ephemeris handles the complexity.</p>
            </div>
            <div className="hp-humancontrol-grid">
              {humanControlPoints.map(([title, body]) => (
                <div className="hp-humancontrol-item" key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="hp-credibility hp-container reveal-on-scroll" id="trust">
            <h2>Data you can verify, not a black box.</h2>
            <p>
              Space-Track and 18th Space Defense Squadron data, screened continuously against SGP4/SP propagation.<br />
              Scoring weighs time-to-TCA, miss-distance trend, and object type, not raw probability.<br />
              Live with a small group of fleet operators, shaping the system before wider release.
            </p>
          </section>

          <section className="hp-roi hp-container reveal-on-scroll">
            <h2>Operate more satellites without scaling the operations team.</h2>
            <p>Conjunction volume grows faster than headcount. Ephemeris keeps operators focused on the decisions that matter.</p>
          </section>
        </main>

        <HomeClosingFooter />
      </div>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-wrap">
        <div className="footer-top">
          <div>
            <Link className="brand" href="/">
              <img src="/logo.svg" alt="Ephemeris" style={{ height: 24, width: "auto" }} />
            </Link>
            <p className="footer-brand-blurb">The AI operating system for satellite maneuvering, helping operators predict, evaluate, and act on maneuver decisions across their fleets.</p>
          </div>
          <div>
            <div className="footer-col-label">Site</div>
            <div className="footer-col-links">
              <a className="footer-link" href="/#platform">Platform</a>
              <a className="footer-link" href="/#use-cases">Use Cases</a>
              <a className="footer-link" href="/#how-it-works">How It Works</a>
              <a className="footer-link" href="/#trust">Trust</a>
              <Link className="footer-link" href="/company">Company</Link>
            </div>
          </div>
          <div>
            <div className="footer-col-label">Contact</div>
            <div className="footer-col-links">
              <a className="footer-link" href="mailto:EphemerisTech@gmail.com">EphemerisTech@gmail.com</a>
              <Link className="footer-link" href="/contact">Contact form</Link>
              <a className="footer-link" href="https://www.linkedin.com/company/ephemeristech/posts/?feedView=all" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Ephemeris</span>
          <Link className="btn btn-primary btn-pill" href="/contact">Book a Demo</Link>
        </div>
      </div>
    </footer>
  );
}

export function LoginPage() {
  return (
    <Layout
      title="Sign in to Ephemeris"
      description="Demo login for the migrated Ephemeris mission-control experience."
    >
      <main className="login-wrap">
        <section className="login-card glass-card">
          <Link href="/" className="auth-back-link"><ChevronLeft size={16} strokeWidth={2.2} />Back to Home</Link>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
            <img src="/logo.svg" alt="Ephemeris" style={{ height: 32, width: "auto" }} />
          </div>
          <div className="page-hero" style={{ marginBottom: 22 }}>
            <h1 style={{ fontSize: "2rem", textAlign: "center" }}>Sign in to Ephemeris</h1>
            <p style={{ textAlign: "center" }}>Satellite collision avoidance intelligence with product migration built in.</p>
          </div>
          <form action="/dashboard">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" defaultValue="sarah@ephemeris.space" required />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" defaultValue="password123" required />
            </div>
            <button className="btn btn-primary" type="submit">Sign In</button>
          </form>
          <div className="login-note">
            Demo credentials are pre-filled and route you to the live product.
          </div>
        </section>
      </main>
    </Layout>
  );
}

export function SignUpPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { window.location.href = "https://ephemeris-nine.vercel.app/"; }, 1800);
  }

  return (
    <Layout
      title="Ephemeris | Get Early Access"
      description="Sign up for early access to Ephemeris satellite collision avoidance intelligence."
    >
      <main className="login-wrap">
        <section className="login-card glass-card">
          <Link href="/" className="auth-back-link"><ChevronLeft size={16} strokeWidth={2.2} />Back to Home</Link>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
            <img src="/logo.svg" alt="Ephemeris" style={{ height: 32, width: "auto" }} />
          </div>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: 14, color: "var(--primary)" }}>✓</div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: 10 }}>You&rsquo;re in!</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>Opening the live product now&hellip;</p>
            </div>
          ) : (
            <>
              <div className="page-hero" style={{ marginBottom: 22 }}>
                <h1 style={{ fontSize: "2rem", textAlign: "center" }}>Get early access</h1>
                <p style={{ textAlign: "center", color: "var(--muted)" }}>
                  Leave your details and we&rsquo;ll take you straight to the live product.
                </p>
              </div>
              <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
                <div style={{ display: "flex", gap: 10 }}>
                  <div className="field" style={{ flex: 1 }}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" type="text" placeholder="Your name" required />
                  </div>
                  <div className="field" style={{ flex: 1 }}>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" type="text" placeholder="Last name" required />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="signupEmail">Work Email</label>
                  <input id="signupEmail" type="email" placeholder="you@company.com" required />
                </div>
                <button className="btn btn-primary" type="submit" style={{ width: "100%", marginTop: 4 }}>
                  Access the Product →
                </button>
              </form>
              <div className="login-note" style={{ marginTop: 16 }}>
                Already have an account?{" "}
                <Link href="/login" style={{ color: "var(--accent, #38bdf8)", textDecoration: "underline" }}>Sign in</Link>
              </div>
            </>
          )}
        </section>
      </main>
    </Layout>
  );
}

function DashboardSidebar({ activePath }) {
  return (
    <aside className="sidebar glass-card">
      <Link className="brand" href="/">
        <img src="/logo.svg" alt="Ephemeris" style={{ height: 26, width: "auto" }} />
      </Link>
      <nav>
        {dashboardNav.map(([href, label]) => (
          <Link className={activePath === href ? "active" : ""} href={href} key={href}>{label}</Link>
        ))}
      </nav>
      <div className="profile">
        <div className="muted">3 Notifications</div>
        <strong>Sarah Chen</strong>
        <div className="muted">Fleet Manager</div>
      </div>
    </aside>
  );
}

function DashboardFrame({ activePath, title, description, children }) {
  const isOverview = activePath === "/dashboard";
  const backHref = isOverview ? "/" : "/dashboard";
  const backLabel = isOverview ? "Home" : "Overview";
  const pageTitle = title.replace("Ephemeris | ", "").replace("Ephemeris ", "");

  return (
    <Layout title={title} description={description} showHeader={false}>
      <div className="dashboard-shell">
        <DashboardSidebar activePath={activePath} />
        <main className="dashboard-main">
          <div className="mobile-page-header">
            <Link href={backHref} className="mobile-back-btn">
              <ChevronLeft size={18} strokeWidth={2.2} />
              {backLabel}
            </Link>
            <span className="mobile-page-title">{pageTitle}</span>
          </div>
          {children}
        </main>
      </div>
    </Layout>
  );
}

export function DashboardPage() {
  return (
    <DashboardFrame
      activePath="/dashboard"
      title="Ephemeris Mission Control"
      description="Mission control dashboard for the migrated Ephemeris product experience."
    >
        <>
          <section className="dashboard-card glass-card">
            <div className="page-hero" style={{ marginBottom: 0 }}>
              <h1 style={{ fontSize: "2rem" }}>Mission Control</h1>
              <p>Fleet-wide collision risk monitoring across all active satellites. Last updated 10:30 UTC.</p>
            </div>
          </section>

          <section className="metrics-grid">
            {dashboardMetrics.map(([value, label, detail]) => (
              <div className="metric-card" key={label}>
                <span className="metric-label">{label}</span>
                <span className="metric-value">{value}</span>
                <span className="metric-label">{detail}</span>
              </div>
            ))}
          </section>

          <section className="dashboard-grid">
            <div className="dashboard-card glass-card orbital-stage">
              <div className="panel-header">
                <div>
                  <div className="panel-title">Orbital View</div>
                  <div className="panel-subtitle">Live migration framing</div>
                </div>
                <a className="btn btn-product btn-pill" href="https://ephemeris-nine.vercel.app/" target="_blank" rel="noreferrer">Open Product</a>
              </div>
              <div className="orbit-preview" style={{ minHeight: 260 }}>
                <div className="earth" aria-hidden="true"></div>
                <div className="orbit one" aria-hidden="true"></div>
                <div className="orbit two" aria-hidden="true"></div>
                <div className="orbit-dot primary" aria-hidden="true"></div>
                <div className="orbit-dot alert" aria-hidden="true"></div>
              </div>
            </div>

            <div className="dashboard-card glass-card">
              <div className="panel-header">
                <div className="panel-title">Alert Queue</div>
                <Link className="muted" href="/alerts">View all</Link>
              </div>
              <div className="alert-list">
                {alerts.map(([level, title, body]) => (
                  <article className="alert-item" key={title}>
                    <div className={`alert-pill ${level.toLowerCase()}`}>{level}</div>
                    <h3>{title}</h3>
                    <p className="muted">{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="table-card glass-card">
            <div className="panel-header">
              <div className="panel-title">Top Conjunction Events</div>
              <a className="muted" href="https://ephemeris-nine.vercel.app/" target="_blank" rel="noreferrer">View product</a>
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Event ID</th>
                    <th>Primary</th>
                    <th>Secondary</th>
                    <th>Risk</th>
                    <th>AI Score</th>
                    <th>Prob.</th>
                    <th>Miss Dist.</th>
                    <th>TCA</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {eventRows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, index) => {
                        let className = "";
                        if (index === 3) className = `risk-${cell}`;
                        if (index === 8) className = cell === "maneuver-planned" ? "status-maneuver" : `status-${cell}`;
                        return <td className={className} key={`${row[0]}-${index}`}>{cell}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
    </DashboardFrame>
  );
}

export function AlertsPage() {
  return (
    <DashboardFrame
      activePath="/alerts"
      title="Ephemeris Alerts"
      description="Active alert queue for the Ephemeris collision monitoring interface."
    >
      <>
        <section className="dashboard-card glass-card">
          <div className="page-hero" style={{ marginBottom: 0 }}>
            <h1 style={{ fontSize: "2rem" }}>Alerts</h1>
            <p>Active alert queue with severity triage, operator notes, and recommended next steps.</p>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="dashboard-card glass-card">
            <div className="panel-header">
              <div className="panel-title">Active Alert Queue</div>
              <span className="muted">4 unresolved</span>
            </div>
            <div className="alert-list">
              {alerts.map(([level, title, body]) => (
                <article className="alert-item" key={title}>
                  <div className={`alert-pill ${level.toLowerCase()}`}>{level}</div>
                  <h3>{title}</h3>
                  <p className="muted">{body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="dashboard-card glass-card">
            <div className="panel-header">
              <div className="panel-title">Operator Guidance</div>
              <span className="muted">Recommended steps</span>
            </div>
            <div className="features-grid single-column-grid">
              {[
                ["Triage", "Confirm event ownership and review the top two critical conjunctions within the next 30 minutes."],
                ["Coordinate", "Share maneuver plans with flight dynamics and flag any tracking data concerns."],
                ["Decide", "Document whether the event remains monitoring-only, requires escalation, or is entering maneuver review."]
              ].map(([title, body]) => (
                <article className="feature-card" key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="table-card glass-card">
          <div className="panel-header">
            <div className="panel-title">Alert History Snapshot</div>
            <span className="muted">Past 24 hours</span>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Severity</th>
                  <th>Owner</th>
                  <th>Latest Action</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["CDM-2026-04790", "Critical", "Sarah Chen", "Maneuver review opened", "7 min ago"],
                  ["CDM-2026-04821", "Critical", "Marcus Hill", "Waiting on tracking data review", "12 min ago"],
                  ["CDM-2026-04842", "High", "Alicia Gomez", "Escalated after probability rise", "39 min ago"],
                  ["CDM-2026-04850", "Medium", "Autoprioritizer", "Remains monitor-only", "1h ago"]
                ].map((row) => (
                  <tr key={row[0]}>{row.map((cell) => <td key={`${row[0]}-${cell}`}>{cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </>
    </DashboardFrame>
  );
}

export function FleetPage() {
  return (
    <DashboardFrame
      activePath="/fleet"
      title="Ephemeris Fleet"
      description="Fleet status overview for the Ephemeris dashboard."
    >
      <>
        <section className="dashboard-card glass-card">
          <div className="page-hero" style={{ marginBottom: 0 }}>
            <h1 style={{ fontSize: "2rem" }}>Fleet</h1>
            <p>Mission-level visibility across the demo constellation, including health status, propellant posture, and open conjunction activity.</p>
          </div>
        </section>

        <section className="metrics-grid">
          {[
            ["24", "Tracked Spacecraft", "across 4 mission groups"],
            ["5", "Satellites Under Watch", "open conjunction attention"],
            ["1", "Planned Maneuver", "within 24 hours"],
            ["92%", "Fleet Availability", "across active satellites"],
            ["18.6 kg", "Median Fuel Reserve", "remaining across fleet"],
            ["3", "High-Priority Owners", "currently assigned"]
          ].map(([value, label, detail]) => (
            <div className="metric-card" key={label}>
              <span className="metric-label">{label}</span>
              <span className="metric-value">{value}</span>
              <span className="metric-label">{detail}</span>
            </div>
          ))}
        </section>

        <section className="table-card glass-card">
          <div className="panel-header">
            <div className="panel-title">Fleet Status Board</div>
            <span className="muted">Sample constellation data</span>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Satellite</th>
                  <th>Mission</th>
                  <th>Status</th>
                  <th>Days Since Burn</th>
                  <th>Fuel Reserve</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {fleetRows.map((row) => (
                  <tr key={row[0]}>{row.map((cell) => <td key={`${row[0]}-${cell}`}>{cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </>
    </DashboardFrame>
  );
}

export function AnalyticsPage() {
  return (
    <DashboardFrame
      activePath="/analytics"
      title="Ephemeris Analytics"
      description="Performance analytics for the Ephemeris dashboard."
    >
      <>
        <section className="dashboard-card glass-card">
          <div className="page-hero" style={{ marginBottom: 0 }}>
            <h1 style={{ fontSize: "2rem" }}>Analytics</h1>
            <p>Performance metrics showing how smarter prioritization reduces review time, closes high-risk events faster, and improves team response.</p>
          </div>
        </section>

        <section className="metrics-grid">
          {analyticsHighlights.map(([label, value, detail]) => (
            <div className="metric-card" key={label}>
              <span className="metric-label">{label}</span>
              <span className="metric-value">{value}</span>
              <span className="metric-label">{detail}</span>
            </div>
          ))}
        </section>

        <section className="table-card glass-card">
          <div className="panel-header">
            <div className="panel-title">Operational Efficiency</div>
            <span className="muted">Month-to-date</span>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Workflow</th>
                  <th>Current</th>
                  <th>Baseline</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                {analyticsRows.map((row) => (
                  <tr key={row[0]}>{row.map((cell) => <td key={`${row[0]}-${cell}`}>{cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </>
    </DashboardFrame>
  );
}

export function AuditLogPage() {
  return (
    <DashboardFrame
      activePath="/audit-log"
      title="Ephemeris Audit Log"
      description="Decision audit log for the Ephemeris dashboard."
    >
      <>
        <section className="dashboard-card glass-card">
          <div className="page-hero" style={{ marginBottom: 0 }}>
            <h1 style={{ fontSize: "2rem" }}>Audit Log</h1>
            <p>Complete record of operator actions, system updates, and decisions across the mission workflow, ready for compliance review.</p>
          </div>
        </section>

        <section className="table-card glass-card">
          <div className="panel-header">
            <div className="panel-title">Decision History</div>
            <span className="muted">Last 48 hours</span>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Actor</th>
                  <th>Action</th>
                  <th>Scope</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {auditRows.map((row) => (
                  <tr key={`${row[0]}-${row[2]}`}>{row.map((cell) => <td key={`${row[0]}-${cell}`}>{cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </>
    </DashboardFrame>
  );
}

export function SettingsPage() {
  return (
    <DashboardFrame
      activePath="/settings"
      title="Ephemeris Settings"
      description="Configuration settings for the Ephemeris dashboard."
    >
      <>
        <section className="dashboard-card glass-card">
          <div className="page-hero" style={{ marginBottom: 0 }}>
            <h1 style={{ fontSize: "2rem" }}>Settings</h1>
            <p>Configuration for notifications, event scoring, data sources, and audit retention, all in one place.</p>
          </div>
        </section>

        <section className="operator-grid">
          {settingsCards.map(([title, body]) => (
            <article className="operator-card" key={title}>
              <div className="operator-line" aria-hidden="true"></div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </section>
      </>
    </DashboardFrame>
  );
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");
    setSubmitted(true);
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    setTimeout(() => {
      window.location.href = `mailto:EphemerisTech@gmail.com?subject=${subject}&body=${body}`;
    }, 400);
  }

  return (
    <Layout
      title="Ephemeris | Contact"
      description="Get in touch with the Ephemeris team. Questions, partnerships, or early access requests."
    >
      <main>
        <section className="section contact-section">
          <div className="contact-hero">
            <div className="eyebrow">Get in touch</div>
            <h1 className="contact-heading">Contact Us</h1>
            <p className="contact-subheading">
              Have a question or want to talk? We&rsquo;d love to hear from you.
            </p>
          </div>

          <div className="contact-grid">
            <aside className="contact-info glass-card">
              <h2>Reach us directly</h2>
              <a className="contact-link-item" href="mailto:EphemerisTech@gmail.com">
                <span className="contact-link-icon"><Mail size={18} strokeWidth={1.8} /></span>
                <span>EphemerisTech@gmail.com</span>
              </a>
              <a
                className="contact-link-item"
                href="https://www.linkedin.com/company/ephemeristech/posts/?feedView=all"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-link-icon"><LinkedinIcon /></span>
                <span>Ephemeris on LinkedIn</span>
              </a>
              <div className="contact-note">
                We typically respond within one business day.
              </div>
            </aside>

            <div className="contact-form-card glass-card">
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success-icon"><Send size={28} strokeWidth={1.6} /></div>
                  <h3>Message sent!</h3>
                  <p>Your email client is opening with the pre-filled message. We&rsquo;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="field">
                    <label htmlFor="c-name">Name <span className="required-mark">*</span></label>
                    <input id="c-name" name="name" type="text" placeholder="Your full name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="c-email">Email <span className="required-mark">*</span></label>
                    <input id="c-email" name="email" type="email" placeholder="you@company.com" required />
                  </div>
                  <div className="field">
                    <label htmlFor="c-message">Message <span className="required-mark">*</span></label>
                    <textarea id="c-message" name="message" placeholder="Tell us about your mission, use case, or question..." rows={5} required />
                  </div>
                  <button className="btn btn-primary contact-submit" type="submit">
                    <Send size={16} strokeWidth={2} />
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </Layout>
  );
}
