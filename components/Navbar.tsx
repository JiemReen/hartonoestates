'use client';

import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Button,
  useMediaQuery,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image';

type NavLink = { label: string; path: string };

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { loggedIn, role, logout } = useAuth();

  const baseLinks: NavLink[] = [
    { label: 'Beranda', path: '/' },
    { label: 'Dijual', path: '/dijual' },
    { label: 'Disewa', path: '/disewa' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Kontak', path: '/contact' },
  ];

  if (loggedIn && role === 'admin') {
    baseLinks.push({ label: 'Admin', path: '/admin' });
  }

  const authLinks: NavLink[] = loggedIn
    ? [{ label: 'Logout', path: '/auth/logout' }]
    : [
        { label: 'Login', path: '/auth/login' },
        { label: 'Sign Up', path: '/auth/signup' },
      ];

  const navLinks = [...baseLinks, ...authLinks];

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLElement>,
    label: string,
    path: string
  ) => {
    e.preventDefault();
    if (label === 'Logout') {
      await fetch('/api/auth/logout', { method: 'POST' });
      logout();
      router.push('/');
    } else {
      router.push(path);
    }
    setDrawerOpen(false);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        height: '100%',
        bgcolor: 'primary.main',
        color: 'white',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
      }}
      role="presentation"
    >
      <Box>
        <Typography variant="h6" mb={2}>
          Menu
        </Typography>
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.path} disablePadding>
              <ListItemButton
                selected={pathname === link.path}
                onClick={(e) => handleClick(e, link.label, link.path)}
                sx={{
                  color: 'white',
                  '&.Mui-selected': {
                    backgroundColor: 'primary.dark',
                  },
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box textAlign="center" fontSize="0.8rem" color="white">
        © {new Date().getFullYear()} Polux
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              style={{ objectFit: 'contain' }}
            />
          </Link>

          {isMobile ? (
            <>
              <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                transitionDuration={300}
              >
                {drawerContent}
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path} passHref>
                  <Button
                    onClick={(e) => handleClick(e, link.label, link.path)}
                    variant="text"
                    sx={{
                      color: 'white',
                      bgcolor: pathname === link.path ? 'primary.dark' : 'transparent',
                      '&:hover': {
                        bgcolor:
                          pathname === link.path
                            ? 'primary.dark'
                            : 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
