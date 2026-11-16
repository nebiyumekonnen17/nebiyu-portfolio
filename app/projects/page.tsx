import type { Metadata } from "next";
import { MonePortfolio, MoneSiteFrame } from "@/components/home/MoneOriginal";
import { absoluteUrl } from "@/lib/config";

export const metadata: Metadata = {
  title:"Work",
  description:"Explore Nebiyu Mekonnen's software engineering, AWS cloud, and full-stack case studies.",
  alternates:{canonical:absoluteUrl("/projects")},
};

export default function ProjectsPage(){
  return <MoneSiteFrame><div className="pt-24"><MonePortfolio/></div></MoneSiteFrame>;
}
