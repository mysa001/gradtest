import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { TrainingCard } from "../components/home/TrainingCard";
import { Reveal } from "../components/ui/Reveal";
import { Button } from "../components/ui/Button";
import { categories, trainings } from "../data/trainings";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import type { Difficulty } from "../types";
import "./Catalog.css";

const difficultyOptions: Array<"all" | Difficulty> = [
  "all",
  "Foundation",
  "Intermediate",
  "Advanced",
];

export default function Catalog() {
  useDocumentTitle("Training catalog — Bastion");

  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const category = params.get("category") ?? "all";
  const difficulty = params.get("difficulty") ?? "all";
  const sort = params.get("sort") ?? "recommended";

  const update = (key: string, value: string, fallback: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === fallback) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const filtered = trainings.filter((training) => {
      const matchesQuery =
        needle.length === 0 ||
        training.title.toLowerCase().includes(needle) ||
        training.summary.toLowerCase().includes(needle) ||
        training.sector.toLowerCase().includes(needle);
      const matchesCategory =
        category === "all" || training.category === category;
      const matchesDifficulty =
        difficulty === "all" || training.difficulty === difficulty;
      return matchesQuery && matchesCategory && matchesDifficulty;
    });

    const sorted = [...filtered];
    if (sort === "duration") {
      sorted.sort((a, b) => a.durationMin - b.durationMin);
    } else if (sort === "title") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      sorted.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          a.durationMin - b.durationMin,
      );
    }
    return sorted;
  }, [query, category, difficulty, sort]);

  const activeFilters = [
    query.trim().length > 0,
    category !== "all",
    difficulty !== "all",
  ].filter(Boolean).length;

  const reset = () => setParams(new URLSearchParams(), { replace: true });

  return (
    <div className="catalog">
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">
            <span className="eyebrow__tick" />
            Training catalog
          </p>
          <h1 className="page-head__title">
            Procedures worth rehearsing.
          </h1>
          <p className="page-head__lede">
            Ten simulations across six safety domains. Each brief lists the
            objectives, required equipment, and the exact sequence a trainee is
            scored against.
          </p>
        </div>
      </header>

      <section className="section section--tight">
        <div className="container">
          <div className="filters">
            <div className="filters__search">
              <label htmlFor="catalog-search" className="filters__label">
                Search
              </label>
              <div className="filters__input">
                <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                  <circle
                    cx="7"
                    cy="7"
                    r="4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M10.5 10.5 14 14"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
                <input
                  id="catalog-search"
                  type="search"
                  value={query}
                  placeholder="Search by procedure or sector"
                  onChange={(event) => update("q", event.target.value, "")}
                />
              </div>
            </div>

            <div className="filters__group">
              <span className="filters__label" id="domain-label">
                Domain
              </span>
              <div
                className="chips"
                role="group"
                aria-labelledby="domain-label"
              >
                <button
                  type="button"
                  className={`chip${category === "all" ? " is-active" : ""}`}
                  aria-pressed={category === "all"}
                  onClick={() => update("category", "all", "all")}
                >
                  All
                </button>
                {categories.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`chip${category === item.id ? " is-active" : ""}`}
                    aria-pressed={category === item.id}
                    onClick={() => update("category", item.id, "all")}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="filters__selects">
              <div className="filters__field">
                <label htmlFor="difficulty" className="filters__label">
                  Level
                </label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(event) =>
                    update("difficulty", event.target.value, "all")
                  }
                >
                  {difficultyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option === "all" ? "All levels" : option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filters__field">
                <label htmlFor="sort" className="filters__label">
                  Sort
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(event) =>
                    update("sort", event.target.value, "recommended")
                  }
                >
                  <option value="recommended">Recommended</option>
                  <option value="duration">Shortest first</option>
                  <option value="title">A–Z</option>
                </select>
              </div>
            </div>
          </div>

          <div className="results-bar">
            <p>
              <span className="results-bar__count">
                {String(results.length).padStart(2, "0")}
              </span>{" "}
              simulations
              {activeFilters > 0 && (
                <span className="results-bar__note">
                  {" "}
                  · {activeFilters} filter{activeFilters > 1 ? "s" : ""} active
                </span>
              )}
            </p>
            {activeFilters > 0 && (
              <button
                type="button"
                className="results-bar__reset"
                onClick={reset}
              >
                Clear filters
                <span aria-hidden="true"> ×</span>
              </button>
            )}
          </div>

          {results.length > 0 ? (
            <div className="catalog__grid">
              {results.map((training, index) => (
                <Reveal key={training.slug} delay={Math.min(index, 6) * 45}>
                  <TrainingCard training={training} index={index + 1} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="catalog__empty">
              <p className="mono catalog__empty-label">No matches</p>
              <h2>Nothing in the catalog fits those filters.</h2>
              <p>
                Try a broader search term, or clear the domain and level
                filters to see all ten simulations.
              </p>
              <Button variant="outline" onClick={reset}>
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
