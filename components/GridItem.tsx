import React from 'react';
import { GridItem as IGridItem } from '../types';
import { Maximize2 } from 'lucide-react';

interface GridItemProps {
  item: IGridItem;
  isSelected: boolean;
  isDragging: boolean;
  isValid: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onResizeStart: (e: React.MouseEvent, handle: string) => void;
}

export const GridItem: React.FC<GridItemProps> = ({
  item,
  isSelected,
  isDragging,
  isValid,
  onMouseDown,
  onResizeStart,
}) => {
  const style: React.CSSProperties = {
    gridColumnStart: item.x + 1,
    gridColumnEnd: `span ${item.w}`,
    gridRowStart: item.y + 1,
    gridRowEnd: `span ${item.h}`,
  };

  // Determine content layout based on size
  const isSmall = item.w === 1 && item.h === 1;
  const isWide = item.w >= 2 && item.h === 1;
  const isTall = item.w === 1 && item.h >= 2;
  
  const renderContent = () => {
    if (isSmall) {
      return (
        <div className="w-full h-full flex items-center justify-center">
             <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10" />
        </div>
      );
    }
    
    if (isWide) {
       return (
         <div className="flex items-center gap-4 h-full px-2">
            <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 shrink-0" />
            <div className="space-y-2 flex-1 min-w-0">
               <div className="h-2 w-2/3 bg-black/5 dark:bg-white/10 rounded-full" />
               <div className="h-2 w-full bg-black/5 dark:bg-white/5 rounded-full" />
            </div>
         </div>
       );
    }

    // Tall or Large
    return (
       <div className="flex flex-col h-full p-2">
         <div className="mb-auto">
           <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 mb-4" />
         </div>
         <div className="space-y-3 w-full">
            <div className="h-2 w-2/3 bg-black/5 dark:bg-white/10 rounded-full" />
            <div className="h-2 w-full bg-black/5 dark:bg-white/5 rounded-full" />
            {!isTall && <div className="h-2 w-1/2 bg-black/5 dark:bg-white/5 rounded-full" />}
         </div>
       </div>
    );
  };

  const baseClasses = `relative group rounded-2xl transition-all duration-200 overflow-hidden select-none backdrop-blur-sm`;
  
  // Refined state classes
  const stateClasses = isDragging
    ? isValid
      ? 'bg-blue-500/20 border-2 border-blue-500 z-50 opacity-90'
      : 'bg-red-500/20 border-2 border-red-500 z-50 opacity-90'
    : isSelected
      ? `border-2 border-blue-500 ${item.color} z-40`
      : `border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/20 ${item.color} z-10 hover:z-30 hover:bg-opacity-80`;

  return (
    <div
      style={style}
      className={`${baseClasses} ${stateClasses}`}
      onMouseDown={onMouseDown}
    >
      {/* Inner Content Container */}
      <div className="absolute inset-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {renderContent()}
      </div>

      {/* Size Indicator */}
      {isSelected && (
         <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-blue-500 text-[10px] font-mono font-bold text-white pointer-events-none z-50">
            {item.w} × {item.h}
         </div>
      )}

      {/* Controls - Visible on hover/select */}
      {!isDragging && (
        <>
          <div 
            className={`absolute bottom-0 right-0 w-8 h-8 cursor-se-resize flex items-center justify-center text-black/20 dark:text-white/20 hover:text-black dark:hover:text-white transition-colors ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            onMouseDown={(e) => onResizeStart(e, 'se')}
          >
             <Maximize2 size={14} className="transform rotate-90 drop-shadow-md" />
          </div>
        </>
      )}
    </div>
  );
};