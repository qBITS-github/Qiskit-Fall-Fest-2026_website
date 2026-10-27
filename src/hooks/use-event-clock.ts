"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 30_000);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.clearInterval(timer);
    document.removeEventListener("visibilitychange", onChange);
  };
}

// A stable snapshot within each 30-second window, with no server/client date mismatch.
const getSnapshot = () => Math.floor(Date.now() / 30_000) * 30_000;
const getServerSnapshot = () => null;

export function useEventClock() {
  return useSyncExternalStore<number | null>(subscribe, getSnapshot, getServerSnapshot);
}
