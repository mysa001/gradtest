import { Link } from "react-router";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { HeroScene } from "../components/home/HeroScene";
import { TrainingCard } from "../components/home/TrainingCard";
import { categories, trainings } from "../data/trainings";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import "./Home.css";

const sectors = [
  "Construction",
  "Energy",
  "Manufacturing",
  "Logistics",
  "Utilities",
  "Chemical",
];

const steps = [
  {
    title: "Assign",
    body: "An administrator assigns a module to a person or a whole crew and sets a deadline. The trainee signs in on the headset with a short code — no typing inside VR.",
    meta: "Web dashboard",
  },
  {
    title: "Immerse",
    body: "The trainee completes the scenario in the Unity runtime on Meta Quest. Every tool choice, isolation step, and decision is recorded against the procedure.",
    meta: "Unity · Meta Quest",
  },
  {
    title: "Review",
    body: "Score, mistakes, and time on task sync back to the dashboard, ready for a supervisor's review and the next assignment.",
    meta: "Reports",
  },
];

const benefits = [
  "Repeat a hazardous procedure as often as it takes — with no consumables and no exposure.",
  "Score every trainee against the same procedure, on every site, every shift.",
  "Catch missed isolation steps and unsafe choices before they reach the plant floor.",
];

const targets = [
  { value: "3×", label: "Repeat attempts per session" },
  { value: "0", label: "Consumables burned" },
  { value: "1", label: "Scoring standard across sites" },
];

export default function Home() {
  useDocumentTitle("Bastion — Virtual safety training for high-risk work");

  const featured = trainings.filter((training) => training.featured);
  const [lead, ...rest] = featured;

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">
              <span className="eyebrow__tick" />
              Vocational safety training / VR
            </p>

            <h1 className="hero__title">
              Train for the
              <br />
              worst day.
              <span className="hero__title-mark">Before it happens.</span>
            </h1>

            <p className="hero__lede">
              Bastion turns high-risk procedures into repeatable VR
              simulations. Assign a module, run it on Meta Quest, and review
              every decision your crew makes — without a controlled burn, a
              scaffold, or a live voltage line.
            </p>

            <div className="hero__actions">
              <Button to="/catalog" size="lg">
                Browse the catalog
              </Button>
              <Button to="/dashboard" variant="outline" size="lg">
                Open student dashboard
              </Button>
            </div>

            <dl className="hero__meta">
              <div>
                <dt>Domains</dt>
                <dd>06</dd>
              </div>
              <div>
                <dt>Simulations</dt>
                <dd>{String(trainings.length).padStart(2, "0")}</dd>
              </div>
              <div>
                <dt>Runtime</dt>
                <dd>Quest 2 / 3</dd>
              </div>
            </dl>

            <p className="hero__note">
              Web layer preview. The simulations themselves run in a separate
              Unity build; this site manages assignment, progress, and safety
              records.
            </p>
          </div>

          <Reveal className="hero__scene-wrap" delay={100}>
            <HeroScene />
          </Reveal>
        </div>
      </section>

      <section className="sectors" aria-label="Sectors served">
        <div className="container sectors__inner">
          <span className="mono sectors__label">Built for</span>
          <ul className="sectors__list">
            {sectors.map((sector) => (
              <li key={sector}>{sector}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="domains">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">
                <span className="eyebrow__index">01 /</span> Training domains
              </p>
              <h2 className="section-head__title">
                Six domains. One review standard.
              </h2>
            </div>
            <p className="section-head__lede">
              Each domain carries its own procedures, failure modes, and
              scoring rules — but every session reports the same way, so
              supervisors can compare crews without translating between
              vendors.
            </p>
          </div>

          <ul className="domains">
            {categories.map((category, index) => (
              <li key={category.id}>
                <Reveal delay={index * 35}>
                  <Link
                    to={`/catalog?category=${category.id}`}
                    className="domain"
                  >
                    <span className="domain__index">{category.index}</span>
                    <span className="domain__body">
                      <span className="domain__name">{category.name}</span>
                      <span className="domain__blurb">{category.blurb}</span>
                    </span>
                    <span className="domain__arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight featured" id="featured">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">
                <span className="eyebrow__index">02 /</span> Featured
                simulations
              </p>
              <h2 className="section-head__title">
                The procedures that hurt most when they go wrong.
              </h2>
            </div>
            <p className="section-head__lede">
              Four modules from the catalog, chosen because the real-world
              versions are expensive to stage and unforgiving to get wrong.{" "}
              <Link to="/catalog" className="section-head__link">
                View all {trainings.length} simulations →
              </Link>
            </p>
          </div>

          <div className="featured-grid">
            {lead && (
              <Reveal className="featured-grid__lead">
                <TrainingCard training={lead} index={1} large />
              </Reveal>
            )}
            {rest.map((training, index) => (
              <Reveal key={training.slug} delay={60 + index * 50}>
                <TrainingCard training={training} index={index + 2} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section surface-ink approach" id="approach">
        <div className="container approach__grid">
          <div className="approach__head">
            <p className="eyebrow">
              <span className="eyebrow__index">03 /</span> Method
            </p>
            <h2 className="approach__title">
              From assignment to evidence in three moves.
            </h2>
            <p className="approach__lede">
              The web layer and the headset runtime share one record. Nothing
              is re-typed, and nothing is scored twice.
            </p>
            <div className="approach__actions">
              <Button to="/catalog" variant="outline">
                See a simulation brief
              </Button>
            </div>
          </div>

          <ol className="approach__steps">
            {steps.map((step, index) => (
              <li key={step.title} className="step">
                <span className="step__num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="step__body">
                  <h3 className="step__title">{step.title}</h3>
                  <p className="step__text">{step.body}</p>
                  <span className="step__meta">{step.meta}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section evidence" id="evidence">
        <div className="container evidence__grid">
          <div className="evidence__copy">
            <p className="eyebrow">
              <span className="eyebrow__index">04 /</span> Evidence
            </p>
            <h2 className="evidence__title">
              Progress you can review. Risk you do not take.
            </h2>
            <p className="evidence__lede">
              A training record is only useful if it changes what happens on
              site. Bastion keeps the measurements close to the procedure.
            </p>

            <ul className="evidence__list">
              {benefits.map((benefit) => (
                <li key={benefit}>
                  <span className="evidence__mark" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="evidence__panel">
            <div className="record">
              <p className="mono record__label">Program design targets</p>
              <dl className="record__rows">
                {targets.map((target) => (
                  <div key={target.label} className="record__row">
                    <dt>{target.label}</dt>
                    <dd>{target.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="record__note">
                Design targets from the project brief — not measured results.
              </p>
            </div>

            <div className="eval">
              <p className="mono eval__label">Evaluation plan</p>
              <ul className="eval__list">
                <li>Pre / post knowledge assessment</li>
                <li>Task completion and error count</li>
                <li>Five-participant usability session</li>
                <li>Comfort and motion-sickness rating</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta__inner surface-ink">
            <div className="cta__copy">
              <p className="eyebrow">
                <span className="eyebrow__tick" />
                Next cohort
              </p>
              <h2 className="cta__title">Put your crew in the bay.</h2>
              <p className="cta__lede">
                Start with one procedure. Pick a module, hand out the headsets,
                and read the first report before the end of the shift.
              </p>
            </div>
            <div className="cta__actions">
              <Button to="/catalog" size="lg">
                Browse simulations
              </Button>
              <Button to="/dashboard" variant="outline" size="lg">
                Open dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
