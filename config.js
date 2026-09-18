/* ─────────────────────────────────────────────────────────────
   PORTFOLIO CONFIG: the only file you need to edit.
   ───────────────────────────────────────────────────────────── */
window.PORTFOLIO_CONFIG = {

  /* Supabase → Project Settings → Data API.
     supabaseUrl is the ONLY thing still missing. Paste your Project URL —
     it looks like https://abcdefghijkl.supabase.co — and the site, the
     contact form and /admin all start using the database.
     Until then the site runs on the fallback content further down.      */
  supabaseUrl: 'https://YOUR-PROJECT-REF.supabase.co',   // ← paste your Project URL here
  supabaseKey: 'sb_publishable_GUxZjSH3OJYp2fMZNaTvyA_2VZoO4Dx',

  video: {
    desktop: 'hero-hd.mp4',            // 1920x1080, AI-upscaled
    mobile:  'hero-mobile.mp4',        // 720x1280 vertical, framed on the climber
    poster:  'hero-poster.webp',
    posterMobile: 'hero-poster-mobile.webp',
    intro:     1.6,    // seconds that play at normal speed before the slow drift
    length:    14.6,   // full video length in seconds
    idleRate:  0.62,   // speed while nobody scrolls (1 = normal)
    scrollRate: 1.85,   // top speed while scrolling
    loopFrom:  0       // where the video restarts after the end
  },

  contact: {
    site:      'https://nexlyr.solutions',
    github:    'https://github.com/hashirykw',
    instagram: 'https://www.instagram.com/hashirykw',
    whatsapp:  '923322483233'          // country code + number, no 0 and no spaces
  },

  /* Shown until Supabase is connected (or if the admin tables are empty).
     group: 'live' = main list, 'demo' = the Demos tab.
     logo: image file, logoBg: 'light' puts dark logos on a light tile. */
  fallback: {
    projects: [
      { group:'live', logo:'nexlyr-mark.png', type:'Agency', name:'Nexlyr Solutions',
        description:'Ten-page agency site with a Three.js globe hero, glass interface, a Supabase leads system and its own admin dashboard.',
        url:'nexlyr.solutions', link:'https://nexlyr.solutions' },
      { group:'live', logo:'logo-infinimind.svg', type:'EdTech platform', name:'InfiniMind Academy',
        description:'Online platform where children learn AI and coding.',
        url:'infinimind.vercel.app', link:'https://infinimind.vercel.app' },
      { group:'software', logo:'logo-apexify.webp', logoBg:'dark', type:'SaaS', name:'Apexify',
        description:'SaaS app where people log their health updates and track their progress.',
        url:'hashirykw.github.io/Apexiffy', link:'https://hashirykw.github.io/Apexiffy/' },
      { group:'software', icon:'chart', type:'Business software', name:'Lotus Enterprise',
        description:'Auto parts management system for running stock, orders and customers, with its own user guide.',
        url:'lotus-one-orpin.vercel.app', link:'https://lotus-one-orpin.vercel.app' },
      { group:'software', icon:'chart', type:'Trading tool', name:'AlphaEdge',
        description:'Trading signals dashboard for PSX and forex.',
        url:'alphaedge-five.vercel.app', link:'https://alphaedge-five.vercel.app' },
      { group:'software', icon:'code', type:'Web app', name:'YKW Calculator',
        description:'Scientific calculator built for the browser.',
        url:'hashirykw.github.io/YKW-Calculator', link:'https://hashirykw.github.io/YKW-Calculator/' },
      { group:'software', icon:'book', type:'Documentation', name:'Lotus User Guide',
        description:'Written and built the user guide for Lotus Enterprise.',
        url:'lotus-user-guide.vercel.app', link:'https://lotus-user-guide.vercel.app' },
      { group:'live', logo:'logo-markaz.webp', type:'Client site', name:'Markaz OUJ Performance',
        description:'Multi-page site for a Karachi sports and fitness company, covering its martial arts academy, store and a custom chat assistant.',
        url:'markaz-ouj.com', link:'https://markaz-ouj.com' },
      { group:'live', logo:'logo-smk.webp', logoBg:'light', type:'Client site', name:'Physics with SMK',
        description:'Physics tuition platform for Sir Mehboob Khan with topical past papers, practice questions and video lectures.',
        url:'physicswithsmk.com', link:'https://physicswithsmk.com' },
      { group:'live', logo:'logo-cambridge.webp', logoBg:'light', type:'Client site', name:'Cambridge Online',
        description:'Multi-page site for an O Level, IGCSE and A Level online academy, with faculty listings, courses and campuses.',
        url:'cambridgeonline.tech', link:'https://cambridgeonline.tech' },
      { group:'live', logo:'logo-revolution.webp', type:'Client site', name:'REVOLUTION MMA',
        description:'Single-page site for a mixed martial arts gym with an interactive 3D centrepiece.',
        url:'revolution-jet-delta.vercel.app', link:'https://revolution-jet-delta.vercel.app' },

      { group:'demo', logo:'logo-caspian.webp', logoBg:'light', type:'Demo', name:'The Caspian College',
        description:'Detailed responsive site for an intermediate science and commerce college in Karachi.',
        url:'caspian-college.vercel.app', link:'https://caspian-college.vercel.app' },
      { group:'demo', logo:'logo-kta.webp', logoBg:'light', type:'Demo', name:'Karachi Taekwondo Academy',
        description:'Academy site with real class details, light and dark modes and glass cards.',
        url:'karachi-taekwondo-academy.vercel.app', link:'https://karachi-taekwondo-academy.vercel.app' },
      { group:'demo', logo:'logo-safe.webp', type:'Demo', name:'SAFE Academy',
        description:'Demo for an Islamabad taekwondo academy, with a draggable 3D model that explains the belt levels.',
        url:'safe-taekwondo-academy.vercel.app', link:'https://safe-taekwondo-academy.vercel.app' },
      { group:'demo', icon:'book', type:'Demo', name:'English with Anna Malik',
        description:'Site for an O Level and A Level English Language teacher in Karachi.',
        url:'miss-anna-malik.vercel.app', link:'https://miss-anna-malik.vercel.app' },
      { group:'demo', icon:'paw', type:'Competition build', name:'FurEver Care',
        description:'Pet care site built for the TechWiz 6 competition, with scroll-choreographed interactions and offline support.' }
    ],
    experience: [
      { role:'Founder', company:'Nexlyr Solutions', is_current:true, logo:'nexlyr-mark.png',
        description:'Agency for web development, brand identity, video editing and digital marketing.',
        tags:'Web development, Graphic design, Video editing, Social media marketing' },
      { role:'Founder', company:'InfiniMind Academy', is_current:true, logo:'logo-infinimind.svg',
        description:'Online platform teaching AI and coding to children.' },
      { role:'Freelancer', company:'55+ clients', is_current:false, icon:'users',
        description:'Worked with more than 55 clients as a freelancer.' },
      { role:'Head of Social Media', company:'2 companies', is_current:false, icon:'megaphone',
        description:'Social media manager and head of social media at two companies.' },
      { role:'Head of Graphic Design', company:'Companies worldwide', is_current:false, icon:'pen',
        description:'Head graphic designer, and designer for multiple companies around the world.' },
      { role:'Ran the platform', company:'Apexify', is_current:false, logo:'logo-apexify.webp', logoBg:'dark',
        description:'SaaS app where people logged health updates and tracked their progress.' },
      { role:'Ran two stores', company:'E-commerce', is_current:false, icon:'bag',
        description:'Ran two e-commerce platforms.' },
      { role:'Before Nexlyr', company:'MHW Web Solutions', is_current:false, icon:'code',
        description:'51+ projects delivered. The foundation Nexlyr was built on.' }
    ],
    /* Video edits. Vertical clips, kept small so the page stays fast. */
    reels: [
      { src:'reel-1.mp4', poster:'reel-1.webp', title:'Digital account explainer', client:'Chase Securities',
        note:'Motion-graphics walkthrough of opening a trading account, step by step.' },
      { src:'reel-4.mp4', poster:'reel-4.webp', title:'Market update', client:'Chase Securities',
        note:'Presenter cut with live charts, key levels and on-screen data.' },
      { src:'reel-2.mp4', poster:'reel-2.webp', title:'20 design styles', client:'Nexlyr Solutions',
        note:'Series reel moving through twenty design styles, one card at a time.' },
      { src:'reel-3.mp4', poster:'reel-3.webp', title:'Logo animation', client:'Nexlyr Solutions',
        note:'Short brand ident built around the Nexlyr mark.' }
    ],

    /* Graphic design and photo edits. */
    designs: [
      { src:'design-1.webp', thumb:'design-1-t.webp', title:'Campaign post', client:"Dr. M's Dental Care",
        note:'Social post with branding and a contact strip.' },
      { src:'design-2.webp', thumb:'design-2-t.webp', title:'Carousel cover', client:'Social content',
        note:'Layered type over a photo, with hand-drawn marks.' },
      { src:'design-3.webp', thumb:'design-3-t.webp', title:'Live show edit', client:'Event coverage',
        note:'Black and white grade from a concert shoot.' },
      { src:'design-4.webp', thumb:'design-4-t.webp', title:'Stage still', client:'Event coverage',
        note:'Colour-graded still from a live performance.' }
    ],

    /* add certificates like:
       { name:'Certificate name', org:'Who issued it', year:'2025' } */
    certificates: []
  }
};
