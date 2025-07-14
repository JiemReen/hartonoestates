'use client';
import Link from 'next/link';
import { Card, CardContent, Typography, CardActionArea, Box } from '@mui/material';
import Image from 'next/image';

type Property = {
  id: string;
  title: string;
  image: string;
  location: string;
  price: number;
};

export default function PropertyCard({ data }: { data: Property }) {
  return (
    <Link href={`/properti/${data.id}`} passHref>
      <Card sx={{ width: '100%' }}>
        <CardActionArea>
          <Box sx={{ position: 'relative', width: '100%', height: 200 }}>
            <Image
              src={data.image}
              alt={data.title}
              fill
              style={{ objectFit: 'cover', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
            />
          </Box>
          <CardContent>
            <Typography variant="h6">{data.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {data.location}
            </Typography>
            <Typography variant="body1" fontWeight="bold" color="primary">
              Rp {data.price.toLocaleString('id-ID')}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
