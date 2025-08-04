import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid',
        borderColor: 'grey.200',
        bgcolor: 'white',
        py: 4,
        mt: 10,
      }}
    >
      <Container>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
        >
          © 2025 Senthuron Tech. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
