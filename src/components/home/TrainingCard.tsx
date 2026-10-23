import { Link } from "react-router";
import type { Training } from "../../types";
import { categoryName } from "../../data/trainings";
import "./TrainingCard.css";

interface TrainingCardProps {
  training: Training;
  index: number;
  large?: boolean;
}

export function TrainingCard({ training, index, large = false }: TrainingCardProps) {
  return (
    <article className={`tcard${large ? " tcard--large surface-ink" : ""}`}>
      <Link
        to={`/training/${training.slug}`}
        className="tcard__link"
        aria-label={`${training.title} — ${training.difficulty}, ${training.durationMin} minutes`}
      >
        <header className="tcard__top">
          <span className="tcard__index">{String(index).padStart(2, "0")}</span>
          <span className="tcard__category">{categoryName(training.category)}</span>
        </header>

        <h3 className="tcard__title">{training.title}</h3>
        <p className="tcard__summary">{training.summary}</p>

        <footer className="tcard__meta">
          <span>{training.difficulty}</span>
          <span>{training.durationMin} min</span>
          <span>{training.modules} modules</span>
          <span className="tcard__go" aria-hidden="true">
            →
          </span>
        </footer>

        {large && (
          <span className="tcard__watermark" aria-hidden="true">
            {String(index).padStart(2, "0")}
          </span>
        )}
      </Link>
    </article>
  );
}
