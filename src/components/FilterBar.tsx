"use client";

import type { FilterPriority, FilterStatus } from "@/types/task";
import { Search } from "lucide-react";

type Props = {
  status: FilterStatus;
  priority: FilterPriority;
  category: string;
  query: string;
  categories: string[];
  onStatus: (v: FilterStatus) => void;
  onPriority: (v: FilterPriority) => void;
  onCategory: (v: string) => void;
  onQuery: (v: string) => void;
};

export function FilterBar({
  status,
  priority,
  category,
  query,
  categories,
  onStatus,
  onPriority,
  onCategory,
  onQuery,
}: Props) {
  const statuses: FilterStatus[] = ["all", "active", "completed"];
  const priorities: FilterPriority[] = ["all", "high", "medium", "low"];

  return (
    <div className="space-y-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search tasks..."
          className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {statuses.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onStatus(s)}
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition ${
              status === s
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {s}
          </button>
        ))}
        <span className="mx-1 h-6 w-px bg-slate-200" />
        {priorities.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPriority(p)}
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition ${
              priority === p
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {p === "all" ? "All priorities" : p}
          </button>
        ))}
        <select
          value={category}
          onChange={(e) => onCategory(e.target.value)}
          className="rounded-full border-0 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
