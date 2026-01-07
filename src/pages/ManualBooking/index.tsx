import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import { Add } from "@mui/icons-material";

/* ======================
   TOUR (FROM YOUR SYSTEM)
====================== */
interface Tour {
  id: number;
  name: string;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
  timeSlots: string[];
  pickupLocations: string[];
  transferType: "SIC" | "Private";
}

/* ======================
   MANUAL BOOKING MODEL
====================== */
interface ManualBooking {
  id: number;
  tourId: number;
  tourName: string;

  travelDate: string;
  timeSlot: string;

  adults: number;
  children: number;
  infants: number;

  pickupLocation: string;
  transferType: "SIC" | "Private";

  customerName: string;
  customerPhone: string;
  customerEmail: string;

  totalAmount: number;
  paymentStatus: "pending" | "paid" | "cash";
  bookingStatus: "confirmed" | "cancelled";
}

/* ======================
   DUMMY TOURS (FROM TOUR PANEL)
====================== */
const dummyTours: Tour[] = [
  {
    id: 1,
    name: "Dubai Desert Safari",
    adultPrice: 250,
    childPrice: 200,
    infantPrice: 0,
    timeSlots: ["Evening"],
    pickupLocations: ["Deira", "Marina", "Downtown"],
    transferType: "SIC",
  },
  {
    id: 2,
    name: "Dubai City Tour",
    adultPrice: 180,
    childPrice: 140,
    infantPrice: 0,
    timeSlots: ["Morning"],
    pickupLocations: ["Hotel", "Mall", "Airport"],
    transferType: "Private",
  },
];

/* ======================
   EMPTY BOOKING
====================== */
const emptyBooking: ManualBooking = {
  id: 0,
  tourId: 0,
  tourName: "",

  travelDate: "",
  timeSlot: "",

  adults: 1,
  children: 0,
  infants: 0,

  pickupLocation: "",
  transferType: "SIC",

  customerName: "",
  customerPhone: "",
  customerEmail: "",

  totalAmount: 0,
  paymentStatus: "pending",
  bookingStatus: "confirmed",
};

const ManualBookingManagement: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [bookings, setBookings] = useState<ManualBooking[]>([]);
  const [bookingData, setBookingData] = useState<ManualBooking>(emptyBooking);

  /* ======================
     PRICE CALCULATION
  ====================== */
  const calculateTotal = (tour: Tour) => {
    return (
      bookingData.adults * tour.adultPrice +
      bookingData.children * tour.childPrice +
      bookingData.infants * tour.infantPrice
    );
  };

  /* ======================
     CONFIRM BOOKING
  ====================== */
  const handleConfirmBooking = () => {
    const tour = dummyTours.find((t) => t.id === bookingData.tourId);
    if (!tour) return;

    const total = calculateTotal(tour);

    setBookings((prev) => [
      ...prev,
      {
        ...bookingData,
        id: Date.now(),
        tourName: tour.name,
        totalAmount: total,
      },
    ]);

    setOpenDialog(false);
    setBookingData(emptyBooking);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h6" fontWeight="bold">
          Manual Bookings
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          New Manual Booking
        </Button>
      </Box>

      {/* ======================
          BOOKINGS TABLE
      ====================== */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tour</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Pax</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((b) => (
            <TableRow key={b.id}>
              <TableCell>{b.tourName}</TableCell>
              <TableCell>{b.travelDate}</TableCell>
              <TableCell>
                A:{b.adults} C:{b.children}
              </TableCell>
              <TableCell>{b.customerName}</TableCell>
              <TableCell>{b.totalAmount} AED</TableCell>
              <TableCell>
                <Chip
                  label={b.paymentStatus}
                  color={b.paymentStatus === "paid" ? "success" : "warning"}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ======================
          BOOKING DIALOG
      ====================== */}
      <Dialog open={openDialog} maxWidth="md" fullWidth>
        <DialogTitle>Manual Booking</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            {/* TOUR */}
            <Select
              value={bookingData.tourId}
              onChange={(e) => {
                const tour = dummyTours.find((t) => t.id === +e.target.value)!;
                setBookingData({
                  ...bookingData,
                  tourId: tour.id,
                  transferType: tour.transferType,
                });
              }}
            >
              {dummyTours.map((tour) => (
                <MenuItem key={tour.id} value={tour.id}>
                  {tour.name}
                </MenuItem>
              ))}
            </Select>

            {/* DATE */}
            <TextField
              label="Travel Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={bookingData.travelDate}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  travelDate: e.target.value,
                })
              }
            />

            {/* TIME SLOT */}
            <Select
              value={bookingData.timeSlot}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  timeSlot: e.target.value,
                })
              }
            >
              {dummyTours
                .find((t) => t.id === bookingData.tourId)
                ?.timeSlots.map((slot) => (
                  <MenuItem key={slot} value={slot}>
                    {slot}
                  </MenuItem>
                ))}
            </Select>

            {/* PAX */}
            <Stack direction="row" spacing={2}>
              <TextField
                label="Adults"
                type="number"
                value={bookingData.adults}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    adults: +e.target.value,
                  })
                }
              />
              <TextField
                label="Children"
                type="number"
                value={bookingData.children}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    children: +e.target.value,
                  })
                }
              />
              <TextField
                label="Infants"
                type="number"
                value={bookingData.infants}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    infants: +e.target.value,
                  })
                }
              />
            </Stack>

            {/* PICKUP */}
            <Select
              value={bookingData.pickupLocation}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  pickupLocation: e.target.value,
                })
              }
            >
              {dummyTours
                .find((t) => t.id === bookingData.tourId)
                ?.pickupLocations.map((loc) => (
                  <MenuItem key={loc} value={loc}>
                    {loc}
                  </MenuItem>
                ))}
            </Select>

            {/* CUSTOMER */}
            <TextField
              label="Customer Name"
              value={bookingData.customerName}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  customerName: e.target.value,
                })
              }
            />
            <TextField
              label="Phone"
              value={bookingData.customerPhone}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  customerPhone: e.target.value,
                })
              }
            />
            <TextField
              label="Email"
              value={bookingData.customerEmail}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  customerEmail: e.target.value,
                })
              }
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Typography sx={{ flexGrow: 1, ml: 2 }}>
            Total:{" "}
            <strong>
              {bookingData.tourId
                ? calculateTotal(
                    dummyTours.find((t) => t.id === bookingData.tourId)!
                  )
                : 0}{" "}
              AED
            </strong>
          </Typography>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirmBooking}>
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ManualBookingManagement;
