'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import SearchFilterBar from '@/components/SearchFilterBar';
import type { Property } from '@/types/Property';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CardMedia,
} from '@mui/material';

export default function KelolaPropertiPage() {
  const { loggedIn, role } = useAuth();
  const router = useRouter();

  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);

  useEffect(() => {
    if (!loggedIn || role !== 'admin') {
      router.replace('/');
    } else {
      fetch('https://6873e6cac75558e2735597fd.mockapi.io/properties')
        .then((res) => res.json())
        .then((data) => {
          setAllProperties(data);
          setFiltered(data);
        });
    }
  }, [loggedIn, role]);

  const handleSearch = ({
    searchTerm,
    location,
    property,
    sort,
  }: {
    searchTerm: string;
    location: string;
    property: string;
    sort: 'asc' | 'desc' | '';
  }) => {
    let result = [...allProperties];

    if (searchTerm) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (location) {
      result = result.filter(
        (item) => item.location.toLowerCase() === location.toLowerCase()
      );
    }

    if (property) {
      result = result.filter(
        (item) => item.property.toLowerCase() === property.toLowerCase()
      );
    }

    if (sort === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    setFiltered(result);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus properti ini?')) return;
    await fetch(`https://6873e6cac75558e2735597fd.mockapi.io/properties/${id}`, {
      method: 'DELETE',
    });
    setFiltered((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Kelola Properti
      </Typography>

      <SearchFilterBar onSearch={handleSearch} />

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: '1fr',
          sm: '1fr 1fr',
          md: '1fr 1fr 1fr',
        }}
        gap={2}
        mt={2}
      >
        {filtered.map((item) => (
          <Card key={item.id}>
            <CardMedia
              component="img"
              height="160"
              image={item.image}
              alt={item.title}
            />
            <CardContent>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.location} — {item.property} — Rp {item.price}
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push(`/admin/crud/edit/${item.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(item.id)}
                >
                  Hapus
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
