import React from 'react';
import { Grid3x3, MousePointer2 } from 'lucide-react';

interface SidebarProps {
  onDragStart: (e: React.MouseEvent, w: number, h: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onDragStart }) => {
  return (
    <div className="w-72 bg-white dark:bg-[#09090b] border-r border-zinc-200 dark:border-white/[0.08] flex flex-col h-full shadow-xl dark:shadow-[5px_0_30px_rgba(0,0,0,0.5)] z-20 transition-colors duration-300">
      <div className="p-6 border-b border-zinc-200 dark:border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/10 dark:bg-blue-600/20 rounded-lg border border-blue-500/20 dark:border-blue-500/30 text-blue-600 dark:text-blue-400">
            <Grid3x3 size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              BentoGrid
            </h1>
            <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">
              Prototyping Tool
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto no-scrollbar">
        <div className="flex items-center gap-2 mb-6 text-zinc-500">
            <MousePointer2 size={14} />
            <span className="text-xs font-medium uppercase tracking-wider">Draggable Shapes</span>
        </div>
        
        <div className="space-y-3">
            {/* 1x1 Square */}
            <div 
                className="group relative p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/[0.06] hover:border-blue-400/50 dark:hover:border-white/20 hover:bg-blue-50 dark:hover:bg-zinc-800/50 cursor-grab active:cursor-grabbing transition-all duration-300"
                onMouseDown={(e) => onDragStart(e, 1, 1)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                         {/* CSS Shape Preview */}
                        <div className="w-10 h-10 rounded-lg border-2 border-zinc-300 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-800 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-colors" />
                        <div>
                            <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-white">Square</span>
                            <span className="text-xs text-zinc-500">1x1 Unit</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2x1 Wide */}
            <div 
                className="group relative p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/[0.06] hover:border-purple-400/50 dark:hover:border-white/20 hover:bg-purple-50 dark:hover:bg-zinc-800/50 cursor-grab active:cursor-grabbing transition-all duration-300"
                onMouseDown={(e) => onDragStart(e, 2, 1)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-8 rounded-lg border-2 border-zinc-300 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-800 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-colors" />
                        <div>
                            <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-purple-600 dark:group-hover:text-white">Wide</span>
                            <span className="text-xs text-zinc-500">2x1 Unit</span>
                        </div>
                    </div>
                </div>
            </div>

             {/* 1x2 Tall */}
             <div 
                className="group relative p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/[0.06] hover:border-emerald-400/50 dark:hover:border-white/20 hover:bg-emerald-50 dark:hover:bg-zinc-800/50 cursor-grab active:cursor-grabbing transition-all duration-300"
                onMouseDown={(e) => onDragStart(e, 1, 2)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-16 rounded-lg border-2 border-zinc-300 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-800 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-colors" />
                        <div>
                            <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-white">Tall</span>
                            <span className="text-xs text-zinc-500">1x2 Unit</span>
                        </div>
                    </div>
                </div>
            </div>

             {/* 2x2 Large */}
             <div 
                className="group relative p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/[0.06] hover:border-orange-400/50 dark:hover:border-white/20 hover:bg-orange-50 dark:hover:bg-zinc-800/50 cursor-grab active:cursor-grabbing transition-all duration-300"
                onMouseDown={(e) => onDragStart(e, 2, 2)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg border-2 border-zinc-300 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-800 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 transition-colors" />
                        <div>
                            <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-orange-600 dark:group-hover:text-white">Large</span>
                            <span className="text-xs text-zinc-500">2x2 Unit</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-auto pt-8">
             <div className="p-4 rounded-xl bg-blue-500/[0.05] border border-blue-500/10">
                <h3 className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">Instructions</h3>
                <ul className="text-xs text-blue-600/70 dark:text-blue-200/70 space-y-2 list-disc list-inside leading-relaxed">
                    <li>Drag shapes to the grid</li>
                    <li>Drag bottom-right corner to resize</li>
                    <li>Double-click to delete</li>
                </ul>
             </div>
        </div>
      </div>
    </div>
  );
};