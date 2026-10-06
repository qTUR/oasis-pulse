# Oasis Pulse · نبض الواحة

A small desert creature, an open horizon, and the rhythm of the dunes. Hold to dive into the sand. Release on a rising slope to launch. Hold in flight to return to the dunes.

## Run

Requires Node.js 20 or newer and Microsoft Edge for the browser checks.

```sh
npm ci
npm run build
npm start
```

The preview runs on port 8786. The build produces `dist/artifact`, `dist/youtube`, and `dist/pages`. Each includes a standalone HTML game with embedded code and fonts. Only the YouTube SDK uses an external request. The Pages build also needs `og.png`, copied from `assets/og.png` when present.

## Controls

- Touch or hold the mouse anywhere in the world to dive.
- Hold Space or Arrow Up for the same action.
- Release to launch; a rising slope gives extra height.
- Escape pauses. The on-screen controls provide restart, sound and language.

## Current content

Twenty-four short trails across six regions, endless trails, four upgrades, collectible dew and fruit, three-star goals, a new-sunrise progression reset, Arabic and English, procedural music and sound, and optional rewarded advertisements within YouTube.

This is a playable first edition. The initial route takes approximately seven to eight minutes in the timing simulation. Replay goals and endless play add time, but a multi-hour campaign is not established. Real-device mobile performance, a formal proof over every continuous physical state, and acceptance by YouTube are not certified.

## Checks

```sh
npm test
npm run test:browser
npm run test:layout
npm run export:art
```

Checks copy the build before exercising it. The browser run intercepts the SDK URL, supplies a host fixture, uses real key events, and progresses through all trails. It checks readiness order, storage reload, pause/resume, host audio, reward cancellation/completion and interstitial timing. The physics checks cover 300 endless seeds, six power configurations and 120 restart checks. Restart returns to a known initial state; those checks are not an exhaustive exploration of the continuous state space.

## Distribution

Source belongs on `main`; only the Pages build belongs on `gh-pages`. The intended address is `https://qtur.github.io/oasis-pulse/`. A local preview is not confirmation that this public address is live.

The bundled font and rendering dependency retain their license files in every distribution.
