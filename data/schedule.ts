import { Schedule } from "./types";

/*
  Ask chatGPT to generate a schedule for you :)

  Hey please generate a fake schedule for a two day developer conference in JSON form like this:

[
 {
    id: "some-unique-id",
    title: "Breakfast",
    from: "2024-10-03 08:00:00",
    to: "2024-10-03 08:30:00",
    location: "Some location",
    image: "imageurl"
    type: "break"
 },
{
   id: "another-unique-id",
   title: "How to become 10x developer",
   description: "Some nice description text here. About a paragraph of length, maybe 2 paragraphs.",
   from: "2024-10-03 08:45:00",
   to: "2024-10-03 09:30:00",
   location: "Some location",
   image: "imageurl"
   speakers: [{
    name: "Fakeman McDeveloper",
    email: "fakeman.mcdeveloper@faang.com"
   }]
   type: "talk",
   tags: ["Engineering"]
}
]


  Generate about 3 talks before lunch and 3 after. For type only use "talk" or "break". The dates should be 2024-10-03 and 2024-10-04.
 
*/

const schedule: Schedule = {
  or: {
    name: "Öresund",
    schedule: [
      {
        id: "or-2024-0",
        from: "2024-10-18T14:00:00+02:00",
        to: "2024-10-18T15:00:00+02:00",
        type: "break",
        title: "FIKA",
        image: "/img/fika.jpg",
      },
      {
        id: "or-2024-1",
        from: "2024-10-18T15:00:00+02:00",
        to: "2024-10-18T15:10:00+02:00",
        type: "break",
        title: "Introduction & Welcome",
        image: "/img/welcome.jpg",
      },
      {
        id: "or-2024-2",
        from: "2024-10-18T15:10:00+02:00",
        to: "2024-10-18T15:50:00+02:00",
        type: "talk",
        title: "Boomer talk - aging in the tech industry",
        description: "",
        image: "https://i.1337co.de/wallofleet/per-okvist",
        tags: ["Tales from the Field"],
        speakers: [
          {
            name: "Per Ökvist",
            email: "per.okvist@tretton37.com",
          },
        ],
      },
      {
        id: "or-2024-3",
        from: "2024-10-18T15:50:00+02:00",
        to: "2024-10-18T16:30:00+02:00",
        type: "talk",
        title: "How (not) to learn languages",
        description: "",
        image: "https://i.1337co.de/wallofleet/stanislav-kolbasin",
        tags: ["Tales from the Field", "Engineering & Technical"],
        speakers: [
          {
            name: "Stanislav Kolbasin",
            email: "stanislav.kolbasin@tretton37.com",
          },
        ],
      },
      {
        id: "or-2024-9",
        from: "2024-10-18T16:30:00+02:00",
        to: "2024-10-18T17:30:00+02:00",
        type: "talk",
        title: "Pitch Perfect - Engaging Clients Through Effective Pitching",
        description: "",
        image: "https://i.1337co.de/wallofleet/my-hiller",
        tags: ["Workshop"],
        speakers: [
          {
            name: "My Hiller",
            email: "my.hiller@tretton37.com",
          },
        ],
      },
      {
        id: "or-2024-4",
        from: "2024-10-18T16:30:00+02:00",
        to: "2024-10-18T17:30:00+02:00",
        type: "talk",
        title: "Why teamwork is hard",
        description: "",
        image: "https://i.1337co.de/wallofleet/karl-adriansson",
        tags: ["Leadership and interpersonal skills"],
        speakers: [
          {
            name: "Karl Adriansson",
            email: "karl-adriansson@tretton37.com",
          },
        ],
      },
      {
        id: "or-2024-5",
        from: "2024-10-18T17:30:00+02:00",
        to: "2024-10-18T18:10:00+02:00",
        type: "talk",
        title: "Technical debt and the all-round benefits of refactoring",
        description: "",
        image: "https://i.1337co.de/wallofleet/tshepiso-lehutjo",
        tags: ["Tales from the Field", "Engineering & Technical"],
        speakers: [
          {
            name: "Tshepiso Lehutjo",
            email: "tshepiso.lehutjo@tretton37.com",
          },
        ],
      },
      {
        id: "or-2024-6",
        from: "2024-10-18T18:10:00+02:00",
        to: "2024-10-18T19:00:00+02:00",
        type: "talk",
        title: "FAIL! (Tales from the trenches)",
        description: "",
        image: "https://i.1337co.de/wallofleet/johan-olsson",
        tags: ["Tales from the Field"],
        speakers: [
          {
            name: "Johan Olsson",
            email: "johan.olsson@tretton37.com",
          },
        ],
      },
      {
        id: "or-2024-7",
        from: "2024-10-18T19:00:00+02:00",
        to: "2024-10-18T20:00:00+02:00",
        type: "break",
        title: "Dinner",
        image: "/img/dinner.jpg",
      },
      {
        id: "or-2024-8",
        from: "2024-10-18T20:00:00+02:00",
        to: "2024-10-18T24:00:00+02:00",
        type: "break",
        title: "GAMES n PARTY",
        image: "/img/games.jpg",
      },
    ],
  },
  lj: {
    name: "Ljubljana",
    schedule: [
      {
        id: "lj-2024-1",
        from: "2024-10-18T15:00:00+02:00",
        to: "2024-10-18T15:15:00+02:00",
        type: "break",
        title: "Introduction & Welcome",
        image: "/img/welcome.jpg",
      },
      {
        id: "lj-2024-2",
        from: "2024-10-18T15:15:00+02:00",
        to: "2024-10-18T15:50:00+02:00",
        type: "talk",
        title: "What the #HEX is an OKLCH?!",
        description:
          "Let's talk about new CSS colour functions, colour spaces, and colour gamuts",
        image: "https://i.1337co.de/profile/tomaz-kenda",
        tags: ["Engineering & Technical"],
        speakers: [
          {
            name: "Tomaž Kenda",
            email: "tomaz.kenda@tretton37.com",
          },
        ],
      },
      {
        id: "lj-2024-6",
        from: "2024-10-18T15:50:00+02:00",
        to: "2024-10-18T16:25:00+02:00",
        type: "talk",
        title: "How Unseen Biases Shape Our Work in Software Teams",
        description:
          "We'll explore how certain cognitive and social psychology biases can distort our judgement and influence how we see ourselves, our teammates, and our work. We will reflect on how these biases affect team collaboration and decision-making. Self-reflection is important to recognize these patterns and improve teamwork and communication.",
        image: "https://i.1337co.de/wallofleet/nera-bozin",
        tags: ["Leadership and interpersonal skills"],
        speakers: [
          {
            name: "Nera Božin",
            email: "nera.bozin@tretton37.com",
          },
        ],
      },
      {
        id: "lj-2024-4",
        from: "2024-10-18T16:25:00+02:00",
        to: "2024-10-18T16:55:00+02:00",
        type: "talk",
        title: "Building AWS Infrastructure for Career Progression Framework",
        description:
          "Technical overview of AWS architecture design for the Career Progression Framework. Covers key decisions, challenges, and cloud infrastructure implementation.",
        image: "https://i.1337co.de/profile/vid-cufar",
        tags: ["Engineering & Technical"],
        speakers: [
          {
            name: "Vid Čufar",
            email: "vid.cufar@tretton37.com",
          },
        ],
      },
      {
        id: "lj-2024-5",
        from: "2024-10-18T16:55:00+02:00",
        to: "2024-10-18T17:20:00+02:00",
        type: "break",
        title: "FIKA",
        image: "/img/fika.jpg",
      },
      {
        id: "lj-2024-3",
        from: "2024-10-18T17:20:00+02:00",
        to: "2024-10-18T18:20:00+02:00",
        type: "talk",
        title: "How to nail the client meeting",
        description: `In the TA team we created a workshop on the client meeting. The workshop consists of 2 interactive parts, that is pitching yourself and your proudest profesional achievements and showing interest about the client you are talking to. Join us for this exciting adventure and perhaps next time you'll be asked "Tell me about yourself", things will be a bit easier.`,
        image: "https://i.1337co.de/wallofleet/eva-sever",
        tags: ["Leadership and interpersonal skills"],
        speakers: [
          {
            name: "Eva Sever",
            email: "eva.sever@tretton37.com",
          },
        ],
      },
      {
        id: "lj-2024-7",
        from: "2024-10-18T18:20:00+02:00",
        to: "2024-10-18T19:10:00+02:00",
        type: "talk",
        title: "How far is Nebotičnik?",
        description:
          "What are the challenges of navigating urban areas? Is Google Maps the best we can do for pedestrians? Can you really walk from anywhere to anywhere? Let's find out!",
        image: "https://i.1337co.de/wallofleet/wiktor-chojnacki",
        tags: ["Engineering & Technical"],
        speakers: [
          {
            name: "Wiktor Chojnacki",
            email: "wiktor.chojnacki@tretton37.com",
          },
        ],
      },
      {
        id: "lj-2024-8",
        from: "2024-10-18T19:10:00+02:00",
        to: "2024-10-18T20:00:00+02:00",
        type: "break",
        title: "Dinner",
        image: "/img/dinner.jpg",
      },
      {
        id: "lj-2024-9",
        from: "2024-10-18T20:00:00+02:00",
        to: "2024-10-18T24:00:00+02:00",
        type: "break",
        title: "GAMES n PARTY",
        image: "/img/games.jpg",
      },
    ],
  },
  bo: {
    name: "Borlänge",
    schedule: [
      {
        id: "bo-2024-1",
        from: "2024-10-18T15:00:00+02:00",
        to: "2024-10-18T15:15:00+02:00",
        type: "break",
        title: "Introduction & Welcome",
        image: "/img/welcome.jpg",
      },
      {
        id: "bo-2024-2",
        from: "2024-10-18T15:15:00+02:00",
        to: "2024-10-18T16:00:00+02:00",
        type: "talk",
        title: "Storytime: Coor",
        description:
          "The digital transition from a mobile app to a PWA and how we have helped Coor harmonize its offering for its customers.",
        image: "https://i.1337co.de/wallofleet/klas-broberg",
        tags: ["Tales from the Field"],
        speakers: [
          {
            name: "Klas Broberg",
            email: "klas.broberg@tretton37.com",
          },
        ],
      },
      {
        id: "bo-2024-3",
        from: "2024-10-18T16:00:00+02:00",
        to: "2024-10-18T16:30:00+02:00",
        type: "break",
        title: "FIKA",
        image: "/img/fika.jpg",
      },
      {
        id: "bo-2024-4",
        from: "2024-10-18T16:30:00+02:00",
        to: "2024-10-18T17:15:00+02:00",
        type: "talk",
        title: "Game Dev as a enterprise developer",
        description:
          "Game development as a enterprise developer, a talk about how things are different when you're developing games and the shortcuts you need to take to push forward.",
        image: "https://i.1337co.de/wallofleet/thomas-brunstrom",
        tags: ["Engineering & Technical"],
        speakers: [
          {
            name: "Thomas Brunström",
            email: "thomas.brunstrom@tretton37.com",
          },
        ],
      },
      {
        id: "bo-2024-5",
        from: "2024-10-18T17:15:00+02:00",
        to: "2024-10-18T18:00:00+02:00",
        type: "break",
        title: "Tech mingle",
        image: "/img/tech.jpg",
      },
      {
        id: "bo-2024-6",
        from: "2024-10-18T18:00:00+02:00",
        to: "2024-10-18T19:00:00+02:00",
        type: "break",
        title: "Dinner",
        image: "/img/dinner.jpg",
      },
      {
        id: "bo-2024-7",
        from: "2024-10-18T19:00:00+02:00",
        to: "2024-10-18T24:00:00+02:00",
        type: "break",
        title: "GAMES n PARTY",
        image: "/img/games.jpg",
      },
    ],
  },
  st: {
    name: "Stockholm",
    schedule: [
      {
        id: "st-2024-1",
        from: "2024-10-18T15:00:00+02:00",
        to: "2024-10-18T15:10:00+02:00",
        type: "break",
        title: "Introduction & Welcome",
        image: "/img/welcome.jpg",
      },
      {
        id: "st-2024-2",
        from: "2024-10-18T15:10:00+02:00",
        to: "2024-10-18T15:50:00+02:00",
        type: "talk",
        title: "What does my code do?",
        description:
          'Every developer asks themselves, "What does this code do?" This talk will take you through my personal journey of figuring out the answer, starting from the basics of using print statements to more advanced debugging techniques. Along the way, you’ll likely recognize your own experiences. But what if we change the question to, "What should my code do?" That’s where Test Driven Development (TDD) comes into play. Join me to explore how TDD transforms the way we approach code, shifting from reactive troubleshooting to proactive design.',
        image: "https://i.1337co.de/wallofleet/jimmy-mattsson",
        tags: ["Engineering & Technical"],
        speakers: [
          {
            name: "Jimmy Mattsson",
            email: "jimmy.mattsson@tretton37.com",
          },
        ],
      },
      {
        id: "st-2024-3",
        from: "2024-10-18T15:50:00+02:00",
        to: "2024-10-18T16:25:00+02:00",
        type: "talk",
        title:
          "How to gain a accessibility mindset & speedrun [any% blindfolded] ordering ham",
        description:
          "The talk will consist of me describing how in my previous assignment we gained a accessibility mindset. This will be a story about how it started as a uphill battle but the outcome was that us developer pushed accessibility more than our po:s.",
        image: "https://i.1337co.de/wallofleet/nikki-sollid",
        tags: ["Engineering & Technical"],
        speakers: [
          {
            name: "Nikki Sollid",
            email: "nikki.sollid@tretton37.com",
          },
        ],
      },
      {
        id: "st-2024-4",
        from: "2024-10-18T16:20:00+02:00",
        to: "2024-10-18T17:00:00+02:00",
        type: "talk",
        title: "Pitch Perfect - Engaging Clients Through Effective Pitching",
        description: "",
        image: "https://i.1337co.de/wallofleet/anna-bohman",
        tags: ["Workshop"],
        speakers: [
          {
            name: "Anna Bohman",
            email: "anna.bohman@tretton37.com",
          },
          {
            name: "Sandra Åberg",
            email: "sandra.aberg@tretton37.com",
          },
        ],
      },
      {
        id: "st-2024-5",
        from: "2024-10-18T16:25:00+02:00",
        to: "2024-10-18T17:00:00+02:00",
        type: "talk",
        title: "So you were thrown into a legacy project",
        description:
          "How to swim and not sink when you've been thrown into a messy legacy project with lots of technical debt, with examples from .NET",
        image: "https://i.1337co.de/wallofleet/helen-toomik",
        tags: ["Engineering & Technical", "Tales from the Field"],
        speakers: [
          {
            name: "Helen Toomik",
            email: "helen.toomikn@tretton37.com",
          },
        ],
      },
      {
        id: "st-2024-6",
        from: "2024-10-18T17:00:00+02:00",
        to: "2024-10-18T17:30:00+02:00",
        type: "break",
        title: "FIKA",
        image: "/img/fika.jpg",
      },
      {
        id: "st-2024-7",
        from: "2024-10-18T17:30:00+02:00",
        to: "2024-10-18T18:05:00+02:00",
        type: "talk",
        title: "Yes, AI Content Creation Is Actually This Easy",
        description:
          "Do you like cocktails? Yes. Do you like AI? Maybe, maybe not, but today we’ll take a quick look at how easy it is to create drink recipes for an iOS app with a couple of lines of code using “AI magic”.",
        image: "https://i.1337co.de/wallofleet/fredric-bohlin",
        tags: ["Engineering & Technical"],
        speakers: [
          {
            name: "Fredric Bohlin",
            email: "fredric.bohlin@tretton37.com",
          },
        ],
      },
      {
        id: "st-2024-8",
        from: "2024-10-18T18:05:00+02:00",
        to: "2024-10-18T18:45:00+02:00",
        type: "talk",
        title:
          "How to manage chaos - thoughts from parental leave, and some analogues to developer life",
        description:
          "When working as a developer, we face chaos all the time: ever changing requirements, emergency fixes, ancient codebase, collaboration issues with other devs... While on parental leave, I realised that I had it easy. Constantly beaten up and dragging through, I gradually realised that there are certain patterns to follow, and little by little I learnt a thing or two, created some routines/guidelines, which are surprisingly relatable to our line of work as developers.",
        image: "https://i.1337co.de/wallofleet/xun-yang",
        tags: [
          "Engineering & Technical",
          "Leadership and interpersonal skills",
          "Tales from the Field",
        ],
        speakers: [
          {
            name: "Xun Yang",
            email: "xun.yang@tretton37.com",
          },
        ],
      },
      {
        id: "st-2024-9",
        from: "2024-10-18T18:45:00+02:00",
        to: "2024-10-18T19:15:00+02:00",
        type: "talk",
        title: "DNS piracy, sailing the digital seas",
        description:
          "Uncovering how dns is used in ad attribution and is it possible to pirate them?",
        image: "https://i.1337co.de/wallofleet/johan-damm",
        tags: ["Engineering & Technical", "Tales from the Field"],
        speakers: [
          {
            name: "Johan Damm",
            email: "johan.damm@tretton37.com",
          },
        ],
      },
      {
        id: "st-2024-10",
        from: "2024-10-18T19:15:00+02:00",
        to: "2024-10-18T20:00:00+02:00",
        type: "break",
        title: "Dinner",
        image: "/img/dinner.jpg",
      },
      {
        id: "st-2024-11",
        from: "2024-10-18T20:00:00+02:00",
        to: "2024-10-18T24:00:00+02:00",
        type: "break",
        title: "GAMES n PARTY",
        image: "/img/games.jpg",
      },
    ],
  },
};

export default schedule;
