import type { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  getCategoryCount: (categoryId: string) => number;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  getCategoryCount,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => {
        const count = getCategoryCount(category.id);
        const isActive = activeCategory === category.id;
        
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`category-badge flex items-center gap-2 ${
              isActive ? 'category-badge-active' : 'category-badge-inactive'
            }`}
            style={{
              '--category-color': category.color,
            } as React.CSSProperties}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span>{category.name}</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                isActive ? 'bg-white/20' : 'bg-white/10'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
