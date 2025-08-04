import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WorkIcon from '@mui/icons-material/Work';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isBrowseJobs = location.pathname === '/';
  const isPostJob = location.pathname === '/post-job';

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'text.primary',boxShadow: theme.shadows,  }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
          {/* Logo and Title */}
          <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => handleNavigation('/')}>
<FontAwesomeIcon icon={faBriefcase} style={{ color: theme.palette.primary.main, fontSize: '24px', marginRight: '8px' }} />
            <Typography variant="h6" fontWeight="bold">
              JobBoard
            </Typography>
          </Box>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box display="flex" alignItems="center" gap={3}>
              <Typography
                variant="body1"
                onClick={() => handleNavigation('/')}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 500,
                  color: isBrowseJobs ? 'primary.main' : 'text.primary',
                  borderColor: 'primary.main',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                Browse Jobs
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNavigation('/post-job')}
                sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
              >
                Post a Job
              </Button>
            </Box>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <IconButton edge="end" color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon fontSize="large" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240 }} role="presentation">
          <List>
            <ListItem button onClick={() => handleNavigation('/')}>
              <ListItemText
                primary="Browse Jobs"
                primaryTypographyProps={{
                  fontWeight: isBrowseJobs ? 'bold' : 'normal',
                  color: isBrowseJobs ? 'primary.main' : 'text.primary',
                }}
              />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/post-job')}>
              <ListItemText
                primary="Post a Job"
                primaryTypographyProps={{
                  fontWeight: isPostJob ? 'bold' : 'normal',
                  color: isPostJob ? 'primary.main' : 'text.primary',
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
