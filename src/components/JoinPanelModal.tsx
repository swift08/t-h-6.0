import { useState } from "react";

interface JoinPanelModalProps {
  onClose: () => void;
}

export function JoinPanelModal({ onClose }: JoinPanelModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subspecialty: "Neuro",
    experience: "5-10 years",
    availability: "Night shifts & Weekend cover",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="tah-modal-overlay" onClick={onClose}>
      <div className="tah-modal-window" onClick={(e) => e.stopPropagation()}>
        <button className="tah-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "var(--brand-green)",
                color: "var(--brand-blue)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.8rem",
                marginBottom: "1.25rem",
              }}
            >
              ✓
            </div>
            <h2>Application Received</h2>
            <p style={{ maxWidth: "480px", margin: "0 auto 1.5rem auto" }}>
              Thank you, Dr. {form.name || "Radiologist"}. Our Clinical Operations team will verify your medical registration credentials and reach out within 24 hours.
            </p>
            <button className="btn-tah-primary" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <span className="eyebrow">JOIN OUR CLINICAL PANEL</span>
            <h2>Radiologist? Read with TAHRAD.</h2>
            <p>
              Flexible shifts, subspecialty-matched studies, and a team that has your back on every call.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginTop: "1.5rem" }}>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Full name & Medical Qualifications (e.g. MD, DNB, FRCR)</label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. Arjun Nair, MD (Radio-diagnosis)"
                    className="tah-input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="dr.arjun@hospital.org"
                    className="tah-input"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="tah-input"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Primary Subspecialty</label>
                  <select
                    className="tah-select"
                    value={form.subspecialty}
                    onChange={(e) => setForm({ ...form, subspecialty: e.target.value })}
                  >
                    <option value="Neuro">Neuroradiology</option>
                    <option value="MSK">Musculoskeletal (MSK)</option>
                    <option value="Thoracic">Thoracic / Chest</option>
                    <option value="Abdomen">Abdominal & GI</option>
                    <option value="Cardiac">Cardiac CT/MRI</option>
                    <option value="Pediatric">Pediatric Imaging</option>
                    <option value="Mammography">Breast Imaging / Mammography</option>
                    <option value="PET">Nuclear Medicine / PET-CT</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Preferred Shift Model</label>
                <select
                  className="tah-select"
                  value={form.availability}
                  onChange={(e) => setForm({ ...form, availability: e.target.value })}
                >
                  <option value="Night shifts & Weekend cover">Nighthawk (Overnight stat reads 10 PM – 7 AM)</option>
                  <option value="Daytime subspecialty reporting">Daytime subspecialty second reads (flexible hours)</option>
                  <option value="Full-time dedicated panel">Full-time dedicated workstation panel</option>
                </select>
              </div>

              <button type="submit" className="btn-tah-primary" style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}>
                Submit Application →
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
