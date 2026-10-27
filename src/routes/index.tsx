import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { TahradNavbar } from "@/components/TahradNavbar";
import { CoverageCityModal } from "@/components/CoverageCityModal";
import { JoinPanelModal } from "@/components/JoinPanelModal";
import { brandLogos, BRAND_FONTS_HREF } from "@/lib/brand";
import { useStats } from "@/lib/stats-store";
import { ORGANIZATION_SCHEMA, FAQ_SCHEMA, getBreadcrumbSchema, getWebPageSchema, SITE_URL } from "@/lib/seo-schemas";

function formatSeconds(totalSecs: number): string {
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trust and Hope Rad Pvt. Ltd. | 24x7 Teleradiology Services India" },
      {
        name: "description",
        content:
          "India's premier 24x7 teleradiology reporting service for hospitals and diagnostic centres. High-accuracy CT, MRI, X-Ray & subspecialty reporting with 15-30 min emergency TAT.",
      },
      {
        name: "keywords",
        content:
          "teleradiology India, 24x7 teleradiology reporting, CT scan reporting, MRI reporting, X-Ray reporting, emergency radiologist, PACS teleradiology, subspecialty radiology, TAH RAD, Trust and Hope Rad, remote radiology",
      },
      { property: "og:title", content: "Trust and Hope Rad Pvt. Ltd. | 24x7 Teleradiology Services India" },
      {
        property: "og:description",
        content:
          "Fast, accurate, and secure 24x7 radiology reporting for hospitals across India. 140+ fellowship-trained radiologists and cloud PACS integration.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: "Trust and Hope Rad Pvt. Ltd." },
      { property: "og:image", content: `${SITE_URL}/brand/tahrad-logo-primary-blue.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Trust and Hope Rad Pvt. Ltd. | 24x7 Teleradiology Services" },
      {
        name: "twitter:description",
        content:
          "24x7 remote radiology reporting for CT, MRI, X-Ray & emergency reads across India.",
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
        children: JSON.stringify(FAQ_SCHEMA),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          getWebPageSchema({
            name: "Trust and Hope Rad Pvt. Ltd. | 24x7 Teleradiology Services India",
            description:
              "India's premier 24x7 teleradiology reporting service for hospitals and diagnostic centres. High-accuracy CT, MRI, X-Ray & subspecialty reporting with 15-30 min emergency TAT.",
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

  // Partnership / Pilot Form State
  const [pilotForm, setPilotForm] = useState({
    name: "",
    hospital: "",
    email: "",
    phone: "",
    modality: "Full-Spectrum",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const scrollToPilot = () => {
    const el = document.getElementById("contact") || document.getElementById("pilot-section");
    el?.scrollIntoView({ behavior: "smooth" });
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
                  24×7 TELERADIOLOGY REPORTING · PAN-INDIA
                </div>

                <h1 className="tah-hero-title">
                  Full-spectrum<br />
                  teleradiology,{" "}
                  <span className="highlight-yellow">one reporting partner.</span>
                </h1>

                <p className="tah-hero-lead">
                  Fast, subspecialty-backed reporting across all modalities—24/7/365. Eliminate
                  coverage gaps and streamline your clinical workflow.
                </p>

                <div className="tah-hero-ctas">
                  <button onClick={scrollToPilot} className="btn-tah-primary">
                    Partner with us <span aria-hidden="true">→</span>
                  </button>
                </div>

                <div className="tah-hero-trust">
                  <div className="trust-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <span>Direct radiologist communication</span>
                  </div>
                  <div className="trust-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    <span>15–30 min emergency turnaround</span>
                  </div>
                  <div className="trust-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    <span>Cloud PACS integration</span>
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
                <div className="tah-stat-label">Centres Served</div>
              </div>
              <div className="tah-stat-item">
                <div className="tah-stat-num" data-stat-val="studies">
                  {stats.studies.toLocaleString()}{stats.studiesSuffix}
                </div>
                <div className="tah-stat-label">New Studies Uploaded Daily to PACS</div>
              </div>
              <div className="tah-stat-item">
                <div className="tah-stat-num" data-stat-val="radiologists">
                  {stats.radiologists}{stats.radiologistsSuffix}
                </div>
                <div className="tah-stat-label">Radiologists Across Specialisations</div>
              </div>
              <div className="tah-stat-item">
                <div className="tah-stat-num" data-stat-val="states">
                  {stats.states}{stats.statesSuffix}
                </div>
                <div className="tah-stat-label">States Covered in India</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            WHO WE ARE / BUILT AROUND HOW YOU WORK (PDF 1 Page 1)
            =================================================================== */}
        <section className="tah-ways-section" id="who-we-are">
          <div className="tah-container">
            <div className="tah-section-header-split">
              <div className="header-left">
                <span className="eyebrow">WHO WE ARE</span>
                <h2>Direct Radiologist Communication, Zero Disconnect</h2>
              </div>
              <div className="header-right">
                Every scan request means there's a patient on the line. We empower hospitals, diagnostic centres, and clinical teams across India with remote diagnostic interpretations that you can trust implicitly.
              </div>
            </div>

            <div className="tah-three-cards-grid">
              {/* Card 1: Our Mission (Brand Blue) */}
              <div className="tah-plug-card card-blue">
                <div className="card-top">
                  <div className="icon-tile-green">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <h3>Our Mission</h3>
                  <p>
                    Timely, precise, high-quality reporting to enhance healthcare delivery. We don't just read scans, we remain accessible before, during and after the report is signed.
                  </p>
                </div>
                <button
                  onClick={scrollToPilot}
                  className="card-link"
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}
                >
                  Direct radiologist communication →
                </button>
              </div>

              {/* Card 2: Our Vision */}
              <div className="tah-plug-card card-white">
                <div className="card-top">
                  <div className="icon-tile-green">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/></svg>
                  </div>
                  <h3>Our Vision</h3>
                  <p>
                    A global leader in tele-radiology fostering innovation, trust, and diagnostic excellence—backed by our extensive panel of 140+ fellowship-trained radiologists.
                  </p>
                </div>
                <a
                  href="/our-team"
                  className="card-link"
                  style={{ textDecoration: "none", textAlign: "left" }}
                >
                  Meet our radiologists panel →
                </a>
              </div>

              {/* Card 3: Service Philosophy */}
              <div className="tah-plug-card card-white">
                <div className="card-top">
                  <div className="icon-tile-green">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                  </div>
                  <h3>Service Philosophy</h3>
                  <p>
                    Accuracy, Speed, Reliability, Workflow Optimization, and Patient Care. No ticket systems or vague time frames—reporting turnaround times we are actually accountable to.
                  </p>
                </div>
                <a
                  href="#why-us"
                  className="card-link"
                  style={{ textDecoration: "none", textAlign: "left" }}
                >
                  Why choose TAH RAD →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            FROM SCAN TO SIGNED REPORT (FIVE STAGES) (PDF 1 Page 2)
            =================================================================== */}
        <section className="tah-stages-band" id="how-reporting-works">
          <div className="tah-container">
            <span className="eyebrow">FROM SCAN TO SIGNED REPORT</span>
            <h2>How Teleradiology Works</h2>
            <p style={{ maxWidth: "720px", color: "var(--brand-gray)", fontSize: "1.05rem", lineHeight: 1.6, marginTop: "0.5rem", marginBottom: "2rem" }}>
              Each of these steps is designed to facilitate the process of getting reports done, and is fully integrated with PACS.
            </p>

            <div className="tah-stages-grid">
              {/* 01 Image acquisition */}
              <div className="tah-stage-col">
                <div>
                  <div className="stage-number">01</div>
                  <div className="stage-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  </div>
                  <div className="stage-title">Image acquisition</div>
                  <div className="stage-text">
                    A technologist at the hospital or diagnostic centre acquires the scan using standard imaging equipment (X-ray, CT, MRI, or mammography machine). The images are stored in DICOM format, the universal standard for medical imaging.
                  </div>
                </div>
                <div className="stage-pill">DICOM format</div>
              </div>

              {/* 02 Secure transmission */}
              <div className="tah-stage-col">
                <div>
                  <div className="stage-number">02</div>
                  <div className="stage-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div className="stage-title">Secure transmission</div>
                  <div className="stage-text">
                    The DICOM images are transmitted securely from the facility's PACS (Picture Archiving and Communication System) to the teleradiology platform. Transmission uses encrypted channels compliant with healthcare data standards.
                  </div>
                </div>
                <div className="stage-pill">Encrypted transmission</div>
              </div>

              {/* 03 Radiologist interpretation */}
              <div className="tah-stage-col">
                <div>
                  <div className="stage-number">03</div>
                  <div className="stage-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </div>
                  <div className="stage-title">Radiologist interpretation</div>
                  <div className="stage-text">
                    A board-certified radiologist reviews the images, identifies pathologies, and generates the draft report. Work is performed exclusively by certified specialists to ensure diagnostic precision.
                  </div>
                </div>
                <div className="stage-pill">Board-certified reads</div>
              </div>

              {/* 04 Quality check */}
              <div className="tah-stage-col">
                <div>
                  <div className="stage-number">04</div>
                  <div className="stage-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="m9 14 2 2 4-4"/></svg>
                  </div>
                  <div className="stage-title">Quality check</div>
                  <div className="stage-text">
                    They validate correct findings, correct any errors, add clinical context, and finalise the report. The final report is double-checked for critical findings before communication.
                  </div>
                </div>
                <div className="stage-pill">Multi-level QA</div>
              </div>

              {/* 05 Report delivery */}
              <div className="tah-stage-col">
                <div>
                  <div className="stage-number">05</div>
                  <div className="stage-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </div>
                  <div className="stage-title">Report delivery</div>
                  <div className="stage-text">
                    The finalised report is delivered directly to the referring clinician via the integrated PACS or secure portal — fast, accurate, and actionable. Zero technical friction with IT support.
                  </div>
                </div>
                <div className="stage-pill">Direct PACS delivery</div>
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
                <span className="eyebrow">WHAT WE DO</span>
                <h2>Full-spectrum teleradiology, one reporting partner.</h2>
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
                Covering the entire diagnostic imaging spectrum →
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
                  <p>High-speed CT reporting for head, chest, abdomen, angiography, and polytrauma emergencies with sub-hour stat delivery.</p>
                </div>
                <div className="modality-tags">Trauma &amp; Stroke · 3D Angio · Abdomen</div>
              </div>

              {/* MRI */}
              <div className="modality-card" onClick={scrollToPilot} style={{ cursor: "pointer" }}>
                <div>
                  <div className="modality-card-top">
                    <span className="modality-code">MRI</span>
                    <span className="modality-arrow" aria-hidden="true">↗</span>
                  </div>
                  <h3>MRI reporting</h3>
                  <p>Comprehensive MRI interpretations covering neuroradiology, spine, musculoskeletal joints, pelvic, and cardiac studies.</p>
                </div>
                <div className="modality-tags">Neuro &amp; Spine · MSK · Cardiac &amp; Body</div>
              </div>

              {/* XR */}
              <div className="modality-card" onClick={scrollToPilot} style={{ cursor: "pointer" }}>
                <div>
                  <div className="modality-card-top">
                    <span className="modality-code">XR</span>
                    <span className="modality-arrow" aria-hidden="true">↗</span>
                  </div>
                  <h3>X-Ray reporting</h3>
                  <p>Rapid turnaround for high-volume plain radiography, chest X-rays, trauma skeletal series, and routine screening.</p>
                </div>
                <div className="modality-tags">Chest · Skeletal · Routine Screening</div>
              </div>

              {/* PET */}
              <div className="modality-card" onClick={scrollToPilot} style={{ cursor: "pointer" }}>
                <div>
                  <div className="modality-card-top">
                    <span className="modality-code">PET</span>
                    <span className="modality-arrow" aria-hidden="true">↗</span>
                  </div>
                  <h3>PET reporting</h3>
                  <p>Specialized PET/CT molecular imaging reads for cancer staging, therapy evaluation, and metabolic lesion tracking.</p>
                </div>
                <div className="modality-tags">Oncology Staging · FDG · SUVmax</div>
              </div>

              {/* USG */}
              <div className="modality-card" onClick={scrollToPilot} style={{ cursor: "pointer" }}>
                <div>
                  <div className="modality-card-top">
                    <span className="modality-code">USG</span>
                    <span className="modality-arrow" aria-hidden="true">↗</span>
                  </div>
                  <h3>USG reporting</h3>
                  <p>Expert review for general ultrasound, Color Doppler vascular studies, and abdominal &amp; pelvic diagnostic imagery.</p>
                </div>
                <div className="modality-tags">Color Doppler · Abdominal · Small Parts</div>
              </div>

              {/* SUB */}
              <div className="modality-card" onClick={scrollToPilot} style={{ cursor: "pointer" }}>
                <div>
                  <div className="modality-card-top">
                    <span className="modality-code">SUB</span>
                    <span className="modality-arrow" aria-hidden="true">↗</span>
                  </div>
                  <h3>Subspecialty reads</h3>
                  <p>Domain-specific imaging reads reported by radiologists trained in Neuroradiology, MSK, Cardiothoracic, Oncology, and Obstetric Imaging.</p>
                </div>
                <div className="modality-tags">Neuro · MSK · Cardio · Oncology</div>
              </div>

              {/* 24/7 */}
              <div className="modality-card" onClick={scrollToPilot} style={{ cursor: "pointer" }}>
                <div>
                  <div className="modality-card-top">
                    <span className="modality-code">24/7</span>
                    <span className="modality-arrow" aria-hidden="true">↗</span>
                  </div>
                  <h3>Nighthawk &amp; stat</h3>
                  <p>Overnight and emergency reads so your nightshift won't be unproductive, leaving undetermined cases for the morning hours.</p>
                </div>
                <div className="modality-tags">Overnight · Emergency ED · Stat Reads</div>
              </div>

              {/* 2nd */}
              <div className="modality-card" onClick={scrollToPilot} style={{ cursor: "pointer" }}>
                <div>
                  <div className="modality-card-top">
                    <span className="modality-code">2nd</span>
                    <span className="modality-arrow" aria-hidden="true">↗</span>
                  </div>
                  <h3>Second opinions</h3>
                  <p>Independent subspecialty reviews and detailed peer audit reports providing clinical certainty for complex or conflicting cases.</p>
                </div>
                <div className="modality-tags">Peer Review · QA Audit · Consensus</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            THE TAHRAD REPORTING DESK OVERVIEW & TOUR (PDF 1 Page 2 & 3)
            =================================================================== */}
        <section className="tah-desk-overview-section" id="reporting-desk">
          <div className="tah-container">
            <span className="eyebrow">INTEGRATED CLOUD PACS PLATFORM</span>
            <h2>Zero Technical Friction with Seamless PACS Integration</h2>
            <p style={{ maxWidth: "680px", fontSize: "1.1rem" }}>
              TAH RAD integrates seamlessly with existing hospital PACS/RIS or provides a secure cloud PACS platform for instant DICOM study uploads, live tracking, and digital report delivery.
            </p>

            {/* Mini Desk Live Bar */}
            <div className="tah-mini-desk-bar">
              <div className="mini-desk-centre">[Your Centre] · Live Reporting Portal</div>
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
                    <h3>Pioneer in Teleradiology</h3>
                    <p>Trusted partner for hospitals and imaging centers across India with multi-level quality assurance and cloud PACS workflow.</p>
                  </div>
                </div>

                <div className="tour-feature-item">
                  <div className="icon-tile">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <div>
                    <h3>24/7 Direct Customer Support</h3>
                    <p>Never experience radio silence. Immediate escalation pathways and doctor-to-doctor consultation whenever critical findings emerge.</p>
                  </div>
                </div>

                <div className="tour-feature-item">
                  <div className="icon-tile">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  </div>
                  <div>
                    <h3>15–30 Min Emergency Stat Reads</h3>
                    <p>Immediate escalation for stroke and acute trauma cases, delivered within 15–30 minutes with direct doctor call-backs.</p>
                  </div>
                </div>

                <div className="tour-feature-item">
                  <div className="icon-tile">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                  </div>
                  <div>
                    <h3>Lots of Volume, Still Personal</h3>
                    <p>Over a million studies reported, while maintaining personal doctor rapport and direct communication on every case.</p>
                  </div>
                </div>

                <div>
                  <button
                    onClick={scrollToPilot}
                    className="btn-tah-primary"
                    style={{ marginTop: "0.5rem" }}
                  >
                    Partner with us <span aria-hidden="true">→</span>
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
            <span className="eyebrow">WHY US</span>
            <h2>Hospitals who work with us always get a call back.</h2>
            <p style={{ maxWidth: "780px", color: "var(--brand-gray)", fontSize: "1.05rem", lineHeight: 1.6, marginTop: "0.5rem", marginBottom: "2rem" }}>
              Ask any radiology coordinator what the biggest disconnect is with teleradiology. The answer is almost always the silence that occurs within the process. There is no one to contact if there are questions, and the response deadlines for the reports come and go without an explanation. These issues are what we aim to address with Trust and Hope Rad Pvt. Ltd.
            </p>

            <div className="tah-why-grid">
              {/* Card 1 */}
              <div className="why-compare-card">
                <div className="why-before-box">
                  <div className="why-before-label">BEFORE</div>
                  <p className="why-before-text">
                    Radio silence and ticket systems with no request information or approximate timeframes.
                  </p>
                </div>
                <div className="why-tahrad-box">
                  <div className="eyebrow" style={{ fontSize: "0.72rem", marginBottom: "0.3rem" }}>
                    AVOIDING QUEUE THEORY
                  </div>
                  <h3>Dedicated contact &amp; direct connection</h3>
                  <p>
                    Your team has a dedicated contact for communication, not an ever-changing support inbox. Connect with radiologists when every minute matters.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="why-compare-card">
                <div className="why-before-box">
                  <div className="why-before-label">BEFORE</div>
                  <p className="why-before-text">
                    Queue roulette and delayed reports because of the unavailability of a single radiologist.
                  </p>
                </div>
                <div className="why-tahrad-box">
                  <div className="eyebrow" style={{ fontSize: "0.72rem", marginBottom: "0.3rem" }}>
                    LARGE RADIOLOGY NETWORK
                  </div>
                  <h3>140+ subspecialty radiologists on call</h3>
                  <p>
                    Your reports will not be delayed because of the unavailability of one radiologist. 140+ subspecialty radiologists on call 24/7/365.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="why-compare-card">
                <div className="why-before-box">
                  <div className="why-before-label">BEFORE</div>
                  <p className="why-before-text">
                    Unaccountable response deadlines that come and go without an explanation.
                  </p>
                </div>
                <div className="why-tahrad-box">
                  <div className="eyebrow" style={{ fontSize: "0.72rem", marginBottom: "0.3rem" }}>
                    WE'VE GOT YOUR BACK
                  </div>
                  <h3>Accountable turnaround times</h3>
                  <p>
                    We hold ourselves accountable for our promises. Disciplined turnaround times with dependable report delivery and personal doctor rapport.
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
              <div className="quote-author">TAH RAD, CLINICAL OPERATIONS</div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            PAN-INDIA COVERAGE & RADIOLOGIST RECRUITMENT (PDF 1 Page 4 & Review 05)
            =================================================================== */}
        <section className="tah-coverage-section" id="coverage">
          <div className="tah-container" id="where-we-work">
            <div className="coverage-grid-split">
              <div>
                <span className="eyebrow">PAN-INDIA COVERAGE</span>
                <h2>15+ States Covered in India</h2>
                <p style={{ fontSize: "1.05rem", marginBottom: "1.75rem" }}>
                  From major city trauma centers to regional diagnostic clinics, our network of 140+ board-certified radiologists delivers 24x7 teleradiology reporting across India.
                </p>

                <div className="state-chips-wrap">
                  <span className="state-chip">Maharashtra</span>
                  <span className="state-chip">Uttar Pradesh</span>
                  <span className="state-chip">Delhi NCR</span>
                  <span className="state-chip">Karnataka</span>
                  <span className="state-chip">Tamil Nadu</span>
                  <span className="state-chip">Kerala</span>
                  <span className="state-chip">Gujarat</span>
                  <span className="state-chip">Rajasthan</span>
                  <span className="state-chip">West Bengal</span>
                  <span className="state-chip">Madhya Pradesh</span>
                  <span className="state-chip">Andhra Pradesh</span>
                  <span className="state-chip">Telangana</span>
                  <span className="state-chip">Bihar</span>
                  <span className="state-chip">Odisha</span>
                  <span className="state-chip">Punjab</span>
                  <span className="state-chip">Haryana</span>
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
                  For critical and emergency trauma cases, TAH RAD delivers rapid stat reads within 15 to 30 minutes with direct doctor-to-doctor call-backs for urgent findings.
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
            CONTACT & PARTNERSHIP FORM (PDF 1 Page 4 & Review 05)
            =================================================================== */}
        <section className="tah-pilot-section" id="contact">
          <div className="tah-container" id="pilot-section">
            <div className="pilot-split-card">
              {/* Left Panel: Blue */}
              <div className="pilot-left-panel">
                <div>
                  <span className="eyebrow">GET IN TOUCH</span>
                  <h2>Partner with Trust &amp; Hope Rad Today</h2>
                  <p style={{ color: "#D0DCED", fontSize: "0.95rem", marginTop: "0.5rem", marginBottom: "1.5rem" }}>
                    Ready to eliminate radiology reporting delays and empower your clinical team with responsive teleradiology? Reach out to schedule a demo or set up your hospital workflow.
                  </p>

                  <div className="pilot-steps-list">
                    <div className="pilot-step-item">
                      <strong>01</strong>
                      <span>Direct consultation with our clinical operations team.</span>
                    </div>
                    <div className="pilot-step-item">
                      <strong>02</strong>
                      <span>Zero-friction PACS integration and DICOM gateway setup.</span>
                    </div>
                    <div className="pilot-step-item">
                      <strong>03</strong>
                      <span>Go live with 24/7 subspecialty reporting and dedicated doctor escalation.</span>
                    </div>
                  </div>
                </div>

                <div className="pilot-company-info">
                  <strong>Trust and Hope Rad Pvt. Ltd.</strong>
                  <div>#1035, 4th 'M' Block, Dr. Rajkumar Road, Rajajinagar, Bangalore – 560010</div>
                  <div style={{ marginTop: "0.5rem" }}>
                    Call / Helpline:{" "}
                    <a href="tel:+918123388860" style={{ color: "#FFFFFF", fontWeight: 600, textDecoration: "underline" }}>
                      +91 81233 88860
                    </a>
                  </div>
                  <div>
                    WhatsApp:{" "}
                    <a
                      href="https://wa.me/918123388860"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--brand-green)", fontWeight: 600, textDecoration: "underline" }}
                    >
                      +91 81233 88860 (Chat Now →)
                    </a>
                  </div>
                  <div>
                    Email:{" "}
                    <a href="mailto:admin@trustandhoperad.com" style={{ color: "#FFFFFF", textDecoration: "underline" }}>
                      admin@trustandhoperad.com
                    </a>
                  </div>
                  <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.75rem" }}>
                    <a
                      href="https://wa.me/918123388860"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        backgroundColor: "#25D366",
                        color: "#FFFFFF",
                        padding: "6px 14px",
                        fontSize: "0.82rem",
                        borderRadius: "var(--radius-pill)",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      WhatsApp
                    </a>
                    <a
                      href="https://in.linkedin.com/company/trust-and-hope-rad?trk=public_post_feed-actor-name"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        backgroundColor: "rgba(255,255,255,0.15)",
                        color: "#FFFFFF",
                        padding: "6px 14px",
                        fontSize: "0.82rem",
                        borderRadius: "var(--radius-pill)",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      LinkedIn
                    </a>
                  </div>
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
                    <h2>Request Submitted!</h2>
                    <p style={{ maxWidth: "440px", margin: "0 auto 1.5rem auto" }}>
                      Thank you! Your request has been submitted. Our team will call you back shortly at <strong>{pilotForm.phone}</strong>.
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
                      <strong>Next step:</strong> Our clinical onboarding team will contact you to configure PACS integration and set up your trial reporting desk.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="pilot-form">
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem", color: "var(--brand-blue)" }}>
                      Request a Partnership Callback
                    </h3>
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Your Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Dr. / Mr. / Ms. Name"
                          className="tah-input"
                          value={pilotForm.name}
                          onChange={(e) => setPilotForm({ ...pilotForm, name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Hospital / Center Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Hospital / Diagnostic Name"
                          className="tah-input"
                          value={pilotForm.hospital}
                          onChange={(e) => setPilotForm({ ...pilotForm, hospital: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Work Email</label>
                        <input
                          type="email"
                          required
                          placeholder="name@hospital.com"
                          className="tah-input"
                          value={pilotForm.email}
                          onChange={(e) => setPilotForm({ ...pilotForm, email: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
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
                      <label>Primary Modality Needs</label>
                      <select
                        className="tah-select"
                        value={pilotForm.modality}
                        onChange={(e) => setPilotForm({ ...pilotForm, modality: e.target.value })}
                      >
                        <option value="Full-Spectrum">Full-Spectrum (CT, MRI, X-Ray, PET, USG)</option>
                        <option value="CT-MRI">CT &amp; MRI Reporting</option>
                        <option value="Nighthawk">Nighthawk &amp; Emergency Stat Reads</option>
                        <option value="Subspecialty">Subspecialty Reads</option>
                        <option value="Second-Opinion">Second Opinions &amp; QA</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Message / Daily Scan Volume</label>
                      <textarea
                        className="tah-input"
                        rows={2}
                        placeholder="Tell us about your daily scan volume and reporting requirements..."
                        value={pilotForm.message}
                        onChange={(e) => setPilotForm({ ...pilotForm, message: e.target.value })}
                        style={{ resize: "vertical" }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-tah-primary"
                      style={{ width: "100%", marginTop: "0.5rem" }}
                    >
                      Submit Request →
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
                Trust and Hope Rad Pvt. Ltd. | 24×7 teleradiology services serving 350+ centres, 1000+ new studies uploaded daily to PACS, 140+ radiologists across specialisations, 15+ states covered in India.
              </p>
            </div>

            {/* Contact Us */}
            <div className="footer-links-col">
              <h4>CONTACT US</h4>
              <div className="footer-links-list" style={{ fontSize: "0.88rem" }}>
                <div>Call: <a href="tel:+918123388860" className="footer-link" style={{ display: "inline" }}>+91 81233 88860</a></div>
                <div>WhatsApp: <a href="https://wa.me/918123388860" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: "inline", color: "var(--brand-green)" }}>+91 81233 88860</a></div>
                <div>Mail: <a href="mailto:admin@trustandhoperad.com" className="footer-link" style={{ display: "inline", wordBreak: "break-all" }}>admin@trustandhoperad.com</a></div>
                <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.75rem" }}>
                  <a
                    href="https://in.linkedin.com/company/trust-and-hope-rad?trk=public_post_feed-actor-name"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                    title="LinkedIn"
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href="https://wa.me/918123388860"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                    title="WhatsApp"
                  >
                    WhatsApp ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Navigate */}
            <div className="footer-links-col">
              <h4>NAVIGATE</h4>
              <div className="footer-links-list">
                <a href="#who-we-are" className="footer-link">About Us</a>
                <a href="/our-team" className="footer-link">Our Team</a>
                <a href="#coverage" className="footer-link">Pan India Coverage</a>
                <a href="#how-reporting-works" className="footer-link">How It Works</a>
                <a href="#services" className="footer-link">Services</a>
                <a href="#why-us" className="footer-link">Why Us</a>
                <a href="#contact" className="footer-link">Contact</a>
              </div>
            </div>

            {/* Modalities */}
            <div className="footer-links-col">
              <h4>MODALITIES</h4>
              <div className="footer-links-list">
                <a href="#services" className="footer-link">CT Reporting</a>
                <a href="#services" className="footer-link">MRI Reporting</a>
                <a href="#services" className="footer-link">X-Ray &amp; USG Reads</a>
                <a href="#services" className="footer-link">PET Oncology Scans</a>
                <a href="#services" className="footer-link">Nighthawk &amp; Stat Reads</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div>© {new Date().getFullYear()} Trust and Hope Rad Pvt. Ltd. All rights reserved.</div>
            <div className="footer-legal-links">
              <span>Read Right. Read Fast. 24/7.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp CTA */}
      <a
        href="https://wa.me/918123388860"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.76.459 3.474 1.33 4.987l-1.414 5.163 5.286-1.386a9.96 9.96 0 004.787 1.22h.005c5.507 0 9.99-4.478 9.99-9.985 0-2.667-1.039-5.176-2.924-7.062A9.923 9.923 0 0012.012 2zm5.82 14.161c-.247.692-1.22 1.326-1.996 1.492-.533.113-1.229.206-3.567-.763-2.989-1.237-4.908-4.275-5.059-4.474-.148-.198-1.218-1.621-1.218-3.092 0-1.47.767-2.196 1.041-2.495.274-.298.599-.373.799-.373.199 0 .399.002.573.01.185.008.435-.07.68.518.248.598.847 2.068.921 2.217.075.149.124.323.025.522-.099.198-.149.322-.298.497-.149.174-.313.389-.447.523-.148.149-.303.311-.13.609.174.298.774 1.277 1.662 2.067 1.14 1.015 2.102 1.33 2.399 1.478.298.149.472.124.646-.075.174-.199.746-.87.945-1.168.199-.298.398-.248.671-.149.274.099 1.742.82 2.04 1.043.298.224.497.348.572.473.075.124.075.72-.172 1.412z" />
        </svg>
        <span>Chat on WhatsApp</span>
      </a>

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
