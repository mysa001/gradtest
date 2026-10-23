import "./Logo.css";

export function Logo({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  return (
    <span className={`logo logo--${tone}`}>
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 28 28" focusable="false">
          <path d="M4 4h12v4H8v4h7v4H8v4h9v4H4V4z" fill="currentColor" />
          <rect x="20" y="4" width="4" height="4" fill="currentColor" />
          <rect x="20" y="20" width="4" height="4" fill="currentColor" />
        </svg>
      </span>
      <span className="logo__word">Bastion</span>
      <span className="logo__tag">VR</span>
    </span>
  );
}
