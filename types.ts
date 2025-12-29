export interface GridItem {
  id: string;
  x: number; // Grid column start (0-indexed internally)
  y: number; // Grid row start (0-indexed internally)
  w: number; // Column span
  h: number; // Row span
  color: string; // Background color class
}

export interface DragState {
  type: 'MOVE' | 'RESIZE' | 'CREATE';
  itemId: string | null; // null if CREATE
  startMouseX: number;
  startMouseY: number;
  initialItem: GridItem; // Snapshot of item before drag
  templateSize?: { w: number; h: number }; // For creating new items
}

export interface GridConfig {
  cols: number;
  rows: number;
}

export const COLORS = [
  'bg-slate-200 dark:bg-slate-800',
  'bg-zinc-200 dark:bg-zinc-800',
  'bg-stone-200 dark:bg-stone-800',
  'bg-red-100 dark:bg-red-900/50',
  'bg-orange-100 dark:bg-orange-900/50',
  'bg-amber-100 dark:bg-amber-900/50',
  'bg-yellow-100 dark:bg-yellow-900/50',
  'bg-lime-100 dark:bg-lime-900/50',
  'bg-green-100 dark:bg-green-900/50',
  'bg-emerald-100 dark:bg-emerald-900/50',
  'bg-teal-100 dark:bg-teal-900/50',
  'bg-cyan-100 dark:bg-cyan-900/50',
  'bg-sky-100 dark:bg-sky-900/50',
  'bg-blue-100 dark:bg-blue-900/50',
  'bg-indigo-100 dark:bg-indigo-900/50',
  'bg-violet-100 dark:bg-violet-900/50',
  'bg-purple-100 dark:bg-purple-900/50',
  'bg-fuchsia-100 dark:bg-fuchsia-900/50',
  'bg-pink-100 dark:bg-pink-900/50',
  'bg-rose-100 dark:bg-rose-900/50',
];