import { useEffect, useRef } from "react";
import type { Training } from "../../types";
import {
  isUnityBuildAvailable,
  runtimeContract,
  unityBuildUrl,
} from "../../lib/unity";
import "./TrainingRuntime.css";

interface TrainingRuntimeProps {
  training: Training;
  onClose: () => void;
}

export function TrainingRuntime({ training, onClose }: TrainingRuntimeProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="runtime"
      aria-labelledby="runtime-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}
    >
      <div className="runtime__panel">
        <header className="runtime__head">
          <div>
            <p className="eyebrow">
              <span className="eyebrow__tick" />
              Simulation runtime
            </p>
            <h2 id="runtime-title" className="runtime__title">
              {training.title}
            </h2>
          </div>
          <button
            type="button"
            className="runtime__close"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close runtime panel"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        {isUnityBuildAvailable ? (
          <div className="runtime__stage">
            <iframe
              src={unityBuildUrl ?? undefined}
              title={`${training.title} — Unity WebGL build`}
              allow="xr-spatial-tracking; fullscreen; autoplay"
            />
          </div>
        ) : (
          <div className="runtime__empty">
            <p className="runtime__status">
              <span className="runtime__dot" aria-hidden="true" />
              Runtime not connected
            </p>
            <p className="runtime__text">
              This is the integration point for the training simulation. No
              Unity build is mounted in this prototype, so there is nothing to
              launch yet — and this panel does not pretend otherwise.
            </p>

            <dl className="runtime__contract">
              <div>
                <dt>Build target</dt>
                <dd>{runtimeContract.buildTarget}</dd>
              </div>
              <div>
                <dt>Entry scene</dt>
                <dd>{runtimeContract.entryScene}</dd>
              </div>
              <div>
                <dt>Completion bridge</dt>
                <dd>
                  <code>{runtimeContract.bridge}</code>
                </dd>
              </div>
            </dl>

            <div className="runtime__install">
              <p className="mono runtime__install-label">To connect a build</p>
              <pre>
                <code>
                  VITE_UNITY_BUILD_URL=https://your-host/webgl/index.html
                </code>
              </pre>
              <p className="runtime__hint">
                Restart the dev server after changing the environment
                variable. When the URL resolves, this panel mounts the WebGL
                build in an iframe and the completion message is routed to the
                reporting layer.
              </p>
            </div>
          </div>
        )}

        <footer className="runtime__foot">
          <p>
            {training.durationMin} min · {training.modules} modules ·{" "}
            {training.difficulty}
          </p>
          <button
            type="button"
            className="runtime__secondary"
            onClick={() => dialogRef.current?.close()}
          >
            Back to brief
          </button>
        </footer>
      </div>
    </dialog>
  );
}
