import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, FileText, Users } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HackathonCountdown } from "@/components/hackathon/HackathonCountdown";
import { Pending } from "@/components/ui/Pending";
import { QffFigure } from "@/components/ui/QffFigure";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { event, hackathon } from "@/data/event";
import { problemStatements } from "@/data/problem-statements";

export const metadata: Metadata = {
  title: "Hackathon Problem Statements",
  description: `Explore Beginner and Advanced hackathon problem statements for ${event.fullName}.`,
};

export default function HackathonPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden">
        <section className="relative px-6 pb-16 pt-32 sm:px-10 sm:pb-24 sm:pt-40 lg:px-16">
          <QffFigure
            name="bird-eagle"
            className="pointer-events-none absolute -right-12 top-36 w-64 opacity-[0.12] sm:right-0 lg:right-[4%] lg:w-80"
          />
          <div className="relative mx-auto max-w-6xl">
            <Link
              href="/#hackathon"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface-2/60 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-ink-dim transition-colors hover:border-pink/50 hover:text-pink-ink"
            >
              <ArrowLeft aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              Return to event overview
            </Link>

            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {event.shortName} / Hackathon
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-pink-ink sm:text-6xl lg:text-7xl">
              Problem Statements
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-dim">
              Review the problem statements for the Beginner and Advanced tracks.
              Select a challenge and consult its complete brief for technical requirements, evaluation criteria, and submission details.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs text-ink-dim">
              <span className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-2/60 px-3.5 py-2">
                <Clock aria-hidden className="h-3.5 w-3.5 text-pink-ink" />
                {hackathon.duration}
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-2/60 px-3.5 py-2">
                <Users aria-hidden className="h-3.5 w-3.5 text-pink-ink" />
                {hackathon.minTeamSize}–{hackathon.maxTeamSize} members per team
              </span>
            </div>

            <HackathonCountdown />

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={hackathon.registerHref}
                className="group inline-flex items-center gap-2 rounded-full bg-pink-fill px-7 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-pink-fill-hover"
              >
                Team registration
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              {hackathon.rulebookHref && (
                <a
                  href={hackathon.rulebookHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-pink/30 bg-pink/10 px-7 py-3 text-sm font-bold text-pink-ink transition-colors hover:border-pink"
                >
                  <FileText aria-hidden className="h-4 w-4" />
                  Rulebook
                </a>
              )}
            </div>

            <nav aria-label="Hackathon tracks" className="mt-10 flex flex-wrap gap-3">
              {hackathon.tracks.map((track) => (
                <a
                  key={track.id}
                  href={`#${track.id}`}
                  className="rounded-full border border-line px-5 py-2 text-sm text-ink-dim transition-colors hover:border-pink/50 hover:text-pink-ink"
                >
                  {track.label} track
                </a>
              ))}
            </nav>
          </div>
        </section>

        {hackathon.tracks.map((track) => {
          const statements = problemStatements.filter((statement) => statement.trackId === track.id);

          return (
            <Section key={track.id} id={track.id} className="bg-surface/20">
              <SectionHeading
                title={`${track.label} Track`}
                meta={statements.length ? `${statements.length} problem statement${statements.length === 1 ? "" : "s"}` : "Announcing soon"}
              />

              {statements.length ? (
                <div className="mt-10 space-y-6">
                  {statements.map((statement) => (
                    <article
                      key={statement.id}
                      id={`problem-${statement.id}`}
                      aria-labelledby={`title-${statement.id}`}
                      className="rounded-2xl border border-line-soft bg-surface-2/80 p-6 backdrop-blur-sm sm:p-8"
                    >
                      <h3 id={`title-${statement.id}`} className="font-display text-2xl font-bold text-ink">
                        <a href={`#problem-${statement.id}`} className="transition-colors hover:text-pink-ink">
                          {statement.title}
                        </a>
                      </h3>
                      <p className="mt-4 whitespace-pre-line leading-relaxed text-ink-dim">
                        {statement.description}
                      </p>
                      {!!statement.deliverables?.length && (
                        <div className="mt-6">
                          <h4 className="font-semibold text-ink">Required deliverables</h4>
                          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-dim">
                            {statement.deliverables.map((deliverable) => (
                              <li key={deliverable}>{deliverable}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {!!statement.judgingCriteria?.length && (
                        <div className="mt-6">
                          <h4 className="font-semibold text-ink">Judging criteria (100 points)</h4>
                          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-dim">
                            {statement.judgingCriteria.map((criterion) => (
                              <li key={criterion}>{criterion}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {statement.documentHref && (
                        <a
                          href={statement.documentHref}
                          download
                          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-pink-ink underline-offset-4 hover:underline"
                        >
                          <FileText aria-hidden className="h-4 w-4" />
                          Download full problem statement
                        </a>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-10 rounded-2xl border border-dashed border-line bg-surface-2/60 p-6 sm:p-8">
                  <FileText aria-hidden className="mb-5 h-7 w-7 text-pink-ink" />
                  <Pending label="Problem statements coming soon" />
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-dim">
                    The {track.label.toLowerCase()} track challenges haven&apos;t been released yet.
                    Check back here for the full briefs and submission requirements.
                  </p>
                </div>
              )}
            </Section>
          );
        })}
      </main>
      <Footer />
    </>
  );
}
