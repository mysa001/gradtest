import { Link } from "react-router";
import { Button } from "../components/ui/Button";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import "./NotFound.css";

export default function NotFound() {
  useDocumentTitle("Not found — Bastion");

  return (
    <section className="notfound">
      <div className="container notfound__inner">
        <p className="eyebrow">
          <span className="eyebrow__tick" />
          Error 404
        </p>
        <p className="notfound__code" aria-hidden="true">
          404
        </p>
        <h1 className="notfound__title">This bay is empty.</h1>
        <p className="notfound__text">
          The page or simulation you asked for is not in this build. Head back
          to the catalog and pick a procedure that exists.
        </p>
        <div className="notfound__actions">
          <Button to="/catalog">Browse the catalog</Button>
          <Link to="/" className="notfound__link">
            Return to overview →
          </Link>
        </div>
      </div>
    </section>
  );
}
