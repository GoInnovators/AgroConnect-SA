import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import Navbar from '@/components/Layout/Navbar';
import Home from '@/pages/Home';
import Auth from '@/pages/Auth';
import AdminDashboard from '@/pages/dashboards/AdminDashboard';
import FarmerDashboard from '@/pages/dashboards/FarmerDashboard';
import BuyerDashboard from '@/pages/dashboards/BuyerDashboard';
import Marketplace from '@/pages/Marketplace';
import Weather from '@/pages/Weather';
import Channels from '@/pages/Channels';
import NotFound from "./pages/NotFound";
import ChatBox from "@/components/ChatAssistant/ChatBox";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <ChatBox />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/farmer" element={<FarmerDashboard />} />
            <Route path="/buyer" element={<BuyerDashboard />} />
            <Route path="/Marketplace" element={<Marketplace />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/channels" element={<Channels />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
