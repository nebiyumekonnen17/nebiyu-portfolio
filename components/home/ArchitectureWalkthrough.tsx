import Image from "next/image";
import { assetUrl } from "@/lib/config";

export function ArchitectureWalkthrough() {
  return (
    <div
      className="architecture-film"
      aria-label="Animated Visual Tizita product and AWS system story"
    >
      <div className="film-topline">
        <span>Visual Tizita / production</span>
        <span>System in motion</span>
      </div>
      <div className="film-stage">
        <div className="film-halo" />
        <div className="film-screen film-guest">
          <Image
            src={assetUrl(
              "/images/projects/degissnap/gallery/01-guest-landing-qr-scan-concept.png",
            )}
            alt="Visual Tizita guest QR entry"
            fill
            sizes="(min-width: 900px) 270px, 48vw"
            className="object-cover"
          />
          <span>01 / Guest entry</span>
        </div>
        <div className="film-media">
          <div className="film-media-image">
            <Image
              src={assetUrl(
                "/images/projects/degissnap/gallery/03-upload-photos-guest-concept.png",
              )}
              alt="Visual Tizita guest upload"
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
          <span>Event photo</span>
        </div>
        <div className="film-pulse pulse-one" />
        <div className="film-pulse pulse-two" />
        <div className="film-service-band">
          <span>Cognito</span>
          <i />
          <span>AppSync</span>
          <i />
          <span>DynamoDB</span>
          <i />
          <span>S3</span>
        </div>
        <div className="film-screen film-host">
          <Image
            src={assetUrl(
              "/images/projects/degissnap/gallery/06-host-dashboard-overview-concept.png",
            )}
            alt="Visual Tizita host dashboard"
            fill
            sizes="(min-width: 900px) 310px, 55vw"
            className="object-cover"
          />
          <span>03 / Host dashboard</span>
        </div>
        <div className="film-caption">
          <strong>Guest contribution becomes a shared event memory.</strong>
          <p>QR entry → protected request → media storage → host visibility</p>
        </div>
      </div>
    </div>
  );
}
