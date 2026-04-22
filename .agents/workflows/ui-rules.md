---
description: rules for building good UI — motion, interaction, and design principles
---

# Maya UI — Design & Interaction Rules

These rules are distilled from the reference material in `.info2ai/BEST UI`. Follow them when building or modifying any Maya UI component.
Always go and read them first before starting to make UI and the animations
---

## 1. Hit Areas (Fitts's Law)

Every interactive element must have a generous clickable area.

- **Buttons**: Use `::after` with `position: absolute; inset: -6px;` to invisibly expand the hit target.
- **Checkboxes / Radios**: Use `padding: 4px; margin: -4px;` on the label wrapper.
- **Small icons / close buttons**: Minimum 40×40px touch target. Use pseudo-elements if the visual size must stay small.

> The user can't see the extra padding, but it's there and it's easy to click.

---

## 2. Timing & The Doherty Threshold

Interactions must feel instant. The threshold is **400ms** — above it, users notice lag.

| Interaction type   | Duration    |
|--------------------|-------------|
| Hover / press      | 100–150ms   |
| Small state change | 150–250ms   |
| Panel / modal      | 200–300ms   |
| Page transition    | 250–400ms   |

- **Be consistent**: If buttons transition at 150ms, ALL buttons transition at 150ms.
- If you can't make something fast, make it *feel* fast — use optimistic UI, skeleton screens, or progress indicators.

---

## 3. Easing Curves vs Springs

These are NOT interchangeable. Choose based on the role motion plays:

### Use Easing Curves when:
- The system is announcing a change (toast appearing, panel sliding in)
- Motion is not tied to user input
- You need predictable, fixed-duration animation

**Recommended curves:**
- **Entrances** (ease-out): `cubic-bezier(0.19, 1, 0.22, 1)` — arrives fast, settles gently
- **Exits** (ease-in): `cubic-bezier(0.55, 0.05, 0.68, 0.19)` — builds momentum, gets out of the way
- **Both** (ease-in-out): `cubic-bezier(0.455, 0.03, 0.515, 0.955)` — deliberate transitions

### Use Springs when:
- Motion is reacting to user input (drag, flick, press)
- The interaction can be interrupted mid-animation
- Velocity/energy of the gesture matters

**Starting spring values:**
```
stiffness: 500–900
damping: 30–80
mass: 1–10
```

> If duration feels slow, shorten it before tweaking the curve.

---

## 4. The 12 Principles (Applied to UI)

### Squash & Stretch
- Subtle scale transforms on press: `transform: scale(0.96)` on `:active`.
- Don't overdo it — believability, not cartoon.

### Anticipation
- A button may compress slightly before sending. A pull-to-refresh hints before release.
- Reserve for moments that matter. If every interaction winds up, the app feels sluggish.

### Staging
- When a complex panel opens, guide the eye. Don't animate everything simultaneously.
- Dim backgrounds, stagger children, direct attention to what matters.

### Follow Through & Overlapping Action
- Nothing stops all at once. Use slight overshoot-and-settle (springs are ideal here).
- Stagger child elements, but don't overdo latency.

### Slow In & Slow Out
- Nothing starts or stops instantly. Always use easing (never `linear` for spatial movement).
- `linear` is ONLY for progress bars, loaders, or scrubbing — where it represents time itself.

### Timing
- Keep interactions under 300ms. Anything longer needs a very good reason.
- Be consistent across the same type of element.

### Exaggeration
- Use sparingly for key moments: onboarding, empty states, confirmations, errors.
- Amplify motion beyond physical accuracy to make a point land harder.

### Appeal
- The sum of all techniques applied with care. Make something people love, not just tolerate.

---

## 5. Pseudo-Elements

Use CSS pseudo-elements to add interaction polish without extra DOM nodes:

- `::before` for hover background effects: Set `position: absolute; inset: 0; transform: scale(0.95); opacity: 0;` and animate to `scale(1); opacity: 1` on hover.
- `::after` for expanded hit areas (see Rule 1).
- Keep HTML clean. If it's decorative or interactive polish, it belongs in a pseudo-element.

---

## 6. Animating Container Bounds

