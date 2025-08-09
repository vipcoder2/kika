import { Router, Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/contexts/AuthContext';
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt';

// Pages
import Home from '@/pages/Home';
import MatchDetails from '@/pages/MatchDetails';
import LiveScore from '@/pages/LiveScore'; // Import the LiveScore page
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Privacy from '@/pages/Privacy';
import Disclaimer from '@/pages/Disclaimer';
import FAQ from '@/pages/FAQ';
import NotFound from '@/pages/not-found';

// Admin Pages
import AdminLogin from '@/pages/admin/Login';
import AdminDashboard from '@/pages/admin/Dashboard';
import AddMatch from '@/pages/admin/AddMatch';
import EditMatch from '@/pages/admin/EditMatch';

// Components
import { ProtectedRoute } from '@/components/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Router>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/match/:id" component={MatchDetails} />
              <Route path="/live-scores" component={LiveScore} /> {/* Add Live Score route */}
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/disclaimer" component={Disclaimer} />
              <Route path="/faq" component={FAQ} />

              {/* Admin Routes */}
              <Route path="/admin/login" component={AdminLogin} />
              <Route path="/admin/dashboard">
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              </Route>
              <Route path="/admin/add-match">
                <ProtectedRoute>
                  <AddMatch />
                </ProtectedRoute>
              </Route>
              <Route path="/admin/edit-match/:id">
                <ProtectedRoute>
                  <EditMatch />
                </ProtectedRoute>
              </Route>

              <Route component={NotFound} />
            </Switch>
          </Router>
          <Toaster />
          <PWAInstallPrompt />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;