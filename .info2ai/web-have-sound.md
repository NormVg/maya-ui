# @thenormvg/web-have-sounds

A professional, zero-dependency JavaScript/TypeScript library for generating UI sound effects entirely through mathematics via the native Web Audio API.

[![npm version](https://img.shields.io/npm/v/@thenormvg/web-have-sounds.svg)](https://npmjs.com/package/@thenormvg/web-have-sounds)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

No `.wav`, `.mp3`, or `.ogg` files to load. No network requests. Perfect for adding high-quality, interactive sonic feedback to your web apps, dashboards, and games without bloating your bundle size.

## Features
- 🪶 **Zero dependencies**: Extremely lightweight.
- ⚡ **Instant playback**: No buffering or audio decoding delays.
- 🎨 **Themable "Feels"**: 9 distinct sonic palettes (e.g., *aero*, *arcade*, *glass*).
- 🎛️ **Fully Parameterized**: Pass your own mathematical parameters to sculpt unique sound profiles.
- ⚛️ **Framework Agnostic**: Works perfectly with React, Vue, Svelte, Angular, or Vanilla JS.

---

## Installation

Install via your preferred package manager:

```bash
npm install @thenormvg/web-have-sounds
# or
yarn add @thenormvg/web-have-sounds
# or
pnpm add @thenormvg/web-have-sounds
```

---

## Quick Start

Import `playUISound` and trigger it inside any user interaction (click, keyboard press, etc.).

```javascript
import { playUISound } from '@thenormvg/web-have-sounds';

// Attach to a button click
document.querySelector('#submit-btn').addEventListener('click', () => {
  // Plays a "pop" sound using the default "aero" theme
  playUISound('pop');
});
```

> **Note on Browser Autoplay Policies:**
> The Web Audio API operates in a suspended state until the user interacts with the page (e.g., clicking or tapping). Ensure you call `playUISound()` as a direct or indirect result of a user interaction.

---

## Sound Types
Choose from 9 distinct UI sound categories depending on the context of the user interaction:

- `click`: Standard, short, crisp UI click.
- `pop`: A rounded, bubbly interaction appropriate for toggles or badges.
- `toggle`: Dual-tone mechanism.
- `tick`: Extremely brief high-frequency transient.
- `drop`: A descending pitch, great for modal closes or dismissing items.
- `success`: An ascending, uplifting multi-tone chime.
- `error`: A dissonant, descending dual-oscillator buzz.
- `warning`: A serious, attention-grabbing dual-tone sequence.
- `startup`: An extended, layered chord sequence.

---

## Palettes and "Feels"
You can alter the global character of your sounds by passing a "Feel" as the second argument. A Feel acts as a preset for oscillators, EQ filters, timing multipliers, and pitches.

```javascript
import { playUISound } from '@thenormvg/web-have-sounds';

playUISound('success', 'arcade'); // 8-bit, retro console style
playUISound('success', 'soft');   // Gentle, sine-wave dominant
playUISound('success', 'glass');  // High-frequency, resonant
```

Available Feels:
`aero` (Default), `soft`, `arcade`, `organic`, `glass`, `industrial`, `minimal`, `retro`, `crisp`

---

## Advanced Usage: Custom Parameters
If you want granular control, you can bypass the preset Feels and pass your own `FeelParams` object.

```javascript
import { playUISound } from '@thenormvg/web-have-sounds';

playUISound('toggle', {
    filterFreq: 4000,     // Lowpass/Bandpass cutoff frequency in Hz
    q: 5,                 // Filter resonance
    oscType: "square",    // "sine", "square", "sawtooth", "triangle"
    decayMult: 0.2,       // Speed multiplier (lower is faster)
    gainMult: 1.0,        // Volume multiplier
    pitchMult: 2.0        // Global pitch multiplier (higher is squeakier)
});
```

## Custom AudioContext Control
By default, `web-have-sounds` manages a global, singleton `AudioContext` to handle playback efficiency. If you are integrating this into a larger audio application (like a game engine or a WebGL environment) where you manage your own `AudioContext`, you can pass it as the third argument.

```javascript
const myCustomCtx = new window.AudioContext();

// Play the sound within your specific Audio Graph routing
playUISound('warning', 'industrial', myCustomCtx);
```

---

## API Reference

### `playUISound(type, feelOrParams?, ctx?)`
Plays a generated UI sound.
*   **`type`**: `SoundType` *(Required)*
*   **`feelOrParams`**: `FeelType | FeelParams` *(Optional, Default: 'aero')*
*   **`ctx`**: `AudioContext` *(Optional)*

### Types Provided
```typescript
type SoundType = "click" | "pop" | "toggle" | "tick" | "drop" | "success" | "error" | "warning" | "startup";
type FeelType = "soft" | "aero" | "arcade" | "organic" | "glass" | "industrial" | "minimal" | "retro" | "crisp";

interface FeelParams {
    filterFreq: number;
    q: number;
    oscType: OscillatorType;
    decayMult: number;
    gainMult: number;
    pitchMult: number;
}
```

---

## License
MIT License