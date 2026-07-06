import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Reservation from "./pages/Reservation";
import NotFound from "./pages/NotFound";
import Story from "./pages/Story";
import Events from "./pages/Events";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminMenuItems from "./pages/admin/AdminMenuItems";
import AdminSpecials from "./pages/admin/AdminSpecials";
import AdminReservations from "./pages/admin/AdminReservations";
import { useEffect } from "react";
import { getCategories, getFoods } from "@/lib/api";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminLogin from "./pages/admin/AdminLogin";
import UserLogin from "./pages/UserLogin";


const queryClient = new QueryClient();

const App = () => {
  // 👇 hook funksiya ICHIDA, return'dan OLDIN

// ...App ichida:
useEffect(() => {
  fetch(`${import.meta.env.VITE_API_BASE_URL}/reservations`)
    .then((r) => r.json())
    .then((d) => console.log("📅 Reservations:", d));
}, []);
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes with main layout */}
                <Route element={<Layout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/reservation" element={<Reservation />} />
                  <Route path="/story" element={<Story />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* Admin routes — no public header/footer */}
                <Route path="/login" element={<UserLogin/>}/>
                <Route path="/admin/login" element={<AdminLogin/>}/>
                <Route path="/admin" element={<AdminDashboard />}>
                  <Route index element={<AdminOverview />} />
                  <Route path="menu" element={<AdminMenuItems />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="specials" element={<AdminSpecials />} />
                  <Route path="reservations" element={<AdminReservations />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;