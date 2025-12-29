import React from 'react';
import { ArrowRight, Layout, Code2, Zap, Github, Moon, Sun } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, isDark, toggleTheme }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-zinc-900 dark:text-white transition-colors duration-500 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 border-b border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <Layout size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight">BentoGrid</span>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors text-zinc-600 dark:text-zinc-400"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={onStart}
              className="bg-zinc-900 dark:bg-white text-white dark:text-black px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Open App
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide uppercase mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            v2.0 Now Available
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            Craft beautiful <br/>
            <span className="text-blue-600 dark:text-blue-400">
              Bento Grids
            </span> in seconds.
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            The ultimate visual prototyping tool for developers. Drag, drop, resize, and export pure Tailwind CSS code instantly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStart}
              className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.6)] flex items-center gap-2"
            >
              Start Building Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white rounded-full font-semibold text-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2">
              <Github size={20} />
              Star on GitHub
            </button>
          </div>
        </div>

        {/* Interactive Visual */}
        <div className="relative max-w-5xl mx-auto perspective-[2000px] group">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#050505] via-transparent to-transparent z-10 pointer-events-none h-full w-full bottom-0" />
          
          <div className="transform rotate-x-12 group-hover:rotate-x-0 transition-transform duration-1000 ease-out border border-zinc-200 dark:border-white/10 rounded-xl bg-white dark:bg-[#09090b] shadow-2xl overflow-hidden">
            <div className="grid grid-cols-4 grid-rows-3 gap-4 p-6 h-[500px] opacity-80 dark:opacity-100">
              <div className="col-span-2 row-span-2 bg-zinc-100 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-white/5 p-6 flex flex-col justify-between animate-pulse">
                 <div className="w-12 h-12 rounded-full bg-blue-500/20"></div>
                 <div className="space-y-3">
                   <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                   <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                 </div>
              </div>
              <div className="col-span-1 row-span-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-white/5"></div>
              <div className="col-span-1 row-span-2 bg-blue-600 rounded-2xl border border-blue-500/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              </div>
              <div className="col-span-1 row-span-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-white/5"></div>
              <div className="col-span-2 row-span-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-white/5 flex items-center px-6 gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 shrink-0"></div>
                <div className="h-3 w-1/2 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
              </div>
              <div className="col-span-1 row-span-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-white/5"></div>
              <div className="col-span-1 row-span-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-white/5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-white dark:bg-[#09090b] border-t border-zinc-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                <Layout size={24} />
              </div>
              <h3 className="text-xl font-bold">Visual Editor</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Intuitive drag-and-drop interface for resizing and positioning grid items. What you see is exactly what you get.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                <Code2 size={24} />
              </div>
              <h3 className="text-xl font-bold">Clean Export</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Get production-ready HTML & Tailwind CSS code. No unnecessary wrappers, just clean, responsive grid layouts.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold">Lightning Fast</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Built for speed. Zero lag, instant feedback, and keyboard shortcuts for power users. Prototyping has never been faster.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-200 dark:border-white/5 text-center">
         <p className="text-zinc-500 dark:text-zinc-600 text-sm">
           © 2024 BentoGrid Pro. Crafted with precision.
         </p>
      </footer>
    </div>
  );
};