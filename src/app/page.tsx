'use client';

import { Box, Container, Grid } from '@mui/material';
import Carousel from '@/components/Carousel';
import RecommendedArticles from '@/components/RecommendedArticles';

const carouselItems = [
  {
    id: '1',
    title: 'Modern Architecture',
    description: 'Exploring contemporary architectural designs',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&h=500&q=80',
    link: '/articles/architecture',
  },
  {
    id: '2',
    title: 'Nature Photography',
    description: 'Capturing the beauty of natural landscapes',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&h=500&q=80',
    link: '/articles/nature',
  },
  {
    id: '3',
    title: 'Urban Life',
    description: 'The pulse of city living',
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&h=500&q=80',
    link: '/articles/urban',
  },
  {
    id: '4',
    title: 'Technology Innovation',
    description: 'The future of digital transformation',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&h=500&q=80',
    link: '/articles/tech',
  },
  {
    id: '5',
    title: 'Creative Design',
    description: 'Inspiring creative works and designs',
    imageUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1600&h=500&q=80',
    link: '/articles/design',
  },
];

export default function Home() {
  return (
    <Box>
      <Carousel items={carouselItems} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RecommendedArticles />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}