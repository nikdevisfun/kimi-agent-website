import { Bookmark, Plus, Search, Grid3X3, List } from 'lucide-react';
import type { ViewMode } from '@/types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onAddClick: () => void;
  websiteCount: number;
}

export function Header({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onAddClick,
  websiteCount,
}: HeaderProps) {
  return (
    <header className="glass-card mb-8 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Bookmark className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">网站收藏</h1>
            <p className="text-white/50 text-sm">共收藏 {websiteCount} 个网站</p>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="搜索网站..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="glass-input w-full pl-10 pr-4"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 glass p-1 rounded-xl">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-white/20 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/10'
              }`}
              title="网格视图"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-white/20 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/10'
              }`}
              title="列表视图"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={onAddClick}
            className="glass-button-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">添加网站</span>
          </button>
        </div>
      </div>
    </header>
  );
}
