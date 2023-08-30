import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';

const Footer: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: '#232f3e', color: 'white', padding: '20px' }}>
      <Grid container>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body2" color="inherit" paragraph>
            Amazon Store is your destination for all things shopping. Discover a wide range of products
            from electronics to fashion and more.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Customer Service
          </Typography>
          <Link href="#" color="inherit" underline="hover">
            Contact Us
          </Link>
          <Link href="#" color="inherit" underline="hover">
            Returns & Exchanges
          </Link>
          <Link href="#" color="inherit" underline="hover">
            FAQs
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Shop With Us
          </Typography>
          <Link href="#" color="inherit" underline="hover">
            Featured Brands
          </Link>
          <Link href="#" color="inherit" underline="hover">
            Deals & Promotions
          </Link>
          <Link href="#" color="inherit" underline="hover">
            Gift Cards
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <IconButton color="inherit">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit">
            <TwitterIcon />
          </IconButton>
          <IconButton color="inherit">
            <InstagramIcon />
          </IconButton>
          <IconButton color="inherit">
            <PinterestIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;