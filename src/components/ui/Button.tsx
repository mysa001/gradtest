import type { ReactNode } from "react";
import { Link } from "react-router";
import "./Button.css";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  showArrow?: boolean;
}

interface ActionProps extends BaseProps {
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  showArrow = true,
  to,
  href,
  onClick,
  type = "button",
  disabled,
  ...aria
}: ActionProps) {
  const classes = [
    "btn",
    `btn--${variant}`,
    size === "lg" ? "btn--lg" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className="btn__label">{children}</span>
      {showArrow && (
        <span className="btn__icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" focusable="false">
            <path
              d="M2 8h11M9 4l4 4-4 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...aria}
    >
      {content}
    </button>
  );
}
