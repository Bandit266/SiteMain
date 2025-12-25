# Gantt Chart Styling Guide

## Current Style: Dystopian High-Tech

### Color Palette (Aligned with Concept Art)
- Background: `#0a0e14` (Very dark blue-black)
- Grid Lines: `#1a2832` (Dark teal - subtle)
- Header Background: `#0f1419` (Darker teal)
- Scrollbar Track: `rgba(196, 30, 58, 0.1)` (Crimson tint)
- Scrollbar Thumb: `rgba(196, 30, 58, 0.3)` (Darker crimson)

### Task Bar Colors (Muted/Sophisticated)
- Design: `#4a5568` → `#5a6a7a` (Muted steel blue)
- Development: `#6b3030` → `#8b4040` (Muted crimson)
- Testing: `#3d5a4a` → `#4d6a5a` (Muted green)
- Marketing: `#5a4a6b` → `#6a5a7b` (Muted purple)
- Default: `#3a4a5a` → `#4a5a6a` (Neutral gray-blue)

### Hover Effects
- Border Glow: `box-shadow: 0 0 8px ${categoryColor}80`
- Brightness Increase: `filter: brightness(1.2)`
- Tooltip Background: `rgba(15, 20, 25, 0.95)` with crimson border
- Tooltip Text: White with word-wrap enabled

### Typography
- Font Family: `'Space Mono', 'Courier New', monospace`
- Header Font Size: `11px` (compact)
- Task Name: `12px` (readable)
- Tooltip: `13px` (slightly larger for readability)

### Grid & Layout
- Row Height: `40px` (compact but readable)
- Column Width: Dynamic based on view (3/12 months)
- Grid Line Width: `1px`
- Grid Line Style: `solid` with low opacity

### Scrollbar Styling
```css
/* Track */
background: rgba(10, 14, 20, 0.8);
border: 1px solid rgba(196, 30, 58, 0.2);

/* Thumb */
background: linear-gradient(180deg, rgba(196, 30, 58, 0.3), rgba(196, 30, 58, 0.5));
border-radius: 2px;
width: 8px;

/* Thumb Hover */
background: linear-gradient(180deg, rgba(196, 30, 58, 0.5), rgba(196, 30, 58, 0.7));
```

## Future Faction-Based Styles

### Faction: Crimson Syndicate
- Primary Color: `#c41e3a` (Crimson red)
- Accent: `#e63946` (Bright crimson)
- Task Bars: Red gradient with pulse effect
- Grid Lines: Red glow
- Theme: Aggressive, military, alert status

### Faction: Teal Corps
- Primary Color: `#1a8b9d` (Teal)
- Accent: `#2eb8d1` (Bright teal)
- Task Bars: Cool blue-green gradients
- Grid Lines: Teal circuits
- Theme: Corporate, clean, technological

### Faction: Neon Underground
- Primary Color: `#b026ff` (Purple)
- Accent: `#ff00ff` (Magenta)
- Task Bars: Vibrant neon gradients with scanlines
- Grid Lines: Pulsing neon
- Theme: Rebellious, chaotic, underground

### Faction: Steel Legion
- Primary Color: `#6b7280` (Steel gray)
- Accent: `#9ca3af` (Light gray)
- Task Bars: Metallic gradients
- Grid Lines: Industrial mesh pattern
- Theme: Industrial, mechanical, utilitarian

### Faction: Gold Empire
- Primary Color: `#d97706` (Amber/Gold)
- Accent: `#fbbf24` (Bright gold)
- Task Bars: Warm golden gradients
- Grid Lines: Ornate patterns
- Theme: Luxury, power, ancient tech

## Tooltip Improvements

### Current Issues
- Text overflows outside tooltip box
- No word wrapping

### Solution
```css
.gantt-tooltip {
  max-width: 300px;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  padding: 12px;
  line-height: 1.5;
}
```

### Enhanced Tooltip Layout
```
┌─────────────────────────┐
│ ▸ TASK_NAME_HERE       │
│                         │
│ Category: Design        │
│ Progress: 65%           │
│ Status: In Progress     │
│                         │
│ [████████░░] 65%       │
│                         │
│ Dependencies:           │
│ • Task A                │
│ • Task B                │
└─────────────────────────┘
```

## Settings Configuration (For Future Implementation)

```json
{
  "ganttStyle": {
    "theme": "dystopian-hightech",
    "faction": null,
    "customColors": {
      "background": "#0a0e14",
      "grid": "#1a2832",
      "accent": "#c41e3a"
    },
    "density": "compact",
    "animations": true,
    "tooltipDelay": 200
  }
}
```

## Implementation Notes

1. Save user preference in localStorage (or cookies if implemented)
2. Allow style switching via dropdown in settings
3. Smooth transition between themes (300ms fade)
4. Preserve selected faction style across sessions
5. Export/import custom color schemes
