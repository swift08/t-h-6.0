import React from "react";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918123388860"
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat on WhatsApp with Trust and Hope Rad"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        backgroundColor: "#25D366",
        color: "#FFFFFF",
        padding: "10px 18px 10px 14px",
        borderRadius: "50px",
        boxShadow: "0 6px 24px rgba(37, 211, 102, 0.45)",
        textDecoration: "none",
        fontWeight: 600,
        fontSize: "14px",
        fontFamily: "var(--font-sans, system-ui, -apple-system, sans-serif)",
        lineHeight: 1,
        cursor: "pointer",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{
          width: "22px",
          height: "22px",
          minWidth: "22px",
          minHeight: "22px",
          maxWidth: "22px",
          maxHeight: "22px",
          display: "block",
          fill: "#FFFFFF",
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.76.459 3.474 1.33 4.987l-1.414 5.163 5.286-1.386a9.96 9.96 0 004.787 1.22h.005c5.507 0 9.99-4.478 9.99-9.985 0-2.667-1.039-5.176-2.924-7.062A9.923 9.923 0 0012.012 2zm5.82 14.161c-.247.692-1.22 1.326-1.996 1.492-.533.113-1.229.206-3.567-.763-2.989-1.237-4.908-4.275-5.059-4.474-.148-.198-1.218-1.621-1.218-3.092 0-1.47.767-2.196 1.041-2.495.274-.298.599-.373.799-.373.199 0 .399.002.573.01.185.008.435-.07.68.518.248.598.847 2.068.921 2.217.075.149.124.323.025.522-.099.198-.149.322-.298.497-.149.174-.313.389-.447.523-.148.149-.303.311-.13.609.174.298.774 1.277 1.662 2.067 1.14 1.015 2.102 1.33 2.399 1.478.298.149.472.124.646-.075.174-.199.746-.87.945-1.168.199-.298.398-.248.671-.149.274.099 1.742.82 2.04 1.043.298.224.497.348.572.473.075.124.075.72-.172 1.412z" />
      </svg>
      <span className="floating-whatsapp-text">Chat on WhatsApp</span>
    </a>
  );
}
