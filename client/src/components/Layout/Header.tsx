import { Menu, Shield, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'wouter';
import { useState } from 'react';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    if (window.innerWidth < 1024) { // lg breakpoint
      // On mobile, toggle the mobile menu
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      // On desktop, toggle the sidebar
      onMenuToggle();
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 h-16 flex items-center justify-between">
      <div className="flex items-center">
        {/* Mobile hamburger button - Only visible on mobile */}
        <button
          onClick={handleMenuToggle}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Logo - Only visible on mobile */}
        <Link href="/" className="flex items-center ml-3 lg:hidden">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
            <span className="text-white font-bold text-sm">KS</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">KikaSports</h1>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link href="/live-scores" className="text-gray-600 hover:text-gray-900 transition-colors">Live Scores</Link>
        <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
        <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
        <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy</Link>
        <Link href="/disclaimer" className="text-gray-600 hover:text-gray-900 transition-colors">Disclaimer</Link>
      </nav>

      <div className="flex items-center">
        {isAuthenticated ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.href = '/admin/dashboard'}
            className="flex items-center"
          >
            <Shield className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.href = '/admin/login'}
            className="flex items-center"
          >
            <Shield className="w-4 h-4 mr-2" />
            Admin Login
          </Button>
        )}
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b shadow-lg md:hidden z-50">
          <nav className="px-4 py-4 space-y-3">
            <Link 
              href="/live-scores" 
              className="block text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Live Scores
            </Link>
            <Link 
              href="/about" 
              className="block text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="block text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/privacy" 
              className="block text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Privacy
            </Link>
            <Link 
              href="/disclaimer" 
              className="block text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Disclaimer
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}