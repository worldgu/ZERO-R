'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/navigation';

interface CarouselItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

export default function Carousel({ items }: CarouselProps) {
  const router = useRouter();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    adaptiveHeight: true,
    pauseOnHover: true,
    dotsClass: 'slick-dots custom-dots',
  };

  return (
    <Box 
      sx={{ 
        width: '100%', 
        height: '500px', 
        overflow: 'hidden',
        '& .custom-dots': {
          bottom: '20px',
          '& li': {
            margin: '0 4px',
            '& button': {
              '&:before': {
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.5)',
                opacity: 1,
                transition: 'color 0.3s ease',
              }
            }
          },
          '& li.slick-active button:before': {
            color: '#ffffff',
            opacity: 1,
          }
        }
      }}
    >
      <Slider {...settings}>
        {items.map((item) => (
          <Box
            key={item.id}
            onClick={() => router.push(item.link)}
            sx={{
              position: 'relative',
              height: '500px',
              cursor: 'pointer',
              '&:hover': {
                '& .MuiPaper-root': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              },
            }}
          >
            <Box
              sx={{
                backgroundImage: `url(${item.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
                width: '100%',
              }}
            />
            <Paper
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                padding: 3,
                transition: 'background-color 0.3s',
              }}
              elevation={0}
            >
              <Typography variant="h4" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body1">
                {item.description}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}