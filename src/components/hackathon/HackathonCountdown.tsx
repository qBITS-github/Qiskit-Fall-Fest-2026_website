"use client";

import { useSyncExternalStore } from "react";
import { hackathon } from "@/data/event";

const startsAt = Date.parse(hackathon.startsAt);
const endsAt = (hackathon as { endsAt?: string }).endsAt
  ? Date.parse((hackathon as { endsAt?: string }).endsAt!)
  : startsAt + 72 * 60 * 60 * 1_000;

const startLabel = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
}).format(startsAt);

const endLabel = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
}).format(endsAt);

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

  const isBeforeStart = now !== null && now < startsAt;
  const isLive = now !== null && now >= startsAt && now < endsAt;
  const isEnded = now !== null && now >= endsAt;

  const targetTime = isBeforeStart ? startsAt : endsAt;
  const seconds = now === null ? null : Math.max(0, Math.ceil((targetTime - now) / 1_000));
  const values = seconds === null ? null : [
    Math.floor(seconds / 86_400),
    Math.floor((seconds % 86_400) / 3_600),
    Math.floor((seconds % 3_600) / 60),
    seconds % 60,
  ];

  const title = isLive
    ? "Hackathon is live — 72 hours"
    : isEnded
      ? "Hackathon ended"
      : "Hackathon countdown";

  const timingText = isLive ? (
    <>
      Time remaining &middot; Ends <time dateTime={new Date(endsAt).toISOString()}>{endLabel} IST</time>
    </>
  ) : isEnded ? (
    <>
      Concluded on <time dateTime={new Date(endsAt).toISOString()}>{endLabel} IST</time>
    </>
  ) : (
    <>
      Starts <time dateTime={hackathon.startsAt}>{startLabel} IST</time>
    </>
  );

  const statusText = isLive
    ? "The hackathon is live. Happy hacking!"
    : isEnded
      ? "The 72-hour hackathon has concluded. Submissions are closed."
      : "";

  return (
    <div className="mt-8 max-w-2xl rounded-2xl border border-pink/30 bg-surface-2/80 p-5 backdrop-blur-sm sm:p-6">
      <div className="flex items-center gap-2">
        {isLive && (
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pink" />
          </span>
        )}
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-pink-ink">
          {title}
        </h2>
      </div>
      <p className="mt-2 text-sm text-ink-dim">
        {timingText}
      </p>

      <div role="timer" aria-label={isLive ? "Time remaining in the hackathon" : "Time until the hackathon starts"} aria-live="off">
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
        {statusText}
      </p>
    </div>
  );
}
