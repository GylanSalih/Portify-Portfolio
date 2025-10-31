# Showcase Components

Diese Dokumentation beschreibt die Showcase-Funktionalität der Portfolio-Website.

## Übersicht

Die Showcase-Sektion besteht aus mehreren Komponenten, die zusammenarbeiten, um eine interaktive Galerie von Projekten und Arbeiten zu präsentieren.

## Komponenten

### 1. ShowStart
**Pfad:** `ShowStart/ShowStart.jsx`

Der Split-Screen-Startbildschirm mit zwei scrollbaren Spalten.

**Features:**
- Zwei unabhängig scrollbare Spalten
- Zufällige Anordnung der Bilder bei jedem Laden
- Smooth Scroll-Effekte
- Responsive Design

### 2. ShowGrid
**Pfad:** `ShowGrid/ShowGrid.jsx`

Das Haupt-Grid-Layout für die Showcase-Items.

**Features:**
- Masonry-Grid-Layout (Desktop & Mobile)
- Filter nach Kategorien (All, Web, Design, Art)
- Sortierung (Ordered by Date / Random)
- Toggle für permanente Info-Anzeige
- Animierte Übergänge mit Framer Motion
- Links zu einzelnen Showcase-Seiten

**Props:**
- `data` - Array von Showcase-Items
- `categories` - Array von Kategorien
- `activeCategory` - Aktuell aktive Kategorie
- `setActiveCategory` - Funktion zum Setzen der Kategorie
- `sortOrder` - Sortierreihenfolge ('ordered' oder 'random')
- `setSortOrder` - Funktion zum Setzen der Sortierung
- `showAllInfo` - Boolean für permanente Info-Anzeige
- `setShowAllInfo` - Funktion zum Togglen der Info-Anzeige
- `onOpenSplitView` - Callback zum Öffnen der Split-View

### 3. ShowSingle
**Pfad:** `ShowSingle/ShowSingle.jsx`

Die Einzelansicht für ein Showcase-Item.

**Features:**
- Vollbild-Overlay-Design (ähnlich wie Azuki-Stil)
- Sticky Info-Spalte (Desktop)
- Vertikale Galerie
- Fullscreen Image Viewer mit Navigation
- Keyboard-Navigation (ESC, Arrow Keys)
- Vor/Zurück-Navigation zwischen Items
- Responsive Layout

**URL-Struktur:**
```
/showcase/[slug]
```

Beispiel: `/showcase/akira-bike-design`

## Datenstruktur

Die Showcase-Daten werden zentral in `lib/showcaseData.js` verwaltet.

### Showcase Item Format

```javascript
{
  id: 1,
  slug: 'akira-bike-design',
  title: 'Akira Bike Design',
  date: 'January 2025',
  description: 'Projektbeschreibung...',
  image: '/assets/images/portfolio/Akira1.jpg',
  category: 'art',
  categoryDisplay: 'Digital Art',
  type: 'image',
  wide: true, // Optional: Breite Karte im Grid
  tall: true, // Optional: Hohe Karte im Grid
  tags: ['3D', 'Concept', 'Vehicle'],
  dateObj: new Date('2025-01-15'),
  coverImage: '/assets/images/portfolio/Akira1.jpg',
  gallery: [
    '/assets/images/portfolio/Akira1.jpg',
    '/assets/images/portfolio/City.jpg',
  ]
}
```

### Kategorien Format

```javascript
{
  name: 'All',
  count: 14,
  key: 'all'
}
```

## Navigation Flow

```
/showcase (ShowStart)
    ↓ (Click "View Grid")
/showcase (ShowGrid)
    ↓ (Click auf Card)
/showcase/[slug] (ShowSingle)
    ↓ (Click "Close" oder ESC)
/showcase (zurück zu ShowGrid)
```

## Styling

Alle Komponenten verwenden SCSS-Module mit dem shadcn/ui-inspirierten Design:

**Farben:**
- Background: `#000` (Schwarz)
- Borders: `rgba(255, 255, 255, 0.1-0.4)`
- Text: `#fff` mit verschiedenen Opacity-Werten
- Overlays: `rgba(38, 38, 38, 0.8)`

**Animationen:**
- Framer Motion für Übergänge
- Smooth Scroll für ShowStart
- Hover-Effekte auf Cards

## Neue Items hinzufügen

1. Öffne `src/app/lib/showcaseData.js`
2. Füge ein neues Objekt zum `showcaseData`-Array hinzu
3. Stelle sicher, dass:
   - `slug` einzigartig ist (URL-freundlich)
   - `gallery` mindestens ein Bild enthält
   - `category` einer der existierenden Kategorien entspricht
4. Aktualisiere die Kategorie-Counts in `categories`

## Keyboard Shortcuts

**ShowSingle:**
- `ESC` - Schließt Fullscreen Viewer oder kehrt zurück
- `←` - Vorheriges Bild (im Viewer)
- `→` - Nächstes Bild (im Viewer)

## Responsive Breakpoints

- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## Performance-Optimierungen

- Lazy Loading für Bilder
- Framer Motion Layout-Animationen
- Client-Side-Only Shuffling
- Optimierte Re-Renders mit React.memo (wo nötig)

## Zukünftige Erweiterungen

- [ ] Video-Support in Gallery
- [ ] Lightbox mit Zoom-Funktion
- [ ] Share-Funktionalität
- [ ] Related Projects
- [ ] Filter-Kombinationen
- [ ] Suchfunktion

