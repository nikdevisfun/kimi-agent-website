import { ExternalLink, Edit2, Trash2, Globe } from 'lucide-react';
import type { Website, Category } from '@/types';

interface WebsiteCardProps {
  website: Website;
  category?: Category;
  viewMode: 'grid' | 'list';
  onEdit: (website: Website) => void;
  onDelete: (id: string) => void;
  index: number;
}

export function WebsiteCard({
  website,
  category,
  viewMode,
  onEdit,
  onDelete,
  index,
}: WebsiteCardProps) {
  const handleClick = () => {
    window.open(website.url, '_blank', 'noopener,noreferrer');
  };

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return null;
    }
  };

  const faviconUrl = getFaviconUrl(website.url);

  if (viewMode === 'list') {
    return (
      <div
        className="website-card flex items-center gap-4 animate-in"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {/* Icon */}
        <div
          onClick={handleClick}
          className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-white/20 transition-colors"
        >
          {faviconUrl ? (
            <img
              src={faviconUrl}
              alt={website.name}
              className="w-8 h-8 rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <Globe className="w-6 h-6 text-white/60" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0" onClick={handleClick}>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-white font-semibold truncate">{website.name}</h3>
            {category && (
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                style={{
                  backgroundColor: `${category.color}30`,
                  color: category.color,
                }}
              >
                {category.name}
              </span>
            )}
          </div>
          <p className="text-white/50 text-sm truncate">{website.description}</p>
        </div>

        {/* URL */}
        <div className="hidden md:flex items-center gap-2 text-white/40 text-sm flex-shrink-0 max-w-[200px]">
          <ExternalLink className="w-3 h-3" />
          <span className="truncate">{new URL(website.url).hostname}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(website);
            }}
            className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            title="编辑"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(website.id);
            }}
            className="p-2 rounded-lg text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="删除"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="website-card animate-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Header with Icon and Actions */}
      <div className="flex items-start justify-between mb-4">
        <div
          onClick={handleClick}
          className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
        >
          {faviconUrl ? (
            <img
              src={faviconUrl}
              alt={website.name}
              className="w-10 h-10 rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <Globe className="w-7 h-7 text-white/60" />
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(website)}
            className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            title="编辑"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(website.id)}
            className="p-2 rounded-lg text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="删除"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div onClick={handleClick} className="cursor-pointer">
        <h3 className="text-white font-semibold mb-1 truncate">{website.name}</h3>
        <p className="text-white/50 text-sm mb-3 line-clamp-2 min-h-[40px]">
          {website.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        {category ? (
          <span
            className="px-2 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${category.color}30`,
              color: category.color,
            }}
          >
            {category.name}
          </span>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-1 text-white/40 text-xs">
          <ExternalLink className="w-3 h-3" />
          <span className="truncate max-w-[100px]">
            {new URL(website.url).hostname}
          </span>
        </div>
      </div>
    </div>
  );
}
