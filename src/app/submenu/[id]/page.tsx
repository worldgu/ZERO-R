'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import Link from 'next/link';
import { NavItem } from '@/types';

export default function SubMenuPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const parentName = searchParams.get('parentName');
  
  const { data: navigationData } = useQuery<{ navItems: NavItem[] }>({
    queryKey: ['navigation'],
    queryFn: async () => {
      const data = await import('@/data/navigation.json');
      return data;
    },
  });

  const parentItem = navigationData?.navItems.find(
    item => item.id.toString() === params.id
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {parentName}
      </Typography>
      <Grid container spacing={3}>
        {parentItem?.children?.map((subItem) => (
          <Grid item xs={12} sm={6} md={4} key={subItem.id}>
            <Link href={subItem.path} style={{ textDecoration: 'none' }}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {subItem.name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 