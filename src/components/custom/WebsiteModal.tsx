import { useState, useEffect } from 'react';
import { X, Link2, FileText, Tag, Globe } from 'lucide-react';
import type { Website, Category } from '@/types';

interface WebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Website, 'id' | 'createdAt'>) => void;
  categories: Category[];
  website?: Website | null;
}

export function WebsiteModal({
  isOpen,
  onClose,
  onSubmit,
  categories,
  website,
}: WebsiteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    category: 'dev',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (website) {
      setFormData({
        name: website.name,
        url: website.url,
        description: website.description,
        category: website.category,
      });
    } else {
      setFormData({
        name: '',
        url: '',
        description: '',
        category: 'dev',
      });
    }
    setErrors({});
  }, [website, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '请输入网站名称';
    }
    
    if (!formData.url.trim()) {
      newErrors.url = '请输入网站地址';
    } else {
      try {
        new URL(formData.url);
      } catch {
        newErrors.url = '请输入有效的URL地址';
      }
    }
    
    if (!formData.description.trim()) {
      newErrors.description = '请输入网站描述';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Filter out 'all' category
  const availableCategories = categories.filter(c => c.id !== 'all');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            {website ? '编辑网站' : '添加网站'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-white/70 text-sm mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              网站名称
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="例如：GitHub"
              className={`glass-input w-full ${errors.name ? 'border-red-500/50' : ''}`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* URL */}
          <div>
            <label className="block text-white/70 text-sm mb-2 flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              网站地址
            </label>
            <input
              type="text"
              value={formData.url}
              onChange={(e) => handleChange('url', e.target.value)}
              placeholder="https://example.com"
              className={`glass-input w-full ${errors.url ? 'border-red-500/50' : ''}`}
            />
            {errors.url && (
              <p className="text-red-400 text-xs mt-1">{errors.url}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-white/70 text-sm mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              网站描述
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="简短描述这个网站的用途..."
              rows={3}
              className={`glass-input w-full resize-none ${errors.description ? 'border-red-500/50' : ''}`}
            />
            {errors.description && (
              <p className="text-red-400 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-white/70 text-sm mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              分类
            </label>
            <div className="flex flex-wrap gap-2">
              {availableCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleChange('category', category.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    formData.category === category.id
                      ? 'bg-primary/30 border border-primary/50 text-white'
                      : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="glass-button"
            >
              取消
            </button>
            <button
              type="submit"
              className="glass-button-primary"
            >
              {website ? '保存修改' : '添加网站'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
