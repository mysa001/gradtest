import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/Button";
import { progress, student } from "../data/student";
import { categoryName, getTraining, trainings } from "../data/trainings";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import type { ProgressEntry, Training, TrainingStatus } from "../types";
import "./Dashboard.css";

type Filter = "all" | TrainingStatus;

interface Row {
  entry: ProgressEntry;
  training: Training;
}

const tabs: Array<{ id: Filter; label: string }> = [
  { id: "all", label: "All" },
  { id: "in-progress", label: "In progress" },
  { id: "completed", label: "Completed" },
  { id: "assigned", label: "Assigned" },
];

const statusLabel: Record<TrainingStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  assigned: "Assigned",
};

const actionLabel: Record<TrainingStatus, string> = {
  completed: "Review",
  "in-progress": "Resume",
  assigned: "Start",
};

export default function Dashboard() {
  useDocumentTitle("Student dashboard — Bastion");
  const [filter, setFilter] = useState<Filter>("all");

  const rows = useMemo<Row[]>(() => {
    return progress.flatMap((entry) => {
      const training = getTraining(entry.slug);
      return training ? [{ entry, training }] : [];
    });
  }, []);

  const completed = rows.filter((row) => row.entry.status === "completed").length;
  const inProgress = rows.filter(
    (row) => row.entry.status === "in-progress",
  ).length;
  const scored = rows.filter((row) => typeof row.entry.score === "number");
  const averageScore =
    scored.length > 0
      ? Math.round(
          scored.reduce((sum, row) => sum + (row.entry.score ?? 0), 0) /
            scored.length,
        )
      : null;
  const completion =
    rows.length > 0 ? Math.round((completed / rows.length) * 100) : 0;

  const counts: Record<Filter, number> = {
    all: rows.length,
    completed,
    "in-progress": inProgress,
    assigned: rows.filter((row) => row.entry.status === "assigned").length,
  };

  const filtered =
    filter === "all" ? rows : rows.filter((row) => row.entry.status === filter);

  const recommended =
    rows.find((row) => row.entry.status === "assigned")?.training ??
    trainings.find((training) => training.slug === "confined-space-entry") ??
    trainings[0];

  return (
    <div className="dashboard">
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">
            <span className="eyebrow__tick" />
            Student record
            <span className="dashboard__demo">demo data</span>
          </p>
          <h1 className="page-head__title">Your training record.</h1>
          <p className="page-head__lede">
            This is the shape of the record a trainee sees after signing in.
            Values below are local demo data; once the Unity runtime is
            connected, sessions post their results into the same structure.
          </p>
        </div>
      </header>

      <section className="section section--tight">
        <div className="container">
          <div className="student">
            <div className="student__avatar" aria-hidden="true">
              {student.initials}
            </div>
            <div className="student__identity">
              <h2 className="student__name">{student.name}</h2>
              <p className="student__role">
                {student.role} · {student.org}
              </p>
            </div>
            <dl className="student__meta">
              <div>
                <dt>Cohort</dt>
                <dd>{student.cohort}</dd>
              </div>
              <div>
                <dt>Supervisor</dt>
                <dd>{student.supervisor}</dd>
              </div>
              <div>
                <dt>Headset</dt>
                <dd>{student.headset}</dd>
              </div>
            </dl>
          </div>

          <div className="stats">
            <div className="stat stat--ring">
              <div
                className="ring"
                role="img"
                aria-label={`${completion}% of assigned modules complete`}
                style={{ "--progress": `${completion * 3.6}deg` } as CSSProperties}
              >
                <span>{completion}%</span>
              </div>
              <div>
                <p className="mono stat__label">Completion</p>
                <p className="stat__note">
                  {completed} of {rows.length} modules
                </p>
              </div>
            </div>

            <div className="stat">
              <p className="stat__value">
                {String(completed).padStart(2, "0")}
              </p>
              <p className="mono stat__label">Completed</p>
              <p className="stat__note">Signed off by {student.supervisor}</p>
            </div>

            <div className="stat">
              <p className="stat__value">
                {averageScore === null ? "—" : averageScore}
                <span className="stat__unit">%</span>
              </p>
              <p className="mono stat__label">Average score</p>
              <p className="stat__note">Across graded sessions</p>
            </div>

            <div className="stat">
              <p className="stat__value">{inProgress}</p>
              <p className="mono stat__label">In progress</p>
              <p className="stat__note">Resume where you stopped</p>
            </div>
          </div>

          <div className="dashboard__grid">
            <section className="records" aria-labelledby="records-title">
              <div className="records__head">
                <h2 id="records-title" className="records__title">
                  Assigned modules
                </h2>

                <div className="tabs" role="tablist" aria-label="Filter modules">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={filter === tab.id}
                      className={`tab${filter === tab.id ? " is-active" : ""}`}
                      onClick={() => setFilter(tab.id)}
                    >
                      {tab.label}
                      <span className="tab__count">{counts[tab.id]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {filtered.length > 0 ? (
                <ul className="records__list">
                  {filtered.map(({ entry, training }) => (
                    <li key={training.slug} className="record-row">
                      <div className="record-row__main">
                        <span className="mono record-row__cat">
                          {categoryName(training.category)}
                        </span>
                        <Link
                          to={`/training/${training.slug}`}
                          className="record-row__title"
                        >
                          {training.title}
                        </Link>
                        <span className="record-row__meta">
                          {training.difficulty} · {training.durationMin} min ·{" "}
                          {entry.lastSession}
                        </span>
                      </div>

                      <div className="record-row__progress">
                        <div
                          className="bar"
                          role="progressbar"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={entry.progress}
                          aria-label={`${training.title} progress`}
                        >
                          <span style={{ width: `${entry.progress}%` }} />
                        </div>
                        <span className="mono record-row__pct">
                          {entry.progress}%
                        </span>
                      </div>

                      <div className="record-row__status">
                        <span className={`status status--${entry.status}`}>
                          {statusLabel[entry.status]}
                        </span>
                        {typeof entry.score === "number" && (
                          <span className="record-row__score">
                            {entry.score}%
                          </span>
                        )}
                      </div>

                      <Button
                        to={`/training/${training.slug}`}
                        variant="ghost"
                        showArrow={false}
                        className="record-row__action"
                      >
                        {actionLabel[entry.status]}
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="records__empty">
                  No modules in this view. Choose another tab.
                </p>
              )}
            </section>

            <aside className="dashboard__aside">
              <div className="next-up surface-ink">
                <p className="mono next-up__label">Recommended next</p>
                <p className="next-up__title">{recommended.title}</p>
                <p className="next-up__text">{recommended.summary}</p>
                <Button to={`/training/${recommended.slug}`}>Open brief</Button>
              </div>

              <div className="safety-card">
                <p className="mono safety-card__label">Safety record</p>
                <ul>
                  <li>
                    <span>Critical errors, last session</span>
                    <strong>01</strong>
                  </li>
                  <li>
                    <span>Sessions this month</span>
                    <strong>08</strong>
                  </li>
                  <li>
                    <span>Procedure standard</span>
                    <strong>v2.4</strong>
                  </li>
                </ul>
                <p className="safety-card__note">
                  Demo figures. Real values arrive with the Unity session
                  payload.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
