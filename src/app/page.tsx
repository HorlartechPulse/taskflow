"use client";

import { useEffect, useMemo, useState } from "react";
import { Stats } from "@/components/Stats";
import { TaskForm } from "@/components/TaskForm";
import { FilterBar } from "@/components/FilterBar";
import { TaskList } from "@/components/TaskList";
import { loadTasks, saveTasks } from "@/lib/storage";
import { uid } from "@/lib/utils";
import type { FilterPriority, FilterStatus, Priority, Task } from "@/types/task";

const SEED: Task[] = [
  {
    id: "1",
    title: "Design landing page mockups",
    description: "Create high-fidelity frames for hero and pricing",
    completed: true,
    priority: "high",
    status: "done",
    category: "Work",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Set up authentication flow",
    description: "Email/password + session handling",
    completed: false,
    priority: "high",
    status: "in_progress",
    category: "Work",
    dueDate: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Write API documentation",
    completed: false,
    priority: "medium",
    status: "todo",
    category: "Study",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Review pull requests",
    completed: false,
    priority: "low",
    status: "todo",
    category: "Work",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState<FilterStatus>("all");
  const [priority, setPriority] = useState<FilterPriority>("all");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const stored = loadTasks();
    setTasks(stored.length ? stored : SEED);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveTasks(tasks);
  }, [tasks, hydrated]);

  function addTask(data: {
    title: string;
    description?: string;
    priority: Priority;
    category: string;
    dueDate?: string;
  }) {
    const now = new Date().toISOString();
    const task: Task = {
      id: uid(),
      title: data.title,
      description: data.description,
      completed: false,
      priority: data.priority,
      status: "todo",
      category: data.category,
      dueDate: data.dueDate,
      createdAt: now,
      updatedAt: now,
    };
    setTasks((prev) => [task, ...prev]);
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              status: !t.completed ? "done" : "todo",
              updatedAt: new Date().toISOString(),
            }
          : t
      )
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const categories = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.category))).sort(),
    [tasks]
  );

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      if (status === "active" && t.completed) return false;
      if (status === "completed" && !t.completed) return false;
      if (priority !== "all" && t.priority !== priority) return false;
      if (category !== "all" && t.category !== category) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${t.title} ${t.description || ""} ${t.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [tasks, status, priority, category, query]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-400">
        Loading TaskFlow…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Productivity
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">TaskFlow</h1>
          <p className="mt-2 text-slate-500">
            Plan, prioritize, and track your work — data stays in your browser.
          </p>
        </header>

        <div className="space-y-5">
          <Stats tasks={tasks} />
          <TaskForm onAdd={addTask} />
          <FilterBar
            status={status}
            priority={priority}
            category={category}
            query={query}
            categories={categories}
            onStatus={setStatus}
            onPriority={setPriority}
            onCategory={setCategory}
            onQuery={setQuery}
          />
          <TaskList tasks={filtered} onToggle={toggleTask} onDelete={deleteTask} />
        </div>

        <footer className="mt-12 text-center text-xs text-slate-400">
          TaskFlow · Portfolio project · Abdulwaheed Toheeb Olanrewaju
        </footer>
      </div>
    </div>
  );
}
