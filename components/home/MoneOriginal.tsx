"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Outfit, Open_Sans } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { credentials } from "@/data/credentials";
import { assetUrl, siteConfig } from "@/lib/config";
import "./mone-original.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--mone-outfit", display: "swap" });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--mone-opensans", display: "swap" });
const colors = { text: "text-white" };
const portfolioArt: Record<string, string> = {
  degissnap: "/assets/projects/Visual-Tizita-events-poster.png",
  naep: "/assets/projects/NAEP-hero.svg",
  "nehas-digital-signage": "/assets/projects/Nehas-Digital-Signage-hero.svg",
  "fsss-limat-pos": "/assets/projects/FSSS-Limat-POS-hero.svg",
  aradacart: "/assets/projects/AradaCart-hero.svg",
};
const navLinks = [
  {url: "/#about", title: "About"},
  {url: "/#services", title: "Services"},
  {url: "/#portfolio", title: "Portfolio"},
  {url: "/#awards", title: "Credentials"},
  {url: "/#blog", title: "Case Studies"},
  {url: "/#contact", title: "Contact"},
  {url: "/projects", title: "All Work"},
];
const skills = ["Full-stack Development", "React & TypeScript", "Cloud Architecture", "AWS", "Product Design"];
const specialties = [
  {number:"01",bootstrapIcon:"bi bi-brush",title:"Design",description:"Product discovery, user flows, accessible interfaces, and end-to-end product design."},
  {number:"02",bootstrapIcon:"bi bi-code-slash",title:"Development",description:"Full-stack web applications, APIs, data architecture, and real-world software systems."},
  {number:"03",bootstrapIcon:"bi bi-laptop",title:"Cloud Engineering",description:"AWS deployments, authorization, reliability, and practical cloud operations."},
];
const platforms = ["React", "TypeScript", "Next.js", "AWS", "Node.js", "PostgreSQL"];

function MoneHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement|null>(null);
  useEffect(()=>{
    const onOutside=(event:MouseEvent)=>{
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && !(event.target as HTMLElement).closest("[data-mone-menu]")) setIsMenuOpen(false);
    };
    const onEscape=(event:KeyboardEvent)=>{ if(event.key==="Escape") setIsMenuOpen(false); };
    document.addEventListener("mousedown",onOutside);
    document.addEventListener("keydown",onEscape);
    return ()=>{document.removeEventListener("mousedown",onOutside);document.removeEventListener("keydown",onEscape);};
  },[]);
  return (
    <div className="z-50 fixed top-0 left-0 w-full py-5 mone-original-header">
      <div className="container mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex justify-between relative">
          <div className="text-3xl font-outfit font-medium text-white"><Link href="/">Nebiyu.</Link></div>
          <div><ul className="flex space-x-2">
            <li className="list-none inline-block"><Link className="inline-block relative z-[1] overflow-hidden group px-5 py-2.5 pr-[34px] backdrop-blur bg-white/15 text-white font-outfit rounded-3xl uppercase text-sm font-medium tracking-wider before:content-[''] before:absolute before:-z-[1] before:left-0 before:top-0 before:w-full before:h-full before:bg-themeGradient before:opacity-0 hover:before:opacity-20 before:transition-all before:ease-linear before:duration-100 after:content-[''] after:absolute after:top-1/2 after:right-[20px] after:-translate-y-1/2 after:bg-white after:w-[5px] after:h-[5px] after:rounded-full after:transition-all after:duration-[60ms] hover:after:opacity-40 hover:after:scale-[2.7]" href="/#contact"><span className="block relative text-transparent before:content-[attr(data-text)] before:absolute before:top-0 before:left-0 before:opacity-100 before:text-white before:transition-all before:ease-out before:duration-200 group-hover:before:-top-full group-hover:before:opacity-0 after:content-[attr(data-text)] after:absolute after:top-full after:left-0 after:opacity-0 after:text-white after:transition-all after:ease-out after:duration-200 group-hover:after:top-0 group-hover:after:opacity-100" data-text="Let's Talk">Let&apos;s Talk</span></Link></li>
            <li className="list-none inline-block"><button data-mone-menu type="button" aria-label="Open navigation menu" aria-expanded={isMenuOpen} onClick={()=>setIsMenuOpen(v=>!v)} className="inline-block relative z-[1] overflow-hidden cursor-pointer group px-5 py-2.5 pr-[34px] bg-white text-black font-outfit rounded-3xl uppercase text-sm font-medium tracking-wider after:content-[''] after:absolute after:top-1/2 after:right-[20px] after:-translate-y-1/2 after:bg-black after:w-[5px] after:h-[5px] after:rounded-full after:transition-all after:duration-[60ms] hover:after:opacity-40 hover:after:scale-[2.7]"><span className="block relative text-transparent before:content-[attr(data-text)] before:absolute before:top-0 before:left-0 before:opacity-100 before:text-black before:transition-all before:ease-out before:duration-200 group-hover:before:-top-full group-hover:before:opacity-0 after:content-[attr(data-text)] after:absolute after:top-full after:left-0 after:opacity-0 after:text-black after:transition-all after:ease-out after:duration-200 group-hover:after:top-0 group-hover:after:opacity-100" data-text="Menu">Menu</span></button></li>
          </ul></div>
          <nav ref={menuRef} aria-label="Mone navigation" className={`nav-box absolute overflow-hidden invisible opacity-0 translate-y-[5px] top-[60px] right-0 bg-white/10 px-7 py-6 min-w-[250px] rounded-lg font-outfit text-xl backdrop-blur transition-all ease-linear duration-100 before:content-[''] before:absolute before:-z-[1] before:left-0 before:top-0 before:w-full before:h-full before:bg-themeGradient before:opacity-30 ${isMenuOpen?"show":""}`}>
            <ul className="space-y-[10px]">
              {navLinks.map(item=><li key={item.url} className="list-none"><Link href={item.url} onClick={()=>setIsMenuOpen(false)} className="text-white block relative hover:pl-[26px] transition-all ease-out duration-300 group"><i className="bi bi-arrow-right absolute top-1/2 left-0 -translate-y-1/2 opacity-0 invisible transition-all ease-linear duration-100 group-hover:opacity-100 group-hover:visible" />{item.title}</Link></li>)}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

function MoneHero(){
  return <div id="about" className="py-24 md:py-28 xl:py-32 text-center"><h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-outfit font-bold stroke-text">Nebiyu Mekonnen</h1></div>;
}

function MoneAbout(){
  const built=projects.filter(p=>p.status==="Built"||p.status==="Production").length;
  return (
    <div className="lg:flex space-y-8 lg:space-y-0">
      <div className="w-full lg:w-1/3 lg:order-2 text-center">
        <Image src={assetUrl("/assets/profile/nebiyu_primary_portrait.png")} alt="Nebiyu Mekonnen portrait" width={320} height={320} priority className="inline-block w-[240px] h-[240px] md:w-[270px] md:h-[270px] xl:w-[320px] xl:h-[320px] rounded-full object-cover" />
      </div>
      <div className="w-full lg:w-1/3 lg:order-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6 lg:gap-8">
        <div><h6 className="font-outfit font-medium tracking-wider uppercase text-sm text-white mb-2">Biography</h6><p className="text-white/70 leading-[1.75]">{profile.intro}</p></div>
        <div><h6 className="font-outfit font-medium tracking-wider uppercase text-sm text-white mb-2">Skills</h6><ul className="text-white/70">{skills.map((item,index)=><li key={item} className={index===0?"list-none inline-block pr-[4px]":"list-none inline-block relative pl-[14px] pr-[4px] before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[5px] before:h-[5px] before:rounded-md before:bg-white/80"}>{item}</li>)}</ul></div>
        <div><h6 className="font-outfit font-medium tracking-wider uppercase text-sm text-white mb-2">Connect</h6><ul className="space-x-1">
          {[{url:siteConfig.github,bootstrapIcon:"bi bi-github"},...(siteConfig.linkedin?[{url:siteConfig.linkedin,bootstrapIcon:"bi bi-linkedin"}]:[]),{url:siteConfig.credly,bootstrapIcon:"bi bi-award"}].map((item)=><li className="list-none inline-block" key={item.url}>
            <a className="inline-block group w-[44px] h-[44px] rounded-full bg-white/15 text-white relative z-[1] overflow-hidden before:content-[''] before:absolute before:-z-[1] before:left-0 before:top-0 before:w-full before:h-full before:bg-themeGradient before:opacity-0 hover:before:opacity-20 before:transition-all before:ease-linear before:duration-100" href={item.url} aria-label={item.bootstrapIcon.includes("github")?"GitHub":item.bootstrapIcon.includes("linkedin")?"LinkedIn":"Credly"} target="_blank" rel="noopener noreferrer"><i className={`${item.bootstrapIcon} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ease-out duration-200 group-hover:top-0 group-hover:invisible group-hover:opacity-0`} /><i className={`${item.bootstrapIcon} absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ease-out duration-200 invisible opacity-0 group-hover:top-1/2 group-hover:visible group-hover:opacity-100`} /></a>
          </li>)}
        </ul></div>
      </div>
      <div className="w-full lg:w-1/3 order-3 grid grid-cols-3 lg:grid-cols-1 gap-6 lg:gap-7 lg:text-right">
        <div><h6 className="font-outfit font-medium tracking-wider uppercase text-sm text-white mb-2">Projects Documented</h6><span className="text-4xl lg:text-5xl xl:text-6xl font-outfit font-light text-white">{projects.length}</span></div>
        <div><h6 className="font-outfit font-medium tracking-wider uppercase text-sm text-white mb-2">Built & Production</h6><span className="text-4xl lg:text-5xl xl:text-6xl font-outfit font-light text-white">{built}</span></div>
        <div><h6 className="font-outfit font-medium tracking-wider uppercase text-sm text-white mb-2">Credentials</h6><span className="text-4xl lg:text-5xl xl:text-6xl font-outfit font-light text-white">{credentials.length}</span></div>
      </div>
    </div>
  );
}

function MoneSectionHeading({label,heading,accent,description}:{label:string;heading:string;accent:string;description?:string}){
  return <><h6 className="pl-[20px] relative font-outfit font-medium text-sm uppercase tracking-wider text-white/40 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[12px] before:h-[12px] before:rounded-full before:border-2 before:border-white/30">{label}</h6><h2 className="font-outfit font-medium text-4xl md:text-5xl lg:text-6xl text-white mt-2">{heading} <span className="bg-themeGradient bg-clip-text text-transparent">{accent}</span></h2>{description&&<p className="leading-[1.75] text-white/70 mt-3">{description}</p>}</>;
}

function MoneServices(){
  return <div id="services" className="w-full lg:flex py-24 xl:py-28 space-y-6 lg:space-y-0">
    <div className="w-full lg:w-1/3"><MoneSectionHeading label="Services" heading="What I" accent="Do"/></div>
    <div className="w-full lg:w-2/3 space-y-6">
      {specialties.map(item=><div key={item.number} className="z-[1] p-8 space-y-3 md:space-y-0 md:flex md:items-center bg-darkBg rounded-lg relative overflow-hidden before:content-[''] before:absolute before:-z-[1] before:left-0 before:top-0 before:w-full before:h-full before:bg-themeGradient before:opacity-0 hover:before:opacity-10 before:transition-all before:ease-linear before:duration-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-themeGradient">
        <div className="md:w-[15%] text-white"><span className="font-outfit text-2xl xl:text-3xl font-medium">{item.number}/</span></div>
        <div className="md:w-[40%] text-white"><i className={`${item.bootstrapIcon} text-3xl`} /><h3 className="inline-flex pl-3 font-outfit font-medium text-2xl xl:text-3xl">{item.title}</h3></div>
        <div className="md:w-[45%]"><p className="text-white/70">{item.description}</p></div>
      </div>)}
    </div>
  </div>;
}

function MonePlatforms(){
  return <div className="clients-slider pb-24 xl:pb-28">
    <Swiper slidesPerView={2} spaceBetween={24} breakpoints={{640:{slidesPerView:3,spaceBetween:24},768:{slidesPerView:4,spaceBetween:30},1024:{slidesPerView:5,spaceBetween:50}}} className="swiper">
      {platforms.map(platform=><SwiperSlide key={platform}><div className="opacity-65 hover:opacity-100 transition ease-out duration-100 flex items-center justify-center h-[100px]"><span className="font-outfit font-medium text-2xl tracking-wide text-white">{platform}</span></div></SwiperSlide>)}
    </Swiper>
  </div>;
}

function MonePortfolio(){
  const sliderRef=useRef<SwiperType|null>(null);
  return <div id="portfolio" className="px-5 lg:px-10">
    <div className="bg-darkBg rounded-2xl overflow-hidden py-20">
      <div className="container mx-auto max-w-[1320px] px-5">
        <div className="md:w-4/5 lg:w-3/4 md:mx-auto">
          <MoneSectionHeading label="Portfolio" heading="Recent" accent="Works" description="Full-stack software, cloud systems, and engineering platforms—documented through real project work." />
          <div className="space-x-1 mt-6">
            {(["prev","next"] as const).map(direction=><button key={direction} type="button" onClick={()=>direction==="prev"?sliderRef.current?.slidePrev():sliderRef.current?.slideNext()} aria-label={direction==="prev"?"Previous project":"Next project"} className="inline-block group w-[50px] h-[50px] rounded-full cursor-pointer bg-white/15 text-white relative z-[1] overflow-hidden before:content-[''] before:absolute before:-z-[1] before:left-0 before:top-0 before:w-full before:h-full before:bg-themeGradient before:opacity-0 hover:before:opacity-20 before:transition-all before:ease-linear before:duration-100 cursor-link">
              <i className={`bi bi-arrow-${direction==="prev"?"left":"right"} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ease-out duration-200 group-hover:top-0 group-hover:invisible group-hover:opacity-0`} /><i className={`bi bi-arrow-${direction==="prev"?"left":"right"} absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ease-out duration-200 invisible opacity-0 group-hover:top-1/2 group-hover:visible group-hover:opacity-100`}/>
            </button>)}
          </div>
        </div>
        <Swiper onSwiper={swiper=>{sliderRef.current=swiper;}} slidesPerView={1} spaceBetween={30} breakpoints={{640:{slidesPerView:1,spaceBetween:30},768:{slidesPerView:2,spaceBetween:30},1024:{slidesPerView:2,spaceBetween:50}}} className="swiper portfolio-slider overflow-visible mt-6 xl:mt-14">
          {projects.map(project=><SwiperSlide key={project.slug}><div className="group/portfolio-box">
            <div className="overflow-hidden relative rounded-2xl">
              <Link href={`/projects/${project.slug}`} className="group block relative before:content-[''] before:z-[1] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-themeGradient before:opacity-0 hover:before:opacity-10 before:transition-all before:ease-linear before:duration-100">
                <Image src={assetUrl(portfolioArt[project.slug] || "/assets/projects/Visual-Tizita-events-poster.png")} alt={project.thumbnailAlt} width={630} height={393} className="w-full aspect-[630/393] object-contain bg-black/30 group-hover:scale-105 transition ease-custom duration-500"/>
              </Link>
            </div>
            <div className="pt-6"><ul className="text-white font-outfit font-medium uppercase text-sm tracking-wider">
              {project.category.slice(0,3).map((category,index)=><li key={category} className={index===0?"list-none inline-block leading-none pr-[4px]":"list-none inline-block leading-none relative pl-[14px] pr-[4px] before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[5px] before:h-[5px] before:rounded-md before:bg-white/80"}><Link className="inline-block overflow-hidden" href={`/projects/${project.slug}`}>{category}</Link></li>)}
            </ul><div className="mt-2"><h2 className="relative font-outfit font-medium text-3xl"><Link className="text-white group-hover/portfolio-box:pl-[44px] transition-all ease-out duration-200" href={`/projects/${project.slug}`}><span className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover/portfolio-box:opacity-100 group-hover/portfolio-box:-translate-x-0 transition duration-100"><i className="bi bi-arrow-right"/></span>{project.name}</Link></h2></div></div>
          </div></SwiperSlide>)}
        </Swiper>
        <div className="mt-8 text-center"><Link href="/projects" className="font-outfit text-white/70 hover:text-white underline underline-offset-8">View all projects <i className="bi bi-arrow-up-right"/></Link></div>
      </div>
    </div>
  </div>;
}

function MoneAwards(){
  return <div id="awards" className="container max-w-[1320px] mx-auto px-5 md:px-10 xl:px-5 pt-24 xl:pt-28">
    <div className="w-full lg:flex space-y-6 lg:space-y-0">
      <div className="w-full lg:w-1/3"><MoneSectionHeading label="Credentials" heading="Training &" accent="Awards"/></div>
      <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
        {credentials.filter(c=>c.featured).slice(0,6).map(c=><div key={c.name} className="z-[1] p-8 space-y-1.5 bg-darkBg rounded-lg relative overflow-hidden before:content-[''] before:absolute before:-z-[1] before:left-0 before:top-0 before:w-full before:h-full before:bg-themeGradient before:opacity-0 hover:before:opacity-10 before:transition-all before:ease-linear before:duration-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-themeGradient">
          <h4 className="font-outfit font-medium text-white text-2xl">{c.name}</h4><h6 className="block font-outfit font-medium uppercase text-sm tracking-wider text-white/40">{c.dateEarned||c.category}</h6><p className="text-white/70">{c.issuer}</p>
        </div>)}
      </div>
    </div>
  </div>;
}

function MoneJournal(){
  const sliderRef=useRef<SwiperType|null>(null);
  return <div id="blog" className="px-5 lg:px-10 mt-24 xl:mt-28">
    <div className="bg-darkBg rounded-2xl overflow-hidden py-20">
      <div className="container mx-auto max-w-[1320px] px-5">
        <div className="md:w-4/5 lg:w-3/4 md:mx-auto">
          <MoneSectionHeading label="Journal" heading="Project" accent="Stories" description="A closer look at the challenges, technical decisions, and results behind my work."/>
          <div className="space-x-1 mt-6">
            {(["prev","next"] as const).map(direction=><button key={direction} type="button" aria-label={direction==="prev"?"Previous case study":"Next case study"} onClick={()=>direction==="prev"?sliderRef.current?.slidePrev():sliderRef.current?.slideNext()} className="inline-block group w-[50px] h-[50px] rounded-full cursor-pointer bg-white/15 text-white relative z-[1] overflow-hidden before:content-[''] before:absolute before:-z-[1] before:left-0 before:top-0 before:w-full before:h-full before:bg-themeGradient before:opacity-0 hover:before:opacity-20 before:transition-all before:ease-linear before:duration-100">
              <i className={`bi bi-arrow-${direction==="prev"?"left":"right"} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}/>
            </button>)}
          </div>
        </div>
        <Swiper onSwiper={swiper=>{sliderRef.current=swiper;}} slidesPerView={1} spaceBetween={30} breakpoints={{640:{slidesPerView:1,spaceBetween:30},768:{slidesPerView:2,spaceBetween:30},1024:{slidesPerView:2,spaceBetween:50}}} className="blog-slider overflow-visible mt-6 xl:mt-14">
          {projects.slice(0,4).map(project=><SwiperSlide key={project.slug}><div className="group/blog-box">
            <div className="overflow-hidden relative rounded-2xl"><Link href={`/projects/${project.slug}`} className="group block relative before:content-[''] before:z-[1] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-themeGradient before:opacity-0 hover:before:opacity-10 before:transition-all before:ease-linear before:duration-100">
              <Image src={assetUrl(portfolioArt[project.slug]||"/assets/projects/Visual-Tizita-events-poster.png")} alt={project.thumbnailAlt} width={630} height={393} className="w-full aspect-[630/393] object-contain bg-black/30 group-hover:scale-105 transition ease-custom duration-500"/>
              <div className="absolute top-4 right-4 z-[1] bg-black/20 rounded-3xl px-5 py-2.5 font-outfit font-medium uppercase text-sm tracking-wider text-white">{project.status}</div>
            </Link></div>
            <div className="pt-6"><ul className="text-white font-outfit font-medium uppercase text-sm tracking-wider"><li className="list-none inline-block leading-none pr-[4px]">{project.category[0]}</li><li className="list-none inline-block leading-none relative pl-[14px] pr-[4px] before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[5px] before:h-[5px] before:rounded-md before:bg-white/80">Case Study</li></ul>
              <div className="mt-2"><h2 className="relative font-outfit font-medium text-3xl"><Link className="text-white group-hover/blog-box:pl-[44px] transition-all ease-out duration-200" href={`/projects/${project.slug}`}><span className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover/blog-box:opacity-100 group-hover/blog-box:-translate-x-0 transition duration-100"><i className="bi bi-arrow-right"/></span>{project.name}</Link></h2></div>
            </div>
          </div></SwiperSlide>)}
        </Swiper>
      </div>
    </div>
  </div>;
}

function MoneContact(){
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [subject,setSubject]=useState("");
  const [message,setMessage]=useState("");
  const submit=(event:React.FormEvent)=>{event.preventDefault();if(!siteConfig.email)return;const body=`From: ${name} (${email})\n\n${message}`;window.location.href=`mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;};
  return <div id="contact" className="container max-w-[1320px] mx-auto px-5 md:px-10 xl:px-5 pt-24 xl:pt-28">
    <div className="w-full lg:flex space-y-6 lg:space-y-0">
      <div className="w-full lg:w-1/3"><MoneSectionHeading label="Contact" heading="Let's" accent="Talk"/></div>
      <div className="w-full lg:w-2/3">
        <div className="flex flex-wrap gap-6"><div className="w-full sm:w-1/2"><h6 className="font-outfit font-medium uppercase text-sm tracking-wider text-white mb-2">Email:</h6><a href={`mailto:${siteConfig.email||""}`} className="font-outfit font-medium text-xl lg:text-2xl text-white break-all">{siteConfig.email}</a></div></div>
        <div className="mt-8 lg:text-right"><form className="space-y-4" onSubmit={submit}>
          <div className="flex space-x-4"><div className="w-1/2"><input className="w-full bg-darkBg px-5 py-4 rounded-lg placeholder:text-white/40 text-white/70 focus:outline-none" type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required/></div><div className="w-1/2"><input className="w-full bg-darkBg px-5 py-4 rounded-lg placeholder:text-white/40 text-white/70 focus:outline-none" type="email" placeholder="E-Mail" value={email} onChange={e=>setEmail(e.target.value)} required/></div></div>
          <input className="w-full bg-darkBg px-5 py-4 rounded-lg placeholder:text-white/40 text-white/70 focus:outline-none" type="text" placeholder="Subject" value={subject} onChange={e=>setSubject(e.target.value)} required/>
          <textarea className="w-full bg-darkBg px-5 py-4 rounded-lg placeholder:text-white/40 text-white/70 h-[160px] focus:outline-none" placeholder="Message" value={message} onChange={e=>setMessage(e.target.value)} required/>
          <button type="submit" className="inline-block relative group overflow-hidden bg-white/15 px-7 py-3 pr-11 rounded-3xl font-outfit font-medium uppercase text-sm tracking-wider text-white before:content-[''] before:absolute before:-z-[1] before:left-0 before:top-0 before:w-full before:h-full before:bg-themeGradient before:opacity-0 hover:before:opacity-20 before:transition-all before:ease-linear before:duration-100 after:content-[''] after:absolute after:top-1/2 after:right-[28px] after:-translate-y-1/2 after:bg-white after:w-[5px] after:h-[5px] after:rounded-full after:transition-all after:duration-[60ms] hover:after:opacity-40 hover:after:scale-[2.7]"><span className="block relative text-transparent before:content-[attr(data-text)] before:absolute before:top-0 before:left-0 before:opacity-100 before:text-white before:transition-all before:ease-out before:duration-200 group-hover:before:-top-full group-hover:before:opacity-0 after:content-[attr(data-text)] after:absolute after:top-full after:left-0 after:opacity-0 after:text-white after:transition-all after:ease-out after:duration-200 group-hover:after:top-0 group-hover:after:opacity-100" data-text="Send Message">Send Message</span></button>
        </form><p className="text-white/40 text-sm mt-4">This opens your email app with your message; it does not send automatically.</p></div>
      </div>
    </div>
  </div>;
}

function MoneScrollToTop(){
  const [visible,setVisible]=useState(false);
  useEffect(()=>{const onScroll=()=>setVisible(window.scrollY>700);window.addEventListener("scroll",onScroll);return ()=>window.removeEventListener("scroll",onScroll);},[]);
  return <button type="button" aria-label="Scroll to top" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} className={`scrolltotop fixed right-5 bottom-5 xl:right-10 invisible opacity-0 translate-y-5 backdrop-blur transition-all ease-out duration-[120ms] cursor-pointer inline-block group w-[50px] h-[50px] rounded-full bg-white/15 text-white z-[51] overflow-hidden before:content-[''] before:absolute before:-z-[1] before:left-0 before:top-0 before:w-full before:h-full before:bg-themeGradient before:opacity-0 hover:before:opacity-20 before:transition-all before:ease-linear before:duration-100 ${visible?"show":""}`}><i className="bi bi-arrow-up absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/></button>;
}

export function MoneOriginal(){
  return <div className={`mone-original ${outfit.variable} ${openSans.variable} bg-black text-white font-opensans overflow-x-hidden`}>
    <MoneHeader/>
    <div className="container mx-auto max-w-[1320px] px-5 md:px-10 xl:px-5">
      <MoneHero/><MoneAbout/><MoneServices/><MonePlatforms/>
    </div>
    <MonePortfolio/>
    <MoneAwards/>
    <MoneJournal/>
    <MoneContact/>
    <footer className="container text-center px-5 py-9 xl:py-10"><p className="text-white/70">&copy; {new Date().getFullYear()} Nebiyu Mekonnen. All rights reserved.</p></footer>
    <MoneScrollToTop/>
  </div>;
}
