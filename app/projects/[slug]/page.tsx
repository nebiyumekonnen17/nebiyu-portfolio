import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/data/projects";
import { MoneSiteFrame } from "@/components/home/MoneOriginal";
import { MoneCaseStudy } from "@/components/home/MoneCaseStudy";
import { absoluteUrl, siteConfig } from "@/lib/config";

export function generateStaticParams() {
  return projects.map((project) => ({slug:project.slug}));
}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const project=getProjectBySlug(slug);
  if(!project)return {};
  const thumbnailPath=siteConfig.basePath&&project.thumbnail.startsWith(siteConfig.basePath)?project.thumbnail.slice(siteConfig.basePath.length):project.thumbnail;
  return {
    title:`${project.name} | Case Study`,
    description:project.summary,
    alternates:{canonical:absoluteUrl(`/projects/${project.slug}`)},
    openGraph:{title:`${project.name} | Nebiyu Mekonnen`,description:project.summary,images:[{url:absoluteUrl(thumbnailPath)}]},
    twitter:{card:"summary_large_image",title:`${project.name} | Nebiyu Mekonnen`,description:project.summary,images:[absoluteUrl(thumbnailPath)]},
  };
}

export default async function ProjectDetailPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const project=getProjectBySlug(slug);
  if(!project)notFound();
  return <MoneSiteFrame><MoneCaseStudy project={project}/></MoneSiteFrame>;
}
