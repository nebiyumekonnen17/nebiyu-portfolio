"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type StoryVisual = {
  label: string;
  image: string;
  alt: string;
  note: string;
};

export type StoryProject = {
  slug: string;
  name: string;
  status: string;
  thumbnail: string;
  thumbnailAlt: string;
  problem: string;
  outcome: string;
  proof: string;
  stack: string;
  visuals: StoryVisual[];
};

function ProductScene({ slug }: { slug: string }) {
  if (slug === "degissnap") {
    return <div className="product-scene tizita-scene">
      <div className="scene-brand"><span className="scene-mark">✦</span> Visual Tizita</div>
      <div className="tizita-copy"><small>Private event companion</small><strong>Every memory, together.</strong><span>Guests join with a QR code. No account needed.</span></div>
      <div className="tizita-phone"><span className="phone-notch" /><small>Welcome, guest</small><div className="scene-qr" /><button>Share a memory</button></div>
      <div className="tizita-stream"><i /><i /><i /></div>
    </div>;
  }

  if (slug === "nehas-digital-signage") {
    return <div className="product-scene nehas-scene">
      <aside><span className="scene-logo">N</span><i /><i /><i /><i /></aside>
      <main><div className="scene-heading"><div><small>NEHAS</small><strong>Dashboard</strong></div><span className="scene-live">LIVE</span></div>
        <div className="scene-stats"><span><b>248</b> Screens</span><span><b>32</b> Online</span><span><b>2</b> Alerts</span></div>
        <div className="scene-map"><span /><span /><span /><span /><span /></div>
        <div className="scene-feed"><b>Recent activity</b><span>Downtown display published <i /></span><span>Airport lobby is playing <i /></span></div>
      </main>
    </div>;
  }

  if (slug === "fsss-limat-pos") {
    return <div className="product-scene pos-scene">
      <div className="pos-top"><strong>FSSS Limat</strong><span>New sale</span></div>
      <div className="pos-layout"><div className="pos-items"><small>Search products</small><span>Holy Bible <b>250.00 Br</b></span><span>Prayer Book <b>120.00 Br</b></span><span>Children Song Book <b>80.00 Br</b></span><span>Catechism Book <b>150.00 Br</b></span></div><div className="pos-receipt"><small>Current sale</small><strong>600.00 Br</strong><span>4 items</span><button>Pay now</button></div></div>
      <div className="pos-tabs"><span>Inventory</span><span>Held carts</span><span>Reports</span></div>
    </div>;
  }

  if (slug === "naep") {
    return <div className="product-scene naep-scene"><aside><strong>NAEP</strong><span>Dashboard</span><span>Chat</span><span>Agents</span><span>Workflows</span><span>Models</span></aside><main><small>AI ENGINEERING PLATFORM</small><h4>Welcome back, Nebiyu</h4><p>Choose an action to get started.</p><div className="naep-actions"><span>AI Chat <i>›</i></span><span>Smart Agents <i>›</i></span><span>Knowledge Hub <i>›</i></span><span>Workflows <i>›</i></span></div><div className="naep-run"><i /> Deployment assistant <b>Completed</b></div></main></div>;
  }

  return <div className="product-scene arada-scene"><div className="arada-top"><strong>AradaCart</strong><span>Mini App</span></div><div className="arada-layout"><div><small>Categories</small><div className="arada-cats"><span>⌂</span><span>♙</span><span>✦</span><span>♧</span></div><small>Featured products</small><div className="arada-products"><i /><i /><i /></div></div><div className="arada-order"><small>New order</small><strong>2,450 Br</strong><span>Payment received</span><button>View order</button></div></div></div>;
}

export function ProjectStory({ projects }: { projects: StoryProject[] }) {
  const [active, setActive] = useState(0);
  const steps = useRef<Array<HTMLElement | null>>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current) setActive(Number(current.target.getAttribute("data-story-index")));
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: 0 },
    );
    steps.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return <div className="project-story-grid">
    <div className="project-story-copy">
      {projects.map((project, index) => <article key={project.slug} ref={(element) => { steps.current[index] = element; }} data-story-index={index} className={`project-story-step ${active === index ? "is-active" : ""}`}>
        <p className="home-kicker">0{index + 1} / {project.name}</p>
        <h3>{project.problem}</h3><p>{project.outcome}</p><p className="project-story-proof">{project.proof}</p>
        <Link href={`/projects/${project.slug}`} className="home-inline-link">Explore case study <span aria-hidden="true">↗</span></Link>
      </article>)}
    </div>
    <aside className="project-story-visual" aria-live="polite">
      {projects.map((project, index) => <div key={project.slug} className={`project-frame ${active === index ? "is-active" : ""}`}>
        <div className="project-frame-top"><span>{project.status}</span><span>{project.stack}</span></div>
        <div className="project-frame-image"><ProductScene slug={project.slug} /></div>
        <div className="project-frame-bottom"><div><strong>{project.name}</strong><small>Product system preview</small></div><span>{index + 1} / {projects.length}</span></div>
      </div>)}
    </aside>
  </div>;
}
