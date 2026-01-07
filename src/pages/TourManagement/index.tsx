import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  InputAdornment,
  MenuItem,
  Select,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Edit,
  Delete,
  Add,
  Search,
  Visibility,
  AttachMoney,
  People,
} from "@mui/icons-material";

/* =======================
   RAYNA-LEVEL TOUR MODEL
======================= */
export interface Tour {
  id: number;

  name: string;
  city: string;
  category: string;
  shortDescription: string;

  adultPrice: number;
  childPrice: number;
  infantPrice: number;
  privatePrice?: number;

  availableDays: string[];
  timeSlots: string[];

  capacity: number;
  booked: number;

  pickupIncluded: boolean;
  pickupLocations: string[];
  transferType: "SIC" | "Private";

  cancellationPolicy: string;
  childPolicy: string;
  refundPolicy: string;

  status: "draft" | "published" | "inactive";
}

/* =======================
   EMPTY TOUR TEMPLATE
======================= */
const emptyTour: Tour = {
  id: 0,
  name: "",
  city: "",
  category: "",
  shortDescription: "",

  adultPrice: 0,
  childPrice: 0,
  infantPrice: 0,

  availableDays: [],
  timeSlots: [],

  capacity: 0,
  booked: 0,

  pickupIncluded: true,
  pickupLocations: [],
  transferType: "SIC",

  cancellationPolicy: "",
  childPolicy: "",
  refundPolicy: "",

  status: "draft",
};
const dummyTours: Tour[] = [
  {
    id: 1,
    name: "Dubai Desert Safari with BBQ Dinner",
    city: "Dubai",
    category: "Desert Safari",
    shortDescription: "Evening desert safari with dune bashing and BBQ dinner",

    adultPrice: 250,
    childPrice: 200,
    infantPrice: 0,

    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    timeSlots: ["Evening"],

    capacity: 50,
    booked: 32,

    pickupIncluded: true,
    pickupLocations: ["Deira", "Bur Dubai", "Marina"],
    transferType: "SIC",

    cancellationPolicy: "Free cancellation up to 24 hours before the tour",
    childPolicy: "Children under 3 years are free",
    refundPolicy: "No refund for no-shows",

    status: "published",
  },
  {
    id: 2,
    name: "Dubai City Tour",
    city: "Dubai",
    category: "City Tour",
    shortDescription: "Half-day guided city tour of Dubai",

    adultPrice: 180,
    childPrice: 140,
    infantPrice: 0,

    availableDays: ["Sun", "Mon", "Wed", "Fri"],
    timeSlots: ["Morning"],

    capacity: 30,
    booked: 18,

    pickupIncluded: true,
    pickupLocations: ["Downtown", "JBR", "Business Bay"],
    transferType: "SIC",

    cancellationPolicy: "Free cancellation up to 12 hours before the tour",
    childPolicy: "Child price applies from 3–10 years",
    refundPolicy: "Refund within 7 working days",

    status: "published",
  },
  {
    id: 3,
    name: "Dhow Cruise Marina Dinner",
    city: "Dubai",
    category: "Cruise",
    shortDescription: "Luxury dinner cruise at Dubai Marina",

    adultPrice: 220,
    childPrice: 180,
    infantPrice: 0,

    availableDays: ["Thu", "Fri", "Sat"],
    timeSlots: ["Evening"],

    capacity: 40,
    booked: 40,

    pickupIncluded: true,
    pickupLocations: ["Sharjah", "Ajman", "Dubai"],
    transferType: "Private",

    cancellationPolicy: "Non-refundable within 24 hours",
    childPolicy: "Children below 5 years are free",
    refundPolicy: "Refund only if tour is cancelled by operator",

    status: "inactive",
  },
];

