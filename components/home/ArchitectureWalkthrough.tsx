import { Cloud, Database, Image as ImageIcon, ShieldCheck } from "lucide-react";

const services = [
  { id: "cognito", name: "Cognito", label: "Host identity", icon: ShieldCheck },
  { id: "appsync", name: "AppSync", label: "Ownership rules", icon: Cloud },
  {
    id: "dynamodb",
    name: "DynamoDB",
    label: "Application data",
    icon: Database,
  },
  { id: "s3", name: "S3", label: "Event media", icon: ImageIcon },
] as const;

export function ArchitectureWalkthrough() {
  return (
    <div className="architecture-interactive">
      <div
        className="architecture-simulator"
        aria-label="Animated Visual Tizita AWS system flow"
      >
        <div className="architecture-simulator-top">
          <div>
            <p className="home-kicker">System in motion</p>
            <strong>Visual Tizita event flow</strong>
          </div>
          <span className="simulator-status is-running">Live flow</span>
        </div>
        <div className="architecture-diagram architecture-loop">
          <div className="architecture-entry">
            <span>Guests</span>
            <span>Hosts</span>
          </div>
          <div className="architecture-line line-one" />
          <div className="architecture-line line-two" />
          <div className="flow-route route-guest" />
          <div className="flow-route route-host" />
          <div className="simulation-packet is-flow-guest" aria-hidden="true">
            <span />
          </div>
          <div className="simulation-packet is-flow-host" aria-hidden="true">
            <span />
          </div>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`architecture-node node-${service.id}`}
              >
                <Icon size={18} />
                <span>{service.name}</span>
                <small>{service.label}</small>
              </div>
            );
          })}
        </div>
        <div className="simulation-console" aria-label="Current animation step">
          <span className="console-dot" />
          <span className="flow-copy flow-copy-guest">
            Guest QR → validated request → private event media
          </span>
          <span className="flow-copy flow-copy-host">
            Host sign-in → ownership rules → event dashboard
          </span>
        </div>
      </div>
    </div>
  );
}
