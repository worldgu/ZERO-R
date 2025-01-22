import { useSearchParams } from 'next/navigation';
import { GetStaticProps } from 'next';
import { NavItem } from '@/types';

interface SubMenuPageProps {
  navigationData: {
    navItems: NavItem[];
  };
}

export const getStaticProps: GetStaticProps<SubMenuPageProps> = async () => {
  const navigationData = await import('@/data/navigation.json');
  return {
    props: {
      navigationData,
    },
  };
};

const SubMenuPage = ({ navigationData }: SubMenuPageProps) => {
  const searchParams = useSearchParams();
  const parentName = searchParams?.get('parentName');

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