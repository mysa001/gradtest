import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/Button";
import "./SiteHeader.css";

const links = [
  { to: "/", label: "Overview", end: true },
  { to: "/catalog", label: "Catalog", end: false },
  { to: "/dashboard", label: "Dashboard", end: false },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link
          to="/"
          className="site-header__brand"
          aria-label="Bastion — home"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <ul className="site-nav__list">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `site-nav__link${isActive ? " is-active" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <span className="site-header__status">
            <span className="site-header__dot" aria-hidden="true" />
            Prototype
          </span>
          <div className="site-header__cta">
            <Button to="/catalog">Enter catalog</Button>
          </div>
          <button
            type="button"
            className={`menu-toggle${open ? " is-open" : ""}`}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="mobile-nav" className="mobile-nav" hidden={!open}>
        <nav aria-label="Mobile" className="container mobile-nav__inner">
          <ul className="mobile-nav__list">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `mobile-nav__link${isActive ? " is-active" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <p className="mobile-nav__note">
            Web management layer · VR runtime on Meta Quest
          </p>
        </nav>
      </div>
    </header>
  );
}
