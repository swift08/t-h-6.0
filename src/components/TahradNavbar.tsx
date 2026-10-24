import { useState, useEffect } from "react";
import { brandLogos } from "@/lib/brand";

interface NavbarProps {
  onOpenDesk?: () => void;
  onRequestPilot?: () => void;
}

export function TahradNavbar({ onOpenDesk, onRequestPilot }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className="tah-nav"
        style={{
          boxShadow: scrolled ? "0 4px 20px rgba(0, 40, 250, 0.06)" : "none",
        }}
      >
        <div className="tah-container tah-nav-inner">
          <a href="#" className="tah-nav-brand" aria-label="TAHRAD Home">
            <img
              src={brandLogos.primary.blue}
              alt="TAHRAD"
              style={{ height: "30px", width: "auto" }}
            />
          </a>

          <nav className="tah-nav-links" aria-label="Main Navigation">
            <button
              onClick={() => handleScrollTo("services")}
              className="tah-nav-link"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              Services
            </button>
            <button
              onClick={() => handleScrollTo("how-it-works")}
              className="tah-nav-link"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              How it works
            </button>

            <button
              onClick={() => handleScrollTo("coverage")}
              className="tah-nav-link"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              Coverage
            </button>
            <button
              onClick={() => handleScrollTo("for-radiologists")}
              className="tah-nav-link"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              For radiologists
            </button>
          </nav>

          <div className="tah-nav-actions">
            <a
              href="https://pacs.trustandhoperad.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="tah-nav-login"
            >
              Hospital login
            </a>
            <button
              onClick={() => {
                if (onRequestPilot) onRequestPilot();
                else handleScrollTo("pilot-section");
              }}
              className="btn-tah-primary"
            >
              Request a pilot <span aria-hidden="true">→</span>
            </button>
          </div>

          <button
            className="burger-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "var(--nav-height)",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#FFFFFF",
            zIndex: 999,
            padding: "2rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            borderBottom: "1px solid var(--color-border)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          }}
        >
          <button
            onClick={() => handleScrollTo("services")}
            style={{ textAlign: "left", fontSize: "1.2rem", fontWeight: 700, color: "var(--brand-blue)", background: "none", border: "none" }}
          >
            Services
          </button>
          <button
            onClick={() => handleScrollTo("how-it-works")}
            style={{ textAlign: "left", fontSize: "1.2rem", fontWeight: 700, color: "var(--brand-blue)", background: "none", border: "none" }}
          >
            How it works
          </button>

          <button
            onClick={() => handleScrollTo("coverage")}
            style={{ textAlign: "left", fontSize: "1.2rem", fontWeight: 700, color: "var(--brand-blue)", background: "none", border: "none" }}
          >
            Coverage
          </button>
          <button
            onClick={() => handleScrollTo("for-radiologists")}
            style={{ textAlign: "left", fontSize: "1.2rem", fontWeight: 700, color: "var(--brand-blue)", background: "none", border: "none" }}
          >
            For radiologists
          </button>
          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <a
              href="https://pacs.trustandhoperad.com/login"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textAlign: "center", padding: "0.75rem", border: "1.5px solid var(--brand-blue)", borderRadius: "var(--radius-pill)", fontWeight: 600 }}
            >
              Hospital login
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleScrollTo("pilot-section");
              }}
              className="btn-tah-primary"
              style={{ width: "100%" }}
            >
              Request a pilot →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
