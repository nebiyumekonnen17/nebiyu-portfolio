"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const evidence = [
  {
    value: "974",
    label: "Tests across 72 files",
    text: "Recorded at the NACLASSU milestone—not presented as a current test count.",
    href: "/projects/degissnap",
    link: "Read the Visual Tizita case study ↗",
  },
  {
    value: "Real event",
    label: "Verified on phone and desktop",
    text: "The NACLASSU Event Companion milestone used the shared Visual Tizita foundation in a live event context.",
    href: "/projects/degissnap",
    link: "See the deployment story ↗",
  },
  {
    value: "Legacy-ready",
    label: "A practical data migration path",
    text: "FSSS Limat POS adapts to existing MySQL schemas instead of requiring a clean-slate replacement.",
    href: "/projects/fsss-limat-pos",
    link: "See the POS case study ↗",
  },
];

export function EvidenceReveal() {
  const root = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={root} className={`evidence-cards ${seen ? "is-visible" : ""}`}>
      {evidence.map((item, index) => (
        <article
          key={item.value}
          style={
            { "--evidence-delay": `${index * 100}ms` } as React.CSSProperties
          }
        >
          <strong>{item.value}</strong>
          <h3>{item.label}</h3>
          <p>{item.text}</p>
          <Link href={item.href}>{item.link}</Link>
        </article>
      ))}
    </div>
  );
}
