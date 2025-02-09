import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import RootLayout from "./pages/Root";
import Spinner from "./components/ui/Spinner";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import PopupManagement from "./pages/PopupManager";
import PopupManager from "./pages/PopupManager";
import CQM from "./pages/CQM";
import FlightManagement from "./pages/FlightManagement";
import AgentManagement from "./pages/AgentManagement";
import BookingManagement from "./pages/BookingManagement";

// Lazy-loaded pages
const ErrorPage = lazy(() => import("./pages/Error"));
const HomePage = lazy(() => import("./pages/Home"));
const TeamPage = lazy(() => import("./pages/Team"));
const InvoicesPage = lazy(() => import("./pages/Invoices"));
const ContactsPage = lazy(() => import("./pages/Contacts"));
const CalendarPage = lazy(() => import("./pages/Calendar"));
const FaqPage = lazy(() => import("./pages/Faq"));
const BarPage = lazy(() => import("./pages/Bar"));
const PiePage = lazy(() => import("./pages/Pie"));
const LinePage = lazy(() => import("./pages/Line"));
const GeographyPage = lazy(() => import("./pages/Geography"));
const NewUserPage = lazy(() => import("./pages/NewUser"));
const CreateInvoicePage = lazy(() => import("./pages/CreateInvoice"));
const LoginPage = lazy(() => import("./pages/login"));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<Spinner />}>
          <Routes>
            {/* Redirect root to / if authenticated */}
            <Route path="/" element={<PrivateRoute path="/" component={RootLayout} />}>
              <Route index element={<PrivateRoute path="/" component={HomePage} />} />
              <Route path="invoices" element={<PrivateRoute path="invoices" component={InvoicesPage} />} />
              <Route path="createinvoice" element={<PrivateRoute path="createinvoice" component={CreateInvoicePage} />} />
              <Route path="CQM" element={<PrivateRoute path="CQM" component={CQM} />} />
              <Route path="bookings" element={<PrivateRoute path="bookings" component={BookingManagement} />} />
              <Route path="flightsmanage" element={<PrivateRoute path="flightsmanage" component={FlightManagement} />} />
            </Route>

            {/* Login Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Error Page */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;