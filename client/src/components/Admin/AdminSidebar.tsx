import { Link, useLocation } from 'wouter';
import { LayoutDashboard, Users, Plus, Settings, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'All Matches', href: '/admin/dashboard', icon: Users },
  { name: 'Add Match', href: '/admin/add-match', icon: Plus },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen = true, onClose }: AdminSidebarProps) {
  const [location] = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:block'
        )}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">Admin Panel</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-3 rounded-lg px-3 py-3 font-medium transition-colors',
                      isActive
                        ? 'text-secondary bg-orange-50 border-r-2 border-secondary'
                        : 'text-gray-700 hover:text-secondary hover:bg-orange-50'
                    )}
                    onClick={onClose}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
