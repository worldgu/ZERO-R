'use client';

import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Article } from '@/types';
import Link from 'next/link';

export default function RecommendedArticles() {
  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: ['recommended-articles'],
    queryFn: async () => {
      const articles = (await import('@/data/articles.json')).default;
      return articles;
    },
  });

  return (
    <Grid container spacing={3}>
      {articles.map((article) => (
        <Grid item key={article.id} xs={12} sm={6} md={4}>
          <Link href={`/articles/${article.code}`} style={{ textDecoration: 'none' }}>
            <Card sx={{ height: '100%' }}>
              {article.type !== 'text' && (
                <CardMedia
                  component="img"
                  height="140"
                  image="https://source.unsplash.com/random/400x200?article"
                  alt={article.title}
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {article.title}
                </Typography>
                {article.subtitle && (
                  <Typography variant="body2" color="text.secondary">
                    {article.subtitle}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}