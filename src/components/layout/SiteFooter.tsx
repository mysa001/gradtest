import { Link } from "react-router";
import { Logo } from "../ui/Logo";
import "./SiteFooter.css";

const columns = [
  {
    title: "Platform",
    links: [
      { to: "/", label: "Overview" },
      { to: "/catalog", label: "Training catalog" },
      { to: "/dashboard", label: "Student dashboard" },
    ],
  },
  {
    title: "Program",
    links: [
      { to: "/catalog?category=height", label: "Work at height" },
      { to: "/catalog?category=fire", label: "Fire & emergency" },
      { to: "/catalog?category=electrical", label: "Electrical safety" },
    ],
  },
  {
    title: "Project",
    links: [
      { to: "/#approach", label: "How it works" },
      { to: "/#evidence", label: "Evaluation plan" },
      { to: "/#domains", label: "Training domains" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer surface-ink">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Logo tone="paper" />
            <p className="site-footer__claim">
              Virtual safety training for high-risk work. Assign, immerse,
              review — without a single controlled burn.
            </p>
            <p className="site-footer__meta">
              University graduation prototype · Web management layer
            </p>
          </div>

          <div className="site-footer__cols">
            {columns.map((column) => (
              <div key={column.title} className="site-footer__col">
                <h2 className="mono site-footer__col-title">{column.title}</h2>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="site-footer__link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© 2026 Bastion. Built for a university graduation project.</p>
          <p>
            The VR runtime is a separate Unity build for Meta Quest. This site
            does not simulate it.
          </p>
        </div>
      </div>
    </footer>
  );
}
