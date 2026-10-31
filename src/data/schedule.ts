import type { ScheduleItem, Webinar } from "@/types";

// Shared webinar details for all talks on a given schedule day.
export const dayWebinars: Partial<Record<string, Webinar>> = {
  "Wed, Oct 28": {
    href: "https://bitspilani.webex.com/bitspilani/j.php?MTID=m889ba6fd2991ba1535160ccf3c401ecd",
    number: "2516 966 7797",
    password: "1122",
  },
  "Thu, Oct 29": {
    href: "https://bitspilani.webex.com/bitspilani/j.php?MTID=mcd5b0819693468469feb23a67c2a1359",
    number: "2517 179 1129",
    password: "1122 (1122 when dialing from a video system)",
  },
};

// One entry per scheduled talk. Open slots are left out until they are filled.
// Keep the ISO timestamps (IST) aligned with day/time; the homepage uses them
// to select upcoming sessions and mark a talk as underway.
export const schedule: ScheduleItem[] = [
  // Wed, Oct 28
  {
    id: "oct28-1",
    startsAt: "2026-10-28T17:00:00+05:30",
    endsAt: "2026-10-28T18:30:00+05:30",
    day: "Wed, Oct 28",
    time: "5:00 PM - 6:30 PM",
    title: "Bhanwar Gupta",
    topic: "Quantum Computing and Qiskit 101",
    description: "IBM",
    venue: "DLT 9",
    track: "In person",
  },
  {
    id: "oct28-2",
    startsAt: "2026-10-28T18:30:00+05:30",
    endsAt: "2026-10-28T20:00:00+05:30",
    day: "Wed, Oct 28",
    time: "6:30 PM - 8:00 PM",
    title: "Manoj Nambiar",
    topic: "The Road to Useful Quantum Computing: Opportunities and Challenges",
    description: "TCS",
    venue: "DLT 9",
    track: "In person",
  },
  // Thu, Oct 29
  {
    id: "oct29-1",
    startsAt: "2026-10-29T17:00:00+05:30",
    endsAt: "2026-10-29T18:30:00+05:30",
    day: "Thu, Oct 29",
    time: "5:00 PM - 6:30 PM",
    title: "Nick Bronn",
    description: "IBM New York",
    venue: "DLT 9",
    track: "Virtual",
  },
  // Fri, Oct 30
  {
    id: "oct30-2",
    startsAt: "2026-10-30T16:00:00+05:30",
    endsAt: "2026-10-30T17:30:00+05:30",
    day: "Fri, Oct 30",
    time: "4:00 PM - 5:30 PM",
    title: "Indrakshi Raychowdhury",
    description: "",
    webinarHref:
      "https://bitspilani.webex.com/bitspilani/j.php?MTID=mbfb7097957303f76bd7a4e13e5a5e1ba",
  },
  {
    id: "oct30-1",
    startsAt: "2026-10-30T19:00:00+05:30",
    endsAt: "2026-10-30T20:30:00+05:30",
    day: "Fri, Oct 30",
    time: "7:00 PM - 8:30 PM",
    title: "Anil Prabhakar",
    description: "IIT Madras",
    venue: "DLT 9",
    track: "In person",
    webinarHref:
      "https://bitspilani.webex.com/bitspilani/j.php?MTID=m91120f3e314d01ae7680c5d359c4fbda",
  },
  // Sat, Oct 31
  {
    id: "oct31-1",
    startsAt: "2026-10-31T11:00:00+05:30",
    endsAt: "2026-10-31T12:30:00+05:30",
    day: "Sat, Oct 31",
    time: "11:00 AM - 12:30 PM",
    title: "Bhupendra Singh",
    description: "DRDO",
    venue: "T.P. (Telepresence Room)",
    track: "In person",
  },
  {
    id: "oct31-2",
    startsAt: "2026-10-31T12:30:00+05:30",
    endsAt: "2026-10-31T14:00:00+05:30",
    day: "Sat, Oct 31",
    time: "12:30 PM - 2:00 PM",
    title: "Santosh Kumar",
    description: "IIT Goa, Photonics",
    venue: "T.P. (Telepresence Room)",
    track: "In person",
  },
  {
    id: "oct31-3",
    startsAt: "2026-10-31T15:00:00+05:30",
    endsAt: "2026-10-31T16:00:00+05:30",
    day: "Sat, Oct 31",
    time: "3:00 PM - 4:00 PM",
    title: "Ritajit Majumdar",
    description: "IBM India",
    venue: "T.P. (Telepresence Room)",
    track: "Virtual",
  },
  {
    id: "oct31-4",
    startsAt: "2026-10-31T16:00:00+05:30",
    endsAt: "2026-10-31T17:00:00+05:30",
    day: "Sat, Oct 31",
    time: "4:00 PM - 5:00 PM",
    title: "Anupama Ray",
    description: "IBM India",
    venue: "T.P. (Telepresence Room)",
    track: "Virtual",
  },
  // Sun, Nov 1
  {
    id: "nov1-1",
    startsAt: "2026-11-01T11:00:00+05:30",
    endsAt: "2026-11-01T12:30:00+05:30",
    day: "Sun, Nov 1",
    time: "11:00 AM - 12:30 PM",
    title: "Vedangi Pathak",
    description: "IBM Vancouver",
    venue: "DLT 8",
    track: "Virtual",
  },
  {
    id: "nov1-2",
    startsAt: "2026-11-01T12:30:00+05:30",
    endsAt: "2026-11-01T14:00:00+05:30",
    day: "Sun, Nov 1",
    time: "12:30 PM - 2:00 PM",
    title: "Seiji Yunoki",
    description: "RIKEN",
    venue: "DLT 8",
    track: "Virtual",
  },
];
