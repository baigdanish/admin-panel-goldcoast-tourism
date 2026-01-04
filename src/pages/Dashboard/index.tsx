import React from 'react';
import { 
  Box, 
  Typography, 
  Container,
 

} from '@mui/material';

import Grid from "@mui/material/Grid";
import SalesAnalytics from './components/SalesAnalytics';
import BookingAnalytics from './components/BookingAnalytics';
import TourManagement from './components/TourManagement';

const Dashboard: React.FC = () => {


  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Travel Management Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage sales, bookings, tours, and customers in one place
        </Typography>
      </Box>

      {/* Analytics Section */}
      <Grid container spacing={3} mb={4}>
        <Grid  >
          <SalesAnalytics />
        </Grid>
        <Grid >
          <BookingAnalytics />
        </Grid>
      </Grid>

      {/* Tour Management & Booking Tracker */}
      <Grid container spacing={3} mb={4}>
        <Grid  >
          <TourManagement />
        </Grid>
       
      </Grid>
    </Container>
  );
};

export default Dashboard;