const TourManagement: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>(dummyTours);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [formData, setFormData] = useState<Tour>(emptyTour);
  const [tab, setTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  /* =======================
     HANDLERS
  ======================= */
  const handleChange = (field: keyof Tour, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.city) return;

    if (editingTour) {
      setTours((prev) =>
        prev.map((t) => (t.id === editingTour.id ? formData : t))
      );
    } else {
      setTours((prev) => [...prev, { ...formData, id: Date.now(), booked: 0 }]);
    }

    setOpenDialog(false);
    setEditingTour(null);
    setFormData(emptyTour);
    setTab(0);
  };

  const handleEdit = (tour: Tour) => {
    setEditingTour(tour);
    setFormData(tour);
    setOpenDialog(true);
  };

  const handleDelete = (id: number) => {
    setTours((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTours = tours.filter((tour) =>
    tour.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColor = (status: Tour["status"]) =>
    status === "published"
      ? "success"
      : status === "inactive"
      ? "error"
      : "warning";

  /* =======================
     UI
  ======================= */
  return (
    <Paper sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Tour Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setEditingTour(null);
            setFormData(emptyTour);
            setOpenDialog(true);
          }}
        >
          Create Tour
        </Button>
      </Box>

      <TextField
        placeholder="Search tour..."
        size="small"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      {/* TABLE */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tour</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Capacity</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTours.map((tour) => (
              <TableRow key={tour.id}>
                <TableCell>
                  <Typography fontWeight="bold">{tour.name}</Typography>
                  <Typography variant="body2">{tour.category}</Typography>
                </TableCell>
                <TableCell>{tour.city}</TableCell>
                <TableCell align="center">
                  <AttachMoney fontSize="small" /> {tour.adultPrice}
                </TableCell>
                <TableCell align="center">
                  <People fontSize="small" /> {tour.capacity}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={tour.status}
                    color={statusColor(tour.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEdit(tour)}>
                    <Edit />
                  </IconButton>
                  <IconButton>
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(tour.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* DIALOG */}
      <Dialog open={openDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editingTour ? "Edit Tour" : "Create Tour"}</DialogTitle>
        <DialogContent>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
            <Tab label="Basic" />
            <Tab label="Pricing" />
            <Tab label="Availability" />
            <Tab label="Pickup" />
            <Tab label="Policies" />
          </Tabs>

          {/* BASIC */}
          {tab === 0 && (
            <Stack spacing={2}>
              <TextField
                label="Tour Name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <TextField
                label="City"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
              <TextField
                label="Category"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
              />
              <TextField
                label="Short Description"
                multiline
                rows={3}
                value={formData.shortDescription}
                onChange={(e) =>
                  handleChange("shortDescription", e.target.value)
                }
              />
            </Stack>
          )}

          {/* PRICING */}
          {tab === 1 && (
            <Stack spacing={2}>
              <TextField
                label="Adult Price"
                type="number"
                value={formData.adultPrice}
                onChange={(e) => handleChange("adultPrice", +e.target.value)}
              />
              <TextField
                label="Child Price"
                type="number"
                value={formData.childPrice}
                onChange={(e) => handleChange("childPrice", +e.target.value)}
              />
              <TextField
                label="Infant Price"
                type="number"
                value={formData.infantPrice}
                onChange={(e) => handleChange("infantPrice", +e.target.value)}
              />
            </Stack>
          )}

          {/* AVAILABILITY */}
          {tab === 2 && (
            <Stack spacing={2}>
              <Select
                multiple
                value={formData.availableDays}
                onChange={(e) => handleChange("availableDays", e.target.value)}
              >
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </Select>

              <Select
                multiple
                value={formData.timeSlots}
                onChange={(e) => handleChange("timeSlots", e.target.value)}
              >
                {["Morning", "Afternoon", "Evening"].map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                label="Capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => handleChange("capacity", +e.target.value)}
              />
            </Stack>
          )}

          {/* PICKUP */}
          {tab === 3 && (
            <Stack spacing={2}>
              <Select
                value={formData.transferType}
                onChange={(e) => handleChange("transferType", e.target.value)}
              >
                <MenuItem value="SIC">SIC</MenuItem>
                <MenuItem value="Private">Private</MenuItem>
              </Select>
              <TextField
                label="Pickup Locations (comma separated)"
                value={formData.pickupLocations.join(",")}
                onChange={(e) =>
                  handleChange("pickupLocations", e.target.value.split(","))
                }
              />
            </Stack>
          )}

          {/* POLICIES */}
          {tab === 4 && (
            <Stack spacing={2}>
              <TextField
                label="Cancellation Policy"
                multiline
                rows={2}
                value={formData.cancellationPolicy}
                onChange={(e) =>
                  handleChange("cancellationPolicy", e.target.value)
                }
              />
              <TextField
                label="Child Policy"
                multiline
                rows={2}
                value={formData.childPolicy}
                onChange={(e) => handleChange("childPolicy", e.target.value)}
              />
              <TextField
                label="Refund Policy"
                multiline
                rows={2}
                value={formData.refundPolicy}
                onChange={(e) => handleChange("refundPolicy", e.target.value)}
              />
            </Stack>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editingTour ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TourManagement;
