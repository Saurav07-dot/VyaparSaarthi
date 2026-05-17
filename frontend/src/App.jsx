import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";

import Products from "./pages/Products";

import ProductDetails from "./pages/ProductDetails";

import RecommendationPage from "./pages/RecommendationPage"

import Insights from "./pages/Insights";
import AIProductStudio from "./pages/AIProductStudio";
import Settings from "./pages/Settings";
function ProtectedRoute({
  children,
}) {

  const token =
    sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        {/* PRODUCTS */}

        <Route
          path="/products"
          element={
            <ProtectedRoute>

              <Products />

            </ProtectedRoute>
          }
        />

        {/* PRODUCT DETAILS */}

        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>

              <ProductDetails />

            </ProtectedRoute>
          }
        />

        {/* RECOMMENDATIONS */}

        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>

              <RecommendationPage />

            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-product-studio"
          element={
            <ProtectedRoute>

              <AIProductStudio />

            </ProtectedRoute>
          }
        />
        <Route
          path="/insights"
          element={
            <ProtectedRoute>

              <Insights/>

            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>

              <Settings />

            </ProtectedRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;