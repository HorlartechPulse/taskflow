"use client";

import { CheckCircle2, Circle, Trash2, Calendar } from "lucide-react";
import type { Task } from "@/types/task";

type Props = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

const priorityStyles = {
  high: "bg-red-100 text-red-600",
  medium: "bg-amber-100 text-amber-600",
  low: "bg-slate-100 text-slate-500",
};

export function TaskList({ tasks, onToggle, onDelete }: Props) {
  if (!tasks.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
        <p className="text-slate-500">No tasks match your filters.</p>
        <p className="mt-1 text-sm text-slate-400">Add a task or clear filters to get started.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-indigo-100"
        >
          <button type="button" onClick={() => onToggle(task.id)} className="mt-0.5 shrink-0">
            {task.completed ? (
              <CheckCircle2 className="h-6 w-6 text-indigo-500" />
            ) : (
              <Circle className="h-6 w-6 text-slate-300" />
            )}
          </button>
          <div className="min-w-0 flex-1">
            <p
              className={`font-medium ${
                task.completed ? "text-slate-400 line-through" : "text-slate-800"
              }`}
            >
              {task.title}
            </p>
            {task.description && (
              <p className="mt-0.5 text-sm text-slate-500">{task.description}</p>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className={`rounded-full px-2 py-0.5 ${priorityStyles[task.priority]}`}>
                {task.priority}
              </span>
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-indigo-600">
                {task.category}
              </span>
              {task.dueDate && (
                <span className="inline-flex items-center gap-1 text-slate-400">
                  <Calendar className="h-3 w-3" />
                  {task.dueDate}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="shrink-0 text-slate-300 transition hover:text-red-500"
            aria-label="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </li>
      ))}
    </ul>
  );
}
