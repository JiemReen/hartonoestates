'use client';

import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const footerSections = [
  {
    title: 'Legal',
    links: [
      'Syarat & Ketentuan',
      'Komunitas',
      'Ajukan Konsultasi',
      'Hubungi: enquery@realestate.co',
      'Cari Agen',
    ],
  },
  {
    title: '',
    links: [
      'Kebijakan Privasi',
      'Berita Properti',
      'Mitra Proyek',
      'Listing Management Service',
    ],
  },
  {
    title: 'Properti Dijual di Indonesia',
    links: [
      'Rumah Skandinavia Dijual di Banyumanik',
      'Ruko Corner Dijual di Pandanaran',
      'Apartemen Menara Dijual di Pandanaran',
      'Lihat Semua Apartemen Dijual >',
    ],
  },
  {
    title: '',
    links: [
      'Ruko 3 Lantai Dijual di Pusat Kota',
      'Apartemen Marina View Dijual di Marina',
      'Kontrakan Budget Dijual di Mariana',
      'Lihat Semua Rumah Dijual >',
    ],
  },
];

const socialLinks = [
  { icon: <FaLinkedinIn />, label: 'LinkedIn' },
  { icon: <FaFacebookF />, label: 'Facebook' },
  { icon: <FaTwitter />, label: 'Twitter' },
];

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: '#1976d2',
        color: 'white',
        pt: 8,
        pb: 4,
        mt: 10,
        px: { xs: 3, sm: 4, md: 6 },
        overflowX: 'hidden', // ✅ mencegah scroll horizontal
      }}
    >
      {/* Konten utama footer */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gap={4}
      >
        {/* Kolom 1 */}
        <Box sx={{ minWidth: '200px' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Real Estate
          </Typography>
          <Typography variant="body2" mt={2}>
            Platform pencarian properti terlengkap untuk membeli, menyewa,
            atau menjual rumah dan apartemen di Indonesia.
          </Typography>

          <Typography variant="subtitle2" mt={3} fontWeight="bold">
            Stay Update to our Newsletter
          </Typography>

          <Box
            component="form"
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            flexWrap="wrap"
            mt={1}
            gap={1}
          >
            <TextField
              size="small"
              placeholder="Enter your email address"
              variant="outlined"
              sx={{
                bgcolor: 'white',
                borderRadius: '4px',
                input: { padding: '8px' },
                flex: 1,
                minWidth: { xs: '100%', sm: 180 },
              }}
            />
            <Button
              variant="contained"
              sx={{
                textTransform: 'none',
                borderRadius: '4px',
                bgcolor: '#005fcc',
                '&:hover': { bgcolor: '#004aad' },
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>

        {/* Kolom 2 - 5 */}
        {footerSections.map((section, idx) => (
          <Box key={idx} >
            {section.title && (
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {section.title}
              </Typography>
            )}
            {section.links.map((item) => (
              <Link
                href="#"
                key={item}
                passHref
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  {item}
                </Typography>
              </Link>
            ))}
          </Box>
        ))}
      </Box>

      {/* Footer bawah */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ xs: 'column', md: 'row' }}
        mt={6}
        pt={3}
        borderTop="1px solid rgba(255,255,255,0.3)"
      >
        <Typography
          variant="body2"
          sx={{ mb: { xs: 2, md: 0 }, textAlign: 'center' }}
        >
          © 2024–2025 Real Estate. All rights reserved.
        </Typography>

        <Box display="flex" gap={1}>
          {socialLinks.map((social) => (
            <IconButton
              key={social.label}
              sx={{ color: 'white' }}
              aria-label={social.label}
            >
              {social.icon}
            </IconButton>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
