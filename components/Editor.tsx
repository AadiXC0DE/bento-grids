import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GridItem, DragState, COLORS } from '../types';
import { GRID_COLS, GRID_ROWS } from '../constants';
import { checkCollision, isWithinBounds, generateId, generateTailwindCode } from '../utils/gridUtils';
import { GridItem as GridItemComponent } from './GridItem';
import { Sidebar } from './Sidebar';
import { CodePreview } from './CodePreview';
import { Undo2, Redo2, Trash2, Code2, RotateCcw, ArrowLeft, Moon, Sun } from 'lucide-react';

interface EditorProps {
    onBack: () => void;
    isDark: boolean;
    toggleTheme: () => void;
}

export const Editor: React.FC<EditorProps> = ({ onBack, isDark, toggleTheme }) => {
  const [items, setItems] = useState<GridItem[]>([]);
  const [history, setHistory] = useState<GridItem[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Dragging State
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [previewItem, setPreviewItem] = useState<GridItem | null>(null);
  const [isValidPlacement, setIsValidPlacement] = useState(true);
  
  const gridRef = useRef<HTMLDivElement>(null);
  const [showExport, setShowExport] = useState(false);

  // --- History Management ---
  const pushHistory = (newItems: GridItem[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newItems);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setItems(history[historyIndex - 1]);
      setSelectedId(null);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setItems(history[historyIndex + 1]);
      setSelectedId(null);
    }
  };

  const deleteItem = (id: string) => {
    const newItems = items.filter(i => i.id !== id);
    setItems(newItems);
    pushHistory(newItems);
    if (selectedId === id) setSelectedId(null);
  };

  const deleteSelected = useCallback(() => {
    if (!selectedId) return;
    deleteItem(selectedId);
  }, [items, selectedId, historyIndex]);

  // --- Input Handlers ---

  const handleSidebarDragStart = (e: React.MouseEvent, w: number, h: number) => {
    e.preventDefault();
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;

    const initialItem: GridItem = {
      id: 'temp-create',
      x: 0, y: 0, w, h,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };

    setDragState({
      type: 'CREATE',
      itemId: null,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      initialItem,
      templateSize: { w, h }
    });
    
    setPreviewItem(null);
    setSelectedId(null);
  };

  const handleItemMouseDown = (e: React.MouseEvent, item: GridItem) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedId(item.id);

    setDragState({
      type: 'MOVE',
      itemId: item.id,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      initialItem: { ...item }
    });
    setPreviewItem(item);
    setIsValidPlacement(true);
  };

  const handleResizeStart = (e: React.MouseEvent, item: GridItem, handle: string) => {
    e.stopPropagation();
    e.preventDefault();
    
    setDragState({
      type: 'RESIZE',
      itemId: item.id,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      initialItem: { ...item }
    });
    setPreviewItem(item);
    setIsValidPlacement(true);
  };

  // --- Global Mouse Logic ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragState || !gridRef.current) return;

      const rect = gridRef.current.getBoundingClientRect();
      const cellWidth = rect.width / GRID_COLS;
      const cellHeight = rect.height / GRID_ROWS;

      const deltaXPixels = e.clientX - dragState.startMouseX;
      const deltaYPixels = e.clientY - dragState.startMouseY;
      
      const deltaGridX = Math.round(deltaXPixels / cellWidth);
      const deltaGridY = Math.round(deltaYPixels / cellHeight);

      let newItem: GridItem = { ...dragState.initialItem };

      if (dragState.type === 'MOVE') {
        newItem.x = dragState.initialItem.x + deltaGridX;
        newItem.y = dragState.initialItem.y + deltaGridY;
      } else if (dragState.type === 'RESIZE') {
        newItem.w = Math.max(1, dragState.initialItem.w + deltaGridX);
        newItem.h = Math.max(1, dragState.initialItem.h + deltaGridY);
      } else if (dragState.type === 'CREATE') {
         const mouseXInGrid = e.clientX - rect.left;
         const mouseYInGrid = e.clientY - rect.top;
         
         const currentGridX = Math.floor(mouseXInGrid / cellWidth);
         const currentGridY = Math.floor(mouseYInGrid / cellHeight);

         newItem.x = currentGridX;
         newItem.y = currentGridY;
         newItem.w = dragState.templateSize!.w;
         newItem.h = dragState.templateSize!.h;
      }

      if (dragState.type === 'CREATE' || dragState.type === 'MOVE') {
        newItem.x = Math.max(0, Math.min(newItem.x, GRID_COLS - newItem.w));
        newItem.y = Math.max(0, Math.min(newItem.y, GRID_ROWS - newItem.h));
      }

      const validBounds = isWithinBounds(newItem);
      const collision = checkCollision(newItem, items, dragState.itemId || undefined);
      
      const valid = validBounds && !collision;
      
      setPreviewItem(newItem);
      setIsValidPlacement(valid);
    };

    const handleMouseUp = () => {
      if (!dragState) return;

      if (previewItem && isValidPlacement) {
        if (dragState.type === 'CREATE') {
           const newItem = { ...previewItem, id: generateId() };
           const newItems = [...items, newItem];
           setItems(newItems);
           pushHistory(newItems);
        } else {
           const newItems = items.map(i => i.id === dragState.itemId ? previewItem : i);
           setItems(newItems);
           pushHistory(newItems);
        }
      }

      setDragState(null);
      setPreviewItem(null);
    };

    if (dragState) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState, items, isValidPlacement, previewItem]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            deleteSelected();
        }
        if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
            e.preventDefault();
            if (e.shiftKey) {
                redo();
            } else {
                undo();
            }
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteSelected, undo, redo]);

  return (
    <div className="flex h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-white font-sans selection:bg-blue-500/30 overflow-hidden transition-colors duration-300">
      <Sidebar onDragStart={handleSidebarDragStart} />

      <div className="flex-1 flex flex-col relative">
        {/* Toolbar */}
        <div className="h-16 border-b border-zinc-200 dark:border-white/[0.08] flex items-center justify-between px-6 bg-white dark:bg-[#09090b] z-20 transition-colors duration-300">
          <div className="flex items-center gap-4">
             <button 
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-500 dark:text-zinc-400 transition-colors"
             >
                 <ArrowLeft size={20} />
             </button>

             <div className="w-px h-6 bg-zinc-200 dark:bg-white/[0.08]" />

             <div className="flex bg-zinc-100 dark:bg-zinc-900/50 p-1 rounded-lg border border-zinc-200 dark:border-white/[0.06]">
               <button onClick={undo} disabled={historyIndex === 0} className="p-2 rounded-md hover:bg-white dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed text-zinc-600 dark:text-zinc-400 transition-colors shadow-sm dark:shadow-none" title="Undo">
                  <Undo2 size={16} />
               </button>
               <button onClick={redo} disabled={historyIndex === history.length - 1} className="p-2 rounded-md hover:bg-white dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed text-zinc-600 dark:text-zinc-400 transition-colors shadow-sm dark:shadow-none" title="Redo">
                  <Redo2 size={16} />
               </button>
             </div>
             
             <div className="w-px h-6 bg-zinc-200 dark:bg-white/[0.08]" />
             
             <div className="flex bg-zinc-100 dark:bg-zinc-900/50 p-1 rounded-lg border border-zinc-200 dark:border-white/[0.06]">
                <button onClick={() => { setItems([]); setHistory([[]]); setHistoryIndex(0); }} className="p-2 rounded-md hover:bg-white dark:hover:bg-white/5 text-zinc-600 dark:text-zinc-400 transition-colors shadow-sm dark:shadow-none" title="Reset">
                  <RotateCcw size={16} />
                </button>
                <button onClick={deleteSelected} disabled={!selectedId} className="p-2 rounded-md hover:bg-red-500/10 text-zinc-600 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 disabled:opacity-30 transition-colors shadow-sm dark:shadow-none" title="Delete">
                  <Trash2 size={16} />
               </button>
             </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-500 dark:text-zinc-400 transition-colors"
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
                onClick={() => setShowExport(true)}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90 font-semibold text-sm transition-all active:scale-95 shadow-lg shadow-black/5 dark:shadow-white/5"
            >
                <Code2 size={16} />
                Export Code
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-8 overflow-hidden flex items-center justify-center bg-zinc-50 dark:bg-[#050505] relative transition-colors duration-300">
             {/* Subtle Dot Pattern */}
             <div className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.05] mix-blend-multiply dark:mix-blend-normal" 
                  style={{ 
                      backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', 
                      backgroundSize: '24px 24px' 
                  }} 
             />

            {/* The Grid */}
            <div 
                ref={gridRef}
                className="relative bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-white/[0.08] shadow-2xl dark:shadow-none rounded-xl overflow-hidden transition-colors duration-300"
                style={{
                    width: 'min(100%, 90vh)',
                    aspectRatio: '1/1',
                    display: 'grid',
                    gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
                    gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
                }}
            >
                {/* Grid Lines */}
                <div className="absolute inset-0 pointer-events-none grid grid-cols-12 grid-rows-12 z-0">
                    {Array.from({ length: GRID_COLS * GRID_ROWS }).map((_, i) => (
                        <div key={i} className="border-r border-b border-zinc-100 dark:border-white/[0.02]" />
                    ))}
                </div>

                {/* Render Items */}
                {items.map((item) => (
                   (dragState?.type === 'MOVE' && dragState.itemId === item.id) || (dragState?.type === 'RESIZE' && dragState.itemId === item.id)
                   ? null 
                   : (
                        <GridItemComponent
                            key={item.id}
                            item={item}
                            isSelected={selectedId === item.id}
                            isDragging={false}
                            isValid={true}
                            onMouseDown={(e) => handleItemMouseDown(e, item)}
                            onResizeStart={(e, h) => handleResizeStart(e, item, h)}
                        />
                   )
                ))}

                {/* Drag Preview */}
                {previewItem && dragState && (
                    <GridItemComponent 
                        item={previewItem}
                        isSelected={true}
                        isDragging={true}
                        isValid={isValidPlacement}
                        onMouseDown={() => {}}
                        onResizeStart={() => {}}
                    />
                )}
            </div>
        </div>
      </div>

      {showExport && (
        <CodePreview 
            code={generateTailwindCode(items)} 
            onClose={() => setShowExport(false)} 
        />
      )}
    </div>
  );
}