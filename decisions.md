# Przykona Spot — Implementation Decisions

## 1. Przykona index page
**Decision:** Create an index page with placeholder description text, structured like Jeziorsko's index (general info cards).
**Reasoning:** No detailed content available yet; placeholders let us ship the structure now and fill in content later.

## 2. Top-level navigation
**Decision:** Add Przykona as a top-level nav item: `Kite Łódź | Jeziorsko | Przykona | Kontakt`.
**Reasoning:** Przykona is another spot location at the same level as Jeziorsko. All existing pages need their navLinks updated.

## 3. Sub-navigation
**Decision:** Przykona's index page has a "Spoty" sub-nav link, consistent with Jeziorsko. No "Pogoda" page.
**Reasoning:** Keeps navigation patterns consistent across spot locations. Leaves room for future sub-pages.

## 4. Individual spot pages (południe, północ)
**Decision:** Same layout as Jeziorsko spot pages — description placeholder, pros/cons placeholders, gallery from provided photos, wind directions, map image with legend, and Dojazd button.
- **Południe** wind directions: W, NW
- **Północ** wind directions: W, SW
**Reasoning:** Consistent UX across all spots. Placeholders for text content to be filled in later.

## 5. Images
**Decision:** Convert all provided images (JPEG/PNG) to WebP format, place in `public/assets/`.
**Reasoning:** Consistency with existing Jeziorsko assets and better performance.

## 6. Dojazd coordinates
**Decision:** Use coordinates from przykona.md for Google Maps directions links.
- Południe: 52.000246042682264, 18.653343412701442
- Północ: 52.007886099992014, 18.652700530662305
**Reasoning:** These are the provided spot positions.

## 7. Spoty map page
**Decision:** Create a Leaflet map page with markers for both spots, same as Jeziorsko's spoty.astro.
**Reasoning:** Consistent experience across spot locations.

## 8. Map legend
**Decision:** Same color-coded legend as Jeziorsko maps (parking, launch zone, danger zone).
**Reasoning:** Map images use the same color coding as Jeziorsko maps.
