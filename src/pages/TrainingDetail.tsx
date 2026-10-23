import { useState } from "react";
import { Link, useParams } from "react-router";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { TrainingRuntime } from "../components/training/TrainingRuntime";
import { categoryName, getTraining, trainings } from "../data/trainings";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import NotFound from "./NotFound";
import "./TrainingDetail.css";

const stages = [
  {
    title: "Briefing",
    text: "Objectives, equipment, and abort criteria are stated before the headset goes on.",
  },
  {
    title: "Guided walkthrough",
    text: "The trainee steps through the procedure with prompts and tool highlights.",
  },
  {
    title: "Timed scenario",
    text: "Prompts are removed. Every decision and omission is recorded.",
  },
  {
    title: "Debrief",
    text: "Errors, score, and time on task are returned to the dashboard.",
  },
];

export default function TrainingDetail() {
  const { slug } = useParams<{ slug: string }>();
  const training = getTraining(slug ?? "");
  const [runtimeOpen, setRuntimeOpen] = useState(false);

  useDocumentTitle(
    training ? `${training.title} — Bastion` : "Simulation not found — Bastion",
  );

  if (!training) return <NotFound />;

  const index = trainings.findIndex((item) => item.slug === training.slug);
  const previous = index > 0 ? trainings[index - 1] : null;
  const next = index < trainings.length - 1 ? trainings[index + 1] : null;

  return (
    <div className="detail">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link to="/">Overview</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/catalog">Catalog</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{training.title}</li>
          </ol>
        </nav>

        <header className="detail__head">
          <div className="detail__head-main">
            <p className="eyebrow">
              <span className="eyebrow__tick" />
              {categoryName(training.category)}
            </p>
            <h1 className="detail__title">{training.title}</h1>
            <p className="detail__summary">{training.summary}</p>

            <dl className="detail__facts">
              <div>
                <dt>Level</dt>
                <dd>{training.difficulty}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{training.durationMin} min</dd>
              </div>
              <div>
                <dt>Modules</dt>
                <dd>{String(training.modules).padStart(2, "0")}</dd>
              </div>
              <div>
                <dt>Sector</dt>
                <dd>{training.sector}</dd>
              </div>
            </dl>
          </div>

          <div className="detail__badge" aria-hidden="true">
            <span className="mono">Simulation</span>
            <span className="detail__badge-num">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </header>

        <div className="detail__grid">
          <div className="detail__main">
            <Reveal>
              <section className="block" aria-labelledby="objectives-title">
                <div className="block__head">
                  <span className="mono block__index">01</span>
                  <h2 id="objectives-title" className="block__title">
                    Objectives
                  </h2>
                </div>
                <ul className="checklist">
                  {training.objectives.map((objective) => (
                    <li key={objective}>
                      <span className="checklist__mark" aria-hidden="true" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section className="block" aria-labelledby="safety-title">
                <div className="block__head">
                  <span className="mono block__index">02</span>
                  <h2 id="safety-title" className="block__title">
                    Safety instructions
                  </h2>
                </div>
                <ol className="safety">
                  {training.safety.map((instruction, position) => (
                    <li key={instruction}>
                      <span className="safety__num">
                        {String(position + 1).padStart(2, "0")}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </Reveal>

            <Reveal>
              <section className="block" aria-labelledby="equipment-title">
                <div className="block__head">
                  <span className="mono block__index">03</span>
                  <h2 id="equipment-title" className="block__title">
                    Required equipment
                  </h2>
                </div>
                <ul className="equipment">
                  {training.equipment.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section className="block" aria-labelledby="session-title">
                <div className="block__head">
                  <span className="mono block__index">04</span>
                  <h2 id="session-title" className="block__title">
                    Session structure
                  </h2>
                </div>
                <ol className="session">
                  {stages.map((stage, position) => (
                    <li key={stage.title}>
                      <span className="session__num">
                        {String(position + 1).padStart(2, "0")}
                      </span>
                      <h3 className="session__title">{stage.title}</h3>
                      <p className="session__text">{stage.text}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </Reveal>
          </div>

          <aside className="detail__aside">
            <div className="enroll">
              <p className="mono enroll__label">Assigned to</p>
              <p className="enroll__org">Northline Industrial · Cohort 04</p>

              <p className="enroll__status">
                <span className="enroll__dot" aria-hidden="true" />
                Not started
              </p>

              <Button
                size="lg"
                className="enroll__button"
                onClick={() => setRuntimeOpen(true)}
              >
                Start training
              </Button>

              <p className="enroll__note">
                Launching opens the Unity runtime boundary. In this prototype
                the build is not mounted, so the panel reports the exact
                integration contract rather than a mock simulation.
              </p>

              <dl className="enroll__meta">
                <div>
                  <dt>Headset</dt>
                  <dd>Meta Quest 2 / 3</dd>
                </div>
                <div>
                  <dt>Runtime</dt>
                  <dd>Unity · OpenXR</dd>
                </div>
                <div>
                  <dt>Scoring</dt>
                  <dd>Procedure steps</dd>
                </div>
              </dl>
            </div>

            <div className="aside-note">
              <p className="mono aside-note__label">Before the session</p>
              <p>
                Charge the headset, clear a 2 × 2 m play area, and brief the
                trainee on the stop signal.
              </p>
            </div>
          </aside>
        </div>

        <nav className="pager" aria-label="More simulations">
          {previous ? (
            <Link to={`/training/${previous.slug}`} className="pager__link">
              <span className="mono pager__label">← Previous</span>
              <span className="pager__title">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={`/training/${next.slug}`}
              className="pager__link pager__link--next"
            >
              <span className="mono pager__label">Next →</span>
              <span className="pager__title">{next.title}</span>
            </Link>
          ) : (
            <Link to="/catalog" className="pager__link pager__link--next">
              <span className="mono pager__label">Catalog →</span>
              <span className="pager__title">All simulations</span>
            </Link>
          )}
        </nav>
      </div>

      {runtimeOpen && (
        <TrainingRuntime
          training={training}
          onClose={() => setRuntimeOpen(false)}
        />
      )}
    </div>
  );
}
