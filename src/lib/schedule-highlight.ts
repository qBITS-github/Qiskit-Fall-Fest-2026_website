import type { ScheduleItem } from "../types/index.ts";

const dateInIndia = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** A null clock gives static HTML a neutral preview without freezing 'today' at build time. */
export function getScheduleHighlight(items: ScheduleItem[], now: number | null) {
  const remaining = items
    .filter((item) => now === null || Date.parse(item.endsAt) > now)
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  const first = remaining[0];
  if (!first) return null;

  const date = dateInIndia.format(new Date(first.startsAt));
  const sessions = remaining.filter((item) => dateInIndia.format(new Date(item.startsAt)) === date);
  let heading = "Coming up at QFF";

  if (now !== null) {
    const today = dateInIndia.format(new Date(now));
    const tomorrow = dateInIndia.format(new Date(now + 24 * 60 * 60 * 1000));
    if (date === today) heading = "Today at QFF";
    else if (date === tomorrow) heading = "Tomorrow at QFF";
  }

  return { heading, day: first.day, sessions };
}
