import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ImagePlaceholders from "./pages/ImagePlaceholders";
import ReactGA from "react-ga4";

ReactGA.initialize("G-CM7QGS0GKG");

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
    <HelmetProvider> {/* Wrap your entire app with HelmetProvider */}
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
    </HelmetProvider>
  );
};

export default App;