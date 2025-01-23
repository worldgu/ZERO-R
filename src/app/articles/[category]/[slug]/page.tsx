'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { 
  Container, 
  Typography, 
  Box, 
  Chip,
  Divider,
  Paper
} from '@mui/material';
import { ArticleDetail } from '@/types';

export default function ArticleDetailPage() {
  const params = useParams();
  const category = params?.category as string;
  const slug = params?.slug as string;

  const { data: article } = useQuery({
    queryKey: ['article', slug] as const,
    queryFn: async () => {
      const data = await import('@/data/articles-data.json');
      const article = data.articles.find(
        article => article.category === category && article.slug === slug
      );
      if (!article) {
        throw new Error('Article not found');
      }
      return article as ArticleDetail;
    },
  });

  if (!article) {
    return <div>文章不存在</div>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom>
          {article.title}
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            作者：{article.author} | 
            发布时间：{new Date(article.createdAt).toLocaleDateString()} | 
            事件时间：{article.eventDate}
          </Typography>
        </Box>

        <Box 
          component="img"
          src={article.coverImage}
          alt={article.title}
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: 1,
            mb: 3
          }}
        />

        <Box sx={{ mb: 3 }}>
          {article.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{ mr: 1 }}
            />
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          {article.content}
        </Typography>
      </Paper>
    </Container>
  );
} 