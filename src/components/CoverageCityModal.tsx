import { useState } from "react";

interface CoverageCityModalProps {
  onClose: () => void;
}

const COVERED_CITIES = [
  { city: "Bengaluru", state: "Karnataka", activeRadiologists: 28, tatAvg: "14m" },
  { city: "Mumbai", state: "Maharashtra", activeRadiologists: 32, tatAvg: "15m" },
  { city: "Delhi NCR", state: "Delhi", activeRadiologists: 26, tatAvg: "16m" },
  { city: "Hyderabad", state: "Telangana", activeRadiologists: 19, tatAvg: "14m" },
  { city: "Chennai", state: "Tamil Nadu", activeRadiologists: 21, tatAvg: "15m" },
  { city: "Kochi", state: "Kerala", activeRadiologists: 14, tatAvg: "12m" },
  { city: "Ahmedabad", state: "Gujarat", activeRadiologists: 16, tatAvg: "15m" },
  { city: "Jaipur", state: "Rajasthan", activeRadiologists: 12, tatAvg: "18m" },
  { city: "Kolkata", state: "West Bengal", activeRadiologists: 18, tatAvg: "17m" },
  { city: "Bhopal", state: "Madhya Pradesh", activeRadiologists: 10, tatAvg: "16m" },
  { city: "Bhubaneswar", state: "Odisha", activeRadiologists: 9, tatAvg: "15m" },
  { city: "Patna", state: "Bihar", activeRadiologists: 8, tatAvg: "19m" },
  { city: "Ludhiana", state: "Punjab", activeRadiologists: 11, tatAvg: "15m" },
  { city: "Coimbatore", state: "Tamil Nadu", activeRadiologists: 10, tatAvg: "13m" },
  { city: "Mangaluru", state: "Karnataka", activeRadiologists: 8, tatAvg: "14m" },
  { city: "Indore", state: "Madhya Pradesh", activeRadiologists: 9, tatAvg: "15m" },
  { city: "Lucknow", state: "Uttar Pradesh", activeRadiologists: 12, tatAvg: "18m" },
  { city: "Chandigarh", state: "Punjab", activeRadiologists: 10, tatAvg: "14m" },
];

export function CoverageCityModal({ onClose }: CoverageCityModalProps) {
  const [search, setSearch] = useState("");

  const filtered = COVERED_CITIES.filter(
    (c) =>
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="tah-modal-overlay" onClick={onClose}>
      <div className="tah-modal-window" onClick={(e) => e.stopPropagation()}>
        <button className="tah-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <span className="eyebrow">PAN-INDIA NETWORK</span>
        <h2>Coverage & City Availability</h2>
        <p>
          Subspecialty teleradiology coverage active 24/7/365 across 15+ states and 350+ diagnostic centres &amp; hospitals in India.
        </p>

        <div style={{ margin: "1.5rem 0" }}>
          <input
            type="text"
            className="tah-input"
            placeholder="Type your city or state (e.g. Bengaluru, Kochi, Gujarat)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1rem",
            maxHeight: "360px",
            overflowY: "auto",
            paddingRight: "0.5rem",
          }}
        >
          {filtered.map((item, idx) => (
            <div
              key={idx}
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                padding: "1rem",
                backgroundColor: "rgba(0, 40, 250, 0.02)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong style={{ color: "var(--brand-blue)", fontSize: "1.05rem" }}>
                  {item.city}
                </strong>
                <span className="status-pill delivered">Active</span>
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--brand-gray)", marginTop: "0.25rem" }}>
                {item.state}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.78rem",
                  marginTop: "0.75rem",
                  paddingTop: "0.5rem",
                  borderTop: "1px dashed var(--color-border)",
                }}
              >
                <span>{item.activeRadiologists} subspecialists</span>
                <strong>TAT: ~{item.tatAvg}</strong>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "2rem" }}>
              <p>We provide nationwide remote DICOM reporting for all locations across India.</p>
              <a href="#pilot-section" onClick={onClose} className="btn-tah-primary">
                Request setup for {search} →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
