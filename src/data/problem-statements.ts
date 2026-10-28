import type { ProblemStatement } from "@/types";

/** Published hackathon challenges. The full official briefs are in public/hackathon/. */
export const problemStatements: ProblemStatement[] = [
  {
    id: "quantum-playground",
    trackId: "beginner",
    title: "Quantum Playground",
    description: "Visual learning and interaction\n\nBuild a visual or interactive learning experience that teaches a quantum concept to first-time learners. Possible subjects include quantum gates, superposition, entanglement, introductory quantum algorithms, and small quantum chemistry experiments. Emphasise interactive learning over passive presentation.",
    deliverables: [
      "A working interactive learning experience.",
      "Qiskit-backed circuit behaviour.",
      "A clear explanation of the concept users are intended to learn.",
    ],
    judgingCriteria: [
      "Learning effectiveness: 25",
      "Creativity and engagement: 25",
      "Quantum concept accuracy: 25",
      "Interactive implementation: 15",
      "Presentation and accessibility: 10",
    ],
    documentHref: "/hackathon/quantum-playground.pdf",
  },
  {
    id: "quantum-whisper",
    trackId: "beginner",
    title: "Quantum Whisper",
    description: "Communication and quantum cryptography\n\nBuild a functional messaging application integrating a Qiskit simulation of quantum key distribution (such as BB84). Explain quantum state preparation, measurement bases, eavesdropping detection, and the establishment of shared key material. A simulated QKD demonstration is not a physical quantum link; state security limitations clearly.",
    deliverables: [
      "A functional messaging application with message encryption.",
      "A Qiskit-based QKD protocol simulation integrated into the messaging flow.",
      "An understandable explanation of the trust model, security limitations, and any simulated interception.",
    ],
    judgingCriteria: [
      "Correct QKD protocol understanding: 30",
      "Functional messaging and encryption: 25",
      "Quantum integration and experiment design: 20",
      "Security model and limitations: 15",
      "User experience and creativity: 10",
    ],
    documentHref: "/hackathon/quantum-whisper.pdf",
  },
  {
    id: "optimize-my-chaos",
    trackId: "beginner",
    title: "Optimize My Chaos",
    description: "Everyday decisions and optimization\n\nChoose a relatable decision problem with scarce resources or competing constraints, formulate a small combinatorial optimisation problem, and investigate a Qiskit-based approach such as QAOA. Clearly explain the objective, constraints, and what the recommendation means.",
    deliverables: [
      "A clear mathematical objective and constraints for a chosen real-world decision problem.",
      "A functioning Qiskit-based optimisation component.",
      "An application that clearly presents and evaluates the resulting recommendation.",
    ],
    judgingCriteria: [
      "Problem formulation and constraints: 30",
      "Quantum optimization understanding: 25",
      "Creativity and relevance of the chosen problem: 20",
      "Validity of results and evaluation: 15",
      "Usability and presentation: 10",
    ],
    documentHref: "/hackathon/optimize-my-chaos.pdf",
  },
  {
    id: "quantum-democracy",
    trackId: "beginner",
    title: "Quantum Democracy",
    description: "Entanglement, collaboration, and trust\n\nCreate a voting-themed interactive experiment or collaborative decision-making prototype using Qiskit. Investigate GHZ states, entanglement, measurement correlations, or protocol choices. Clearly distinguish demonstrated quantum properties from security guarantees. Entanglement alone does not establish anonymity, election integrity, eligibility, or tamper resistance.",
    deliverables: [
      "A functioning voting-themed interaction or experiment.",
      "A meaningful entanglement or quantum-correlation circuit.",
      "A clear explanation of demonstrated properties and security properties not established.",
    ],
    judgingCriteria: [
      "Quantum understanding and correct use of entanglement: 30",
      "Protocol logic and demonstrated properties: 25",
      "Originality of the experience: 20",
      "Working implementation: 15",
      "Critical evaluation and communication: 10",
    ],
    documentHref: "/hackathon/quantum-democracy.pdf",
  },
  {
    id: "quantum-fingerprint",
    trackId: "beginner",
    title: "Quantum Fingerprint",
    description: "Creative integrity and tamper detection\n\nExplore digital fingerprinting, integrity checks, or tamper detection through Qiskit circuits. Encode selected properties of a digital object into quantum states or circuit parameters, then compare outcomes for original and modified inputs. Evaluate collisions, noise, and other limitations. Do not present the prototype as a secure digital signature or watermark without appropriate evidence.",
    deliverables: [
      "A reproducible mapping from input content to a quantum circuit.",
      "A working verification or comparison workflow.",
      "Tests on original and modified inputs and an explanation of collisions, noise, and other limitations.",
    ],
    judgingCriteria: [
      "Design of the quantum fingerprinting approach: 30",
      "Tampering experiment and evaluation: 25",
      "Understanding of encoding and measurement: 20",
      "Creativity and usability: 15",
      "Limitations and clarity: 10",
    ],
    documentHref: "/hackathon/quantum-fingerprint.pdf",
  },
  {
    id: "optimising-the-optimiser",
    trackId: "advanced",
    title: "Optimising the Optimiser",
    description:
      "Solve a weighted MaxCut instance using variational quantum circuits. Compare conventional gradient descent with variational quantum imaginary-time evolution (VarQITE), also expressed as preconditioned gradient descent. Investigate how optimiser geometry, step size, circuit-evaluation cost, finite sampling, and graph structure affect the quality of the solution.\n\nBy Sayantan Pramanik, TCS Research, Tata Consultancy Services. See the full brief for the mathematical background, dataset format, and evaluation objectives.",
    deliverables: [
      "Simulated MaxCut solutions using both gradient descent and VarQITE (preconditioned gradient descent), exploring multiple step sizes.",
      "Circuit evaluations per iteration and a plot of energy expectation versus total circuit evaluations for both methods.",
      "Best-found objective values and final optimised energy expectations for both methods.",
      "Finite-shot experiments and an analysis of graph properties affecting solution difficulty.",
    ],
    documentHref: "/hackathon/optimising-the-optimiser.pdf",
  },
  {
    id: "trust-a-quantum-simulation",
    trackId: "advanced",
    title: "When Can We Trust a Quantum Simulation?",
    description:
      "Correlations and the spread of a local disturbance. Simulate interacting quantum spins on an actual device connectivity graph, then identify when approximate classical calculations and noisy quantum hardware can be trusted. Validate small-system dynamics, measure single-site means, pair correlations and four-site cumulants, and compare accuracy, runtime and hardware noise as system size grows.\n\nChoose one supported device geometry and at least one approximate classical method. Steps 1–4 and the reproducible submission are required; the local-disturbance experiment is optional. Each team has a maximum of 10 minutes of QPU time. Consult the full brief for parameters, checks, budgets and protocols.",
    deliverables: [
      "Saved device graph, parameters, and verified quantum circuit; exact small-system benchmarks and time-step error checks.",
      "Classical approximation accuracy versus runtime and peak memory, across different system sizes and approximation settings.",
      "Raw and readout-corrected hardware results with uncertainty intervals, validation against small-system answers, and reported QPU resource usage.",
      "Reproducible team_name.zip archive containing code, environment, results, resource logs and raw experimental metadata.",
      "Optional: quantify the spread of a local disturbance with forward-and-reverse evolution experiments.",
    ],
    documentHref: "/hackathon/when-can-we-trust-a-quantum-simulation.pdf",
  },
];
