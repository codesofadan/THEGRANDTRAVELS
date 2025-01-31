import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import RootLayout from "./pages/Root";
import Spinner from "./components/ui/Spinner";
import PopupManagement from "./pages/PopupManage";

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
const CreateInvoicePage = lazy(() => import("./pages/CreateInvoice")); // Import the CreateInvoice component
// Import the CreateInvoice component

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: (
        <Suspense fallback={<Spinner />}>
          <ErrorPage />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Spinner />}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: "team",
          element: (
            <Suspense fallback={<Spinner />}>
              <TeamPage />
            </Suspense>
          ),
        },
        {
          path: "contacts",
          element: (
            <Suspense fallback={<Spinner />}>
              <ContactsPage />
            </Suspense>
          ),
        },
        {
          path: "invoices",
          element: (
            <Suspense fallback={<Spinner />}>
              <InvoicesPage />
            </Suspense>
          ),
        },
        {
          path: "createinvoice",
          element: (
            <Suspense fallback={<Spinner />}>
              <CreateInvoicePage />
            </Suspense>
          ),
        },
        {
          path: "newUser",
          element: (
            <Suspense fallback={<Spinner />}>
              <NewUserPage />
            </Suspense>
          ),
        },
        {
          path: "calendar",
          element: (
            <Suspense fallback={<Spinner />}>
              <CalendarPage />
            </Suspense>
          ),
        },
        {
          path: "Agent Management",
          element: (
            <Suspense fallback={<Spinner />}>
              <FaqPage />
            </Suspense>
          ),
        },
        {
          path: "Flight Management",
          element: (
            <Suspense fallback={<Spinner />}>
              <BarPage />
            </Suspense>
          ),
        },
        {
          path: "Popups",
          element: (
            <Suspense fallback={<Spinner />}>
              <PiePage />
            </Suspense>
          ),
        },
        {
          path: "Reports",
          element: (
            <Suspense fallback={<Spinner />}>
              <LinePage />
            </Suspense>
          ),
        },
        {
          path: "Booking Management",
          element: (
            <Suspense fallback={<Spinner />}>
              <GeographyPage />
            </Suspense>
          ),
        },
        {
          path: "popupmanage",
          element: (
            <Suspense fallback={<Spinner />}>
              <PopupManagement />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;