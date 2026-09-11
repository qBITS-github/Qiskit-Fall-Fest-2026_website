import Image from "next/image";

/**
 * The two organisation marks that flank the nav.
 *
 * qBITS runs the fest; IBM's Qiskit is what it runs on. Both sit on the island
 * surface so they read as part of the same floating layer as the nav rather
 * than as images dropped on the page.
 */

export function QbitsMark({ className = "" }: { className?: string }) {
  return (
    <div
      aria-label="qBITS, BITS Goa — the student body running the fest"
      className={`inline-flex shrink-0 items-center ${className}`}
    >
      <Image
        src="/brand/qbits.png"
        alt=""
        width={634}
        height={231}
        className="h-6 w-auto sm:h-8"
        priority
      />
    </div>
  );
}

export function IbmMark({ className = "" }: { className?: string }) {
  return (
    <a
      href="https://quantum.ibm.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="IBM Quantum"
      className={`qff-island h-12 shrink-0 items-center gap-2.5 rounded-full px-4 transition-transform duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <Image
        src="/brand/ibm.png"
        alt="IBM Quantum"
        width={400}
        height={150}
        className="h-5 w-auto"
        priority
      />
    </a>
  );
}
