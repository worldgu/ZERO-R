'use client';

import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Popper,
  Paper,
  MenuList,
  MenuItem,
  Container,
} from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { NavItem } from '@/types';
import { useQuery } from '@tanstack/react-query';

export default function Navigation() {
  const [openCategory, setOpenCategory] = React.useState<number | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const { data: navigationData } = useQuery<{ navItems: NavItem[] }>({
    queryKey: ['navigation'],
    queryFn: async () => {
      const data = await import('@/data/navigation.json');
      return data;
    },
  });

  const navItems = navigationData?.navItems || [];

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>, itemId: number) => {
    const item = navItems.find(item => item.id === itemId);
    if (item?.children?.length) {
      setOpenCategory(itemId);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMouseLeave = () => {
    setOpenCategory(null);
    setAnchorEl(null);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const handleNavClick = (item: NavItem, event: React.MouseEvent) => {
    event.preventDefault();
    if (!item.children || item.children.length === 0) {
      router.push(item.path);
    } else {
      router.push(`/submenu/${item.id}?parentName=${encodeURIComponent(item.name)}`);
    }
  };

  return (
    <AppBar position="static" color="default">
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'center', minHeight: '64px' }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
            width: '100%'
          }}>
            {navItems.map((item) => (
              <Box
                key={item.id}
                onMouseEnter={(e) => handleMouseEnter(e, item.id)}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => handleNavClick(item, e)}
                sx={{ 
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
                <Typography 
                  sx={{ 
                    py: 2, 
                    px: 1,
                    color: isActive(item.path) ? 'primary.main' : 'text.primary',
                    fontWeight: isActive(item.path) ? 500 : 400,
                    '&:hover': {
                      color: 'primary.main'
                    }
                  }}
                >
                  {item.name}
                </Typography>
                {item.children && item.children.length > 0 && openCategory === item.id && (
                  <Popper
                    open={true}
                    anchorEl={anchorEl}
                    placement="bottom-start"
                    sx={{ zIndex: 1300 }}
                  >
                    <Paper 
                      elevation={2}
                      sx={{ 
                        mt: 1,
                        borderRadius: 1,
                        overflow: 'hidden'
                      }}
                    >
                      <MenuList>
                        {item.children.map(child => (
                          <MenuItem 
                            key={child.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(child.path);
                            }}
                            sx={{
                              color: isActive(child.path) ? 'primary.main' : 'text.primary',
                              '&:hover': {
                                backgroundColor: 'primary.light',
                                color: 'white'
                              }
                            }}
                          >
                            {child.name}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Paper>
                  </Popper>
                )}
              </Box>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}