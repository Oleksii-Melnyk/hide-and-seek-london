/* House rules for Hide & Seek — London Zone 1.
 * Adapted from the Jet Lag: The Game "Hide + Seek" format for a dense,
 * walkable, single-zone board. Edit freely. */
window.RULES = [
  {
    title: "The board",
    body: [
      "Every station on the map is a legal hiding spot. That is Zone 1 plus the Zone 1/2 boundary stations — 67 in total, including the DLR, Thameslink and Overground stations that the tube map hides.",
      "The hider must be **within the 400 m circle** of exactly one station, reachable on foot by a member of the public. No paid-entry venues, no private buildings, no platforms behind a barrier you'd need a fare to pass."
    ],
    list: [
      "Inside a circle = legal. On the edge = argue about it before the game, not during it.",
      "If two circles overlap, the hider names **one** station as theirs when they go to ground.",
      "Cross a station out on the map once it has been ruled out or searched."
    ]
  },
  {
    title: "Roles and the clock",
    list: [
      "One **hider**, everyone else **seekers**. Seekers travel as one group.",
      "The hider gets a **20-minute head start** from the agreed start station. Zone 1 is small; anything longer and the first questions are worthless.",
      "The clock starts when the head start ends and stops when a seeker is physically inside the hider's 400 m circle **and** names the correct station.",
      "Final score = elapsed time **+ all time bonuses the hider banked**. Lowest time wins when you swap roles."
    ]
  },
  {
    title: "Asking questions",
    body: [
      "Seekers ask one question at a time, from the Questions tab. The hider must answer truthfully and promptly. Answering a question is what pays the hider: each category has a **draw** and a **keep** number."
    ],
    list: [
      "Seekers may only ask a question while **stationary** — not on a moving train.",
      "The hider answers, then draws that category's cards, keeps the allowed number, and discards the rest face down.",
      "**Hand limit: 6 cards.** Over the limit, discard down immediately.",
      "The hider may not ask questions, and may not move once they've gone to ground — except when a card says so."
    ]
  },
  {
    title: "Playing cards",
    list: [
      "**Time bonus** cards are banked face up at any time. They are added to the hider's final time.",
      "**Curses** cost cards: discard the number printed on the card, then read the curse aloud to the seekers. A curse is active the moment it is read.",
      "**Powerups** are played at the moment described on the card.",
      "Only one curse may be active at a time. A seeker under a curse may still travel, unless the curse says otherwise."
    ]
  },
  {
    title: "The endgame",
    list: [
      "Seekers win by being inside the circle and naming the station. A wrong guess inside the circle costs them a **free Radar answer** to the hider — worth +5 minutes.",
      "Once seekers are within 400 m, the hider may not play curses that move the seekers out of the circle.",
      "A hider who has been found reveals their exact spot. Photograph it — half the fun is arguing about whether it was fair."
    ]
  },
  {
    title: "Why the numbers are small",
    body: [
      "The published Jet Lag format is built for regions the size of Japan or Switzerland: radar radii in kilometres, time bonuses in half-hours. Zone 1 is roughly 6 km across, so everything here is scaled down by about an order of magnitude — radar in hundreds of metres, bonuses in single-digit minutes. A good Zone 1 round lands between 45 and 90 minutes.",
      "If your rounds are consistently ending under 30 minutes, widen the thermometer step and the radar radii before you touch the time bonuses."
    ]
  }
];
