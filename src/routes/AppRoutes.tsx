import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomeScreen } from "../pages/Home";
import NotFound from "../pages/NotFound";


const AppRoutes = () => {
    return (

        <Router>
            <Routes>
                {/* Public */}
                <Route path="" element={<HomeScreen />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;