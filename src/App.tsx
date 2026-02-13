import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import Index from "./pages/Index";
import Designs from "./pages/Designs";
import CustomDesign from "./pages/CustomDesign";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmed from "./pages/OrderConfirmed";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ManageDesigns from "./pages/admin/ManageDesigns";
import ManageOrders from "./pages/admin/ManageOrders";
import CustomRequests from "./pages/admin/CustomRequests";
import Customers from "./pages/admin/Customers";
import AdminSettings from "./pages/admin/AdminSettings";
import Reveal from "./pages/Reveal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/designs" element={<Designs />} />
            <Route path="/custom" element={<CustomDesign />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmed" element={<OrderConfirmed />} />
            <Route path="/reveal" element={<Reveal />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="designs" element={<ManageDesigns />} />
              <Route path="orders" element={<ManageOrders />} />
              <Route path="custom-requests" element={<CustomRequests />} />
              <Route path="customers" element={<Customers />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
