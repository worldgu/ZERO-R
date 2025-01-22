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
import { usePathname } from 'next/navigation';
import { NavItem } from '@/types';
import { useQuery } from '@tanstack/react-query';

export default function Navigation() {
  const [openCategory, setOpenCategory] = React.useState<number | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const pathname = usePathname();

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
                sx={{ position: 'relative' }}
              >
                <Link
                  href={item.path}
                  style={{ 
                    color: 'inherit', 
                    textDecoration: 'none',
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
                </Link>
                {item.children && item.children.length > 0 && (
                  <Popper
                    open={openCategory === item.id}
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
                            sx={{
                              color: isActive(child.path) ? 'primary.main' : 'text.primary',
                              '&:hover': {
                                backgroundColor: 'primary.light',
                                color: 'white'
                              }
                            }}
                          >
                            <Link
                              href={child.path}
                              style={{ 
                                color: 'inherit', 
                                textDecoration: 'none',
                                width: '100%'
                              }}
                            >
                              {child.name}
                            </Link>
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