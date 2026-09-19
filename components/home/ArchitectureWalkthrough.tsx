import {
  Database,
  HardDrive,
  Network,
  ShieldCheck,
  Smartphone,
  UploadCloud,
} from "lucide-react";

const services = [
  { name: "Cognito", detail: "Host access", icon: ShieldCheck, className: "service-cognito" },
  { name: "AppSync", detail: "Protected API", icon: Network, className: "service-appsync" },
  { name: "DynamoDB", detail: "Event data", icon: Database, className: "service-dynamodb" },
  { name: "S3", detail: "Event media", icon: HardDrive, className: "service-s3" },
];

export function ArchitectureWalkthrough() {
  return (
    <div className="aws-flow" aria-label="Animated Visual Tizita AWS architecture">
      <div className="aws-flow-topline">
        <span>Visual Tizita / AWS production</span>
        <span className="aws-flow-live"><i /> Live request flow</span>
      </div>

      <div className="aws-flow-stage">
        <div className="aws-grid" aria-hidden="true" />
        <svg className="aws-paths" viewBox="0 0 800 460" preserveAspectRatio="none" aria-hidden="true">
          <path id="guest-api" d="M112 166 C 210 166, 235 218, 338 218" />
          <path id="host-auth" d="M112 322 C 178 322, 196 132, 338 132" />
          <path id="auth-api" d="M436 132 C 472 132, 469 218, 510 218" />
          <path id="api-data" d="M436 218 C 470 218, 478 175, 510 165" />
          <path id="api-media" d="M436 218 C 475 218, 470 298, 510 300" />
          <path id="data-host" d="M608 165 C 680 165, 695 322, 744 322" />
          <path id="media-host" d="M608 300 C 675 300, 692 322, 744 322" />
        </svg>

        <div className="aws-actor aws-guest">
          <span className="aws-actor-icon"><Smartphone size={20} /></span>
          <strong>Guest</strong>
          <small>QR entry</small>
        </div>

        <div className="aws-actor aws-host">
          <span className="aws-actor-icon"><UploadCloud size={20} /></span>
          <strong>Host</strong>
          <small>Control room</small>
        </div>

        <div className="aws-cloud">
          <div className="aws-cloud-label"><span>AWS cloud</span><small>us-west-2 · production</small></div>
          {services.map(({ name, detail, icon: Icon, className }) => (
            <div key={name} className={`aws-service ${className}`}>
              <span className="aws-service-icon"><Icon size={18} /></span>
              <strong>{name}</strong>
              <small>{detail}</small>
            </div>
          ))}
        </div>

        <span className="aws-packet packet-guest"><i /></span>
        <span className="aws-packet packet-auth"><i /></span>
        <span className="aws-packet packet-data"><i /></span>
        <span className="aws-packet packet-media"><i /></span>
        <span className="aws-packet packet-host"><i /></span>
      </div>

      <div className="aws-flow-footer">
        <strong>Every guest action follows a protected path.</strong>
        <span>Identity → API → event data and media → host visibility</span>
      </div>
    </div>
  );
}
