# TaskFlow

A modern productivity web app for task management, prioritization, and progress tracking.

**Tech stack:** Next.js 14 · React · TypeScript · Tailwind CSS · Lucide icons

## Features

- Create, complete, and delete tasks
- Priorities: high / medium / low
- Categories (Work, Personal, Study, Health, General)
- Optional description and due date
- Search + filters (status, priority, category)
- Progress stats dashboard
- Persistent storage via `localStorage` (no backend required)
- Responsive, clean UI

## Getting started

```bash
cd taskflow
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project structure

```
taskflow/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── FilterBar.tsx
│   │   ├── Stats.tsx
│   │   ├── TaskForm.tsx
│   │   └── TaskList.tsx
│   ├── lib/
│   │   ├── storage.ts
│   │   └── utils.ts
│   └── types/
│       └── task.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Author

Abdulwaheed Toheeb Olanrewaju  
Portfolio project — Full-Stack / Frontend Development
