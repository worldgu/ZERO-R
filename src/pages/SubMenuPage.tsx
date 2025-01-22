import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { NavItem } from '@/types';

const SubMenuPage = () => {
  const searchParams = useSearchParams();
  const parentName = searchParams.get('parentName');
  
  const { data: navigationData } = useQuery<{ navItems: NavItem[] }>({
    queryKey: ['navigation'],
    queryFn: async () => {
      const data = await import('@/data/navigation.json');
      return data;
    },
  });

  return (
    <div className="submenu-page">
      <h2>{parentName}</h2>
      <div className="submenu-list">
        {/* ... 子菜单渲染逻辑 ... */}
      </div>
    </div>
  );
};

export default SubMenuPage; 