import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/content";
import { getAdjacentProjects } from "@/data/projects";
import { getProjectGallery } from "@/data/galleries";
import { ProjectGallery } from "@/components/projects/gallery/ProjectGallery";
import { projectHeroImage } from "@/lib/project-images";

const cardClass="z-[1] p-8 space-y-1.5 bg-darkBg rounded-lg relative overflow-hidden before:content-[''] before:absolute before:-z-[1] before:left-0 before:top-0 before:w-full before:h-full before:bg-themeGradient before:opacity-0 hover:before:opacity-10 before:transition-all before:ease-linear before:duration-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-themeGradient";
const buttonClass="inline-block relative z-[1] group overflow-hidden bg-white/15 px-7 py-3 rounded-3xl font-outfit font-medium uppercase text-sm tracking-wider text-white before:content-[''] before:absolute before:-z-[1] before:left-0 before:top-0 before:w-full before:h-full before:bg-themeGradient before:opacity-0 hover:before:opacity-20 before:transition-all before:ease-linear before:duration-100";
const sectionHeading="font-outfit font-medium text-2xl md:text-3xl text-white mt-10 mb-4";
const galleryIntro=(project:Project)=>{
  if(project.status==="Production")return "Gallery illustrations are product-direction concepts, not verified screenshots of the live application.";
  return "Gallery images may illustrate product concepts rather than verified screenshots of completed software.";
};

export function MoneCaseStudy({project}:{project:Project}){
  const {previous,next}=getAdjacentProjects(project.slug);
  const gallery=getProjectGallery(project.slug);
  const words=project.name.split(" ");
  const last=words.pop()||project.name;
  const first=words.join(" ");
  const information=[
    {label:"Services:",value:project.category.join(" · ")},
    {label:"Role:",value:project.role},
    {label:"Project Link:",value:project.liveUrl,link:project.liveUrl},
    {label:"Status:",value:project.status},
  ];
  return <div className="mone-case-study">
    <div className="container mx-auto max-w-[1320px] px-5 md:px-10 xl:px-5">
      <div className="py-24 xl:py-28">
        <div className="md:mx-auto md:w-3/4 lg:w-2/3">
          <Link href="/#portfolio" className="text-sm font-outfit uppercase tracking-wider text-white/50 hover:text-white">← Back to portfolio</Link>
          <h1 className="font-outfit font-medium text-4xl md:text-5xl lg:text-6xl text-white mb-4 mt-6">{first} <span className="bg-themeGradient bg-clip-text text-transparent">{last}</span></h1>
          <p className="text-white/70 leading-[1.75]">{project.summary}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {information.map(item=><div key={item.label} className={cardClass}>
            <span className="block font-outfit font-medium uppercase text-sm tracking-wider text-white">{item.label}</span>
            {item.link?<a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-block font-outfit text-white/70 hover:text-white break-all">{item.link.replace(/^https?:\/\//,"")}</a>:
              <p className="text-white/70">{item.value||"Not publicly available"}</p>}
          </div>)}
        </div>
      </div>
    </div>
    <div className="px-5 lg:px-10">
      <div className="bg-darkBg rounded-2xl overflow-hidden py-20">
        <div className="container mx-auto max-w-[1320px] px-5">
          <div className="md:mx-auto md:w-3/4 lg:w-2/3">
            <h2 className={sectionHeading}>The Problem</h2>
            {project.problem.map((text,index)=><p key={index} className="text-white/70 leading-[1.75] mt-3">{text}</p>)}
            <h2 className={sectionHeading}>The Solution</h2>
            {project.solution.map((text,index)=><p key={index} className="text-white/70 leading-[1.75] mt-3">{text}</p>)}
          </div>
          <div className="mt-6 lg:mt-12 rounded-lg overflow-hidden border border-white/10 bg-black/40">
            <Image className="w-full max-h-[600px] object-contain" src={projectHeroImage(project.slug,project.thumbnail)} alt={project.thumbnailAlt} width={1280} height={500} sizes="(min-width:1024px) 1200px, 100vw" />
          </div>
          <div className="md:mx-auto md:w-3/4 lg:w-2/3 mt-8 lg:mt-12">
            <h2 className={sectionHeading}>What I Built</h2>
            <p className="text-white/70 leading-[1.75]">{project.platformType}</p>
            <p className="text-white/70 leading-[1.75] mt-3">{project.servesWho}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {project.features.slice(0,6).map(feature=><div key={feature.title} className={cardClass}>
                <h3 className="font-outfit font-medium text-2xl text-white">{feature.title}</h3><p className="text-white/70">{feature.description}</p>
              </div>)}
            </div>
            <h2 className={sectionHeading}>Technology</h2>
            <div className="flex flex-wrap gap-2 mt-5">{project.technologies.map(tech=><span className="bg-black/35 text-white/70 rounded-3xl px-3 py-2 text-sm" key={tech}>{tech}</span>)}</div>
          </div>
          {gallery.length>0&&<div className="mt-12">
            <div className="md:mx-auto md:w-3/4 lg:w-2/3 mb-6"><h2 className={sectionHeading}>Product Gallery</h2><p className="text-white/70 leading-[1.75]">{galleryIntro(project)}</p></div>
            <ProjectGallery items={gallery} projectName={project.name}/>
          </div>}
          <div className="md:mx-auto md:w-3/4 lg:w-2/3 mt-10">
            <h2 className={sectionHeading}>Engineering Challenges</h2>
            {project.challenges.map(challenge=><div className="mt-6" key={challenge.title}><h3 className="font-outfit font-medium text-2xl text-white">{challenge.title}</h3><p className="text-white/70 leading-[1.75] mt-2">{challenge.description}</p></div>)}
            {project.results.length>0&&<><h2 className={sectionHeading}>Results & Evidence</h2><ul className="text-white/70 leading-[1.75] list-disc pl-6">{project.results.map(result=><li className="mb-2" key={result}>{result}</li>)}</ul></>}
            {project.learnings.length>0&&<><h2 className={sectionHeading}>What I Learned</h2>{project.learnings.map((lesson,index)=><p className="text-white/70 leading-[1.75] mt-3" key={index}>{lesson}</p>)}</>}
          </div>
          <div className="flex justify-between mt-12 gap-4">
            {previous?<Link className={buttonClass} href={`/projects/${previous.slug}`}>Prev Project</Link>:<span/>}
            {next?<Link className={buttonClass} href={`/projects/${next.slug}`}>Next Project</Link>:<Link className={buttonClass} href="/projects">All Projects</Link>}
          </div>
        </div>
      </div>
    </div>
  </div>;
}
