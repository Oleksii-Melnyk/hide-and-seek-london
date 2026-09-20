/* The Zone 1 house deck.
 *
 * A companion to a physical deck, not a replacement: the numbers are sized
 * for a 6 km board and the curses are London-specific. `note` is our
 * reasoning for the card, not a claim about any printed one — compare it
 * against your own deck and cut whatever duplicates it.
 *
 * type: "time" | "power" | "curse"
 * qty:  copies in the deck        cost: cards the hider discards to cast
 */
window.DECK = [
  /* ---------- TIME BONUSES : ~40% of the deck ---------- */
  { type: "time", title: "+2 minutes", qty: 8, value: 2,
    text: "Bank face up. Adds 2 minutes to the hider's final time.",
    note: "Sized for a round of 45 to 90 minutes. A regional game's bonuses are measured in half-hours; a card worth that here would decide the game on its own." },
  { type: "time", title: "+4 minutes", qty: 6, value: 4,
    text: "Bank face up. Adds 4 minutes to the hider's final time." },
  { type: "time", title: "+6 minutes", qty: 4, value: 6,
    text: "Bank face up. Adds 6 minutes to the hider's final time." },
  { type: "time", title: "+10 minutes", qty: 2, value: 10,
    text: "Bank face up. Adds 10 minutes to the hider's final time.",
    note: "The only card worth holding a hand-limit slot for." },

  /* ---------- POWERUPS ---------- */
  { type: "power", title: "Randomise", qty: 3,
    text: "Play when a question is asked. The seekers must withdraw it and ask a different question from the same category." },
  { type: "power", title: "Duplicate", qty: 2,
    text: "Play alongside any other card in your hand. It resolves twice." },
  { type: "power", title: "Discard 1, Draw 2", qty: 3,
    text: "Discard a card face down and draw two. Resolve hand limit afterwards." },
  { type: "power", title: "Veto", qty: 2,
    text: "Refuse to answer one question outright. The seekers immediately receive a free 800 m Radar answer in compensation.",
    note: "The free radar is the Zone 1 price of a veto — without it, vetoing is strictly too strong on a small board." },
  { type: "power", title: "Free Transfer", qty: 2,
    text: "Relocate on foot to any station whose 400 m circle overlaps your current one, and re-hide there. You may not play this once seekers are inside your circle.",
    note: "New. Zone 1 circles overlap constantly, which makes a short relocation both possible and terrifying for the seekers." },

  /* ---------- CURSES ---------- */
  { type: "curse", title: "Curse of the Oyster Drought", qty: 2, cost: 2,
    text: "For 15 minutes the seekers may not board any TfL service. Feet only.",
    note: "The Zone 1 answer to a long-haul transport curse. Fifteen minutes on foot is about 1.2 km in central London — one radar ring on the pad." },
  { type: "curse", title: "Curse of the Thames Crossing", qty: 2, cost: 2,
    text: "Before their next question, the seekers must cross the Thames on foot over a bridge, and come back over a different one.",
    note: "New, and the single best London curse: the river splits the board and the bridges are 400–800 m apart." },
  { type: "curse", title: "Curse of the Zone 2 Exile", qty: 1, cost: 3,
    text: "The seekers must travel to any Zone 2 station, photograph its roundel, and return to Zone 1 before asking another question.",
    note: "New. The most expensive curse in the deck; expect to lose 20 minutes of seeker time." },
  { type: "curse", title: "Curse of the Circle Line", qty: 2, cost: 3,
    text: "At the next station the seekers enter, they must board a Circle, District, Hammersmith & City or Metropolitan train and ride at least four stops in one direction before they may ask a question.",
    note: "New. Note that it is the hider who picks nothing — the seekers pick the direction, and usually pick wrong." },
  { type: "curse", title: "Curse of the Right Turn", qty: 2, cost: 2,
    text: "For 10 minutes, at every junction the seekers must go straight on or turn right. Never left.",
    note: "London's streets are not a grid, so ten minutes of this does the damage half an hour would do on one." },
  { type: "curse", title: "Curse of the Drained Brain", qty: 2, cost: 2,
    text: "Until the seekers have asked and been answered one more question, they may not consult any map, paper or digital — including this app.",
    note: "Short fuse on purpose: Zone 1 is navigable from memory, so a long one just slows the game without biting." },
  { type: "curse", title: "Curse of the Bus Replacement", qty: 2, cost: 2,
    text: "For 20 minutes the seekers may use buses and their feet, but no rail of any kind.",
    note: "New. Milder than the Oyster Drought and often funnier — Zone 1 bus routes are slower than walking." },
  { type: "curse", title: "Curse of the Monopoly Board", qty: 2, cost: 2,
    text: "Before their next question, the seekers must set foot on a street named on the London Monopoly board and photograph its street sign.",
    note: "New. Old Kent Road is out of bounds; everything else on the board is inside Zone 1, which is the joke." },
  { type: "curse", title: "Curse of the Blue Plaque", qty: 2, cost: 1,
    text: "The seekers may not ask another question until they photograph a blue plaque and read out who it commemorates.",
    note: "New. There are ~1,000 in Zone 1, so this is a 5-minute tax, not a wall." },
  { type: "curse", title: "Curse of the Escalator Etiquette", qty: 2, cost: 1,
    text: "For 20 minutes the seekers must stand still on the right of every escalator. No walking up or down one.",
    note: "New. Cheap, thematic, and genuinely costly during rush hour at Bank or King's Cross." },
  { type: "curse", title: "Curse of the Lost Tourist", qty: 2, cost: 1,
    text: "One seeker must ask a stranger for directions to a landmark of the hider's choosing, and the group must follow those directions for 3 minutes.",
    note: "The cheap social curse. Londoners give confident directions and are wrong about a third of the time." },
  { type: "curse", title: "Curse of the Pigeon Parliament", qty: 1, cost: 2,
    text: "All seekers must stand inside one named square — Trafalgar, Leicester, Russell, Soho or Golden — for 5 unbroken minutes.",
    note: "New. The hider names the square, so it doubles as a way to pull seekers off a good line." },
  { type: "curse", title: "Curse of the Endless Queue", qty: 1, cost: 1,
    text: "The seekers must join the longest queue they can see and stay in it until they reach the front, or for 5 minutes, whichever comes first.",
    note: "New." },
  { type: "curse", title: "Curse of the Ravenous Seeker", qty: 2, cost: 2,
    text: "Each seeker must buy and finish one item of food before the next question. It must come from a place the hider names the type of — bakery, street cart, or chain coffee shop.",
    note: "The hider naming the venue type is what stops this being a 60-second Pret stop." },
  { type: "curse", title: "Curse of the Statue Salute", qty: 2, cost: 1,
    text: "The seekers must photograph themselves imitating the pose of any public statue.",
    note: "New. Pure tax, no navigation cost — good to dump a spare card into." },
  { type: "curse", title: "Curse of the Unhelpful Compass", qty: 1, cost: 3,
    text: "The hider names two compass directions. For 15 minutes the seekers may only travel in those two directions.",
    note: "Devastating when the seekers are on the wrong side of the river, which is why it costs three." },
  { type: "curse", title: "Curse of the Redacted Answer", qty: 1, cost: 3,
    text: "Choose one question already asked and answered. The seekers must play as if it was never answered, and may not ask that exact question again.",
    note: "Save it for the Measuring answer that gave you away — a draw-3 question costs the seekers far more than three cards cost you." }
];
