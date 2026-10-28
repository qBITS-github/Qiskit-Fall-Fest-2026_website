"use client";

import { ArrowDownRight, ArrowRight, CalendarDays, MapPin, Mic2 } from "lucide-react";
import { dayWebinars, schedule } from "@/data/schedule";
import { useEventClock } from "@/hooks/use-event-clock";
import { getScheduleHighlight } from "@/lib/schedule-highlight";

export function TodayBanner() {
  const now = useEventClock();
  const highlight = getScheduleHighlight(schedule, now);

  // Once every talk has ended, the main schedule remains available below.
  if (!highlight) return null;
  const webinar = dayWebinars[highlight.day];

  return (
    <aside
      aria-labelledby="today-heading"
      className="relative z-10 mx-auto mb-12 max-w-6xl overflow-hidden rounded-3xl border border-pink/35 bg-[#21103e] text-white shadow-[0_18px_60px_-28px_rgba(138,63,252,0.55)] sm:mb-16"
    >
      <div aria-hidden className="pointer-events-none absolute -left-16 -top-28 h-72 w-72 rounded-full bg-pink/10 blur-3xl" />
      <div className="relative grid lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="flex flex-col justify-between gap-5 border-b border-white/10 p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <div>
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#ff9ec7]">
              <Mic2 aria-hidden className="h-3.5 w-3.5" />
              The talk lineup
            </p>
            <h2 id="today-heading" className="mt-3 font-display text-3xl font-extrabold leading-none tracking-tight">
              Talks at QFF
            </h2>
            <p className="mt-3 flex items-center gap-2 font-mono text-xs text-white/70">
              <CalendarDays aria-hidden className="h-3.5 w-3.5" />
              {highlight.day}
            </p>
          </div>
          <a href="#schedule" className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#ff9ec7] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink">
            View full schedule
            <ArrowDownRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>

        <div className="min-w-0 p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
            <span>Speaker sessions</span>
            <span>All times IST</span>
          </div>
          <div className={`grid gap-3 ${highlight.sessions.length > 1 ? "sm:grid-cols-2" : ""}`}>
            {highlight.sessions.slice(0, 2).map((session, index) => {
              const underway = now !== null && Date.parse(session.startsAt) <= now;
              return (
                <div
                  key={session.id}
                  className={`relative rounded-2xl border p-5 ${index === 0 ? "border-pink/40 bg-pink/10" : "border-white/10 bg-white/[0.035]"}`}
                >
                  <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ff9ec7]">
                    {underway && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#ff9ec7] motion-safe:animate-pulse" />}
                    {underway ? "On now" : index === 0 ? "Up next" : "Followed by"}
                  </p>
                  <p className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight">
                    {session.title}
                  </p>
                  {session.topic && (
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-white/90">
                      {session.topic}
                    </p>
                  )}
                  <p className="mt-1 min-h-5 text-sm text-white/65">{session.description}</p>
                  <p className="mt-5 font-mono text-xs font-semibold text-[#ff9ec7]">
                    {session.time}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-white/75">
                    {session.venue && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin aria-hidden className="h-3.5 w-3.5" />
                        {session.venue}
                      </span>
                    )}
                    {session.track && <span className="rounded-full border border-white/15 px-2 py-0.5">{session.track}</span>}
                  </div>
                </div>
              );
            })}
          </div>
          {webinar && (
            <div className="mt-4 border-t border-white/15 pt-4">
              <p className="mb-3 text-sm font-semibold text-white">
                Common webinar for all talks on {highlight.day}
              </p>
              <a
                href={webinar.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Join the ${highlight.day} webinar on Webex (opens in a new tab)`}
                className="inline-flex rounded-lg bg-pink-fill px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink"
              >
                Join on Webex
              </a>
              <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs">
                <div>
                  <dt className="text-white/65">Webinar number</dt>
                  <dd className="mt-1 font-mono font-semibold text-white">{webinar.number}</dd>
                </div>
                <div>
                  <dt className="text-white/65">Webinar password</dt>
                  <dd className="mt-1 font-mono font-semibold text-white">{webinar.password}</dd>
                </div>
              </dl>
            </div>
          )}
          {highlight.sessions.length > 2 && (
            <a href="#schedule" className="mt-3 inline-flex items-center gap-2 px-1 text-xs text-[#ff9ec7] underline-offset-4 hover:underline">
              +{highlight.sessions.length - 2} more sessions on the programme
              <ArrowRight aria-hidden className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}
