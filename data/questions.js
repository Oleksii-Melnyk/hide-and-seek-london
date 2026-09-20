/* Question categories, scaled for London Zone 1.
 * draw / keep = cards the hider draws and keeps for answering. */
window.QUESTIONS = [
  {
    cat: "Radar", draw: 1, keep: 1, colour: "#2563eb",
    blurb: "A yes/no distance ring. Cheap for the hider, so ask them freely.",
    items: [
      "Are you within **400 m** of me?",
      "Are you within **800 m** of me?",
      "Are you within **1.6 km** of me?",
      "Are you within 400 m of a **Thames bridge**?",
      "Are you within 800 m of a **royal park**?"
    ]
  },
  {
    cat: "Thermometer", draw: 2, keep: 1, colour: "#dc2626",
    blurb: "Seekers travel a fixed distance and ask whether they got warmer. 400 m is the Zone 1 step — one long block.",
    items: [
      "We are about to travel **400 m**. Hotter or colder?",
      "We are about to travel **1 km**. Hotter or colder? *(costs the hider 2 keeps)*",
      "Since our last thermometer, hotter or colder?"
    ]
  },
  {
    cat: "Matching", draw: 2, keep: 1, colour: "#7c3aed",
    blurb: "Yes/no on a shared attribute. The postcode and line questions cut the board fastest.",
    items: [
      "Is your station on the **same side of the Thames** as mine?",
      "Is your station in the **same postcode district** as mine? *(EC1, W1, SE1 …)*",
      "Is your station in the **same London borough** as mine?",
      "Is your station served by **any tube line** that serves mine?",
      "Does your station's name **start with the same letter** as mine?",
      "Is your station served by the **same number of tube lines** as mine?",
      "Is your station a **National Rail terminus**, like mine? *(only askable from one)*",
      "Is the **nearest royal park** to you the same as the nearest to me?"
    ]
  },
  {
    cat: "Measuring", draw: 3, keep: 1, colour: "#059669",
    blurb: "Closer or further. Expensive, and the most informative question in the game.",
    items: [
      "Are you **closer to the Thames** than I am?",
      "Are you **closer to Charing Cross** than I am? *(the point all London distances are measured from)*",
      "Are you **closer to St Paul's Cathedral** than I am?",
      "Are you **closer to Hyde Park** than I am?",
      "Are you **closer to the nearest Thames bridge** than I am?",
      "Is your station **higher above sea level** than mine?",
      "Are you **closer to Heathrow** than I am? *(a brutal east/west split)*",
      "Does your station have **more tube lines** than mine?"
    ]
  },
  {
    cat: "Tentacles", draw: 4, keep: 2, colour: "#ea580c",
    blurb: "The hider names which of a listed set they are nearest to. The most expensive question — and it can end the game outright.",
    items: [
      "Of these **mainline termini**, which are you closest to? Paddington · Euston · King's Cross · Liverpool Street · Waterloo · Victoria",
      "Of these **royal parks**, which are you closest to? Hyde Park · Green Park · St James's Park · Regent's Park · Kensington Gardens",
      "Of these **bridges**, which are you closest to? Tower · London · Blackfriars · Waterloo · Westminster · Vauxhall",
      "Of these **landmarks**, which are you closest to? The Shard · St Paul's · The Eye · Big Ben · The Gherkin · Marble Arch",
      "Of these **museums**, which are you closest to? British Museum · V&A · Natural History · Tate Modern · National Gallery"
    ]
  },
  {
    cat: "Photo", draw: 1, keep: 1, colour: "#0891b2",
    blurb: "The hider sends a photo within 2 minutes. No people's faces, no zooming, no cropping to nothing.",
    items: [
      "A photo of **the sky**, straight up.",
      "A photo of **the ground** you're standing on.",
      "A photo of the **nearest tree**.",
      "A photo of the **tallest building you can see**.",
      "A photo of the **widest street you can see**, down its length.",
      "A photo of **three metres in front of you**.",
      "A photo of the **nearest thing that is red**.",
      "A photo of the **nearest piece of public transport signage**, close enough to read nothing on it."
    ]
  }
];
