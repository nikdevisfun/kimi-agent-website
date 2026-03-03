import { useState } from 'react';
import { useWebsites } from '@/hooks/useWebsites';
import { Header } from '@/components/custom/Header';
import { CategoryFilter } from '@/components/custom/CategoryFilter';
import { WebsiteCard } from '@/components/custom/WebsiteCard';
import { WebsiteModal } from '@/components/custom/WebsiteModal';
import { EmptyState } from '@/components/custom/EmptyState';
import { DeleteConfirmDialog } from '@/components/custom/DeleteConfirmDialog';
import { BackgroundOrbs } from '@/components/custom/BackgroundOrbs';
import type { Website, ViewMode } from '@/types';
import { Toaster, toast } from 'sonner';
import { RotateCcw } from 'lucide-react';

function App() {
  const {
    websites,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    filteredWebsites,
    addWebsite,
    updateWebsite,
    deleteWebsite,
    resetData,
    getCategoryCount,
    isLoaded,
    error,
  } = useWebsites();

  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    website: Website | null;
  }>({ isOpen: false, website: null });
  const [isResetting, setIsResetting] = useState(false);

  const handleAdd = async (data: Omit<Website, 'id' | 'createdAt'>) => {
    await addWebsite(data);
    toast.success('网站添加成功！');
  };

  const handleEdit = async (data: Omit<Website, 'id' | 'createdAt'>) => {
    if (editingWebsite) {
      await updateWebsite(editingWebsite.id, data);
      toast.success('网站修改成功！');
    }
  };

  const handleDelete = async (id: string) => {
    await deleteWebsite(id);
    setDeleteDialog({ isOpen: false, website: null });
    toast.success('网站已删除');
  };

  const handleReset = async () => {
    if (confirm('确定要重置数据吗？这将恢复初始的100个网站，你添加的网站将被清除。')) {
      setIsResetting(true);
      try {
        await resetData();
        toast.success('数据已重置，恢复为初始100个网站！');
      } catch (err) {
        toast.error('重置失败，请重试');
      } finally {
        setIsResetting(false);
      }
    }
  };

  const openAddModal = () => {
    setEditingWebsite(null);
    setIsModalOpen(true);
  };

  const openEditModal = (website: Website) => {
    setEditingWebsite(website);
    setIsModalOpen(true);
  };

  const openDeleteDialog = (website: Website) => {
    setDeleteDialog({ isOpen: true, website });
  };

  const getCategoryById = (id: string) => {
    return categories.find(c => c.id === id);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-400 text-2xl">!</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">连接失败</h2>
          <p className="text-white/60 mb-4">{error}</p>
          <p className="text-white/40 text-sm mb-6">请确保后端服务器已启动 (npm run server)</p>
          <button
            onClick={() => window.location.reload()}
            className="glass-button-primary"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <BackgroundOrbs />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onAddClick={openAddModal}
          websiteCount={websites.length}
        />

        {/* Reset Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleReset}
            disabled={isResetting}
            className="glass-button flex items-center gap-2 text-sm py-2 px-4"
          >
            <RotateCcw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
            {isResetting ? '重置中...' : '重置数据'}
          </button>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          getCategoryCount={getCategoryCount}
        />

        {/* Website Grid/List */}
        {filteredWebsites.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                : 'flex flex-col gap-3'
            }
          >
            {filteredWebsites.map((website, index) => (
              <WebsiteCard
                key={website.id}
                website={website}
                category={getCategoryById(website.category)}
                viewMode={viewMode}
                onEdit={openEditModal}
                onDelete={(id) => {
                  const site = websites.find(w => w.id === id);
                  if (site) openDeleteDialog(site);
                }}
                index={index}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            onAddClick={openAddModal}
            hasSearchQuery={searchQuery.length > 0}
          />
        )}
      </div>

      {/* Modals */}
      <WebsiteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingWebsite ? handleEdit : handleAdd}
        categories={categories}
        website={editingWebsite}
      />

      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, website: null })}
        onConfirm={() => deleteDialog.website && handleDelete(deleteDialog.website.id)}
        websiteName={deleteDialog.website?.name || ''}
      />

      {/* Toast */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(30, 30, 50, 0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

export default App;
