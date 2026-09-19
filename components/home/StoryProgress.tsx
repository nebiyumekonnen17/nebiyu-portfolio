"use client";
import { useEffect, useState } from "react";
const chapters = [["intro", "Hello"], ["work", "The work"], ["engineering", "Underneath"], ["evidence", "The proof"], ["connect", "What’s next"]];
export function StoryProgress() {
  const [active, setActive] = useState("intro");
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      entry.target.classList.toggle("story-in-view", entry.isIntersecting);
      if (entry.isIntersecting && chapters.some(([id]) => id === entry.target.id)) setActive(entry.target.id);
    }), { rootMargin: "-15% 0px -35% 0px", threshold: 0 });
    document.querySelectorAll("[data-story-step]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return <nav className="story-progress" aria-label="Homepage chapters">{chapters.map(([id, label], index) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}><span aria-hidden="true">0{index + 1}</span>{label}</a>)}</nav>;
}
