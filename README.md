# Hide & Seek — London Zone 1

A single-page web app for playing a Jet Lag-style hide & seek game on London
Zone 1. Open it on a phone, cross stations off as you rule them out, and keep
the rules, the question list and the card deck in the same place.

**Live:** https://oleksii-melnyk.github.io/hide-and-seek-london/

## What it does

- **Map** — all 67 Zone 1 and Zone 1/2 boundary stations (Underground, DLR,
  Thameslink, Overground) each drawn with the 400 m hiding circle. Tap a circle
  to cross the station out; tap again to restore it. Crossings are saved in
  `localStorage`, so the board survives a reload or a dead screen.
- **GPS** — the ◎ button follows your position with an accuracy ring. Needs
  https, which GitHub Pages provides.
- **Search** — jump to any station by name, including ones off screen.
- **Rules / Questions / Deck** — three reference tabs. Questions log what you
  asked and when; the deck is a draw pile with a hand, banked time bonuses and
  a browsable reference of every card.

## Running it

It is static files with no build step. Either open `index.html` directly, or:

```sh
python3 -m http.server 8765    # then http://127.0.0.1:8765
```

Leaflet is vendored in `vendor/leaflet/`; the only network dependency at
runtime is the CARTO basemap tiles.

## Printing the board

`print.html` renders the same station data as a single sheet of line work —
no map tiles, so it prints cleanly in black and white and you can cross
circles off with a pen. Pick A4 or A3 in the toolbar and hit Print, or take
the pre-rendered PDFs in `sheets/`.

Two modes:

- **Line work** — circles, names, a schematic Thames traced through the
  bridges, and nothing else. Prints in black and white on any printer and
  leaves the page clear enough to write on. The pre-rendered PDFs in
  `sheets/` are this mode.
- **Streets** — the same circles over the CARTO basemap, so you get real
  street names. Needs a network connection at print time, and you must
  enable *Background graphics* in the print dialog or the tiles drop out.

Dashed circles are the stations that are not Underground.

## Editing the game

Everything you'd want to tune lives in `data/`, as plain JavaScript:

| file | what's in it |
| --- | --- |
| `data/stations.js` | station names, coordinates, mode |
| `data/rules.js` | the rules tab |
| `data/questions.js` | question categories, draw/keep costs, question text |
| `data/deck.js` | every card: type, quantity, cost, text, and our reasoning for it |
| `data/thames.js` | the schematic river used by the print sheet |

The hiding radius (`RADIUS`) and hand limit (`HAND_LIMIT`) are constants at the
top of `js/app.js`.

## Deploying

Settings → Pages → *Deploy from a branch* → `main` / `/ (root)`. There is no
build step, so nothing else is needed.

## Attribution

Map tiles © [CARTO](https://carto.com/attributions), map data ©
[OpenStreetMap](https://www.openstreetmap.org/copyright) contributors.
The format is adapted from Jet Lag: The Game's *Hide + Seek*; the card text
here is our own.
