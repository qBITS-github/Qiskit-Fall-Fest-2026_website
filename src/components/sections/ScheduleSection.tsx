"use client";

import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { dayWebinars, schedule } from "@/data/schedule";
import { event } from "@/data/event";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";
import { useEventClock } from "@/hooks/use-event-clock";
import { getScheduleHighlight } from "@/lib/schedule-highlight";

/**
 * The programme, as a timeline.
 *
 * The rows used to be another set of bordered boxes in another vertical
 * stack. A rail with a node per session reads as a day rather than as a list,
 * and it is the one shape on the page that carries the passage of time — which
 * is the only thing this section is about.
 */
export function ScheduleSection() {
  const days = useMemo(
    () => Array.from(new Set(schedule.map((item) => item.day))),
    [],
  );
  const now = useEventClock();
  const [selectedDay, setActiveDay] = useState<string | null>(null);
  const activeDay = selectedDay ?? getScheduleHighlight(schedule, now)?.day ?? days[0];

  const items = schedule.filter((item) => item.day === activeDay);
  const webinar = dayWebinars[activeDay];
  const sessionWebinars = items.filter((item) => item.webinarHref);

  return (
    <Section id="schedule">
      <SectionHeading title="Schedule" meta={event.dates} />

      <div
        role="tablist"
        aria-label="Schedule day"
        className="mt-10 flex w-fit max-w-full flex-wrap gap-1 rounded-full border border-line bg-surface-2/70 p-1.5"
      >
        {days.map((day) => (
          <button
            key={day}
            role="tab"
            aria-selected={activeDay === day}
            onClick={() => setActiveDay(day)}
            className={cn(
              "rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-all duration-300 sm:px-5",
              activeDay === day
                ? "bg-pink-fill text-white shadow-[0_6px_16px_-8px_rgba(208,38,112,0.9)]"
                : "text-muted hover:bg-surface hover:text-ink",
            )}
          >
            {day}
          </button>
        ))}
      </div>

      {webinar ? (
        <div className="mt-6 max-w-lg rounded-xl border border-line bg-surface-2/70 p-4">
          <p className="mb-3 text-sm font-semibold text-ink">
            Common webinar for all talks on {activeDay}
          </p>
          <a
            href={webinar.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Join the ${activeDay} webinar on Webex (opens in a new tab)`}
            className="inline-flex rounded-lg bg-pink-fill px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink"
          >
            Join on Webex
          </a>
          {(webinar.number || webinar.password) && (
            <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {webinar.number && (
                <div>
                  <dt className="text-muted">Webinar number</dt>
                  <dd className="mt-1 font-mono font-semibold text-ink">{webinar.number}</dd>
                </div>
              )}
              {webinar.password && (
                <div>
                  <dt className="text-muted">Webinar password</dt>
                  <dd className="mt-1 font-mono font-semibold text-ink">{webinar.password}</dd>
                </div>
              )}
            </dl>
          )}
        </div>
      ) : sessionWebinars.length > 0 ? (
        <div className="mt-6 max-w-xl rounded-xl border border-line bg-surface-2/70 p-4">
          <p className="mb-3 text-sm font-semibold text-ink">
            Webinar links for talks on {activeDay}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {sessionWebinars.map((session) => (
              <div
                key={session.id}
                className="flex flex-col justify-between rounded-lg border border-line-soft bg-surface/70 p-3"
              >
                <div>
                  <p className="text-sm font-semibold text-ink">{session.title}</p>
                  <p className="mt-0.5 font-mono text-xs text-pink-ink">{session.time}</p>
                </div>
                <a
                  href={session.webinarHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Join ${session.title}'s talk on Webex (opens in a new tab)`}
                  className="mt-3 inline-flex items-center justify-center rounded-lg bg-pink-fill px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink"
                >
                  Join on Webex
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* The rail is a border on the list itself, so it ends exactly at the
          last session instead of running past it. */}
      <ol className="qff-rail mt-10 pl-6 sm:mt-12 sm:pl-9">
        {items.map((item, i) => (
          <RevealOnScroll
            key={item.id}
            as="li"
            variant="side"
            delayMs={i * 55}
            className="group relative pb-9 last:pb-0"
          >
            <span
              aria-hidden
              className="absolute -left-[1.75rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-pink transition-transform duration-300 group-hover:scale-125 sm:-left-[2.5rem]"
            />
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-mono text-sm font-semibold tabular-nums text-pink-ink">
                {item.time}
              </span>
              {item.track ? (
                <span className="rounded-full bg-pink/12 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-pink-ink">
                  {item.track}
                </span>
              ) : null}
            </div>
            <p className="mt-2 font-display text-xl font-bold tracking-tight text-ink dark:text-white sm:text-2xl">
              {item.title}
            </p>
            {item.topic ? (
              <p className="mt-2 max-w-2xl text-base font-semibold leading-relaxed text-ink">
                {item.topic}
              </p>
            ) : null}
            {item.description ? (
              <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            ) : null}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {item.venue ? (
                <p className="inline-flex items-center gap-1.5 rounded-md border border-pink/25 bg-pink/10 px-2.5 py-1.5 font-mono text-xs font-semibold text-pink-ink">
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                  {item.venue}
                </p>
              ) : null}
              {item.webinarHref ? (
                <a
                  href={item.webinarHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Join ${item.title}'s talk on Webex (opens in a new tab)`}
                  className="inline-flex items-center gap-1.5 rounded-md bg-pink-fill px-3 py-1.5 font-mono text-xs font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink"
                >
                  Join on Webex
                </a>
              ) : null}
            </div>
          </RevealOnScroll>
        ))}
      </ol>
    </Section>
  );
}
