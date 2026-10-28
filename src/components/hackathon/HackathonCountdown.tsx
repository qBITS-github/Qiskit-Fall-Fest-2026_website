"use client";

import { useSyncExternalStore } from "react";
import { hackathon } from "@/data/event";

const startsAt = Date.parse(hackathon.startsAt);
const startLabel = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
}).format(startsAt);

function subscribe(update: () => void) {
  const timer = window.setInterval(update, 1_000);
  document.addEventListener("visibilitychange", update);
  return () => {
    window.clearInterval(timer);
    document.removeEventListener("visibilitychange", update);
  };
}

const getSnapshot = () => Math.floor(Date.now() / 1_000) * 1_000;
const getServerSnapshot = () => null;

export function HackathonCountdown() {
  const now = useSyncExternalStore<number | null>(subscribe, getSnapshot, getServerSnapshot);
  const seconds = now === null ? null : Math.max(0, Math.ceil((startsAt - now) / 1_000));
  const values = seconds === null ? null : [
    Math.floor(seconds / 86_400),
    Math.floor((seconds % 86_400) / 3_600),
    Math.floor((seconds % 3_600) / 60),
    seconds % 60,
  ];

  return (
    <div className="mt-8 max-w-2xl rounded-2xl border border-pink/30 bg-surface-2/80 p-5 backdrop-blur-sm sm:p-6">
      <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-pink-ink">
        Hackathon countdown
      </h2>
      <p className="mt-2 text-sm text-ink-dim">
        Starts <time dateTime={hackathon.startsAt}>{startLabel} IST</time>
      </p>

      <div role="timer" aria-label="Time until the hackathon starts" aria-live="off">
        <dl className="mt-5 grid grid-cols-4 gap-2 sm:gap-4">
          {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => (
            <div key={label} className="flex min-w-0 flex-col items-center rounded-xl border border-line bg-surface/60 px-1 py-4">
              <dt className="mt-2 font-mono text-[9px] uppercase tracking-wider text-muted sm:text-xs">{label}</dt>
              <dd className="order-first font-mono text-3xl font-semibold tabular-nums text-pink-ink sm:text-4xl">
                {values ? String(values[index]).padStart(2, "0") : "\u2014\u2014"}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <p role="status" className="mt-3 min-h-5 text-sm font-semibold text-pink-ink">
        {seconds === 0 ? "The hackathon has started. Happy hacking!" : ""}
      </p>
    </div>
  );
}
