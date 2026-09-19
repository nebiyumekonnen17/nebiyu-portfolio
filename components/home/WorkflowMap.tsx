"use client";

import { useState } from "react";

const scenarios = [
  {
    id: "guest",
    label: "A guest uploads",
    steps: ["QR entry", "Guest upload", "Private gallery", "Host moderation"],
    note: "A guest can contribute quickly without creating an account, while the host keeps the event experience curated.",
  },
  {
    id: "host",
    label: "A host manages",
    steps: [
      "Host sign-in",
      "Event dashboard",
      "Media controls",
      "Live slideshow",
    ],
    note: "The host experience separates identity and controls from the guest flow so the event can run smoothly in real time.",
  },
  {
    id: "counter",
    label: "A cashier scans",
    steps: ["Barcode scan", "Product lookup", "Held cart", "Receipt & stock"],
    note: "FSSS Limat POS turns a busy counter workflow into one connected register, inventory, and receipt trail.",
  },
] as const;

export function WorkflowMap() {
  const [activeId, setActiveId] =
    useState<(typeof scenarios)[number]["id"]>("guest");
  const active =
    scenarios.find((scenario) => scenario.id === activeId) ?? scenarios[0];
  return (
    <section
      className="workflow-map"
      aria-label="Interactive operational workflows"
    >
      <div className="workflow-map-header">
        <p className="home-kicker">A workflow, not a feature list</p>
        <h3>Follow one real moment through the system.</h3>
        <p>
          Choose a scenario to see the small chain of decisions behind the
          interface.
        </p>
      </div>
      <div
        className="workflow-tabs"
        role="tablist"
        aria-label="Choose a workflow"
      >
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            role="tab"
            aria-selected={active.id === scenario.id}
            className={active.id === scenario.id ? "is-active" : ""}
            onClick={() => setActiveId(scenario.id)}
          >
            {scenario.label}
          </button>
        ))}
      </div>
      <div className="workflow-route">
        <div className="workflow-steps">
          {active.steps.map((step, index) => (
            <div className="workflow-step" key={step}>
              <span>0{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
        <p>{active.note}</p>
      </div>
    </section>
  );
}
