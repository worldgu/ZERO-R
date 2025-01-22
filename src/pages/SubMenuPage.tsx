import { useSearchParams } from 'next/navigation';
import { GetStaticProps } from 'next';
import { NavItem } from '@/types';
import navigationData from '@/data/navigation.json';

interface SubMenuPageProps {
  navigationData: {
    navItems: NavItem[];
  };
}

export const getStaticProps: GetStaticProps<SubMenuPageProps> = async () => {
  return {
    props: {
      navigationData: {
        navItems: navigationData.navItems
      },
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