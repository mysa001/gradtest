/**
 * Integration boundary for the Unity WebGL training build.
 *
 * The web layer (this app) owns accounts, assignment, and reporting.
 * The simulation runtime is a separate Unity project built for Meta Quest
 * and, optionally, exported to WebGL for desktop review.
 *
 * Set VITE_UNITY_BUILD_URL to the hosted `index.html` of a WebGL build to
 * mount it inside TrainingRuntime. Until then the UI reports the runtime as
 * "not connected" instead of faking a simulation.
 */

const configuredUrl = import.meta.env.VITE_UNITY_BUILD_URL;

export const unityBuildUrl: string | null =
  typeof configuredUrl === "string" && configuredUrl.trim().length > 0
    ? configuredUrl.trim()
    : null;

export const isUnityBuildAvailable = unityBuildUrl !== null;

/** Message shape the Unity build is expected to post back to the parent window. */
export interface TrainingCompleteMessage {
  type: "bastion:session-complete";
  trainingSlug: string;
  score: number;
  durationSec: number;
  mistakes: string[];
}

export const UNITY_MESSAGE_SOURCE = "bastion-unity-runtime";

/** Contract shown in the runtime panel so integration is explicit, not implied. */
export const runtimeContract = {
  buildTarget: "Unity 2022.3 LTS · Android (ARM64) · Meta Quest 2/3",
  entryScene: "Scenes/MainMenu.unity",
  bridge: "window.postMessage({ type: 'bastion:session-complete', ... })",
} as const;
