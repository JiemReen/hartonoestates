'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  Paper
} from '@mui/material';

export default function EditPropertyPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: '',
    type: 'sale',
    location: '',
    price: 0,
    area: 0,
    image: '',
    description: '',
    property: 'rumah',
  });

  useEffect(() => {
    if (id) {
      fetch(`https://6873e6cac75558e2735597fd.mockapi.io/properties/${id}`)
        .then((res) => res.json())
        .then((data) => setForm(data));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://6873e6cac75558e2735597fd.mockapi.io/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/admin/crud/manage');
      } else {
        console.error('Gagal mengupdate properti');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Edit Properti
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Judul" name="title" value={form.title} onChange={handleChange} required />
          <TextField label="Lokasi" name="location" value={form.location} onChange={handleChange} required />
          <TextField label="Harga" name="price" type="number" value={form.price} onChange={handleChange} required />
          <TextField label="Luas Area" name="area" type="number" value={form.area} onChange={handleChange} required />
          <TextField label="Link Gambar" name="image" value={form.image} onChange={handleChange} required />
          <TextField label="Deskripsi" name="description" value={form.description} onChange={handleChange} multiline rows={3} required />
          <TextField select label="Jenis Transaksi" name="type" value={form.type} onChange={handleChange}>
            <MenuItem value="sale">Dijual</MenuItem>
            <MenuItem value="rent">Disewa</MenuItem>
          </TextField>
          <TextField select label="Jenis Properti" name="property" value={form.property} onChange={handleChange}>
            <MenuItem value="rumah">Rumah</MenuItem>
            <MenuItem value="apartemen">Apartemen</MenuItem>
            <MenuItem value="ruko">Ruko</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary">
            Simpan Perubahan
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
