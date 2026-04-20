# Design System Specification: The Kinetic Vault

## 1. Overview & Creative North Star
This design system is built to transition the Jordanian sports scene from a functional utility to a high-end digital lifestyle. We are moving away from the "generic dashboard" aesthetic and toward a **"Kinetic Vault"**—a space that feels as fast and energetic as an athlete on the pitch, yet as secure and premium as a private clubhouse.

The Creative North Star is **"Sophisticated Velocity."** We break the rigid, boxy templates of standard SaaS by utilizing intentional asymmetry, aggressive typographic scales, and tonal depth. We don't just show data; we curate an atmosphere of athletic excellence.

## 2. Colors & Tonal Architecture
The palette is rooted in a deep, obsidian-emerald foundation. It utilizes a high-contrast relationship between the "Atmospheric Dark" backgrounds and "Radiant Neon" accents to guide the eye toward action.

### The "No-Line" Rule
To achieve a truly premium feel, designers are **prohibited** from using 1px solid borders for sectioning or layout. Boundaries must be defined through:
*   **Background Shifts:** Placing a `surface-container-low` (#171d1a) component onto a `surface` (#0f1512) base.
*   **Tonal Transitions:** Using subtle value changes to define where one thought ends and another begins.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-transparent layers. 
*   **Base:** `surface` (#0f1512)
*   **Secondary Level:** `surface-container` (#1b211e)
*   **Interactive Level:** `surface-container-high` (#252b28)
*   **Elevated/Floating:** `surface-container-highest` (#303633)

### The "Glass & Gradient" Rule
Standard flat colors are for utilities. For hero moments, use **Glassmorphism**: semi-transparent surface tokens with a `20px` to `40px` backdrop-blur. 
*   **Signature Texture:** Apply a subtle linear gradient from `primary` (#65dd93) to `primary-container` (#3fba74) on key interactive surfaces to provide a "lit from within" glow.

## 3. Typography: The Editorial Voice
Our typography balance reflects the duality of sports: the raw power of the athlete (Space Grotesk) and the precision of the data (Inter).

*   **Display & Headlines (Space Grotesk):** Use `-0.04em` letter spacing. This "tight-tracking" creates a high-fashion, editorial impact. Headlines should be unapologetically large to drive a confident brand voice.
*   **Body & Utility (Inter):** Clean, highly legible, and neutral. It acts as the "referee"—present and functional but never distracting.
*   **Local Soul (Cairo):** For Arabic scripts, Cairo provides a modern, geometric counterpart to Space Grotesk, maintaining the "Sport-Tech" vibe across languages.

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are banned. We define depth through **Luminosity**.

### The Layering Principle
Instead of casting a shadow, "lift" a card by moving it up one tier in the surface scale. A `surface-container-low` card sitting on a `surface` background creates a natural, soft separation.

### Ambient Shadows
If a floating element (like a Modal or FAB) requires a shadow, it must be an **Ambient Shadow**:
*   **Blur:** 40px – 80px.
*   **Opacity:** 4% – 8%.
*   **Color:** Use a tinted version of `on-surface` or `primary` rather than pure black to mimic real-world light refraction.

### The "Ghost Border" Fallback
If a border is required for accessibility, use a **Ghost Border**. This is the `outline-variant` token (#3e4a40) set to **15% opacity**. It should be felt, not seen.

## 5. Components: The Building Blocks

### Buttons (The "Glow" Component)
*   **Primary:** Solid `primary_container` (#3fba74) with a soft emerald glow shadow (`box-shadow: 0 10px 20px -5px rgba(63, 186, 116, 0.4)`).
*   **Secondary:** Ghost Border style with `on-surface` text.
*   **Shape:** 12px rounded corners (`md`).

### Cards & Lists
*   **Forbidden:** Horizontal or vertical divider lines.
*   **Requirement:** Separate list items using an 8px vertical gap and a `surface-container` background shift on hover.
*   **Layout:** Use asymmetrical padding (e.g., more padding at the bottom than the top) to create a dynamic, editorial feel.

### Chips (Action & Filter)
*   **Style:** Pill-shaped (`full`).
*   **Active:** `secondary_fixed` (#b6f569) with `on_secondary_fixed` (#102000) text. This high-contrast Lime identifies the "active" state instantly.

### Input Fields
*   **Background:** `surface-container-lowest` (#0a0f0d).
*   **Focus State:** A 1px Ghost Border transitions to 40% opacity, and the label shifts to `primary`. No heavy outlines.

### Specialized Component: The "Match-Card"
Specifically for this design system, match cards should use a **Glassmorphism** overlay on top of a blurred action photo of the sport. This tethers the tech to the physical reality of the field.

## 6. Do's and Don'ts

### Do:
*   **Use breathing room:** If you think there is enough whitespace, add 16px more.
*   **Respect the Arabic script:** Ensure Cairo has proper line-height (1.5x) to accommodate its unique ascenders/descenders.
*   **Layer your surfaces:** Always place higher-priority information on "lighter" (more elevated) surface tokens.

### Don't:
*   **Don't use #000000:** It kills the depth. Use `surface_container_lowest` (#0a0f0d) for the deepest blacks.
*   **Don't use 100% opaque borders:** They create visual "noise" that disrupts the premium, seamless flow.
*   **Don't center everything:** Use left-aligned or asymmetrical layouts to maintain a modern, high-polish tech aesthetic.