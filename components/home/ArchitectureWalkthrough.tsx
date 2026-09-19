"use client";

import {
  Cloud,
  Database,
  Image as ImageIcon,
  Play,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    id: "cognito",
    name: "Cognito",
    label: "Host identity",
    description:
      "Hosts sign in here; guest QR participation stays separate from the host account flow.",
    icon: ShieldCheck,
  },
  {
    id: "appsync",
    name: "AppSync",
    label: "Ownership rules",
    description:
      "The API applies ownership boundaries so application records are scoped to the right event and role.",
    icon: Cloud,
  },
  {
    id: "dynamodb",
    name: "DynamoDB",
    label: "Application data",
    description:
      "Event state, guestbook records, and application data have one structured home.",
    icon: Database,
  },
  {
    id: "s3",
    name: "S3",
    label: "Event media",
    description:
      "Photos and event media live separately from app records, ready for galleries and slideshows.",
    icon: ImageIcon,
  },
] as const;

type ServiceId = (typeof services)[number]["id"];
type Simulation = "guest" | "host";

const flows: Record<
  Simulation,
  {
    label: string;
    initial: string;
    steps: Array<{ service: ServiceId; message: string }>;
  }
> = {
  guest: {
    label: "Run guest upload",
    initial: "Guest scans QR and selects a photo",
    steps: [
      {
        service: "appsync",
        message: "AppSync validates the event and guest request",
      },
      { service: "s3", message: "S3 receives the event media" },
      { service: "dynamodb", message: "DynamoDB records the media metadata" },
    ],
  },
  host: {
    label: "Run host sign-in",
    initial: "Host opens the secure event dashboard",
    steps: [
      { service: "cognito", message: "Cognito verifies the host session" },
      { service: "appsync", message: "AppSync applies event ownership rules" },
      {
        service: "dynamodb",
        message: "DynamoDB returns the host’s event state",
      },
    ],
  },
};

export function ArchitectureWalkthrough() {
  const [activeId, setActiveId] = useState<ServiceId>("cognito");
  const [running, setRunning] = useState(false);
  const [flow, setFlow] = useState<Simulation>("guest");
  const [step, setStep] = useState(-1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active =
    services.find((service) => service.id === activeId) ?? services[0];
  const currentFlow = flows[flow];
  const activeFlowService =
    step >= 0 ? currentFlow.steps[step]?.service : undefined;

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function runSimulation(nextFlow: Simulation) {
    if (timer.current) clearTimeout(timer.current);
    setFlow(nextFlow);
    setRunning(true);
    setStep(-1);
    const flowSteps = flows[nextFlow].steps;
    let currentStep = -1;
    const advance = () => {
      currentStep += 1;
      if (currentStep >= flowSteps.length) {
        setRunning(false);
        setStep(flowSteps.length);
        return;
      }
      setStep(currentStep);
      setActiveId(flowSteps[currentStep].service);
      timer.current = setTimeout(advance, 1100);
    };
    timer.current = setTimeout(advance, 500);
  }

  const status =
    step === -1
      ? currentFlow.initial
      : step >= currentFlow.steps.length
        ? "Flow complete — event data is ready for the experience."
        : currentFlow.steps[step].message;

  return (
    <div className="architecture-interactive">
      <div
        className={`architecture-simulator ${running ? "is-running" : ""}`}
        aria-label="Interactive Visual Tizita AWS system simulation"
      >
        <div className="architecture-simulator-top">
          <div>
            <p className="home-kicker">Live system simulation</p>
            <strong>Visual Tizita event flow</strong>
          </div>
          <span className={`simulator-status ${running ? "is-running" : ""}`}>
            {running ? "Processing" : "Ready"}
          </span>
        </div>
        <div className="architecture-diagram">
          <div
            className={`simulation-packet ${running ? `is-flow-${flow}` : ""}`}
            aria-hidden="true"
          >
            <span />
          </div>
          <div className="architecture-entry">
            <span>Guests</span>
            <span>Hosts</span>
          </div>
          <div className="architecture-line line-one" />
          <div className="architecture-line line-two" />
          {services.map((service) => {
            const Icon = service.icon;
            const isFlowActive = activeFlowService === service.id;
            return (
              <button
                key={service.id}
                type="button"
                className={`architecture-node node-${service.id} ${active.id === service.id ? "is-active" : ""} ${isFlowActive ? "is-processing" : ""}`}
                onClick={() => setActiveId(service.id)}
                aria-pressed={active.id === service.id}
              >
                <Icon size={18} />
                <span>{service.name}</span>
                <small>{service.label}</small>
              </button>
            );
          })}
        </div>
        <div className="simulation-console" aria-live="polite">
          <span className="console-dot" />
          {status}
        </div>
        <div className="simulation-actions">
          {(["guest", "host"] as const).map((simulation) => (
            <button
              key={simulation}
              type="button"
              className={flow === simulation ? "is-active" : ""}
              onClick={() => runSimulation(simulation)}
              disabled={running}
            >
              <Play size={14} fill="currentColor" />
              {flows[simulation].label}
            </button>
          ))}
        </div>
      </div>
      <div className="architecture-service-detail">
        <p className="home-kicker">Selected service</p>
        <h3>
          {active.name}: {active.label}
        </h3>
        <p>{active.description}</p>
        <div
          className="architecture-service-pips"
          aria-label="Architecture services"
        >
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              className={service.id === active.id ? "is-active" : ""}
              onClick={() => setActiveId(service.id)}
            >
              {service.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
