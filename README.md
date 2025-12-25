# Game Development Portfolio

A modern, sci-fi themed portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Matte Black Theme**: Sleek dark design with neon green accents
- **Sci-Fi Aesthetic**: Grid backgrounds, animated elements, and futuristic UI
- **Fully Responsive**: Mobile-first design that works on all devices
- **Static SPA**: Optimized for static hosting and fast performance
- **Smooth Animations**: Framer Motion powered transitions and effects

## Pages

- **Home**: Hero section with animated elements and expertise showcase
- **About**:
  - Two main tabs: "About Synthetics" (game lore) and "About the Author" (personal profile)
  - About Synthetics includes nested tabs: Lore, Factions, Game Mechanics, and Concept Art gallery
  - Professional profile, skills, and experience timeline
- **Follow Development**:
  - Two tabs: "Projects" and "Track Development"
  - Projects tab: Showcase with filtering and development updates
  - Track Development tab: Interactive Gantt chart timeline for development progress
- **Contact**: Contact form with enquiry type selection (Business/Personal) and social links

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

### Export Static Site

```bash
npm run export
```

This will generate a static site in the `out` directory.

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Emoji-based (can be replaced with icon library)

## Customization

### Colors

Edit the color scheme in [tailwind.config.ts](tailwind.config.ts):

```typescript
colors: {
  'neon-green': '#CCFF00',
  'neon-cyan': '#00FFFF',
  'dark-bg': '#0A0A0A',
  'dark-card': '#1A1A1A',
}
```

### Content

- **Projects**: Update in [app/development/page.tsx](app/development/page.tsx)
- **Gantt Chart Data**: Edit [public/data/gantt-data.json](public/data/gantt-data.json) to update development timeline
- **Game Lore**: Modify factions, mechanics, and lore in [app/about/page.tsx](app/about/page.tsx)
- **Skills & Experience**: Update in the "About the Author" section in [app/about/page.tsx](app/about/page.tsx)
- **Hero Text**: Edit in [app/page.tsx](app/page.tsx)
- **Contact Form**: Modify form handler in [app/contact/page.tsx](app/contact/page.tsx)

### Updating Gantt Chart

The development timeline is loaded from `public/data/gantt-data.json`. To update:

1. Edit the JSON file directly or replace it with a new version
2. The Gantt chart will automatically reflect changes on page reload
3. Since this is a static site, you can update the file and rebuild/redeploy

JSON structure:
```json
{
  "tasks": [
    {
      "id": "1",
      "name": "Task Name",
      "start": "2024-01-01",
      "end": "2024-02-15",
      "progress": 100,
      "category": "development",
      "assignee": "Team Member"
    }
  ],
  "milestones": [
    {
      "date": "2024-02-15",
      "name": "Milestone Name"
    }
  ]
}
```

Available categories: `analysis`, `design`, `development`, `testing`, `art`

## Deployment

This site can be deployed to any static hosting service:

- **Vercel**: `vercel`
- **Netlify**: Drag and drop the `out` folder
- **GitHub Pages**: Push the `out` folder to `gh-pages` branch
- **AWS S3**: Upload the `out` folder

## License

MIT
