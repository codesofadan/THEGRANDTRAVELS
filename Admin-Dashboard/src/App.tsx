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
              <Route path="team" element={<PrivateRoute path="team" component={TeamPage} />} />
              <Route path="contacts" element={<PrivateRoute path="contacts" component={ContactsPage} />} />
              <Route path="invoices" element={<PrivateRoute path="invoices" component={InvoicesPage} />} />
              <Route path="createinvoice" element={<PrivateRoute path="createinvoice" component={CreateInvoicePage} />} />
              <Route path="newUser" element={<PrivateRoute path="newUser" component={NewUserPage} />} />
              <Route path="calendar" element={<PrivateRoute path="calendar" component={CalendarPage} />} />
              <Route path="Agent Management" element={<PrivateRoute path="Agent Management" component={FaqPage} />} />
              <Route path="Flight Management" element={<PrivateRoute path="Flight Management" component={BarPage} />} />
              <Route path="Popups" element={<PrivateRoute path="Popups" component={PopupManager} />} />
              <Route path="Reports" element={<PrivateRoute path="Reports" component={LinePage} />} />
              <Route path="Booking Management" element={<PrivateRoute path="Booking Management" component={GeographyPage} />} />
              <Route path="popupmanage" element={<PrivateRoute path="popupmanage" component={PopupManagement} />} />
              <Route path="CQM" element={<PrivateRoute path="CQM" component={CQM} />} />
              <Route path="flightsmanage" element={<PrivateRoute path="flightsmanage" component={FlightManagement} />} />
              <Route path="agentsmanage" element={<PrivateRoute path="agentsmanage" component={AgentManagement} />} />
              <Route path="bookings" element={<PrivateRoute path="bookings" component={BookingManagement} />} />
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