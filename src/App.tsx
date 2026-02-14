import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import SmsPage from "./pages/SmsPage";
import WhatsappPage from "./pages/WhatsappPage";
import EmailPage from "./pages/EmailPage";
import VoicePage from "./pages/VoicePage";
import ContactsPage from "./pages/ContactsPage";
import ReportsPage from "./pages/ReportsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/sms" element={<SmsPage />} />
            <Route path="/whatsapp" element={<WhatsappPage />} />
            <Route path="/email" element={<EmailPage />} />
            <Route path="/voice" element={<VoicePage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
