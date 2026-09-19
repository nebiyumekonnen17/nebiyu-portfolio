"use client";

import { Cloud, Database, Image as ImageIcon, ShieldCheck } from "lucide-react";
import { useState } from "react";

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

export function ArchitectureWalkthrough() {
  const [activeId, setActiveId] =
    useState<(typeof services)[number]["id"]>("cognito");
  const active =
    services.find((service) => service.id === activeId) ?? services[0];
  return (
    <div className="architecture-interactive">
      <div
        className="architecture-diagram"
        aria-label="Interactive Visual Tizita AWS architecture overview"
      >
        <div className="architecture-entry">
          <span>Guests</span>
          <span>Hosts</span>
        </div>
        <div className="architecture-line line-one" />
        <div className="architecture-line line-two" />
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <button
              key={service.id}
              type="button"
              className={`architecture-node node-${service.id} ${active.id === service.id ? "is-active" : ""}`}
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
