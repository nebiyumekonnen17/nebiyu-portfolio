# Claude Build Prompt

You are the lead product designer and senior full stack engineer building the personal portfolio website for Nebiyu Mekonnen.

Read every file in this starter kit before coding.

The main visual reference is:

`01_REFERENCE_UI/homepage_primary_reference.png`

The source of truth for product requirements is:

`05_CONTENT/PORTFOLIO_MASTER_PLAN.md`

The writing rules are:

`05_CONTENT/CONTENT_AND_WRITING_RULES.md`

The structured content seed is:

`05_CONTENT/site_content.json`

## Mission

Build a polished recruiter friendly portfolio that makes Nebiyu's work easy to understand quickly, while allowing deeper technical exploration through individual project pages and a dedicated AWS page.

Do not build a generic developer portfolio.

The homepage must remain simple to scan.

Every project card must be clickable and open a project detail page.

Use real supplied assets.

Use the real portrait.

Use supplied project thumbnails.

Use supplied credential screenshots and certificates as reference.

Do not invent missing information.

## Required routes

`/`
`/projects`
`/projects/degissnap`
`/projects/naep`
`/projects/nehas-digital-signage`
`/projects/fsss-limat-pos`
`/projects/tibeb-market`
`/projects/aradacart`
`/aws`
`/skills`
`/credentials`
`/about`

Add resume and contact destinations in a way that can be configured when the real resume, email, and LinkedIn are supplied.

## Homepage priorities

1. Clear hero with Nebiyu's real portrait
2. Strong AWS positioning
3. Featured projects
4. AWS in Practice
5. Skills in Practice
6. Verified credentials
7. About and contact
8. Fast recruiter understanding

## Project detail priorities

Project hero  
Quick overview  
Problem  
Solution  
My contribution  
Key features  
Technology  
Architecture  
Screenshots  
Engineering challenges  
Results and evidence  
Lessons  
Related credentials  
Verified links

Do not overload the homepage with these details.

## AWS priorities

DegisSnap is the strongest production AWS case study.

Explain real AWS usage through actual engineering work.

Nehas Digital Signage is a new AWS native platform in active build or architecture.

Keep planned and production work clearly separated.

## Interaction rules

Entire project cards are clickable.

Buttons inside cards must remain accessible.

Only render Live Project or Repository buttons when a verified URL exists.

Do not fake dead links.

Use clear hover, keyboard focus, and touch states.

Project detail pages should include previous, all projects, and next navigation.

## Content rules

Public copy must sound human.

Avoid em dash.

Avoid unnecessary hyphens in prose.

Do not use generic AI generated marketing language.

Do not invent claims.

Use short paragraphs.

Use specific project evidence.

## Quality gates

Before completion:

Run lint  
Run type checks  
Run production build  
Check responsive layouts  
Check keyboard navigation  
Check color contrast  
Check images and alt text  
Check all routes  
Check all links  
Confirm no invented content  
Confirm project status labels are honest  
Confirm AWS production claims only apply where verified

Document final setup and deployment instructions in README.
