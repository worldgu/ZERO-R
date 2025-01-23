'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography,
  Chip,
  Box
} from '@mui/material';
import Link from 'next/link';
import { ArticleDetail } from '@/types';

export default function ArticleListPage() {
  const params = useParams();
  const category = params?.category as string;

  const { data: articles } = useQuery({
    queryKey: ['articles', category] as const,
    queryFn: async () => {
      const data = await import('@/data/articles-data.json');
      const filteredArticles = data.articles.filter(
        article => article.category === category
      );
      return filteredArticles as ArticleDetail[];
    },
  });

  const categoryTitles: Record<string, string> = {
    tech: '技术分享',
    life: '生活感悟',
    travel: '旅行记录'
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {categoryTitles[category] || '文章列表'}
      </Typography>
      
      <Grid container spacing={3}>
        {articles?.map((article) => (
          <Grid item xs={12} md={6} lg={4} key={article.id}>
            <Link 
              href={`/articles/${category}/${article.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <Card sx={{ 
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={article.coverImage}
                  alt={article.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {article.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 