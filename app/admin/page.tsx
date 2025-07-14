'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function AdminPage() {
  const { loggedIn, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn || role !== 'admin') {
      router.replace('/');
    }
  }, [loggedIn, role]);

  return (
    <Box sx={{ flexGrow: 1, mt: 5, px: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Dashboard
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
        }}
        gap={4}
        justifyContent="center"
        mt={4}
        maxWidth={500}
        mx="auto"
      >
        {/* Tombol Tambah Properti */}
        <Card
          sx={{
            width: '100%',
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 2,
            '&:hover': {
              bgcolor: 'primary.dark',
              cursor: 'pointer',
            },
          }}
          elevation={4}
        >
          <CardActionArea
            sx={{ height: '100%' }}
            onClick={() => router.push('/admin/crud/add')}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <AddIcon sx={{ fontSize: 48 }} />
              <Typography variant="body1" sx={{ mt: 1 }}>
                Tambah Properti
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        {/* Tombol Kelola Properti */}
        <Card
          sx={{
            width: '100%',
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'secondary.main',
            color: 'white',
            borderRadius: 2,
            '&:hover': {
              bgcolor: 'secondary.dark',
              cursor: 'pointer',
            },
          }}
          elevation={4}
        >
          <CardActionArea
            sx={{ height: '100%' }}
            onClick={() => router.push('/admin/crud/manage')}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <ManageAccountsIcon sx={{ fontSize: 48 }} />
              <Typography variant="body1" sx={{ mt: 1 }}>
                Kelola Properti
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
}
