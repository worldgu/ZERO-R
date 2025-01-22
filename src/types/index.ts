export interface Category {
  id: string;
  code: string;
  name: string;
  alias?: string;
  level: number;
  parentId?: string;
  route?: string;
  navPath?: string;
  hierarchy: number;
  type: 'nav' | 'tool';
  description?: string;
  icon?: string;
  imagePath?: string;
  order: number;
  isEnabled: boolean;
  isDeleted: boolean;
}

export interface Tag {
  id: string;
  code: string;
  name: string;
  alias?: string;
  description?: string;
  order: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  code: string;
  title: string;
  subtitle?: string;
  content: string;
  tags: string[];
  status: 'draft' | 'published';
  type: 'text' | 'image' | 'mixed';
  createdAt: string;
  updatedAt: string;
}

export interface NavItem {
  id: number;
  name: string;
  path: string;
  children?: NavItem[];
}