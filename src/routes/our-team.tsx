import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { brandLogos, BRAND_FONTS_HREF } from "@/lib/brand";
import teamImgUrl from "../assets/team.webp";
import { useStats } from "@/lib/stats-store";
import { getBreadcrumbSchema, getWebPageSchema, ORGANIZATION_SCHEMA, SITE_URL } from "@/lib/seo-schemas";

const logoPrimaryWhite = brandLogos.primary.white;
const logoIconWhite = brandLogos.icon.white;

export const Route = createFileRoute("/our-team")({
  head: () => ({
    meta: [
      { title: "Our Radiologist Panel & Leadership Team | Trust and Hope Rad Pvt. Ltd." },
      {
        name: "description",
        content:
          "Meet the clinical leadership and 140+ fellowship-trained radiologists at Trust and Hope Rad Pvt. Ltd. Subspecialty expertise across CT, MRI, Neuro, MSK & Cardiac radiology.",
      },
      {
        name: "keywords",
        content:
          "radiologists India, teleradiologists, subspecialty radiologists, neuroradiology reporting, MSK radiologist, TAH RAD team, clinical operations radiology",
      },
      { property: "og:title", content: "Our Radiologist Panel & Leadership Team | Trust and Hope Rad Pvt. Ltd." },
      {
        property: "og:description",
        content:
          "140+ fellowship-trained radiologists delivering high-accuracy reporting 24/7/365 across hospitals in India.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/our-team` },
      { property: "og:image", content: `${SITE_URL}/tahrad-logo.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Our Radiologist Panel & Leadership Team | Trust and Hope Rad Pvt. Ltd." },
      { name: "twitter:description", content: "140+ fellowship-trained radiologists delivering high-accuracy reporting 24/7/365 across hospitals in India." },
      { name: "twitter:image", content: `${SITE_URL}/tahrad-logo.png` },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/our-team` },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
      },
      {
        rel: "stylesheet",
        href: BRAND_FONTS_HREF,
      },
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
            name: "Our Radiologist Panel & Leadership Team | Trust and Hope Rad Pvt. Ltd.",
            description:
              "Meet the clinical leadership and 140+ fellowship-trained radiologists at Trust and Hope Rad Pvt. Ltd. Subspecialty expertise across CT, MRI, Neuro, MSK & Cardiac radiology.",
            path: "/our-team",
            type: "AboutPage",
          })
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          getBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Our Team", item: "/our-team" },
          ])
        ),
      },
    ],
  }),
  component: OurTeam,
});

