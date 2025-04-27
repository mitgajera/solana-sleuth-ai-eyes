
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ActivityPage from "./pages/ActivityPage";
import MetricsPage from "./pages/MetricsPage";
import DataSourcesPage from "./pages/DataSourcesPage";
import AlertsPage from "./pages/AlertsPage";
import ThreatsPage from "./pages/ThreatsPage";
import AIAnalysisPage from "./pages/AIAnalysisPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/metrics" element={<MetricsPage />} />
          <Route path="/data-sources" element={<DataSourcesPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/threats" element={<ThreatsPage />} />
          <Route path="/ai-analysis" element={<AIAnalysisPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
