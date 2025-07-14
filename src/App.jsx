import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./features/auth/ProtectRoute";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import DeliveryPage from "./pages/DeliveryPage";
import ProductionPage from "./pages/ProductionPage";

import SettingsPage from "./pages/SettingsPage";
import StockPage from "./pages/StockPage";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            // <ProtectedRoute>
            <AdminLayout />
            // </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="stock" element={<StockPage />} />
          <Route path="production" element={<ProductionPage />} />
          <Route path="delivery" element={<DeliveryPage />} />
          <Route path="settings" element={<SettingsPage />} />

          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