function OurTeam() {
  const stats = useStats();

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    const burger = document.getElementById("burger-btn");
    const drawer = document.getElementById("mobile-drawer");
    if (burger && drawer) {
      const toggle = () => {
        burger.classList.toggle("active");
        drawer.classList.toggle("open");
      };
      burger.addEventListener("click", toggle);
      cleanups.push(() => burger.removeEventListener("click", toggle));

      drawer.querySelectorAll("a").forEach((a) => {
        const close = () => {
          burger.classList.remove("active");
          drawer.classList.remove("open");
        };
        a.addEventListener("click", close);
        cleanups.push(() => a.removeEventListener("click", close));
      });
    }

    const backToTop = document.getElementById("back-to-top");
    const onScroll = () => {
      if (!backToTop) return;
      if (window.scrollY > 400) backToTop.classList.add("show");
      else backToTop.classList.remove("show");
    };
    window.addEventListener("scroll", onScroll);
    const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    backToTop?.addEventListener("click", toTop);
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      backToTop?.removeEventListener("click", toTop);
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className="our-team-page">
      {/* HEADER NAV */}
      <header className="nav">
        <div className="container">
          <div className="nav-wrap">
            <Link to="/" className="brand" aria-label="TAHRAD">
              <img className="brand-logo brand-logo--primary" src={logoPrimaryWhite} alt="TAHRAD" />
              <img className="brand-logo brand-logo--icon" src={logoIconWhite} alt="TAHRAD" />
            </Link>
            <nav className="links">
              <Link to="/">Home</Link>
              <Link to="/" hash="who-we-are">About Us</Link>
              <Link to="/" hash="services">Services</Link>
              <Link to="/" hash="contact">Contact</Link>
            </nav>
            <div className="d-flex align-items-center gap-3">
              <a
                href="https://pacs.trustandhoperad.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta nav-cta-desktop"
              >
                Login
              </a>
              <button className="burger" id="burger-btn" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mobile-drawer" id="mobile-drawer">
        <Link to="/">Home</Link>
        <Link to="/" hash="who-we-are">About Us</Link>
        <Link to="/our-team">Our Team</Link>
        <Link to="/" hash="where-we-work">Pan India Coverage</Link>
        <Link to="/" hash="how-reporting-works">How It Works</Link>
        <Link to="/" hash="services">Services</Link>
        <Link to="/" hash="contact">Contact</Link>
        <a
          href="https://pacs.trustandhoperad.com/login"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta mb-2"
        >
          Login
        </a>
        <Link to="/" hash="contact" className="nav-cta">
          Partner With Us
        </Link>
      </div>

      <main>
        {/* HERO SECTION — LIGHT EDITORIAL SIDE-BY-SIDE */}
        <section
          style={{
            background: "#F6F9FC",
            padding: "90px 0 80px 0",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div className="container">
            <div className="row g-4 g-lg-5 align-items-center">
              {/* LEFT CONTENT COLUMN */}
              <div className="col-12 col-lg-6">
                <span className="eyebrow mb-3" style={{ color: "var(--brand-blue)" }}>
                  OUR TEAM
                </span>
                <h1
                  style={{
                    color: "var(--brand-blue)",
                    fontSize: "clamp(32px, 3.8vw, 50px)",
                    fontWeight: 700,
                    lineHeight: 1.18,
                    letterSpacing: "-0.01em",
                    marginBottom: "20px",
                  }}
                >
                  {stats.radiologists}{stats.radiologistsSuffix} radiologists.<br />One quality bar.
                </h1>
                <p
                  style={{
                    fontSize: "16.5px",
                    color: "var(--brand-gray)",
                    lineHeight: 1.68,
                    marginBottom: "32px",
                    maxWidth: "580px",
                  }}
                >
                  We have a leadership team with wide experience across radiology and healthcare
                  operations and client servicing, backed by a large team of over {stats.radiologists}{stats.radiologistsSuffix} radiologists who
                  report across both general and subspecialties.
                </p>

                {/* 2x2 STAT CARDS GRID */}
                <div className="row g-3">
                  <div className="col-6">
                    <div className="team-stat-card">
                      <h3>{stats.radiologists}{stats.radiologistsSuffix}</h3>
                      <span>RADIOLOGISTS</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="team-stat-card">
                      <h3>{stats.studies}{stats.studiesSuffix}</h3>
                      <span>STUDIES DAILY</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="team-stat-card">
                      <h3>Multi-level</h3>
                      <span>QUALITY CONTROL</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="team-stat-card">
                      <h3>24×7</h3>
                      <span>OPERATIONS DESK</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT IMAGE COLUMN */}
              <div className="col-12 col-lg-6">
                <div className="team-photo-showcase">
                  <img
                    src={teamImgUrl}
                    alt="Trust and Hope Radiologists and Healthcare Team"
                    className="team-photo-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="row g-4 g-lg-5">
            <div className="col-12 col-lg-4 pe-lg-4">
              <Link to="/" className="brand" aria-label="TAHRAD">
                <img className="brand-logo brand-logo--primary" src={logoPrimaryWhite} alt="TAHRAD" />
                <img className="brand-logo brand-logo--icon" src={logoIconWhite} alt="TAHRAD" />
              </Link>
              <p data-stat-summary>
                Trust and Hope Rad Pvt. Ltd. | 24×7 teleradiology services serving {stats.centres}{stats.centresSuffix} centres, {stats.studies}{stats.studiesSuffix} new
                studies uploaded daily to PACS, {stats.radiologists}{stats.radiologistsSuffix} radiologists across specialisations, {stats.states}{stats.statesSuffix} states covered in India.
              </p>
            </div>
            <div className="col-6 col-md-4 col-lg-3">
              <h5>Contact Us</h5>
              <ul style={{ fontSize: "13.5px" }}>
                <li><strong>Call:</strong> <a href="tel:+918123388860">+91 81233 88860</a></li>
                <li><strong>WhatsApp:</strong> <a href="https://wa.me/918123388860" target="_blank" rel="noopener noreferrer" style={{ color: "#25D366" }}>+91 81233 88860</a></li>
                <li><strong>Mail:</strong> <a href="mailto:admin@trustandhoperad.com" style={{ wordBreak: "break-all" }}>admin@trustandhoperad.com</a></li>
              </ul>
              <div className="topbar-socials mt-3">
                      <a href="https://in.linkedin.com/company/trust-and-hope-rad?trk=public_post_feed-actor-name" target="_blank" rel="noopener noreferrer" className="topbar-social-link li-hover" title="LinkedIn" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "14px", height: "14px" }}><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-1.25.7-1.92 1.63-1.92.93 0 1.36.67 1.36 1.92v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                </a>
                      <a href="https://wa.me/918123388860" target="_blank" rel="noopener noreferrer" className="topbar-social-link wa-hover" title="WhatsApp" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "14px", height: "14px" }}><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.76.459 3.474 1.33 4.987l-1.414 5.163 5.286-1.386a9.96 9.96 0 004.787 1.22h.005c5.507 0 9.99-4.478 9.99-9.985 0-2.667-1.039-5.176-2.924-7.062A9.923 9.923 0 0012.012 2zm5.82 14.161c-.247.692-1.22 1.326-1.996 1.492-.533.113-1.229.206-3.567-.763-2.989-1.237-4.908-4.275-5.059-4.474-.148-.198-1.218-1.621-1.218-3.092 0-1.47.767-2.196 1.041-2.495.274-.298.599-.373.799-.373.199 0 .399.002.573.01.185.008.435-.07.68.518.248.598.847 2.068.921 2.217.075.149.124.323.025.522-.099.198-.149.322-.298.497-.149.174-.313.389-.447.523-.148.149-.303.311-.13.609.174.298.774 1.277 1.662 2.067 1.14 1.015 2.102 1.33 2.399 1.478.298.149.472.124.646-.075.174-.199.746-.87.945-1.168.199-.298.398-.248.671-.149.274.099 1.742.82 2.04 1.043.298.224.497.348.572.473.075.124.075.72-.172 1.412z"/></svg>
                </a>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <h5>Navigate</h5>
              <ul>
                <li>
                  <Link to="/" hash="who-we-are">About Us</Link>
                </li>
                <li>
                  <Link to="/our-team">Our Team</Link>
                </li>
                <li>
                  <Link to="/" hash="where-we-work">Pan India Coverage</Link>
                </li>
                <li>
                  <Link to="/" hash="how-reporting-works">How It Works</Link>
                </li>
                <li>
                  <Link to="/" hash="services">Services</Link>
                </li>
                <li>
                  <Link to="/" hash="contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md-3 col-lg-3">
              <h5>Modalities</h5>
              <ul>
                <li>
                  <Link to="/" hash="services">CT Reporting</Link>
                </li>
                <li>
                  <Link to="/" hash="services">MRI Reporting</Link>
                </li>
                <li>
                  <Link to="/" hash="services">X-Ray &amp; USG Reads</Link>
                </li>
                <li>
                  <Link to="/" hash="services">PET Oncology Scans</Link>
                </li>
                <li>
                  <Link to="/" hash="services">Nighthawk &amp; Stat Reads</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="foot-bottom">
            <span>© {new Date().getFullYear()} Trust and Hope Rad Pvt. Ltd. All rights reserved.</span>
            <span>Read Right. Read Fast. 24/7.</span>
          </div>
        </div>
      </footer>

      <button id="back-to-top" aria-label="Back to Top">
        ↑
      </button>

    </div>
  );
}
