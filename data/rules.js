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
      "Seekers ask one question at a time, from the printed pad. The Questions tab lists the same options with a verdict on each for this board: **strong** is worth the draw, **situational** works but costs you an argument or a map lookup, **dead** returns the same answer everywhere in Zone 1 and tells you nothing."
    ],
    list: [
      "Costs are the pad's: Matching and Measuring are **draw 3, pick 1**; Thermometer and Radar are **draw 2, pick 1**. The hider has **5 minutes** to answer.",
      "Seekers may only ask while **stationary** — not on a moving train.",
      "The hider answers, then draws, keeps the pick, and discards the rest face down.",
      "**Hand limit: 6 cards.** Over the limit, discard down immediately.",
      "The hider may not ask questions, and may not move once they have gone to ground — except when a card says so."
    ]
  },
  {
    title: "Which questions actually work here",
    body: [
      "The pad is built for a board the size of a country, so a third of its options are constant across Zone 1. The two big categories fail in opposite directions, and it is worth knowing which is which before you spend a draw-3.",
      "**Matching** partitions the board into the cells around whatever feature you name, so it needs that feature to be **dense**: borough, nearest tube line, museum, hospital, library, consulate. Anything London has only one of — the zoo, the aquarium, a mountain, a landmass — answers yes every time.",
      "**Measuring** splits the board along the line halfway between you and the target, so it wants the opposite: a **single** target. A distant one (an airport, HS1, the Channel) gives a straight cut whose direction you choose; one inside Zone 1 (London Zoo, the aquarium) gives a ring. Dense features — rail stations, museums, hospitals — are noise."
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
      "The printed game is built for regions, so its ladders run to 160 km. Zone 1 is about 6 km across. On the pad that means the live radar rows are 500 m, 1 km, 2 km and CHOOSE, and the live thermometer row is 1 km — everything above is always yes, or lands you in Zone 4.",
      "The card deck is scaled to match: time bonuses in single-digit minutes rather than half-hours, sized for a round of 45 to 90 minutes.",
      "If your rounds keep ending under 30 minutes, widen the thermometer step first — a 2 km step, or the house 500 m step in reverse — before you touch the time bonuses."
    ]
  }
];
