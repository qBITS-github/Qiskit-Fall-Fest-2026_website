import type { ProblemStatement } from "@/types";

/**
 * Add confirmed problem statements here to publish them on /hackathon.
 * Each track shows a coming-soon message until it has at least one statement.
 * Use a unique, URL-friendly id so individual statements can be shared by hash.
 *
 * Entry shape:
 * {
 *   id: "quantum-search",
 *   trackId: "beginner", // "beginner" or "advanced"
 *   title: "Your problem title",
 *   description: "The full problem statement. Newlines are preserved.",
 *   deliverables: ["What teams should submit"], // optional
 *   documentHref: "/hackathon/quantum-search.pdf", // optional file in public/
 * }
 */
export const problemStatements: ProblemStatement[] = [];