When content changes size (accordions, dynamic labels, expanding sections):

- **Never animate `width` / `height` directly** — the browser can't interpolate to `auto`.
- Use a two-div pattern: outer div is animated, inner div is measured.
- Use `ResizeObserver` (or a `useMeasure` composable) to track the inner content's dimensions.
- Guard initial render: `bounds.height > 0 ? bounds.height : 'auto'` to avoid animating from 0.
- **Don't measure and animate the same element** — that creates an infinite loop.

---

## 7. Enter/Exit Animations

When elements mount/unmount:

- Use a presence system (like Motion's `AnimatePresence` or Vue's `<Transition>`) to keep departing elements mounted long enough to animate out.
- Entry: `opacity: 0, scale: 0.95, filter: blur(8px)` → `opacity: 1, scale: 1, filter: blur(0px)`
- Exit: reverse of entry.
- For lists/reordering, use `popLayout` mode to remove exiting elements from flow immediately.
- For sequential transitions, use `wait` mode (but note doubled duration).

---

## 8. Progressive Disclosure (Hick's Law)

- More choices = more cognitive load (logarithmic, not linear).
- Show what matters now. Reveal complexity when needed.
- Don't show 20 options when 5 will do. Curate.

---

## 9. Chunking (Miller's Law)

- Humans hold ~7±2 items in working memory.
- Group and format data: phone numbers, card numbers, currency, serial codes.
- Raw data blobs are the enemy. Always chunk.

---

## 10. Input Tolerance (Postel's Law)

- Be liberal in what you accept, conservative in what you output.
- Accept messy human input, normalize it into clean structured data.
- Users think in meaning, not formats.

---

## 11. Sound (Optional Enhancement)

Sound should complement, never replace visual feedback.

- Use for: confirmations (payments, uploads), errors/warnings, state changes, notifications.
- Keep it subtle, short, and optional. Always provide a toggle.
- Respect `prefers-reduced-motion` as a proxy for reduced-audio preference.
- A button that clicks *feels* faster than one that doesn't — auditory processing is ~10x faster than visual.
- Match the weight of the sound to the weight of the action.

---

## 12. When NOT to Animate

- High-frequency interactions: typing, keyboard nav, fast toggles.
- Context menus: animate on exit, never on entry (Apple's pattern).
- If something doesn't need motion, don't add it. The best animation is sometimes none at all.

---

## 13. Shadows & Subtle Gradients for Depth

Flat UI feels lifeless. Use very subtle shadows and gradients to create layered depth without being loud.

### Shadows
- **Layer multiple box-shadows** for realism — a tight, dark one for the edge + a soft, spread one for ambient glow:
  ```css
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 1px 2px rgba(0, 0, 0, 0.3),
    0 4px 12px rgba(0, 0, 0, 0.2);
  ```
- Use `inset` shadows on inputs/textareas for a recessed feel:
  ```css
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.25);
  ```
- Cards, modals, and dropdowns should always have elevation shadows. Buttons generally don't need them.

### Subtle Gradients
- Use near-invisible linear gradients on surfaces to suggest light direction:
  ```css
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.03) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  ```
- Gradient borders via `border-image` or a pseudo-element with a gradient background give edges a soft metallic quality.
- **Never use harsh, saturated gradients** on dark themes. Keep opacity under 0.05 for background gradients.

### General Rules
- Depth should be felt, not seen. If you can obviously spot the gradient, it's too strong.
- Elevation = importance. Higher shadows on modals/dialogs, minimal on inline elements.
- Combine with `backdrop-filter: blur()` on overlays for a frosted glass effect.

---

## Quick Reference: CSS Defaults for Maya Components

```css
/* Standard transition for interactive elements */
transition: all 0.15s cubic-bezier(0.19, 1, 0.22, 1);

/* Active press feedback */
&:active { transform: scale(0.96); }

/* Extended hit area */
&::after {
  content: '';
  position: absolute;
  inset: -6px;
}

/* Hover background (pseudo-element approach) */
&::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: currentColor;
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.15s ease;
}
&:hover::before {
  opacity: 0.06;
  transform: scale(1);
}
```
