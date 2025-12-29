import { GridItem } from '../types';
import { GRID_COLS, GRID_ROWS } from '../constants';

export const checkCollision = (
  target: GridItem,
  items: GridItem[],
  ignoreId?: string
): boolean => {
  for (const item of items) {
    if (ignoreId && item.id === ignoreId) continue;

    const targetRight = target.x + target.w;
    const targetBottom = target.y + target.h;
    const itemRight = item.x + item.w;
    const itemBottom = item.y + item.h;

    // Check intersection
    if (
      target.x < itemRight &&
      targetRight > item.x &&
      target.y < itemBottom &&
      targetBottom > item.y
    ) {
      return true;
    }
  }
  return false;
};

export const isWithinBounds = (item: GridItem): boolean => {
  return (
    item.x >= 0 &&
    item.y >= 0 &&
    item.x + item.w <= GRID_COLS &&
    item.y + item.h <= GRID_ROWS
  );
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const generateTailwindCode = (items: GridItem[]): string => {
  const sortedItems = [...items].sort((a, b) => (a.y * GRID_COLS + a.x) - (b.y * GRID_COLS + b.x));
  
  const itemElements = sortedItems.map((item, index) => {
    const colStart = `col-start-${item.x + 1} md:col-start-${item.x + 1}`;
    const colSpan = `col-span-${item.w} md:col-span-${item.w}`;
    const rowStart = `row-start-${item.y + 1} md:row-start-${item.y + 1}`;
    const rowSpan = `row-span-${item.h} md:row-span-${item.h}`;
    
    const isSmall = item.w === 1 && item.h === 1;
    const isWide = item.w >= 2 && item.h === 1;
    const isTall = item.w === 1 && item.h >= 2;

    let contentHtml = '';
    if (isSmall) {
        contentHtml = `      <div class="w-full h-full flex items-center justify-center">
          <div class="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10"></div>
      </div>`;
    } else if (isWide) {
        contentHtml = `      <div class="w-full h-full flex items-center gap-4 px-4">
          <div class="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 shrink-0"></div>
          <div class="space-y-2 flex-1 min-w-0">
              <div class="h-2 w-2/3 bg-black/5 dark:bg-white/10 rounded-full"></div>
              <div class="h-2 w-full bg-black/5 dark:bg-white/5 rounded-full"></div>
          </div>
      </div>`;
    } else {
        contentHtml = `      <div class="w-full h-full flex flex-col p-4">
          <div class="mb-auto">
              <div class="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 mb-4"></div>
          </div>
          <div class="space-y-3 w-full">
              <div class="h-2 w-2/3 bg-black/5 dark:bg-white/10 rounded-full"></div>
              <div class="h-2 w-full bg-black/5 dark:bg-white/5 rounded-full"></div>
              ${!isTall ? '<div class="h-2 w-1/2 bg-black/5 dark:bg-white/5 rounded-full"></div>' : ''}
          </div>
      </div>`;
    }

    const classes = [
      'relative',
      'overflow-hidden',
      'rounded-xl',
      'border',
      'border-black/5 dark:border-white/10',
      item.color,
      'col-span-12', // Mobile default
      colSpan,
      rowSpan,
      colStart,
      rowStart
    ].filter(Boolean).join(' ');

    return `    <!-- Item ${index + 1} -->
    <div class="${classes}">
${contentHtml}
    </div>`;
  }).join('\n\n');

  return `<div class="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 md:p-8 text-zinc-900 dark:text-white">
  <div class="mx-auto max-w-7xl grid grid-cols-12 auto-rows-[100px] gap-4">
${itemElements}
  </div>
</div>`;
};