import { BookmarkX, Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddClick: () => void;
  hasSearchQuery?: boolean;
}

export function EmptyState({ onAddClick, hasSearchQuery = false }: EmptyStateProps) {
  return (
    <div className="glass-card p-12 text-center">
      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
        <BookmarkX className="w-10 h-10 text-white/30" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">
        {hasSearchQuery ? '没有找到匹配的网站' : '还没有收藏任何网站'}
      </h3>
      <p className="text-white/50 mb-6 max-w-md mx-auto">
        {hasSearchQuery
          ? '尝试使用其他关键词搜索，或者添加一个新的网站'
          : '开始收藏你喜欢的网站，方便随时访问和管理'}
      </p>
      {!hasSearchQuery && (
        <button
          onClick={onAddClick}
          className="glass-button-primary inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          添加第一个网站
        </button>
      )}
    </div>
  );
}
