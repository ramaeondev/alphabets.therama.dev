import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ImagePlaceholders from "./pages/ImagePlaceholders";
import ReactGA from "react-ga4";

// ✅ Initialize once (safe to do here)
ReactGA.initialize("G-CM7QGS0GKG");

// Move this component INSIDE the Router context
const PageTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);
  
  return null;
};

const queryClient = new QueryClient();

const DevOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    setIsDevMode(process.env.NODE_ENV === 'development');
  }, []);

  return isDevMode ? <>{children}</> : <Navigate to="/" />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Place the PageTracker here, inside the Router context */}
          <PageTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/image-placeholders"
              element={
                <DevOnlyRoute>
                  <ImagePlaceholders />
                </DevOnlyRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;