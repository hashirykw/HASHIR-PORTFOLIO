/* Hashir AI: the assistant's knowledge and matching engine. Loaded the first time the chat opens. */
(() => {
'use strict';
const PROJECTS = [{"n": "Wrappi", "t": "Client site", "c": "Business & services", "g": "live", "d": "PPF, colour wrap and ceramic coating studio in Oslo, with the whole site in Norwegian and English.", "u": "https://wrappingartdesign.no", "l": "logo-wrappi.webp"}, {"n": "Sir Xahid Anwar", "t": "Client site", "c": "Education", "g": "live", "d": "O Level and IGCSE English site with a student portal, past papers in a timed exam mode and AI essay checking.", "u": "https://englishwithsxa.com", "l": "logo-xahid.webp"}, {"n": "Cambridge Online", "t": "Client site", "c": "Education", "g": "live", "d": "Multi-page site for an O Level, IGCSE and A Level online academy, with faculty listings, courses, campuses and its own admin panel.", "u": "https://cambridgeonline.tech", "l": "logo-cambridge.webp"}, {"n": "The Verzish.com", "t": "Demo", "c": "Fitness & martial arts", "g": "demo", "d": "Parent site for three unisex gyms in Karachi, opening on a preloader where the hero reel plays inside giant letters before diving into the page.", "u": "https://verzish.nexlyr.solutions", "l": "logo-verzish.webp"}, {"n": "The Fit Monster", "t": "Demo", "c": "Fitness & martial arts", "g": "demo", "d": "Premium gym in Nazimabad with Hammer Strength kit, a 3D tour of the floor and hours that run till 4 AM.", "u": "https://fit-monster.nexlyr.solutions", "l": "logo-fit-monster.webp"}, {"n": "Physics with SMK", "t": "Client site", "c": "Education", "g": "live", "d": "Physics tuition platform for Sir Mehboob Khan with student logins, topical past papers, practice questions and video lectures.", "u": "https://physicswithsmk.com", "l": "logo-smk.webp"}, {"n": "14th Street Pizza Co.", "t": "Demo", "c": "Food & cafés", "g": "demo", "d": "Concept site for a sixteen-branch pizza chain: Xtreme double-deckers, midnight deals and a live branch map.", "u": "https://14-street-pizza.nexlyr.solutions", "l": "logo-14th-street.webp"}, {"n": "Vision Properties", "t": "Demo", "c": "Business & services", "g": "demo", "d": "Real estate marketing for apartments, plots and commercial projects across Karachi, from DHA Phase VIII to the M-9.", "u": "https://vision-property.nexlyr.solutions", "l": "logo-vision.webp"}, {"n": "SolarScape Solutions", "t": "Demo", "c": "Business & services", "g": "demo", "d": "Solar installation, net metering and after-sales care for industry, business and homes, from a FOX ESS Gold Distributor.", "u": "https://solar-scape.nexlyr.solutions", "l": "logo-solarscape.webp"}, {"n": "Evessé by Dr. Faria", "t": "Demo", "c": "Business & services", "g": "demo", "d": "Dermatology-led skin, hair and aesthetic clinic by Dr. Faria Khan, with two branches in Karachi.", "u": "https://evesse.nexlyr.solutions", "l": "logo-evesse.webp"}, {"n": "Markaz OUJ Performance", "t": "Client site", "c": "Fitness & martial arts", "g": "live", "d": "Multi-page site for a Karachi sports and fitness company, covering its martial arts academy, store and a custom chat assistant.", "u": "https://markaz-ouj.com", "l": "logo-markaz.webp"}, {"n": "Revolution MMA", "t": "Client site", "c": "Fitness & martial arts", "g": "live", "d": "MMA and Brazilian Jiu-Jitsu academy across DHA Phase 6 and North Nazimabad, with an interactive 3D centrepiece and free trials on WhatsApp.", "u": "https://revolution.com.pk", "l": "logo-revolution.webp"}, {"n": "Legacive Barber Studio", "t": "Demo", "c": "Business & services", "g": "demo", "d": "Appointment-only barber studio in Uxbridge, Ontario: skin fades, hair designs and beard work, booked online.", "u": "https://legacive-barberstudio.nexlyr.solutions", "l": "logo-legacive.webp"}, {"n": "Desi Sawad", "t": "Demo", "c": "Food & cafés", "g": "demo", "d": "Pakistani restaurant in Riyadh, with karahi, biryani and seekh kebab on the menu and the hours up front.", "u": "https://desi-sawad.nexlyr.solutions", "l": "logo-desi-sawad.webp"}, {"n": "Sir Osama Musani", "t": "Demo", "c": "Education", "g": "demo", "d": "Business site for O Level, IGCSE and A Level, taught through live campaigns, with case files, past papers and a student portal.", "u": "https://osama-musani.nexlyr.solutions", "l": "logo-osama.webp"}, {"n": "Sir Yawar Abbas", "t": "Demo", "c": "Education", "g": "demo", "d": "Physics site for O Level, IGCSE and A Level, with a syllabus tracker, past papers, a Physics Lab and a student portal.", "u": "https://sir-yahwar-abbas.nexlyr.solutions", "l": "logo-yawar.webp"}, {"n": "Maths With SB", "t": "Demo", "c": "Education", "g": "demo", "d": "O and A Level Mathematics site for Sir Saud Barlas, built as an installable app that works offline, with past papers linked by year.", "u": "https://saud.barlas.nexlyr.solutions", "l": "logo-sb.webp"}, {"n": "Cafe Shafe", "t": "Client site", "c": "Food & cafés", "g": "live", "d": "Rooftop chai café in North Nazimabad with nine chais, twenty parathas and a menu that reads in one hand.", "u": "https://cafe-shafe.vercel.app", "l": "logo-cafe-shafe.webp"}, {"n": "Grub Coffee Co.", "t": "Demo", "c": "Food & cafés", "g": "demo", "d": "Site for a North Nazimabad coffee shop, with a cinematic hero, full drinks menu, brew-process story and photo gallery.", "u": "https://grub.nexlyr.solutions", "l": "logo-grub.webp"}, {"n": "Hakuna Matata", "t": "Demo", "c": "Food & cafés", "g": "demo", "d": "Loaded fries, zinger and broast deals, with delivery one tap away.", "u": "https://hakuna-matata.nexlyr.solutions", "l": "logo-hakuna.webp"}, {"n": "Nexlyr Solutions", "t": "Agency", "c": "Business & services", "g": "live", "d": "Ten-page agency site with a Three.js globe hero, glass interface, a Supabase leads system and its own admin dashboard.", "u": "https://nexlyr.solutions", "l": "nexlyr-logo.svg"}, {"n": "SAZ Chemistry", "t": "Client site", "c": "Education", "g": "live", "d": "Chemistry tuition site for Sir Suhail Aziz, with syllabus pages for 9701, 5070 and 0620, a study toolkit and explainer videos.", "u": "https://sohail-aziz.vercel.app", "l": "logo-saz.webp"}, {"n": "Karachi Public High School", "t": "Client site", "c": "Education", "g": "live", "d": "Site for a North Nazimabad school running from Montessori to Matric, covering its labs, faculty, admissions and a built-in assistant.", "u": "https://kphs.vercel.app", "l": "logo-kphs.webp"}, {"n": "InfiniMind Academy", "t": "EdTech platform", "c": "Education", "g": "live", "d": "Online platform where children learn AI and coding.", "u": "https://infinimind.vercel.app", "l": "logo-infinimind.svg"}, {"n": "Apexify", "t": "SaaS", "g": "software", "d": "SaaS app where people log their health updates and track their progress.", "u": "https://hashirykw.github.io/Apexiffy/", "l": "logo-apexify.webp"}, {"n": "Lotus Enterprise", "t": "Business software", "g": "software", "d": "Auto parts management system for running stock, orders and customers, with its own user guide.", "u": "https://lotus-one-orpin.vercel.app", "l": ""}, {"n": "AlphaEdge", "t": "Trading tool", "g": "software", "d": "Trading signals dashboard for PSX and forex.", "u": "https://alphaedge-five.vercel.app", "l": ""}, {"n": "YKW Calculator", "t": "Web app", "g": "software", "d": "Scientific calculator built for the browser.", "u": "https://hashirykw.github.io/YKW-Calculator/", "l": ""}, {"n": "Lotus User Guide", "t": "Documentation", "g": "software", "d": "Written and built the user guide for Lotus Enterprise.", "u": "https://lotus-user-guide.vercel.app", "l": ""}, {"n": "Sir MAK Computer Science", "t": "Demo", "c": "Education", "g": "demo", "d": "Eight-page site for an O and A Level Computer Science teacher, with a syllabus tracker, past-paper timer, interactive CS lab and a notes store.", "u": "https://sirmak.vercel.app", "l": "logo-mak.webp"}, {"n": "The Caspian College", "t": "Demo", "c": "Education", "g": "demo", "d": "Detailed responsive site for an intermediate science and commerce college in Karachi.", "u": "https://caspian-college.vercel.app", "l": "logo-caspian.webp"}, {"n": "Karachi Taekwondo Academy", "t": "Demo", "c": "Fitness & martial arts", "g": "demo", "d": "Academy site with real class details, light and dark modes and glass cards.", "u": "https://karachi-taekwondo-academy.vercel.app", "l": "logo-kta.webp"}, {"n": "SAFE Academy", "t": "Demo", "c": "Fitness & martial arts", "g": "demo", "d": "Demo for an Islamabad taekwondo academy, with a draggable 3D model that explains the belt levels.", "u": "https://safe-taekwondo-academy.vercel.app", "l": "logo-safe.webp"}, {"n": "English with Anna Malik", "t": "Demo", "c": "Education", "g": "demo", "d": "Site for an O Level and A Level English Language teacher in Karachi.", "u": "https://miss-anna-malik.vercel.app", "l": ""}, {"n": "FurEver Care", "t": "Competition build", "c": "Business & services", "g": "demo", "d": "Pet care site built for the TechWiz 6 competition, with scroll-choreographed interactions and offline support.", "u": "https://undefined", "l": ""}];

/* ───────── who, what, how: everything the assistant knows ───────── */
const WA = '923322483233';
const wa = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const A = (href, text, ext) => `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`;
const waBtn = (text, label = 'Message Hashir on WhatsApp') => `<a class="msg-cta" href="${wa(text)}" target="_blank" rel="noopener">${label} ↗</a>`;
const ul = items => '<ul>' + items.map(i => `<li>${i}</li>`).join('') + '</ul>';

const CATS = {
  edu:  { label:'Education',              cat:'Education',              words:['school','schools','teacher','teachers','tutor','tuition','academy','academies','education','college','coaching','o level','a level','igcse','lms','portal','student','students','exam','past paper','madrasa','institute'] },
  fit:  { label:'Fitness & martial arts', cat:'Fitness & martial arts', words:['gym','gyms','fitness','mma','martial','taekwondo','karate','boxing','sports','trainer','crossfit','yoga'] },
  food: { label:'Food & cafés',           cat:'Food & cafés',           words:['restaurant','restaurants','cafe','cafes','café','coffee','pizza','biryani','food','burger','bakery','dhaba','kitchen','menu','hotel','catering','fries'] },
  biz:  { label:'Business & services',    cat:'Business & services',    words:['business','clinic','salon','barber','spa','real estate','property','properties','solar','agency','company','brand','wrap','car','skin','aesthetic','store','shop','ecommerce','e-commerce','pet','vet'] },
  soft: { label:'Software & apps',        g:'software', words:['software','saas','app','apps','web app','dashboard','system','tool','calculator','inventory','management system','crm'] }
};

/* topics: id, trigger words (English + Roman Urdu), answer, next chips */
const T = [
  { id:'greet', w:['hi','hello','hey','salam','assalam','assalamualaikum','aoa','hola','yo','good morning','good evening','sup','kya hal','kaise ho'],
    a:() => `Hi! I'm <b>Hashir AI</b>, Hashir's assistant. I know his services, process, timelines, tools and every project on this site.<br><br>What are you working on?`,
    c:['Websites','Video editing','Branding','Social media','AI chatbots','Show me your work'] },

  { id:'bot', w:['who are you','are you human','are you real','are you ai','are you a bot','bot','robot','chatgpt','your name','tum kaun','aap kaun'],
    a:() => `I'm <b>Hashir AI</b>, an assistant built into this portfolio. I'm not Hashir himself, but I know his work, services and process. For anything personal, a quote or a deal, I'll pass you straight to Hashir on WhatsApp.`,
    c:['About Hashir','Services','Contact'] },

  { id:'about', w:['who is hashir','about hashir','about you','hashir','founder','owner','muhammad hashir','m hashir','hashirykw','who made','who built','background','bio','introduce'],
    a:() => `<b>Muhammad Hashir</b> (M. Hashir, hashirykw online) is a full web developer, motion graphics editor and generative AI expert, based in Karachi and working with clients worldwide.
      ${ul([
        'Founder of <b>Nexlyr Solutions</b>, a digital agency with <b>500+ projects</b> delivered for clients at home and abroad',
        'Founder of <b>Nexlyr InfiniMind Academy</b>, which teaches AI and coding to children',
        'Founder of <b>Nexlyr for Students</b> (coming soon): AI paper checking for O and A Level students',
        'Before Nexlyr: <b>100+ projects</b> through MHW Web Solutions and <b>55+ freelance clients</b>'
      ])}${A('/about','Read the full story')}`,
    c:['Experience','Nexlyr Solutions','Services','Show me your work'] },

  { id:'exp', w:['experience','career','worked','jobs','cv','resume','history','background','before nexlyr','previous'],
    a:() => `<b>Now</b>${ul(['Founder, Nexlyr Solutions','Founder, Nexlyr InfiniMind Academy','Founder, Nexlyr for Students (coming soon)'])}
      <b>Before</b>${ul(['Freelancer, 55+ clients','Head of Social Media at two companies','Head of Graphic Design for companies worldwide','Ran the platform Apexify (health tracking SaaS)','Ran two e-commerce stores','MHW Web Solutions: 100+ projects, the foundation Nexlyr was built on'])}`,
    c:['Skills & tools','Show me your work','Contact'] },

  { id:'nexlyr', w:['nexlyr','agency','nexlyr solutions','team','company','your agency','studio'],
    a:() => `<b>Nexlyr Solutions</b> is Hashir's digital agency: web development, brand identity, video editing and digital marketing under one roof, so a brand doesn't have to coordinate four suppliers.
      ${ul(['500+ projects delivered, local and international','Developers, editors and social media specialists on the team','Also builds AI chatbots, AI calling agents and sells NFC business cards'])}
      ${A('https://nexlyr.solutions','nexlyr.solutions',1)} · WhatsApp 0305 3687680 · Instagram @nexlyrsolutions`,
    c:['Services','AI chatbots','Education package','Contact'] },

  { id:'services', w:['services','what do you do','what can you do','offer','offering','help me with','kya karte','kaam','work do you do','capabilities'],
    a:() => `Here's everything Hashir and Nexlyr do:${ul([
      `<b>Web development</b>: custom sites, web apps, admin panels, portals, e-commerce (${A('/web-development','details')})`,
      `<b>Video editing</b>: promos, explainers, reels, brand idents, motion graphics, AI video (${A('/video-editing','details')})`,
      `<b>Graphic design</b>: logos, brand identity, social creatives, print (${A('/graphic-design','details')})`,
      `<b>Social media management</b>: strategy, content, posting, boosting and ads (${A('/social-media-marketing','details')})`,
      '<b>AI</b>: AI chatbots and AI calling agents for businesses',
      '<b>SEO</b>: basic, local and advanced',
      '<b>Education package</b>: portals, AI paper checking and more for teachers and academies',
      '<b>NFC business cards</b>'
    ])}Which one fits what you need?`,
    c:['Websites','Video editing','Branding','Social media','AI chatbots','Education package'] },

  { id:'web', w:['website','websites','web','site','landing page','web app','webapp','web development','developer','frontend','backend','full stack','admin panel','dashboard','portal','ecommerce','e-commerce','online store','shopify','wordpress','redesign','3d website','three.js','threejs','react','next.js','nextjs','html','css','javascript','supabase','web site banana','website chahiye','website banwani'],
    a:() => `Hashir builds websites <b>by hand</b>, no page builders: fast on phones, made to be found on Google, and easy to edit later.${ul([
      'Company and marketing sites, landing pages',
      'Web apps with logins, dashboards and admin panels',
      'Student and parent portals, booking and ordering systems',
      '3D and motion (Three.js, GSAP) where it actually helps',
      'Backends on Supabase, hosting on Vercel with your own domain and SSL'
    ])}<b>How it runs:</b> scope → you see real pages early → build → launch with analytics and a written guide so you can edit it yourself.<br>${A('/web-development','See web development')}`,
    c:['How long does a website take?','How much does a website cost?','Can I edit it myself?','Show me websites'] },

  { id:'video', w:['video','videos','edit','editing','editor','reel','reels','promo','explainer','motion','motion graphics','animation','after effects','premiere','youtube','shorts','tiktok video','ad video','ident','intro','logo animation','capcut','davinci','ugc','video banwani'],
    a:() => `Video editing and motion graphics:${ul([
      'Promos, explainers, reels and shorts',
      'Brand idents and logo animations',
      'Motion graphics that carry the message, legible with the sound off',
      'AI video with Veo 3, Google Flow, Higgsfield and Runway when it fits',
      'Exported for every place it runs: vertical for reels, landscape for YouTube and sites'
    ])}A single reel is usually <b>2 to 4 days</b>; an explainer with custom motion graphics about <b>a week</b>.<br>${A('/video-editing','See video editing')} · ${A('/#reels','Watch the reels')}`,
    c:['What do you need from me?','Can you match my style?','How much for a video?','AI video'] },

  { id:'design', w:['design','graphic','graphics','logo','logos','brand','branding','identity','brand identity','poster','posters','flyer','banner','print','visiting card','business card','packaging','social post','creative','photoshop','illustrator','figma','canva','rebrand'],
    a:() => `Graphic design and branding:${ul([
      'Logos and full brand identity',
      'Social media creatives and campaign posts',
      'Print: cards, flyers, banners and backdrops, set up print-ready',
      'Design inside an existing brand or style guide'
    ])}You get vector (SVG, PDF) and raster (PNG, JPG) files in every size, colour and type specs and a short usage guide, and <b>you own all of it</b>. Two rounds of revisions are included after a direction is picked.<br>${A('/graphic-design','See graphic design')} · ${A('/#design','See posters')}`,
    c:['How many revisions?','How much for a logo?','Show me brands you built for'] },

  { id:'social', w:['social media','social','instagram','facebook','tiktok','linkedin','content','posts','posting','marketing','digital marketing','ads','meta ads','boost','boosting','followers','engagement','smm','page management','grow my page','content calendar'],
    a:() => `Social media management, start to finish:${ul([
      '<b>Audit</b>: what the page posted, what worked, who it competes with',
      '<b>Formats</b>: 3 or 4 repeatable formats so the feed reads as one brand',
      '<b>Production and posting</b>: posts and reels made in-house and scheduled ahead',
      '<b>Review</b>: what moved, and what to change next month',
      'Boosting and paid ads on Meta when it makes sense'
    ])}Instagram first, plus Facebook, TikTok and LinkedIn where your audience is. Reach moves within weeks; followers and enquiries take longer, and no one honest promises otherwise.<br>${A('/social-media-marketing','See social media')}`,
    c:['Do you post too?','Which platforms?','How much for social media?'] },

  { id:'aibots', w:['chatbot','chat bot','ai chatbot','ai bot','whatsapp bot','calling agent','ai calling','voice agent','ai agent','automation','automate','ai for business','assistant like you','bot banwana'],
    a:() => `Yes, Nexlyr builds <b>AI chatbots</b> (for websites and WhatsApp) and <b>AI calling agents</b> that answer and make calls for a business.${ul([
      'Trained on your own services, prices and FAQs',
      'Hand off to a human when needed',
      'Lead capture straight to your WhatsApp or email'
    ])}Tell Hashir what you want it to handle and he'll scope it.${waBtn('Hi Hashir, I want an AI chatbot / calling agent for my business.')}`,
    c:['How much does a chatbot cost?','Websites','Contact'] },

  { id:'genai', w:['generative ai','gen ai','ai tools','ai expert','prompt','prompting','midjourney','veo','veo 3','higgsfield','runway','elevenlabs','suno','google flow','gemini','claude','ai video','ai images','ai voice','ai music','ai art','ai','artificial intelligence'],
    a:() => `Hashir is a generative AI expert and uses it across the work:${ul([
      '<b>Writing and code</b>: ChatGPT, Claude, Gemini, DeepSeek, Grok',
      '<b>Images</b>: Midjourney',
      '<b>Video</b>: Veo 3, Google Flow, Higgsfield, Runway, Luma',
      '<b>Voice and music</b>: ElevenLabs, Suno',
      '<b>Research</b>: Perplexity, NotebookLM, Google AI Studio'
    ])}That's how small teams get big-studio output: AI where it saves time, a human eye on every frame.`,
    c:['AI video','AI chatbots','Skills & tools'] },

  { id:'skills', w:['skills','tools','stack','tech stack','technologies','software you use','toolkit','what do you use','languages'],
    a:() => `The toolkit, 48 tools in three groups:${ul([
      '<b>Build</b>: HTML, CSS, JavaScript, TypeScript, Three.js, GSAP, React, Next.js, Node.js, Tailwind, Supabase, Vercel, Resend, GitHub, Playwright, VS Code',
      '<b>Design & motion</b>: After Effects, Premiere Pro, Blender, Photoshop, Illustrator, Figma, Canva, Lightroom, Adobe XD, DaVinci Resolve, CapCut, Adobe Animate, InDesign, Cinema 4D, Lottie, Framer',
      '<b>Generative AI</b>: ChatGPT, Claude, Gemini, Midjourney, Higgsfield, Veo 3, Google Flow, Runway, ElevenLabs, Suno, Luma, Perplexity, Grok, DeepSeek, AI Studio, NotebookLM'
    ])}${A('/#skills','See the toolkit')}`,
    c:['Websites','Video editing','Generative AI'] },

  { id:'edu', w:['education package','for teachers','for academies','academy package','lms','student portal','parent portal','attendance','paper checker','ai checking','ai marking','paper checking','notes protection','screenshot','live lectures','school software','school system','teacher website'],
    a:() => `Nexlyr's <b>education package</b> for teachers and academies, all features included at no extra cost:${ul([
      'Student portal and parent portal (attendance alerts and periodic reports)',
      'Screenshot-protected notes, traced to each student ID',
      'AI paper checker that improves from the teacher\'s own corrections',
      'Live lectures',
      'SEO (basic, local or advanced) and 3D design'
    ])}It's already running for teachers like Sir Xahid Anwar and Physics with SMK.${waBtn('Hi Hashir, I want the education package for my academy.')}`,
    c:['Show me education websites','Nexlyr for Students','Contact'] },

  { id:'students', w:['nexlyr for students','for students','paper checking app','o level students','a level students','check my paper','mark my paper'],
    a:() => `<b>Nexlyr for Students</b> is coming soon: AI paper checking for O and A Level students worldwide, marked the way Cambridge examiners mark, with feedback on what to fix. Follow ${A('https://www.instagram.com/nexlyrsolutions','@nexlyrsolutions',1)} for the launch.`,
    c:['Education package','About Hashir'] },

  { id:'infinimind', w:['infinimind','kids coding','children coding','ai for kids','coding for kids','academy for kids'],
    a:() => `<b>Nexlyr InfiniMind Academy</b> is Hashir's online platform teaching AI and coding to children. ${A('https://infinimind.vercel.app','Visit InfiniMind',1)}`,
    c:['About Hashir','Education package'] },

  { id:'seo', w:['seo','google ranking','rank','ranking','search engine','google search','local seo','google maps','google business','search console','first page'],
    a:() => `SEO comes in three levels: <b>basic</b> (clean structure, speed, meta tags, sitemap, Search Console), <b>local</b> (Google Business, location pages, local keywords) and <b>advanced</b> (content plans, schema, links, ongoing tracking). Every site Hashir launches gets the basics and analytics set up on day one.`,
    c:['Websites','How much for SEO?','Contact'] },

  { id:'nfc', w:['nfc','nfc card','smart card','digital business card','tap card'],
    a:() => `Yes, Nexlyr sells <b>NFC business cards</b>: tap the card on a phone and it opens your profile, links and contact details.${waBtn('Hi, I want NFC business cards.')}`,
    c:['Branding','Contact'] },

  { id:'price', w:['price','prices','pricing','cost','costs','charges','charge','rate','rates','budget','fee','fees','how much','quote','quotation','estimate','package','packages','cheap','affordable','expensive','kitna','kitne','kitni','paisay','paise','rupees','dollars','usd','pkr','kharcha'],
    a:ctx => {
      const s = ctx.service && SERVICE_NAMES[ctx.service];
      return `${s ? `For <b>${s}</b>, the` : 'The'} price depends on scope, so there's no fixed price list. You get a clear quote with the timeline <b>before</b> anything starts, and small starting points (one landing page, one logo, one month of content) are welcome.<br><br>Tell Hashir what you need and you'll usually hear back within the hour.${waBtn(`Hi Hashir, I'd like a quote${s ? ' for ' + s : ''}: `, 'Get a quote on WhatsApp')}`;
    },
    c:['Start a project','How long does it take?','Payment & revisions'] },

  { id:'time', w:['how long','time','timeline','duration','turnaround','deadline','days','weeks','fast','urgent','asap','kab tak','kitne din','delivery time','how quickly','when ready'],
    a:ctx => {
      const by = {
        web:`<b>Websites</b>: a landing page is usually a few days; a multi-page company site one to three weeks, depending on how fast copy and images arrive. A web app with logins and a dashboard is scoped by its features.`,
        video:`<b>Video</b>: a single reel is usually 2 to 4 days; an explainer with custom motion graphics about a week.`,
        design:`<b>Design</b>: logo and identity directions are usually ready within days, then two rounds of refinement.`,
        social:`<b>Social media</b>: the first month's calendar and content start within the first week; reach moves within weeks.`
      };
      return ctx.service && by[ctx.service] ? by[ctx.service] + '<br><br>Urgent? Say so on WhatsApp and Hashir will tell you honestly what is possible.' :
        `Rough guide:${ul([by.web, by.video, by.design, by.social])}You get an exact timeline with the quote.`;
    },
    c:['How much does it cost?','Start a project','Payment & revisions'] },

  { id:'payment', w:['payment','pay','advance','deposit','installment','invoice','bank','easypaisa','jazzcash','paypal','wise','stripe','refund','contract','payment terms'],
    a:() => `Payment terms are agreed with the quote, before work starts, so there are no surprises. For the exact options (local or international), ask Hashir directly.${waBtn('Hi Hashir, what are your payment terms?')}`,
    c:['Payment & revisions','Start a project'] },

  { id:'revisions', w:['revision','revisions','changes','change','edits','modify','not happy','redo','corrections','payment & revisions'],
    a:() => `Changes are built into the process:${ul([
      '<b>Websites</b>: you see real pages early, and changes happen at the design stage where they are cheap',
      '<b>Design</b>: two rounds of revisions after a direction is chosen',
      '<b>Video</b>: a rough cut first, so pacing and text are agreed before effects'
    ])}If the brief changes completely, it gets rescoped rather than redrawn forever.`,
    c:['How much does it cost?','Start a project'] },

  { id:'edit', w:['edit myself','update myself','change it myself','cms','admin','can i edit','manage myself','self edit','update content','handover','after launch','support','maintenance'],
    a:() => `Yes. Anything you'll want to change often is built to be editable, either through an <b>admin panel</b> or a single content file, and you get a <b>written guide</b>. You also keep the files and access, so nothing about your site depends on Hashir being available. Ongoing support and updates can be arranged too.`,
    c:['Hosting & domain','Websites'] },

  { id:'hosting', w:['hosting','host','domain','dns','ssl','vercel','server','email setup','analytics','google analytics','search console','uptime','go live','launch'],
    a:() => `Sites usually go live on <b>Vercel</b> with <b>your own domain</b> and SSL. Hashir sets up Search Console and analytics at launch, and can handle buying and connecting the domain for you.`,
    c:['Can I edit it myself?','SEO','Websites'] },

  { id:'intl', w:['international','abroad','outside pakistan','usa','uk','canada','dubai','uae','saudi','riyadh','norway','europe','foreign','overseas','time zone','remote','worldwide','english'],
    a:() => `Yes, clients outside Pakistan are normal: for example Wrappi in Oslo (Norway), Desi Sawad in Riyadh, and businesses in the US and Canada. Most communication is over WhatsApp and email. Karachi is where Hashir is, not who he works for.`,
    c:['Show me your work','Payment & revisions','Contact'] },

  { id:'location', w:['where are you','where is hashir','location','based','karachi','pakistan','office','address','city','visit','meet'],
    a:() => `Hashir is based in <b>Karachi, Pakistan</b>, and works remotely with clients worldwide. Meetings happen over WhatsApp or video call; local clients can ask about meeting in person.`,
    c:['Contact','International clients'] },

  { id:'small', w:['small project','small business','startup','just a logo','one page','single page','small budget','beginner','new business','first website'],
    a:() => `Small projects are welcome: one landing page, one logo or a month of content are normal starting points, and most long projects started as one of those.`,
    c:['How much does it cost?','Start a project'] },

  { id:'need', w:['what do you need','what do i send','requirements','materials','what to send','what info','start with'],
    a:ctx => ctx.service === 'video' ? `For video: the raw footage or screen recordings, your logo (vector if you have it) and one line on what the video is for. No footage? It can be built in motion graphics instead.` :
      `To start, just the problem, not a spec: what the business needs, plus whatever you already have (logo, text, photos, links you like). Hashir turns that into a scope.`,
    c:['Start a project','How long does it take?'] },

  { id:'style', w:['match my style','my style','reference','references','similar to','like this','copy style','existing style'],
    a:() => `Yes. Send two or three examples you like and Hashir will match the pacing, type and colour, or design inside your existing brand guide, rather than inventing a new look.`,
    c:['Video editing','Branding','Start a project'] },

  { id:'script', w:['script','copywriting','write content','text writing','captions','content writing'],
    a:() => `Yes. Hashir can shape and tighten scripts and on-screen text, and write site copy and captions, so it reads at the speed people actually scroll.`,
    c:['Video editing','Social media'] },

  { id:'platforms', w:['which platforms','platforms','do you post','post for us','manage my account','posting too'],
    a:() => `Both: content made <b>and</b> published on a schedule, with your approval on anything sensitive. Instagram first, plus Facebook, TikTok and LinkedIn where your audience actually is. Hashir can also hand production to your own designer if you have one.`,
    c:['Social media','How much for social media?'] },

  { id:'contact', w:['contact','whatsapp','phone','number','call','email','mail','reach','talk','message','dm','instagram id','insta','github','linkedin','get in touch','rabta','number do'],
    a:() => `The fastest way is <b>WhatsApp</b>: ${A(wa("Hi Hashir, I'd like to talk about a project."),'+92 332 2483233',1)}${ul([
      `Instagram: ${A('https://www.instagram.com/hashirykw','@hashirykw',1)}`,
      `GitHub: ${A('https://github.com/hashirykw','hashirykw',1)}`,
      `Agency: ${A('https://nexlyr.solutions','nexlyr.solutions',1)} · 0305 3687680`,
      `Or the ${A('/#contact','contact form')} on this site`
    ])}`,
    c:['Start a project','Services'] },

  { id:'start', w:['start a project','start','hire','hire you','book','order','begin','get started','work with you','lets work','kaam karwana','start karna','lets start'],
    a:() => null, flow:'lead' },

  { id:'work', w:['work','portfolio','projects','examples','samples','clients','case studies','show me','your best','previous work','demo','demos','live sites','what have you built','what have you made'],
    a:() => null, flow:'projects' },

  { id:'process', w:['process','how do you work','how it works','workflow','steps','method','approach','how does it work','what happens next'],
    a:() => `The process is the same whatever the project:${ul([
      '<b>You send the problem</b>, not a spec: what the business needs and what you already have',
      '<b>Hashir scopes it</b>: what gets built, what it costs and when it\'s ready, agreed before work starts',
      '<b>Build in the open</b>: you see real work early (pages, a rough cut, design directions), so changes are cheap',
      '<b>Launch and handover</b>: you keep every file and login, with a guide for editing'
    ])}`, c:['Start a project','How long does it take?','How much does it cost?'] },

  { id:'why', w:['why you','why hashir','why should i','why choose','why nexlyr','what makes you different','better than','trust','reliable','guarantee','reviews','testimonials'],
    a:() => `A few honest reasons people work with Hashir:${ul([
      'Everything is <b>built by hand</b> for your brand, not a template with your logo swapped in',
      '<b>One team</b> for website, branding, video and social, so it all looks like one brand',
      'You talk to the <b>founder directly</b> on WhatsApp',
      'You <b>own everything</b> at the end: files, code, logins'
    ])}The best proof is the live work: ${A('/#work','see the projects')}.`, c:['Show me your work','Start a project'] },

  { id:'lang', w:['urdu','language','languages you speak','speak','hindi','roman urdu','arabic','norwegian'],
    a:() => `Hashir works in <b>English and Urdu</b>, and sites can be built in other languages too (Wrappi's site is in Norwegian and English).`,
    c:['International clients','Websites'] },

  { id:'hours', w:['available','availability','hours','timing','timings','online now','reply time','respond','response time','busy','weekend'],
    a:() => `Hashir usually replies on WhatsApp <b>within the hour</b> during the day (Pakistan time, UTC+5). Messages sent late at night get answered the next morning.${waBtn("Hi Hashir, are you available for a project?")}`,
    c:['Start a project','Contact'] },

  { id:'mobile', w:['mobile app','android','ios','play store','app store','iphone app','android app','flutter','react native'],
    a:() => `Hashir builds <b>web apps</b> that work on every phone with no install: portals, dashboards, booking and ordering. For a native App Store or Play Store app, describe it on WhatsApp and he'll tell you honestly what fits.${waBtn('Hi Hashir, I need an app: ')}`,
    c:['Websites','Show me software','Contact'] },

  { id:'ecom', w:['online store','ecommerce','e-commerce','sell online','shop','cart','checkout','payment gateway','cod','cash on delivery','products'],
    a:() => `Yes: online stores with product pages, cart, checkout and an admin to manage orders and stock. Hashir has also <b>run two e-commerce stores</b> himself, so your store is built by someone who has actually sold online.`,
    c:['How much does it cost?','How long does it take?','Start a project'] },

  { id:'thanks', w:['thanks','thank you','thx','ty','shukriya','shukria','jazakallah','great','awesome','perfect','nice','cool','ok','okay','got it','helpful'],
    a:() => `Anytime! Anything else, or should I connect you with Hashir?`,
    c:['Start a project','Contact','Show me your work'] },

  { id:'bye', w:['bye','goodbye','see you','allah hafiz','khuda hafiz','that is all','thats all'],
    a:() => `Take care! Hashir is one tap away whenever you're ready.${waBtn("Hi Hashir, I was chatting with your assistant.")}`,
    c:[] }
];
const SERVICE_NAMES = { web:'a website', video:'video editing', design:'branding and design', social:'social media management', aibots:'an AI chatbot', seo:'SEO', edu:'the education package' };
const CHIP_MAP = {
  'Websites':'web','Video editing':'video','Branding':'design','Social media':'social','AI chatbots':'aibots','Show me your work':'work','Services':'services',
  'About Hashir':'about','Contact':'contact','Experience':'exp','Nexlyr Solutions':'nexlyr','Education package':'edu','Skills & tools':'skills','Generative AI':'genai',
  'AI video':'genai','Start a project':'start','Payment & revisions':'revisions','How much does it cost?':'price','How long does it take?':'time','Hosting & domain':'hosting',
  'SEO':'seo','International clients':'intl','Nexlyr for Students':'students','Can I edit it myself?':'edit','Show me brands you built for':'work','How we work':'process','Why Hashir?':'why'
};

/* ───────── text matching: tokens, typos, phrases ───────── */
const norm = s => (' ' + s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9.+#& ]+/g, ' ').replace(/\.(?![a-z0-9])/g, ' ').replace(/\s+/g, ' ') + ' ');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
function lev(a, b){
  if(Math.abs(a.length - b.length) > 2) return 9;
  const d = Array.from({ length:a.length + 1 }, (_, i) => [i]);
  for(let j = 1; j <= b.length; j++) d[0][j] = j;
  for(let i = 1; i <= a.length; i++) for(let j = 1; j <= b.length; j++)
  {
    d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1));
    if(i > 1 && j > 1 && a[i-1] === b[j-2] && a[i-2] === b[j-1]) d[i][j] = Math.min(d[i][j], d[i-2][j-2] + 1); // swapped letters count as one typo
  }
  return d[a.length][b.length];
}
// one topic scores each word of the message once: "price" shouldn't also count as a typo of "prices"
function topicScore(text, tokens, words){
  let n = 0; const used = new Set();
  for(const word of words){
    const w = word.toLowerCase();
    if(w.includes(' ')){ if(text.includes(' ' + w + ' ')){ n += 2.2 + w.split(' ').length * .4; w.split(' ').forEach(x => used.add(x)); } continue; }
    if(used.has(w)) continue;
    if(text.includes(' ' + w + ' ')){ n += w.length <= 3 ? 1.1 : 1.5; used.add(w); continue; }
  }
  for(const word of words){
    const w = word.toLowerCase(); if(w.includes(' ') || w.length < 5) continue;
    for(const t of tokens){ if(t.length >= 4 && !used.has(t) && t !== w && lev(t, w) <= (w.length >= 8 ? 2 : 1)){ n += 1.1; used.add(t); break; } }
  }
  return n;
}
const hit = (text, tokens, w) => topicScore(text, tokens, [w]);
function score(q){
  const text = norm(q), tokens = text.trim().split(' ');
  return T.map(t => ({ t, s:topicScore(text, tokens, t.w) })).filter(x => x.s > 0).sort((a, b) => b.s - a.s);
}
const SERVICE_OF = { web:'web', video:'video', design:'design', social:'social', aibots:'aibots', seo:'seo', edu:'edu', genai:'video' };

/* ───────── projects: search by name, category or kind ───────── */
const NAME_STOP = ['academy','school','sir','the','solutions','college','studio','nexlyr','infinimind','coffee','pizza','properties','chemistry','physics','maths','math','english','computer','science','enterprise','guide','user','care','public','high','online','performance','with','street','calculator'];
function findProjects(q){
  const text = norm(q), tokens = text.trim().split(' ');
  const byName = PROJECTS.filter(p => {
    const n = norm(p.n).trim(); if(text.includes(' ' + n + ' ')) return true;
    return n.split(' ').filter(w => w.length > 3 && !NAME_STOP.includes(w)).some(w => tokens.some(t => t === w || t.length >= 5 && w.length >= 5 && lev(t, w) <= 1));
  });
  if(byName.length) return { list:byName, title:byName.length === 1 ? '' : 'Here are the matches:' };
  for(const [k, c] of Object.entries(CATS)){
    if(c.words.some(w => hit(text, tokens, w))){
      const list = PROJECTS.filter(p => c.cat ? p.c === c.cat : p.g === c.g);
      if(list.length) return { list, title:`${c.label}: ${list.length} project${list.length > 1 ? 's' : ''}`, cat:k };
    }
  }
  if(/\bdemo/.test(text)) return { list:PROJECTS.filter(p => p.g === 'demo'), title:'Demo sites (built as pitches and showcases):' };
  return null;
}
function cards(list, max = 4){
  return `<div class="pcards">${list.slice(0, max).map(p => `<a class="pcard" href="${p.u}" target="_blank" rel="noopener">
      ${p.l ? `<img src="/${p.l}" alt="" width="40" height="40" loading="lazy">` : '<span class="pcard__ph">✦</span>'}
      <span><b>${p.n}</b><small>${p.t}${p.c ? ' · ' + p.c : ''}</small><em>${p.d}</em></span></a>`).join('')}</div>`;
}

/* ───────── the brain ───────── */
const ctx = { service:null, last:null, more:null, lead:null };

function projectsAnswer(q){
  const f = findProjects(q || '');
  if(f){
    ctx.more = f.list.length > 4 ? f.list.slice(4) : null;
    if(f.cat === 'edu') ctx.service = 'web';
    const one = f.list.length === 1 && f.list[0];
    return { html:(one ? `<b>${one.n}</b>: ${one.d}` : f.title) + cards(f.list) + (ctx.more ? `<br>${ctx.more.length} more in this group.` : ''),
      chips:[...(ctx.more ? ['Show more'] : []), 'Start a project', 'Websites'] };
  }
  const best = PROJECTS.filter(p => p.g === 'live').slice(0, 4);
  ctx.more = PROJECTS.filter(p => !best.includes(p));
  return { html:`Nexlyr has delivered <b>500+ projects</b>. A few highlights from the site:` + cards(best) + `<br>Ask me for a kind: "gym websites", "schools", "restaurants", "software"…`,
    chips:['Schools & teachers','Gyms','Restaurants & cafés','Business sites','Software','Show more'] };
}

const LEAD = [
  { key:'need', ask:'Great, let\'s put your brief together (4 quick questions). What do you need?', chips:['Website','Web app or portal','Video editing','Branding / logo','Social media','AI chatbot','Something else'] },
  { key:'about', ask:'Nice. In one line, what is the business or project?', chips:['Cancel'] },
  { key:'when', ask:'When would you like it ready?', chips:['As soon as possible','Within a month','No rush'] },
  { key:'name', ask:'Last one: your name?', chips:['Cancel'] }
];
function leadStep(input){
  const L = ctx.lead;
  if(input != null) L.data[LEAD[L.i].key] = input;
  L.i++;
  if(L.i < LEAD.length) return { html:LEAD[L.i].ask, chips:LEAD[L.i].chips, lead:true };
  const d = L.data; ctx.lead = null;
  for(const k in d) d[k] = d[k] || '-';
  const msg = `Hi Hashir, I'm ${d.name}. I need: ${d.need}.\nAbout the project: ${d.about}.\nTimeline: ${d.when}.`;
  return { html:`Thanks, ${esc(d.name.split(' ')[0])}. Here's your brief, ready to send:<div class="brief">${esc(msg).replace(/\n/g,'<br>')}</div>${waBtn(msg, 'Send to Hashir on WhatsApp')}<br><small>He usually replies within the hour.</small>`, chips:['Show me your work','Services'] };
}

function answer(q, forcedId){
  // inside the project brief flow
  if(ctx.lead && !forcedId){
    if(/^(cancel|stop|exit|nevermind|never mind|no)$/i.test(q.trim())){ ctx.lead = null; return { html:'No problem, cancelled. What else can I help with?', chips:['Services','Show me your work'] }; }
    return leadStep(q.trim().slice(0, 160));
  }
  if(q === 'Show more' && ctx.more && ctx.more.length){
    const list = ctx.more; ctx.more = list.length > 4 ? list.slice(4) : null;
    return { html:'More projects:' + cards(list) + (ctx.more ? `<br>${ctx.more.length} more.` : ''), chips:[...(ctx.more ? ['Show more'] : []), 'Start a project'] };
  }
  const quick = { 'Show me software':'software', 'Schools & teachers':'school websites', 'Gyms':'gym websites', 'Restaurants & cafés':'restaurant websites', 'Business sites':'business websites', 'Software':'software', 'Show me websites':'websites projects', 'Show me education websites':'school websites' };
  if(quick[q]) return projectsAnswer(quick[q]);
  if(q === 'Cancel') return { html:'Okay. What else can I help with?', chips:['Services','Show me your work'] };
  const id = forcedId || CHIP_MAP[q];
  let topics;
  if(id) topics = [T.find(t => t.id === id)];
  else {
    const r = score(q);
    // a named project or a kind of business wins when it is the clear subject
    const f = findProjects(q);
    if(f && (!r.length || r[0].t.id === 'work' || r[0].t.id === 'web' || f.list.length === 1 && r[0].s < 3)) return projectsAnswer(q);
    if(!r.length){
      if(/\b(it|that|this|same|and|also|what about|aur)\b/i.test(q) && ctx.last) topics = [ctx.last];
      else return fallback(q);
    } else {
      topics = [r[0].t];
      // two clear questions in one message: answer both (price + time, service + price …)
      const skip = ['greet','thanks','bye','about'];
      for(const x of r.slice(1, 3)) if(x.s >= r[0].s * .7 && x.s >= 1.1 && !skip.includes(x.t.id)) topics.push(x.t);
      if(['greet','about'].includes(topics[0].id) && r[1] && r[1].s >= 1.5) topics = [r[1].t, ...topics.slice(1).filter(t => t !== r[1].t)];
      const fl = topics.find(t => t.flow); if(fl) topics = [fl];
      // "how much is a website?" → the website is context, the price is the answer
      const asks = ['price','time','payment','revisions','edit','hosting','need'];
      if(topics.some(t => asks.includes(t.id)) && topics.length > 1){
        topics.forEach(t => { if(SERVICE_OF[t.id]) ctx.service = SERVICE_OF[t.id]; });
        topics = topics.filter(t => !SERVICE_OF[t.id] || asks.includes(t.id));
      }
    }
  }
  // remember which service we're talking about, so "how much?" means that service
  topics.forEach(t => { if(SERVICE_OF[t.id]) ctx.service = SERVICE_OF[t.id]; });
  const svcFromText = score(q).map(x => SERVICE_OF[x.t.id]).find(Boolean); if(svcFromText) ctx.service = svcFromText;
  const parts = [], chips = new Set();
  for(const t of topics){
    if(t.flow === 'lead'){ ctx.lead = { i:-1, data:{} }; const r0 = leadStep(null); return r0; }
    if(t.flow === 'projects') return projectsAnswer(q);
    parts.push(t.a(ctx)); (t.c || []).forEach(c => chips.add(c)); ctx.last = t;
  }
  return { html:parts.join('<hr>'), chips:[...chips].slice(0, 6) };
}
function fallback(q){
  return { html:`I'm not sure about that one, but Hashir will know.${waBtn('Hi Hashir, ' + q)}<br><br>Or try one of these:`,
    chips:['Services','Show me your work','How much does it cost?','Start a project'] };
}

window.HashirAI = { answer, welcome:() => answer("hi", "greet"), ctx, _score:score };

})();
