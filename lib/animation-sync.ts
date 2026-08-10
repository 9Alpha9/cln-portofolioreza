export const TRANSITION_END_EVENT = "page-transition-end";

let transitionRunning = false;

export function markTransitionStart() {
  transitionRunning = true;
}

export function markTransitionEnd() {
  transitionRunning = false;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(TRANSITION_END_EVENT));
  }
}

export function isTransitionRunning() {
  return transitionRunning;
}

export function onTransitionEnd(callback: () => void) {
  if (!transitionRunning) {
    callback();
    return () => {};
  }

  const handler = () => {
    callback();
    window.removeEventListener(TRANSITION_END_EVENT, handler);
  };

  window.addEventListener(TRANSITION_END_EVENT, handler);
  return () => window.removeEventListener(TRANSITION_END_EVENT, handler);
}
