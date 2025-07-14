'use client';

import { useEffect, useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import {
  Button,
  Typography,
  Box,
  useTheme,
  CircularProgress,
} from '@mui/material';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import type { Property } from '@/types/Property';

const items = [
  {
    id: '1',
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
  },
  {
    id: '2',
    img: 'https://images.unsplash.com/photo-1560184897-ae75f418493e',
  },
  {
    id: '3',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
  },
];

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    fetch('https://6873e6cac75558e2735597fd.mockapi.io/properties')
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].reverse();
        console.log('DATA DARI MOCKAPI:', sorted);
        setProperties(sorted);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Box>
        <Swiper
              spaceBetween={30}
              slidesPerView={1}
              loop
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
            >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 450, sm: 600, md: 800 },
                  maxHeight: '100vh',
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src={item.img}
                  alt="Slide"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '50%',
                    zIndex: 1,
                    pointerEvents: 'none',
                    background: `linear-gradient(
                      to bottom,
                      rgba(13,71,161,0.85) 0%,
                      rgba(13,71,161,0.55) 60%,
                      rgba(13,71,161,0.00) 100%
                    )`,
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: 20, sm: 40, md: 60 },
                    right: { xs: 20, sm: 40, md: 60 },
                    zIndex: 2,
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'flex-start', sm: 'flex-end' },
                    maxWidth: { xs: '90%', sm: '80%', md: 500 },
                    px: { xs: 2, sm: 0 },
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                      textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    }}
                  >
                    Selamat Datang di Hartono Estate
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                      textAlign: { xs: 'left', sm: 'right' },
                      textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      mt: 2,
                    }}
                  >
                    Temukan properti impian Anda untuk dibeli atau disewa.
                  </Typography>
                  <Box sx={{ display: 'flex', mt: 3, flexWrap: 'wrap', gap: 1 }}>
                    <Link href="/dijual" passHref>
                      <Button variant="contained" color="primary">
                        Lihat Dijual
                      </Button>
                    </Link>
                    <Link href="/disewa" passHref>
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{
                          bgcolor: 'white',
                          color: 'primary.main',
                          '&:hover': {
                            bgcolor: 'grey.100',
                          },
                        }}
                      >
                        Lihat Disewa
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Judul Section */}
        <Typography
          variant="h5"
          fontWeight="medium"
          sx={{
            textAlign: 'center',
            textShadow: '0 2px 6px rgba(13,71,161,0.15)',
            letterSpacing: 1,
            color: 'primary.dark',
            mt: 5,
          }}
        >
          Properti Terbaru
        </Typography>

        {/* Kartu Properti */}
        <Box
          sx={{
            background:
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.04)'
                : 'rgba(13,71,161,0.05)',
            borderRadius: 3,
            boxShadow: 2,
            mt: 3,
            px: { xs: 2, sm: 4, md: 6 },
            py: 4,
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <Box
              display="grid"
              gridTemplateColumns={{
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              }}
              gap={3}
            >
              {properties.map((item) => (
                <Box key={item.id}>
                  <PropertyCard data={item} />
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
