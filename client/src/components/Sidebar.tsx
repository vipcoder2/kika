
import React from "react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  Home, 
  Calendar, 
  Trophy, 
  Play, 
  Info, 
  Mail,
  Menu,
  X
} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Sidebar: React.FC = () => {
  const [location] = useLocation();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { path: "/", label: t('home'), icon: Home },
    { path: "/live", label: t('liveMatches'), icon: Play },
    { path: "/schedule", label: t('schedule'), icon: Calendar },
    { path: "/competitions", label: t('competitions'), icon: Trophy },
    { path: "/about", label: t('about'), icon: Info },
    { path: "/contact", label: t('contact'), icon: Mail },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-sport-primary">KikaSports</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="md:hidden"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-sport-primary text-white"
                      : "text-sport-text hover:bg-sport-hover"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-sport-surface border-r border-sport-border">
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
