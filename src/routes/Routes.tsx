import ProtectedRoute from "../components/layouts/protectedLayout";
import BookingTracker from "../pages/BookingTracker";
import CustomerManagement from "../pages/CustomerManagement";
import Dashboard from "../pages/Dashboard";
import Destination from "../pages/Desination";
import VoucherGenerator from "../pages/VoucherGenerator";
import AppRoutes from "./appRoutes";

const APP_ROUTES = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: AppRoutes.DASHBOARD,
        element: <Dashboard />,
       
      },
      // Add other protected routes here
      {
        path: AppRoutes.DESTINATIONS,
        index: true,
        element: <Destination />,
        
      },
      {
        path: AppRoutes.BOOKING_TRACKER,
        element: <BookingTracker />,
      },
      {
        path: AppRoutes.CUSTOMER_MANAGEMENT,
        element: <CustomerManagement />,
      },
      {
        path: AppRoutes.VOUCHER_GENERATOR,
        element: <VoucherGenerator />,
      },
    ],
  },
  // Add public/unprotected routes here if needed
];

export default APP_ROUTES;