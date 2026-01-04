import React from 'react';
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  LinearProgress,
  Stack,
  Button
} from '@mui/material';
import {
  CheckCircle,
  Pending,
  Warning,
  ArrowUpward,
  Payment,
  CreditCard,
  AccountBalance,
  Paid
} from '@mui/icons-material';

interface Booking {
  id: number;
  customer: string;
  tour: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
  paymentMethod: string;
}

const BookingTracker: React.FC = () => {
  const bookings: Booking[] = [
    { id: 1, customer: 'John Doe', tour: 'European Adventure', amount: 2499, status: 'paid', date: '2024-03-15', paymentMethod: 'Credit Card' },
    { id: 2, customer: 'Jane Smith', tour: 'Asian Explorer', amount: 3199, status: 'pending', date: '2024-03-16', paymentMethod: 'PayPal' },
    { id: 3, customer: 'Bob Johnson', tour: 'Beach Paradise', amount: 4599, status: 'overdue', date: '2024-03-10', paymentMethod: 'Bank Transfer' },
    { id: 4, customer: 'Alice Brown', tour: 'Mountain Trek', amount: 1899, status: 'paid', date: '2024-03-14', paymentMethod: 'Credit Card' },
  ];

  const paymentStats = [
    { method: 'Credit Card', amount: 12540, percentage: 65, color: '#2196F3' },
    { method: 'PayPal', amount: 4920, percentage: 25, color: '#4CAF50' },
    { method: 'Bank Transfer', amount: 2310, percentage: 12, color: '#FF9800' },
    { method: 'Cash', amount: 350, percentage: 2, color: '#9C27B0' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle sx={{ color: '#4CAF50' }} />;
      case 'pending': return <Pending sx={{ color: '#FF9800' }} />;
      case 'overdue': return <Warning sx={{ color: '#F44336' }} />;
      default: return <Pending />;
    }
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'Credit Card': return <CreditCard />;
      case 'PayPal': return <Paid />;
      case 'Bank Transfer': return <AccountBalance />;
      default: return <Payment />;
    }
  };

  return (
    <Paper sx={{ p: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight="bold">
          Payment Tracking
        </Typography>
        <Button size="small" variant="outlined">
          View All
        </Button>
      </Box>

      {/* Payment Summary */}
      <Box mb={3}>
        <Typography variant="subtitle2" gutterBottom>
          Payment Methods Distribution
        </Typography>
        <Stack spacing={1}>
          {paymentStats.map((stat, index) => (
            <Box key={index}>
              <Box display="flex" justifyContent="space-between" mb={0.5}>
                <Typography variant="body2">
                  {stat.method}
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  ${stat.amount.toLocaleString()} ({stat.percentage}%)
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={stat.percentage}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: '#E0E0E0',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: stat.color,
                    borderRadius: 3
                  }
                }}
              />
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Recent Bookings */}
      <Typography variant="subtitle2" gutterBottom>
        Recent Bookings
      </Typography>
      <List>
        {bookings.map((booking) => (
          <ListItem
            key={booking.id}
            secondaryAction={
              <Chip
                icon={getStatusIcon(booking.status)}
                label={booking.status}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: booking.status === 'paid' ? '#4CAF50' : 
                              booking.status === 'pending' ? '#FF9800' : '#F44336',
                  color: booking.status === 'paid' ? '#4CAF50' : 
                        booking.status === 'pending' ? '#FF9800' : '#F44336'
                }}
              />
            }
            sx={{ px: 0 }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                {getPaymentIcon(booking.paymentMethod)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="body2" fontWeight="medium">
                  {booking.customer}
                </Typography>
              }
              secondary={
                <>
                  <Typography variant="caption" display="block">
                    {booking.tour}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    ${booking.amount} • {booking.date}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>

      {/* Total Revenue */}
      <Box mt={3} p={2} bgcolor="primary.light" borderRadius={1}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body2" color="primary.contrastText">
              Total Revenue
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="primary.contrastText">
              $32,450
            </Typography>
          </Box>
          <Chip
            icon={<ArrowUpward />}
            label="+12.5%"
            sx={{ bgcolor: 'white', color: 'primary.main' }}
          />
        </Stack>
      </Box>
    </Paper>
  );
};

export default BookingTracker;