"use client";

import type { Task } from "@/types/task";
import { CheckCircle2, Circle, ListTodo, AlertTriangle } from "lucide-react";

export function Stats({ tasks }: { tasks: Task[] }) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;
  const active = total - done;
  const high = tasks.filter((t) => !t.completed && t.priority === "high").length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const cards = [
    { label: "Total", value: total, icon: ListTodo, color: "text-indigo-600 bg-indigo-50" },
    { label: "Active", value: active, icon: Circle, color: "text-amber-600 bg-amber-50" },
    { label: "Completed", value: done, icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
    { label: "High priority", value: high, icon: AlertTriangle, color: "text-red-600 bg-red-50" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className={`mb-2 inline-flex rounded-lg p-2 ${c.color}`}>
              <c.icon className="h-4 w-4" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{c.value}</p>
            <p className="text-xs text-slate-500">{c.label}</p>
          </div>
        ))}
      </div>
      <div>
        <div className="mb-1 flex justify-between text-xs text-slate-500">
          <span>Progress</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
