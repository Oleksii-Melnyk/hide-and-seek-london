/* The allowed questions, transcribed from the printed question pad,
 * with a verdict on each option for a London Zone 1 board.
 *
 * The question text, the groupings and the costs are the pad's.
 * `v` and `note` are ours: "strong" worth a draw, "situational" works but
 * costs you an argument or a lookup, "dead" returns the same answer
 * everywhere on this board and tells you nothing.
 *
 * Anything marked house:true is not on the pad.
 */
window.QUESTIONS = [
  {
    n: 1, cat: "Matching", draw: 3, pick: 1, minutes: 5, colour: "#7c3aed",
    prompt: "Is your nearest ______ the same as my nearest ______?",
    how: "Matching carves the board into the cells around whatever feature you name, so it only pays when that feature is **dense** in Zone 1. Anything there is only one of — or none of — gives the same answer everywhere.",
    groups: [
      { name: "Transit", items: [
        { t: "Commercial Airport", v: "dead",
          note: "London City is nearest to every station on the board; the Heathrow boundary falls just west of the last circle. The one exception is Notting Hill Gate, which sits about 100 m from it — inside the margin of error, so treat it as a coin flip rather than information." },
        { t: "Transit Line", v: "strong",
          note: "Tube lines criss-cross Zone 1 and the nearest one changes over a few hundred metres. Agree first whether a line means its track or its stations, and whether buses count." },
        { t: "Station's Name Length", v: "strong",
          note: "Cheap to answer and it cuts the board along lines nothing else does. Settle letters-versus-words before you start, and whether apostrophes and spaces count." },
        { t: "Street or Path", v: "situational",
          note: "Every station sits on a street, so the answer is no unless you are nearly on top of each other. It is a 100 m radar in disguise — occasionally that is exactly what you want." }
      ]},
      { name: "Administrative divisions", items: [
        { t: "1st Admin. Division", v: "dead", note: "England. Always yes." },
        { t: "2nd Admin. Division", v: "dead", note: "Greater London. Always yes." },
        { t: "3rd Admin. Division", v: "strong",
          note: "The London borough — the best matching question on this board. Zone 1 spans nine: Westminster, Camden, Islington, Hackney, Tower Hamlets, the City, Southwark, Lambeth, and Kensington & Chelsea." },
        { t: "4th Admin. Division", v: "situational",
          note: "Wards. Small enough that the answer is almost always no, which makes it a proximity check rather than a partition." }
      ]},
      { name: "Natural", items: [
        { t: "Mountain", v: "dead", note: "The nearest thing that qualifies is in Wales or the Peak District — the same one for all 67 stations." },
        { t: "Landmass", v: "dead", note: "Great Britain. Always yes." },
        { t: "Park", v: "strong",
          note: "Royal parks and garden squares are dense here. Agree in advance whether squares count, or the question collapses to Hyde, Regent's and St James's." }
      ]},
      { name: "Places of interest", items: [
        { t: "Amusement Park", v: "dead", note: "Chessington and Thorpe Park are both about 25 km southwest. Same answer everywhere." },
        { t: "Zoo", v: "dead", note: "London Zoo is the only one for miles. Always yes." },
        { t: "Aquarium", v: "dead", note: "Sea Life at County Hall is the only one. Always yes." },
        { t: "Golf Course", v: "situational",
          note: "Courses ring the city, so this reads as a crude compass bearing — and few people can answer it without looking it up." },
        { t: "Museum", v: "strong",
          note: "Zone 1 has dozens, unevenly spread. Agree whether galleries count before you ask, not after." },
        { t: "Movie Theater", v: "strong",
          note: "Cinemas cluster in the West End and scatter elsewhere, which makes for an awkward and informative partition." }
      ]},
      { name: "Public utilities", items: [
        { t: "Hospital", v: "strong",
          note: "UCLH, Guy's, St Thomas', Great Ormond Street, Moorfields, St Mary's, Chelsea & Westminster — enough of them, spread widely enough, to bite." },
        { t: "Library", v: "strong",
          note: "Dense once borough libraries count. Say whether university and private libraries are in." },
        { t: "Foreign Consulate", v: "strong",
          note: "London's signature question: around 160 embassies packed into Mayfair, Belgravia and Kensington. Razor sharp in the west, blunt east of the City where the nearest is a long walk." }
      ]}
    ]
  },

  {
    n: 2, cat: "Measuring", draw: 3, pick: 1, minutes: 5, colour: "#059669",
    prompt: "Compared to me, are you closer to or further from ______?",
    how: "Measuring splits the board along the line halfway between you and the target. A **distant** landmark gives a clean straight cut whose direction you get to choose; a **single landmark inside Zone 1** gives a ring around itself. Dense features give you nothing — the exact opposite of Matching.",
    groups: [
      { name: "Transit", items: [
        { t: "A Commercial Airport", v: "strong", note: "London City for the whole board, so this reads as a clean east/west cut." },
        { t: "A High Speed Train Line", v: "strong",
          note: "HS1, out of St Pancras towards Stratford. A north/south cut, and one of the few things that separates King's Cross from the river." },
        { t: "A Rail Station", v: "dead", note: "You are never more than a few hundred metres from one. Pure noise." }
      ]},
      { name: "Borders", items: [
        { t: "An International Border", v: "situational",
          note: "The Channel, to the southeast. A clean northwest/southeast cut in principle — expect an argument about where exactly the border is." },
        { t: "A 1st Admin. Div. Border", v: "situational",
          note: "England's border, so Wales to the west. Duplicates the airport cut and is harder to answer." },
        { t: "A 2nd Admin. Div. Border", v: "situational",
          note: "The Greater London boundary, 15–25 km out in every direction. Informative, but the nearest edge can differ between the two of you, which makes it easy to answer wrongly." }
      ]},
      { name: "Natural", items: [
        { t: "Sea Level", v: "situational",
          note: "Elevation. London is flat but not level — the ground climbs from the river terraces up towards Islington and Bloomsbury. Real signal, but you need a topographic map to answer honestly." },
        { t: "A Body of Water", v: "strong",
          note: "The Thames, and the best measuring question in London. It runs straight through the board and everyone can see it. Note it tells you how far from the river they are, not which side — pair it with a borough match." },
        { t: "A Coastline", v: "situational",
          note: "Turns entirely on whether the tidal Thames counts as coastline. Settle it first: if yes, this duplicates the body-of-water question; if no, it is an east/west cut towards the estuary." },
        { t: "A Mountain", v: "situational", note: "Wales, to the west. A crude east/west cut and nothing more." },
        { t: "A Park", v: "dead", note: "Parks and squares are everywhere here; you are both a few hundred metres from one." }
      ]},
      { name: "Places of interest", items: [
        { t: "An Amusement Park", v: "strong",
          note: "Chessington and Thorpe Park, both southwest — a northeast/southwest diagonal that none of the other questions give you." },
        { t: "A Zoo", v: "strong",
          note: "London Zoo is inside the board, in Regent's Park, so this draws a ring around the northwest rather than a straight line." },
        { t: "An Aquarium", v: "strong",
          note: "Sea Life at County Hall, beside Waterloo — another inside-the-board target, ringing the south bank." },
        { t: "A Golf Course", v: "situational", note: "Courses ring the city, so the nearest varies by bearing. Hard to answer without looking it up." },
        { t: "A Museum", v: "dead", note: "Too many, too evenly spread." },
        { t: "A Movie Theater", v: "dead", note: "Same problem — cinemas are everywhere in Zone 1." }
      ]},
      { name: "Public utilities", items: [
        { t: "A Hospital", v: "dead", note: "Dense enough that the comparison is close to a coin flip." },
        { t: "A Library", v: "dead", note: "Same." },
        { t: "A Foreign Consulate", v: "strong",
          note: "The embassy belt runs Mayfair–Belgravia–Kensington, so this is effectively 'how far west are you', measured against a cluster instead of a point." }
      ]}
    ]
  },

  {
    n: 3, cat: "Thermometer", draw: 2, pick: 1, minutes: 5, colour: "#dc2626",
    prompt: "I've just traveled (at least) ______. Am I hotter or colder?",
    how: "The seekers move first, then ask. On a 6 km board the whole game is in the 1 km row — the larger distances belong to the medium and large games and take you off the map.",
    groups: [
      { name: "All games", items: [
        { t: "1 km", v: "strong", note: "The workhorse here. A kilometre is a long block or two tube stops: far enough to move the needle, short enough to stay on the board." },
        { t: "5 km", v: "situational", note: "Five km crosses most of Zone 1 and puts you outside it. Use it once, early, to pick a half — never to close in." }
      ]},
      { name: "Add for medium & large", items: [
        { t: "15 km", v: "dead", note: "Not for a Zone 1 game. Fifteen km puts you in Zone 4." }
      ]},
      { name: "Add for large", items: [
        { t: "75 km", v: "dead", note: "Not for a Zone 1 game. Seventy-five km is Brighton." }
      ]},
      { name: "House option", items: [
        { t: "500 m", v: "strong", house: true,
          note: "Not on the pad. The pad's smallest step is 1 km because the printed game assumes a far bigger board; 500 m is roughly one Zone 1 circle and makes the endgame playable. Agree it before the round or leave it out." }
      ]}
    ]
  },

  {
    n: 4, cat: "Radar", draw: 2, pick: 1, minutes: 5, colour: "#2563eb",
    prompt: "Are you within ______ of me?",
    how: "Zone 1 is about 6 km across, so everything from 10 km up is always yes. The live rows are the first four and CHOOSE.",
    groups: [
      { name: "All games", items: [
        { t: "500 m", v: "strong", note: "Endgame only. A yes puts you on their circle or inside it." },
        { t: "1 km", v: "strong", note: "The standard follow-up once you have narrowed to a half of the board." },
        { t: "2 km", v: "strong", note: "Covers roughly a third of Zone 1 from a central point. The best opening radar." },
        { t: "5 km", v: "situational", note: "Covers nearly the whole board from the middle. Only worth asking from an edge — Earl's Court, Vauxhall, Aldgate." },
        { t: "10 km", v: "dead", note: "Always yes." },
        { t: "15 km", v: "dead", note: "Always yes." },
        { t: "40 km", v: "dead", note: "Always yes." },
        { t: "80 km", v: "dead", note: "Always yes." },
        { t: "160 km", v: "dead", note: "Always yes." },
        { t: "CHOOSE", v: "strong",
          note: "Name your own distance, and on this board that is usually the row you want: 1.5 km to split a cluster, 700 m when you think you are close." }
      ]}
    ]
  },

  {
    n: 5, cat: "Tentacles", draw: null, pick: null, minutes: null, colour: "#ea580c",
    prompt: "Of these, which are you closest to?",
    missing: "Page 5 of your pad is not transcribed yet — photograph it and I'll replace the list below with the printed one, costs and all. Everything here is a house suggestion.",
    how: "Tentacles names a set and asks which member is nearest. In Zone 1 the set wants to be six or so landmarks spread across the board.",
    groups: [
      { name: "House sets", items: [
        { t: "Mainline termini: Paddington · Euston · King's Cross · Liverpool Street · Waterloo · Victoria", v: "strong", house: true,
          note: "Six points ringing the board. Close to a perfect partition of Zone 1." },
        { t: "Royal parks: Hyde · Green · St James's · Regent's · Kensington Gardens", v: "strong", house: true,
          note: "Weighted to the west, so a good follow-up once you know they are not in the City." },
        { t: "Bridges: Tower · London · Blackfriars · Waterloo · Westminster · Vauxhall", v: "strong", house: true,
          note: "Strings out east to west along the river. Devastating against a south-bank hider." },
        { t: "Landmarks: The Shard · St Paul's · The Eye · Big Ben · The Gherkin · Marble Arch", v: "strong", house: true,
          note: "Everyone can name these without a map, which keeps the answer fast and honest." }
      ]}
    ]
  },

  {
    n: 6, cat: "Photo", draw: null, pick: null, minutes: null, colour: "#0891b2",
    prompt: "Send a photo of ______.",
    missing: "Page 6 of your pad is not transcribed yet — photograph it and I'll replace the list below with the printed one, costs and all. Everything here is a house suggestion.",
    how: "The hider photographs what is asked, without zooming, cropping or moving. The Zone 1 twist is that almost any wide shot gives away a landmark.",
    groups: [
      { name: "House sets", items: [
        { t: "The sky, straight up", v: "strong", house: true, note: "Reveals how built-up the street is, and often a roofline." },
        { t: "The ground you are standing on", v: "strong", house: true, note: "Paving, cobbles or tarmac narrows the district more than you would think." },
        { t: "The tallest building you can see", v: "strong", house: true, note: "Brutal in Zone 1 — the Shard, the Gherkin and the BT Tower are each visible from limited arcs." },
        { t: "The widest street you can see, down its length", v: "strong", house: true, note: "Nearly always names the street outright." },
        { t: "The nearest tree", v: "situational", house: true, note: "Cheap for the hider — a plane tree is a plane tree anywhere in London." },
        { t: "Three metres in front of you", v: "situational", house: true, note: "Mostly a test of whether they are indoors." }
      ]}
    ]
  }
];
