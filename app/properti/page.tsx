import PropertyCard from '@/components/PropertyCard';
import { Container, Typography, Box } from '@mui/material';

type Property = {
  id: string;
  title: string;
  image: string;
  location: string;
  price: number;
};

export default async function PropertiPage() {
  const res = await fetch('https://687134f07ca4d06b34b9b681.mockapi.io/properties', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Gagal memuat properti');
  }

  const data: Property[] = await res.json();

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Daftar Properti
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }}
        gap={2}
      >
        {data.map((item) => (
          <Box key={item.id}>
            <PropertyCard data={item} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
