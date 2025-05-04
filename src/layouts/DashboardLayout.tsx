import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Building2,
  LayoutTemplate,
  FileText,
  Settings,
  Users,
  CreditCard,
  Menu,
  X,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { NavItem } from '../types';
import { Button } from '../components/ui/Button';

const mainNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: 'Home' },
  { title: 'Properties', href: '/dashboard/properties', icon: 'Building2' },
  { title: 'Templates', href: '/dashboard/templates', icon: 'LayoutTemplate' },
  { title: 'Reports', href: '/dashboard/reports', icon: 'FileText' },
];

const adminNavItems: NavItem[] = [
  { title: 'Company Settings', href: '/dashboard/admin/settings', icon: 'Settings' },
  { title: 'User Management', href: '/dashboard/admin/users', icon: 'Users' },
  { title: 'Subscription', href: '/dashboard/admin/subscription', icon: 'CreditCard' },
];

const IconMap: Record<string, React.ReactNode> = {
  Home: <Home size={24} />,
  Building2: <Building2 size={24} />,
  LayoutTemplate: <LayoutTemplate size={24} />,
  FileText: <FileText size={24} />,
  Settings: <Settings size={24} />,
  Users: <Users size={24} />,
  CreditCard: <CreditCard size={24} />,
};

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, company, logout, isAdmin } = useAuthStore();
  const location = useLocation();
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  
  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 lg:hidden">
        <div className="px-4 flex items-center justify-between h-20">
          <Link to="/dashboard" className="flex items-center">
            <Building2 className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">scopoStay</span>
          </Link>
          
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          >
            {sidebarOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </header>
      
      {/* Sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-gray-900 opacity-50 lg:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 z-40 h-full w-80 bg-white border-r border-gray-200
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="h-20 flex items-center px-6 border-b border-gray-200">
            <Link to="/dashboard" className="flex items-center">
              <Building2 className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">scopoStay</span>
            </Link>
          </div>
          
          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <nav className="space-y-2">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={closeSidebar}
                  className={({ isActive }) => `
                    flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors
                    ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                  end={item.href === '/dashboard'}
                >
                  <span className="mr-3 text-gray-500">{IconMap[item.icon]}</span>
                  {item.title}
                </NavLink>
              ))}
            </nav>
            
            {/* Admin section */}
            {isAdmin && (
              <div className="mt-10">
                <div className="px-3 mb-4">
                  <div className="flex items-center">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Admin
                    </h3>
                    <div className="flex-grow border-b border-gray-200 ml-2"></div>
                  </div>
                </div>
                <nav className="space-y-2">
                  {adminNavItems.map((item) => (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      onClick={closeSidebar}
                      className={({ isActive }) => `
                        flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors
                        ${
                          isActive
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }
                      `}
                    >
                      <span className="mr-3 text-gray-500">{IconMap[item.icon]}</span>
                      {item.title}
                    </NavLink>
                  ))}
                </nav>
              </div>
            )}
          </div>
          
          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-lg">
                {user?.firstName?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-base font-medium text-gray-900 truncate">
                  {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.email}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {company?.name}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="lg"
              className="mt-4 w-full justify-start text-base"
              onClick={handleLogout}
              leftIcon={<LogOut size={20} />}
            >
              Logout
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="lg:pl-80">
        <div className="py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;