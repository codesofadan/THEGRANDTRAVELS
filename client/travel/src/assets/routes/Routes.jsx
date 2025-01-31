import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Destinations from '../pages/Destinations/Destinations';
import Flights from '../pages/Flights/Flights';
import Packages from '../pages/Packages/Packages';
import Layout from '../components/Layout/Layout';

const AppRoutes = () => {
    return (
        <Router>
            <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/flights" element={<Flights />} />
                <Route path="/packages" element={<Packages />} />
            </Routes>
            </Layout>
        </Router>
    );
};

export default AppRoutes;
