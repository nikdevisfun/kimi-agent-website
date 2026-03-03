import { useState, useEffect, useCallback } from 'react';
import type { Website, Category } from '@/types';

const API_URL = '/api';

export function useWebsites() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取分类
  useEffect(() => {
    fetchCategories();
  }, []);

  // 获取网站列表
  useEffect(() => {
    fetchWebsites();
  }, [activeCategory, searchQuery]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const fetchWebsites = async () => {
    try {
      setIsLoaded(false);
      const params = new URLSearchParams();
      if (activeCategory !== 'all') params.append('category', activeCategory);
      if (searchQuery) params.append('search', searchQuery);
      
      const response = await fetch(`${API_URL}/websites?${params}`);
      if (!response.ok) throw new Error('Failed to fetch websites');
      const data = await response.json();
      setWebsites(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoaded(true);
    }
  };

  const addWebsite = useCallback(async (website: Omit<Website, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch(`${API_URL}/websites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(website),
      });
      if (!response.ok) throw new Error('Failed to add website');
      const newWebsite = await response.json();
      setWebsites(prev => [newWebsite, ...prev]);
      return newWebsite;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, []);

  const updateWebsite = useCallback(async (id: string, updates: Partial<Omit<Website, 'id' | 'createdAt'>>) => {
    try {
      const response = await fetch(`${API_URL}/websites/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update website');
      const updated = await response.json();
      setWebsites(prev =>
        prev.map(site => (site.id === id ? updated : site))
      );
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, []);

  const deleteWebsite = useCallback(async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/websites/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete website');
      setWebsites(prev => prev.filter(site => site.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, []);

  const resetData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/reset`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to reset data');
      const result = await response.json();
      await fetchWebsites();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, []);

  const getCategoryCount = useCallback((categoryId: string) => {
    if (categoryId === 'all') return websites.length;
    return websites.filter(site => site.category === categoryId).length;
  }, [websites]);

  return {
    websites,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    filteredWebsites: websites,
    addWebsite,
    updateWebsite,
    deleteWebsite,
    resetData,
    getCategoryCount,
    isLoaded,
    error,
  };
}
