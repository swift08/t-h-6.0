import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { TahradNavbar } from "@/components/TahradNavbar";
import { CoverageCityModal } from "@/components/CoverageCityModal";
import { JoinPanelModal } from "@/components/JoinPanelModal";
import { brandLogos, BRAND_FONTS_HREF } from "@/lib/brand";
import { useStats } from "@/lib/stats-store";
import { ORGANIZATION_SCHEMA, getBreadcrumbSchema, getWebPageSchema, SITE_URL } from "@/lib/seo-schemas";

function formatSeconds(totalSecs: number): string {
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TAHRAD | 24/7/365 Subspecialty Teleradiology Reporting India" },
      {
        name: "description",
        content:
          "Subspecialty radiologists for CT, MRI, X-ray and PET — with a live reporting desk that shows exactly where every study is, who is reading it, and when it will land in your PACS. 15-30m emergency TAT across India.",
      },
      {
        name: "keywords",
        content:
          "TAHRAD, teleradiology India, 24/7 radiology reporting, CT reporting, MRI reporting, emergency radiologist, PACS teleradiology, subspecialty radiology India",
      },
      { property: "og:title", content: "TAHRAD | 24/7/365 Subspecialty Teleradiology Reporting" },
      {
        property: "og:description",
        content:
          "Subspecialty radiologists for CT, MRI, X-ray and PET with a live reporting desk. Every scan read. Every report on the clock.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: "TAHRAD" },
      { property: "og:image", content: `${SITE_URL}/brand/tahrad-logo-primary-blue.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "TAHRAD | 24/7/365 Subspecialty Teleradiology Reporting" },
      {
        name: "twitter:description",
        content:
          "Subspecialty radiologists for CT, MRI, X-ray and PET. Direct line to your radiologist, live turnaround clocks, PACS integration.",
      },
      { name: "twitter:image", content: `${SITE_URL}/brand/tahrad-logo-primary-blue.png` },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: BRAND_FONTS_HREF },
      { rel: "stylesheet", href: "/tah.css" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORGANIZATION_SCHEMA),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          getWebPageSchema({
            name: "TAHRAD | 24/7/365 Subspecialty Teleradiology Reporting India",
            description:
              "Subspecialty radiologists for CT, MRI, X-ray and PET with a live reporting desk that shows where every study is, who is reading it, and when it will land in your PACS.",
            path: "/",
          })
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(getBreadcrumbSchema([{ name: "Home", item: "/" }])),
      },
    ],
  }),
  component: TahradHome,
});

function TahradHome() {
  const stats = useStats();

  // Modals state
  const [showCoverageModal, setShowCoverageModal] = useState(false);
  const [showJoinPanelModal, setShowJoinPanelModal] = useState(false);

  // Live ticking clocks for Hero card and Desk tour preview
  const [heroTimers, setHeroTimers] = useState({
    ctBrain: 372,   // 06:12
    mriLumbar: 880, // 14:40
    xrayChest: 185, // 03:05
    ctAngio: 1127,  // 18:47
    mriKnee: 880,
    ctAbdomen: 2462,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroTimers((prev) => ({
        ...prev,
        ctBrain: prev.ctBrain + 1,
        mriLumbar: prev.mriLumbar + 1,
        xrayChest: prev.xrayChest + 1,
        ctAngio: prev.ctAngio + 1,
        mriKnee: prev.mriKnee + 1,
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Pilot Form State
  const [pilotForm, setPilotForm] = useState({
    name: "",
    hospital: "",
    email: "",
    phone: "",
    studiesPerMonth: "Under 300",
    modalities: {
      ct: true,
      mri: true,
      xray: false,
      pet: false,
      night: false,
    },
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const scrollToPilot = () => {
    document.getElementById("pilot-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ backgroundColor: "#FFFFFF", color: "var(--brand-blue)" }}>
      {/* Top Brand Navbar */}
      <TahradNavbar
        onRequestPilot={scrollToPilot}
      />

      <main>
        {/* ===================================================================
            HERO SECTION (PDF 1 Page 1 & Review 01)
            =================================================================== */}
        <section className="tah-hero" id="hero">
          <div className="tah-container">
            <div className="tah-hero-grid">
              {/* Left Column */}
              <div className="tah-hero-content">
                <div className="eyebrow-pill">
                  <span className="dot" aria-hidden="true"></span>
                  TELERADIOLOGY · 24/7/365 · PAN-INDIA
                </div>

                <h1 className="tah-hero-title">
                  Every scan read.<br />
                  Every report on{" "}
                  <span className="highlight-yellow">the clock.</span>
                </h1>

                <p className="tah-hero-lead">
                  Subspecialty radiologists for CT, MRI, X-ray and PET — with a live reporting
                  desk that shows exactly where every study is, who is reading it, and when it
                  will land in your PACS.
                </p>

                <div className="tah-hero-ctas">
                  <button onClick={scrollToPilot} className="btn-tah-primary">
                    Request a pilot <span aria-hidden="true">→</span>
                  </button>
                </div>

                <div className="tah-hero-trust">
                  <div className="trust-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <span>Encrypted DICOM transfer</span>
                  </div>
                  <div className="trust-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    <span>Direct line to your radiologist</span>
                  </div>
                  <div className="trust-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    <span>Works with your PACS</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Live Desk Card */}
              <div className="tah-hero-desk-preview">
                <div className="tah-live-desk-card">
                  <div className="live-desk-card-header">
                    <div className="live-badge">
                      <span className="pulse-dot" aria-hidden="true"></span>
                      Reporting desk · Live
                    </div>
                    <span className="sample-text">SAMPLE DATA</span>
                  </div>

                  <div className="live-desk-card-body">
                    {/* Row 1 */}
                    <div className="live-desk-row">
                      <div className="live-desk-study-info">
                        <div className="study-title-line">
                          <span>CT Brain — Plain</span>
                          <span className="status-pill stat">STAT</span>
                        </div>
                        <div className="study-meta-line">Centre 0412 · Dr. R. Menon, Neuro</div>
                      </div>
                      <div className="live-desk-status-side">
                        <span className="status-pill reading">Reading</span>
                        <span className="elapsed-timer">{formatSeconds(heroTimers.ctBrain)}</span>
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="live-desk-row">
                      <div className="live-desk-study-info">
                        <div className="study-title-line">
                          <span>MRI Lumbar Spine</span>
                        </div>
                        <div className="study-meta-line">Centre 0188 · Dr. S. Iyer, MSK</div>
                      </div>
                      <div className="live-desk-status-side">
                        <span className="status-pill assigned" style={{ color: "#FFFFFF", borderColor: "rgba(255,255,255,0.4)" }}>
                          Assigned
                        </span>
                        <span className="elapsed-timer">{formatSeconds(heroTimers.mriLumbar)}</span>
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="live-desk-row">
                      <div className="live-desk-study-info">
                        <div className="study-title-line">
                          <span>X-Ray Chest PA</span>
                        </div>
                        <div className="study-meta-line">Centre 0931 · Dr. A. Khan, Chest</div>
                      </div>
                      <div className="live-desk-status-side">
                        <span className="status-pill qc-review">QC review</span>
                        <span className="elapsed-timer">{formatSeconds(heroTimers.xrayChest)}</span>
                      </div>
                    </div>

                    {/* Row 4 */}
                    <div className="live-desk-row">
                      <div className="live-desk-study-info">
                        <div className="study-title-line">
                          <span>CT Angio Neck</span>
                          <span className="status-pill stat">STAT</span>
                        </div>
                        <div className="study-meta-line">Centre 0077 · Signed & in PACS</div>
                      </div>
                      <div className="live-desk-status-side">
                        <span className="status-pill delivered">Delivered</span>
                        <span className="elapsed-timer" style={{ color: "var(--brand-green)" }}>✓</span>
                      </div>
                    </div>
                  </div>

                  <div className="live-desk-card-footer" style={{ justifyContent: "center" }}>
                    <span className="footer-text">Every study. Every stage. One screen.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            STATS COUNTER BAR (PDF 1 Page 1)
            =================================================================== */}
        <section className="tah-stats-bar" id="stats">
          <div className="tah-container">
            <div className="tah-stats-grid">
              <div className="tah-stat-item">
                <div className="tah-stat-num" data-stat-val="centres">
                  {stats.centres}{stats.centresSuffix}
                </div>
                <div className="tah-stat-label">Hospitals & diagnostic centres served</div>
              </div>
              <div className="tah-stat-item">
                <div className="tah-stat-num" data-stat-val="studies">
                  {stats.studies.toLocaleString()}{stats.studiesSuffix}
                </div>
                <div className="tah-stat-label">New studies reported every day</div>
              </div>
              <div className="tah-stat-item">
                <div className="tah-stat-num" data-stat-val="radiologists">
                  {stats.radiologists}{stats.radiologistsSuffix}
                </div>
                <div className="tah-stat-label">Radiologists across subspecialties</div>
              </div>
              <div className="tah-stat-item">
                <div className="tah-stat-num" data-stat-val="states">
                  {stats.states}{stats.statesSuffix}
                </div>
                <div className="tah-stat-label">States covered across India</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            BUILT AROUND HOW YOU WORK (PDF 1 Page 1)
            =================================================================== */}
        <section className="tah-ways-section" id="how-it-works">
          <div className="tah-container">
            <div className="tah-section-header-split">
              <div className="header-left">
                <span className="eyebrow">BUILT AROUND HOW YOU WORK</span>
                <h2>One partner. Three ways to plug us in.</h2>
              </div>
              <div className="header-right">
                Pick the setup that matches your centre. The radiologists, quality checks and reporting desk stay the same.
              </div>
            </div>

            <div className="tah-three-cards-grid">
              {/* Card 1: Hospitals & trauma centres (Brand Blue) */}
              <div className="tah-plug-card card-blue">
                <div className="card-top">
                  <div className="icon-tile-green">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  </div>
                  <h3>Hospitals & trauma centres</h3>
                  <p>
                    Night and weekend cover, stat reads for stroke and trauma, and a radiologist
                    who picks up when your ER calls.
                  </p>
                </div>
                <button
                  onClick={scrollToPilot}
                  className="card-link"
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}
                >
                  Emergency & night cover →
                </button>
              </div>

              {/* Card 2: Diagnostic centres */}
              <div className="tah-plug-card card-white">
                <div className="card-top">
                  <div className="icon-tile-green">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>
                  </div>
                  <h3>Diagnostic centres</h3>
                  <p>
                    Add CT and MRI without hiring. Routine and subspecialty reads with predictable
                    turnaround and one monthly invoice.
                  </p>
                </div>
                <button
                  onClick={scrollToPilot}
                  className="card-link"
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}
                >
                  Full-service reporting →
                </button>
              </div>

              {/* Card 3: Imaging chains & groups */}
              <div className="tah-plug-card card-white">
                <div className="card-top">
                  <div className="icon-tile-green">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                  </div>
                  <h3>Imaging chains & groups</h3>
                  <p>
                    One reporting desk across every branch. Centre-wise turnaround, volume and
                    quality reports for your leadership.
                  </p>
                </div>
                <button
                  onClick={scrollToPilot}
                  className="card-link"
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}
                >
                  Multi-centre setup →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            FROM SCAN TO SIGNED REPORT (FIVE STAGES) (PDF 1 Page 2)
            =================================================================== */}
        <section className="tah-stages-band">
          <div className="tah-container">
            <span className="eyebrow">FROM SCAN TO SIGNED REPORT</span>
            <h2>Five stages. You see every one of them.</h2>

            <div className="tah-stages-grid">
              {/* 01 Acquire */}
              <div className="tah-stage-col">
                <div>
                  <div className="stage-number">01</div>
                  <div className="stage-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  </div>
                  <div className="stage-title">Acquire</div>
                  <div className="stage-text">
                    Your technician scans as usual. Nothing changes at the console.
                  </div>
                </div>
                <div className="stage-pill">At your centre</div>
              </div>

              {/* 02 Transmit */}
              <div className="tah-stage-col">
                <div>
                  <div className="stage-number">02</div>
                  <div className="stage-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div className="stage-title">Transmit</div>
                  <div className="stage-text">
                    Studies flow from your PACS to ours, encrypted end to end.
                  </div>
                </div>
                <div className="stage-pill">Encrypted DICOM</div>
              </div>

              {/* 03 Read */}
              <div className="tah-stage-col">
                <div>
                  <div className="stage-number">03</div>
                  <div className="stage-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </div>
                  <div className="stage-title">Read</div>
                  <div className="stage-text">
                    Matched to a subspecialty radiologist. Stat cases jump the queue.
                  </div>
                </div>
                <div className="stage-pill">Subspecialty matched</div>
              </div>

              {/* 04 Review */}
              <div className="tah-stage-col">
                <div>
                  <div className="stage-number">04</div>
                  <div className="stage-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="m9 14 2 2 4-4"/></svg>
                  </div>
                  <div className="stage-title">Review</div>
                  <div className="stage-text">
                    A second-level quality check before anything is signed.
                  </div>
                </div>
                <div className="stage-pill">Quality checked</div>
              </div>

              {/* 05 Deliver */}
              <div className="tah-stage-col">
                <div>
                  <div className="stage-number">05</div>
                  <div className="stage-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </div>
                  <div className="stage-title">Deliver</div>
                  <div className="stage-text">
                    Signed report lands in your PACS, with critical findings phoned in.
                  </div>
                </div>
                <div className="stage-pill">Back in your PACS</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            FULL-SPECTRUM REPORTING (8 MODALITIES VISIBLE) (PDF 1 Page 2 & Review 03)
            =================================================================== */}
        <section className="tah-modalities-section" id="services">
          <div className="tah-container">
            <div className="tah-modalities-header">
              <div>
                <span className="eyebrow">FULL-SPECTRUM REPORTING</span>
                <h2>Every modality. One reporting partner.</h2>
              </div>
              <button
                onClick={scrollToPilot}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--brand-blue)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Ask for a modality we don't list →
              </button>
            </div>

            <div className="modalities-grid-8">
              {/* CT */}
              <div className="modality-card" onClick={scrollToPilot} style={{ cursor: "pointer" }}>
                <div>
                  <div className="modality-card-top">
                    <span className="modality-code">CT</span>
                    <span className="modality-arrow" aria-hidden="true">↗</span>
                  </div>
                  <h3>CT reporting</h3>
                  <p>Trauma, stroke, oncology and routine CT, including angiography.</p>
                </div>
                <div className="modality-tags">Emergency · Angio · Oncology</div>
              </div>

              {/* MRI */}
              <div className="modality-card" onClick={scrollToPilot} style={{ cursor: "pointer" }}>
                <div>
                  <div className="modality-card-top">
                    <span className="modality-code">MRI</span>
                    <span className="modality-arrow" aria-hidden="true">↗</span>
                  </div>
                  <h3>MRI reporting</h3>
                  <p>Neuro, MSK, spine, body and cardiac MRI by subspecialists.</p>
                </div>
                <div className="modality-tags">Neuro · MSK · Body</div>
              </div>

              {/* XR */}
              <div className="modality-card" onClick={scrollToPilot} style={{ cursor: "pointer" }}>
                <div>
                  <div className="modality-card-top">
                    <span className="modality-code">XR</span>
                    <span className="modality-arrow" aria-hidden="true">↗</span>
                  </div>
                  <h3>X-Ray & DR</h3>
                  <p>High-volume chest and skeletal reads with fast turnaround.</p>
                </div>
                <div className="modality-tags">Chest · Skeletal · Paeds</div>
              </div>

              {/* PET */}
              <div className="modality-card" onClick={scrollToPilot} style={{ cursor: "pointer" }}>
                <div>
                  <div className="modality-card-top">
                    <span className="modality-code">PET</span>
                    <span className="modality-arrow" aria-hidden="true">↗</span>
                  </div>
                  <h3>PET-CT reporting</h3>
                  <p>Oncology staging and response reads by nuclear medicine experts.</p>
                </div>
                <div className="modality-tags">Oncology · Nuclear</div>
              </div>

              {/* SUB */}
              <div className="modality-card" onClick={scrollToPilot} style={{ cursor: "pointer" }}>
                <div>
                  <div className="modality-card-top">
                    <span className="modality-code">SUB</span>
                    <span className="modality-arrow" aria-hidden="true">↗</span>
                  </div>
                  <h3>Subspecialty reads</h3>
                  <p>Neuro, MSK, cardiac, paediatric and women’s imaging.</p>
                </div>
                <div className="modality-tags">Matched by case</div>
              </div>

              {/* 24/7 */}
              <div className="modality-card" onClick={scrollToPilot} style={{ cursor: "pointer" }}>
                <div>
                  <div className="modality-card-top">
                    <span className="modality-code">24/7</span>
                    <span className="modality-arrow" aria-hidden="true">↗</span>
                  </div>
                  <h3>Nighthawk & stat</h3>
                  <p>Overnight and weekend cover with stat escalation for emergencies.</p>
                </div>
                <div className="modality-tags">Night · Weekend · Stat</div>
              </div>

              {/* 2nd */}
              <div className="modality-card" onClick={scrollToPilot} style={{ cursor: "pointer" }}>
                <div>
                  <div className="modality-card-top">
                    <span className="modality-code">2nd</span>
                    <span className="modality-arrow" aria-hidden="true">↗</span>
                  </div>
                  <h3>Second opinion</h3>
                  <p>Independent review for complex or disputed cases.</p>
                </div>
                <div className="modality-tags">Complex cases</div>
              </div>

              {/* MMG */}
              <div className="modality-card" onClick={scrollToPilot} style={{ cursor: "pointer" }}>
                <div>
                  <div className="modality-card-top">
                    <span className="modality-code">MMG</span>
                    <span className="modality-arrow" aria-hidden="true">↗</span>
                  </div>
                  <h3>Mammography</h3>
                  <p>Screening and diagnostic mammography by breast imaging specialists.</p>
                </div>
                <div className="modality-tags">Screening · Diagnostic</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            THE TAHRAD REPORTING DESK OVERVIEW & TOUR (PDF 1 Page 2 & 3)
            =================================================================== */}
        <section className="tah-desk-overview-section" id="reporting-desk">
          <div className="tah-container">
            <span className="eyebrow">THE TAHRAD REPORTING DESK</span>
            <h2>Not an inbox. A control room for your reports.</h2>
            <p style={{ maxWidth: "680px", fontSize: "1.1rem" }}>
              Most teleradiology ends at "upload and wait". With TAHRAD your team logs into one
              desk to track, prioritise and talk about every study.
            </p>

            {/* Mini Desk Live Bar */}
            <div className="tah-mini-desk-bar">
              <div className="mini-desk-centre">[Your Centre] · Bengaluru</div>
              <div className="mini-desk-metrics">
                <div className="mini-desk-metric-item">
                  <span>Studies today</span>
                  <strong>48</strong>
                </div>
                <div className="mini-desk-metric-item">
                  <span>In reading</span>
                  <strong>7</strong>
                </div>
                <div className="mini-desk-metric-item highlight-stat">
                  <span>Stat open</span>
                  <strong>2</strong>
                </div>
                <div className="mini-desk-metric-item">
                  <span>Delivered</span>
                  <strong>39</strong>
                </div>
              </div>
            </div>

            {/* Desk Tour Grid */}
            <div className="tah-desk-tour-grid">
              {/* Features List */}
              <div className="desk-tour-features">
                <div className="tour-feature-item">
                  <div className="icon-tile">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div>
                    <h3>Live status on every study</h3>
                    <p>Uploaded, assigned, reading, QC, delivered — with a running clock.</p>
                  </div>
                </div>

                <div className="tour-feature-item">
                  <div className="icon-tile">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <div>
                    <h3>Talk to the reading radiologist</h3>
                    <p>Message or call from the case itself. No switchboard, no waiting.</p>
                  </div>
                </div>

                <div className="tour-feature-item">
                  <div className="icon-tile">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  </div>
                  <div>
                    <h3>One tap to mark stat</h3>
                    <p>Escalate a case and watch it jump the queue in real time.</p>
                  </div>
                </div>

                <div className="tour-feature-item">
                  <div className="icon-tile">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                  </div>
                  <div>
                    <h3>Reports your leadership can read</h3>
                    <p>Turnaround, volume and quality by centre, modality and shift.</p>
                  </div>
                </div>

                <div>
                  <button
                    onClick={scrollToPilot}
                    className="btn-tah-primary"
                    style={{ marginTop: "0.5rem" }}
                  >
                    Request a pilot / live demo <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>

              {/* Right: Live Table Preview */}
              <div className="desk-tour-table-card">
                <div className="desk-tour-table-row header">
                  <div>STUDY</div>
                  <div>RADIOLOGIST</div>
                  <div>STAGE</div>
                  <div style={{ textAlign: "right" }}>ELAPSED</div>
                </div>
                <div className="desk-tour-table-row">
                  <div className="study-cell">
                    <strong>CT Head — Trauma</strong>
                  </div>
                  <div className="rad-cell">Dr. R. Menon</div>
                  <div>
                    <span className="status-pill reading">Reading</span>
                  </div>
                  <div className="elapsed-cell">{formatSeconds(heroTimers.ctBrain)}</div>
                </div>
                <div className="desk-tour-table-row">
                  <div className="study-cell">
                    <strong>MRI Knee — Right</strong>
                  </div>
                  <div className="rad-cell">Dr. S. Iyer</div>
                  <div>
                    <span className="status-pill assigned">Assigned</span>
                  </div>
                  <div className="elapsed-cell">{formatSeconds(heroTimers.mriKnee)}</div>
                </div>
                <div className="desk-tour-table-row">
                  <div className="study-cell">
                    <strong>X-Ray Chest PA</strong>
                  </div>
                  <div className="rad-cell">Dr. A. Khan</div>
                  <div>
                    <span className="status-pill qc-review">QC review</span>
                  </div>
                  <div className="elapsed-cell">{formatSeconds(heroTimers.xrayChest)}</div>
                </div>
                <div className="desk-tour-table-row">
                  <div className="study-cell">
                    <strong>CT Abdomen — Contrast</strong>
                  </div>
                  <div className="rad-cell">Dr. P. Nair</div>
                  <div>
                    <span className="status-pill delivered">Delivered</span>
                  </div>
                  <div className="elapsed-cell" style={{ color: "var(--brand-green)" }}>✓</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            WHY CENTRES SWITCH TO TAHRAD (PDF 1 Page 3 & Review 04)
            =================================================================== */}
        <section className="tah-why-section" id="why-us">
          <div className="tah-container">
            <span className="eyebrow">WHY CENTRES SWITCH TO TAHRAD</span>
            <h2>Hospitals that work with us always get a call back.</h2>

            <div className="tah-why-grid">
              {/* Card 1 */}
              <div className="why-compare-card">
                <div className="why-before-box">
                  <div className="why-before-label">BEFORE</div>
                  <p className="why-before-text">
                    Upload and hope. No idea who has the study or when it will come back.
                  </p>
                </div>
                <div className="why-tahrad-box">
                  <div className="eyebrow" style={{ fontSize: "0.72rem", marginBottom: "0.3rem" }}>
                    WITH TAHRAD
                  </div>
                  <h3>A live clock on every study</h3>
                  <p>
                    See the stage, the radiologist and the time elapsed — for every scan, from any device.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="why-compare-card">
                <div className="why-before-box">
                  <div className="why-before-label">BEFORE</div>
                  <p className="why-before-text">
                    Queue roulette. Whoever is free reads your neuro case.
                  </p>
                </div>
                <div className="why-tahrad-box">
                  <div className="eyebrow" style={{ fontSize: "0.72rem", marginBottom: "0.3rem" }}>
                    WITH TAHRAD
                  </div>
                  <h3>Subspecialists, not whoever is free</h3>
                  <p>
                    Cases are routed by modality and body region to the right radiologist, every time.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="why-compare-card">
                <div className="why-before-box">
                  <div className="why-before-label">BEFORE</div>
                  <p className="why-before-text">
                    Calls that go to voicemail when your ER needs answers.
                  </p>
                </div>
                <div className="why-tahrad-box">
                  <div className="eyebrow" style={{ fontSize: "0.72rem", marginBottom: "0.3rem" }}>
                    WITH TAHRAD
                  </div>
                  <h3>A radiologist who picks up</h3>
                  <p>
                    Direct line and in-case chat to the reading radiologist, with escalation built in.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            QUOTE BANNER (PDF 1 Page 3)
            =================================================================== */}
        <section className="tah-quote-section">
          <div className="tah-container">
            <div className="quote-inner">
              <div className="quote-mark" aria-hidden="true">“</div>
              <div className="quote-statement">
                Radio silence is the enemy of good patient care. We built our entire operation
                around the belief that a radiologist should be reachable, always.
              </div>
              <div className="quote-author">TAHRAD CLINICAL OPERATIONS</div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            PAN-INDIA COVERAGE & RADIOLOGIST RECRUITMENT (PDF 1 Page 4 & Review 05)
            =================================================================== */}
        <section className="tah-coverage-section" id="coverage">
          <div className="tah-container">
            <div className="coverage-grid-split">
              <div>
                <span className="eyebrow">PAN-INDIA COVERAGE</span>
                <h2>From metro trauma centres to district diagnostic labs.</h2>
                <p style={{ fontSize: "1.05rem", marginBottom: "1.75rem" }}>
                  Radiologists across 15+ states, reading in shifts so your night is someone's morning.
                </p>

                <div className="state-chips-wrap">
                  <span className="state-chip">Karnataka</span>
                  <span className="state-chip">Tamil Nadu</span>
                  <span className="state-chip">Kerala</span>
                  <span className="state-chip">Andhra Pradesh</span>
                  <span className="state-chip">Telangana</span>
                  <span className="state-chip">Gujarat</span>
                  <span className="state-chip">Rajasthan</span>
                  <span className="state-chip">Madhya Pradesh</span>
                  <span className="state-chip">West Bengal</span>
                  <span className="state-chip">Odisha</span>
                  <span className="state-chip">Bihar</span>
                  <span className="state-chip">Punjab</span>
                  <span
                    className="state-chip more-states"
                    onClick={() => setShowCoverageModal(true)}
                    style={{ cursor: "pointer" }}
                  >
                    + more states
                  </span>
                </div>

                <button
                  onClick={() => setShowCoverageModal(true)}
                  className="btn-tah-secondary"
                >
                  Check coverage for your city
                </button>
              </div>

              {/* Direct Turnaround Highlight Proof Box */}
              <div
                style={{
                  border: "1.5px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "2.5rem 2rem",
                  background: "rgba(0, 40, 250, 0.02)",
                }}
              >
                <span className="eyebrow" style={{ fontSize: "0.75rem" }}>
                  EMERGENCY SLA COMMITMENT
                </span>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", margin: "1rem 0" }}>
                  <span
                    className="highlight-yellow"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
                      fontWeight: 800,
                      lineHeight: 1,
                      padding: "0.15rem 0.5rem",
                    }}
                  >
                    15–30 min
                  </span>
                  <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--brand-blue)" }}>
                    emergency turnaround, 24/7/365
                  </span>
                </div>
                <p style={{ fontSize: "0.95rem", color: "var(--brand-gray)", margin: 0 }}>
                  Stat trauma, acute stroke, and chest emergencies routed to available neuro and body
                  specialists in seconds. Direct telephone escalation to ER clinical coordinators.
                </p>
              </div>
            </div>

            {/* Radiologist Panel Callout Banner */}
            <div className="tah-radiologist-banner" id="for-radiologists">
              <div className="rad-banner-left">
                <img src={brandLogos.icon.blue} alt="TAHRAD" />
                <div>
                  <h3>Radiologist? Read with TAHRAD.</h3>
                  <p>Flexible shifts, subspecialty-matched studies, and a team that has your back on every call.</p>
                </div>
              </div>
              <button
                onClick={() => setShowJoinPanelModal(true)}
                className="btn-tah-secondary"
              >
                Join the panel
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================================
            START WITH A PILOT (PDF 1 Page 4 & Review 05)
            =================================================================== */}
        <section className="tah-pilot-section" id="pilot-section">
          <div className="tah-container">
            <div className="pilot-split-card">
              {/* Left Panel: Blue */}
              <div className="pilot-left-panel">
                <div>
                  <span className="eyebrow">START WITH A PILOT</span>
                  <h2>Send us your next batch of studies. Judge us on the reports.</h2>

                  <div className="pilot-steps-list">
                    <div className="pilot-step-item">
                      <strong>01</strong>
                      <span>We call you back within one working hour.</span>
                    </div>
                    <div className="pilot-step-item">
                      <strong>02</strong>
                      <span>We connect to your PACS and set up your desk.</span>
                    </div>
                    <div className="pilot-step-item">
                      <strong>03</strong>
                      <span>You go live with a named lead radiologist.</span>
                    </div>
                  </div>
                </div>

                <div className="pilot-company-info">
                  <strong>Trust & Hope Rad Pvt. Ltd.</strong>
                  <div>Registered Office: Bengaluru, Karnataka</div>
                  <div>Call / WhatsApp: +91 99000 00000</div>
                  <div>contact@tahrad.com</div>
                </div>
              </div>

              {/* Right Panel: Form */}
              <div className="pilot-right-panel">
                {formSubmitted ? (
                  <div style={{ textAlign: "center", padding: "3rem 1rem", margin: "auto" }}>
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        backgroundColor: "var(--brand-green)",
                        color: "var(--brand-blue)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2rem",
                        marginBottom: "1.25rem",
                      }}
                    >
                      ✓
                    </div>
                    <h2>Pilot Request Received!</h2>
                    <p style={{ maxWidth: "440px", margin: "0 auto 1.5rem auto" }}>
                      Thank you, {pilotForm.name}. Our lead radiologist and clinical onboarding team will
                      contact you within one working hour at <strong>{pilotForm.phone}</strong>.
                    </p>
                    <div
                      style={{
                        textAlign: "left",
                        background: "rgba(0, 40, 250, 0.04)",
                        padding: "1.25rem",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.88rem",
                      }}
                    >
                      <strong>Next step:</strong> We will configure your PACS DICOM gateway and provision
                      your trial reporting desk credentials immediately.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="pilot-form">
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Your name</label>
                        <input
                          type="text"
                          required
                          placeholder="Dr. Priya Sharma"
                          className="tah-input"
                          value={pilotForm.name}
                          onChange={(e) => setPilotForm({ ...pilotForm, name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Hospital / centre</label>
                        <input
                          type="text"
                          required
                          placeholder="Centre name and city"
                          className="tah-input"
                          value={pilotForm.hospital}
                          onChange={(e) => setPilotForm({ ...pilotForm, hospital: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Work email</label>
                        <input
                          type="email"
                          required
                          placeholder="name@hospital.in"
                          className="tah-input"
                          value={pilotForm.email}
                          onChange={(e) => setPilotForm({ ...pilotForm, email: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          className="tah-input"
                          value={pilotForm.phone}
                          onChange={(e) => setPilotForm({ ...pilotForm, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Studies per month</label>
                      <select
                        className="tah-select"
                        value={pilotForm.studiesPerMonth}
                        onChange={(e) => setPilotForm({ ...pilotForm, studiesPerMonth: e.target.value })}
                      >
                        <option value="Under 300">Under 300 studies/month</option>
                        <option value="300-1000">300 – 1,000 studies/month</option>
                        <option value="1000-3000">1,000 – 3,000 studies/month</option>
                        <option value="3000+">3,000+ studies/month</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Modalities you need</label>
                      <div className="checkbox-row">
                        <label className="tah-checkbox-label">
                          <input
                            type="checkbox"
                            checked={pilotForm.modalities.ct}
                            onChange={(e) =>
                              setPilotForm({
                                ...pilotForm,
                                modalities: { ...pilotForm.modalities, ct: e.target.checked },
                              })
                            }
                          />
                          CT
                        </label>
                        <label className="tah-checkbox-label">
                          <input
                            type="checkbox"
                            checked={pilotForm.modalities.mri}
                            onChange={(e) =>
                              setPilotForm({
                                ...pilotForm,
                                modalities: { ...pilotForm.modalities, mri: e.target.checked },
                              })
                            }
                          />
                          MRI
                        </label>
                        <label className="tah-checkbox-label">
                          <input
                            type="checkbox"
                            checked={pilotForm.modalities.xray}
                            onChange={(e) =>
                              setPilotForm({
                                ...pilotForm,
                                modalities: { ...pilotForm.modalities, xray: e.target.checked },
                              })
                            }
                          />
                          X-Ray
                        </label>
                        <label className="tah-checkbox-label">
                          <input
                            type="checkbox"
                            checked={pilotForm.modalities.pet}
                            onChange={(e) =>
                              setPilotForm({
                                ...pilotForm,
                                modalities: { ...pilotForm.modalities, pet: e.target.checked },
                              })
                            }
                          />
                          PET-CT
                        </label>
                        <label className="tah-checkbox-label">
                          <input
                            type="checkbox"
                            checked={pilotForm.modalities.night}
                            onChange={(e) =>
                              setPilotForm({
                                ...pilotForm,
                                modalities: { ...pilotForm.modalities, night: e.target.checked },
                              })
                            }
                          />
                          Night cover
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn-tah-primary"
                      style={{ width: "100%", marginTop: "0.5rem" }}
                    >
                      Request my pilot callback
                    </button>

                    <p className="form-disclaimer">
                      No commitment. Your study data stays encrypted and is never shared.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===================================================================
          FOOTER (PDF 1 Page 4)
          =================================================================== */}
      <footer className="tah-footer">
        <div className="tah-container">
          <div className="footer-top-grid">
            {/* Brand column */}
            <div className="footer-brand-col">
              <img src={brandLogos.primary.white} alt="TAHRAD" />
              <p>
                Subspecialty teleradiology for hospitals and diagnostic centres across India.
                24/7/365.
              </p>
            </div>

            {/* Services */}
            <div className="footer-links-col">
              <h4>SERVICES</h4>
              <div className="footer-links-list">
                <a href="#services" className="footer-link">CT reporting</a>
                <a href="#services" className="footer-link">MRI reporting</a>
                <a href="#services" className="footer-link">X-Ray & DR</a>
                <a href="#services" className="footer-link">Nighthawk & stat</a>
              </div>
            </div>

            {/* Company */}
            <div className="footer-links-col">
              <h4>COMPANY</h4>
              <div className="footer-links-list">
                <a href="#how-it-works" className="footer-link">How it works</a>
                <a href="#coverage" className="footer-link">Coverage</a>
                <button
                  onClick={() => setShowJoinPanelModal(true)}
                  className="footer-link"
                  style={{ background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer" }}
                >
                  Join as radiologist
                </button>
                <a href="#pilot-section" className="footer-link">Contact</a>
              </div>
            </div>

            {/* Clients */}
            <div className="footer-links-col">
              <h4>CLIENTS</h4>
              <div className="footer-links-list">
                <a
                  href="https://pacs.trustandhoperad.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Hospital login
                </a>
                <a href="#pilot-section" className="footer-link">Request a pilot</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div>© 2026 Trust & Hope Rad Pvt. Ltd. All rights reserved.</div>
            <div className="footer-legal-links">
              <a href="#">Privacy</a>
              <span>·</span>
              <a href="#">Terms</a>
              <span>·</span>
              <a href="#">Data security</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Dialogs */}
      {showCoverageModal && (
        <CoverageCityModal onClose={() => setShowCoverageModal(false)} />
      )}
      {showJoinPanelModal && (
        <JoinPanelModal onClose={() => setShowJoinPanelModal(false)} />
      )}
    </div>
  );
}
