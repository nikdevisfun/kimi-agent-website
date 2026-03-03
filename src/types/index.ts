export interface Website {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  icon?: string;
  createdAt: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export type ViewMode = 'grid' | 'list';
