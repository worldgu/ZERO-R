'use client';

import { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Typography,
  ButtonGroup,
  Button,
  InputAdornment,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import websitesData from '@/data/websites.json';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEngine, setSelectedEngine] = useState('站内');

  const handleSearch = () => {
    const engine = websitesData.searchEngines.find(e => e.name === selectedEngine);
    if (engine && searchQuery) {
      window.open(engine.url + encodeURIComponent(searchQuery), '_blank');
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* 左侧分类导航 */}
        <Grid item xs={2}>
          <List component="nav">
            {websitesData.categories.map((category) => (
              <ListItem
                button
                key={category.id}
                selected={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                  }
                }}
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* 右侧内容区 */}
        <Grid item xs={10}>
          {/* 搜索框 */}
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="站内AI工具搜索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />
            <ButtonGroup variant="outlined" size="small">
              {websitesData.searchEngines.map((engine) => (
                <Button
                  key={engine.name}
                  onClick={() => setSelectedEngine(engine.name)}
                  variant={selectedEngine === engine.name ? 'contained' : 'outlined'}
                >
                  {engine.name}
                </Button>
              ))}
            </ButtonGroup>
          </Box>

          {/* 内容展示区 */}
          {websitesData.categories.map((category) => (
            <Box key={category.id} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                {category.name}
              </Typography>
              <Grid container spacing={2}>
                {category.items.map((item) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <Card 
                      sx={{ 
                        height: '100%',
                        cursor: 'pointer',
                        '&:hover': { boxShadow: 6 }
                      }}
                      onClick={() => window.open(item.link, '_blank')}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.image}
                        alt={item.title}
                        sx={{ objectFit: 'contain', p: 2 }}
                      />
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}