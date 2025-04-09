
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User, Menu, X, Shield, HeartHandshake, MessageSquare, LogOut } from "lucide-react";
import NotificationBell from "./notifications/NotificationBell";
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdmin, logout: adminLogout } = useAdminAuth();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const isLoggedIn = !!user;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAdminLogout = () => {
    adminLogout();
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin dashboard.",
    });
    navigate('/');
  };

  const handleUserLogout = async () => {
    await signOut();
    toggleMenu();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-eco-green text-3xl">🌳</span>
            <span className="font-display font-bold text-xl text-eco-green-dark">OneTreeOneChild</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`${location.pathname === '/' ? 'text-eco-green font-medium' : 'text-foreground hover:text-eco-green font-medium'}`}>
            Home
          </Link>
          <Link to="/about" className={`${location.pathname === '/about' ? 'text-eco-green font-medium' : 'text-foreground hover:text-eco-green font-medium'}`}>
            About
          </Link>
          <Link to="/projects" className={`${location.pathname === '/projects' ? 'text-eco-green font-medium' : 'text-foreground hover:text-eco-green font-medium'}`}>
            Projects
          </Link>
          <Link to="/resources" className={`${location.pathname === '/resources' ? 'text-eco-green font-medium' : 'text-foreground hover:text-eco-green font-medium'}`}>
            Resources
          </Link>
          <Link to="/contact" className={`${location.pathname === '/contact' ? 'text-eco-green font-medium' : 'text-foreground hover:text-eco-green font-medium'}`}>
            <MessageSquare size={16} className="mr-1 inline" />
            Contact
          </Link>
          <Link to="/donate" className={`${location.pathname === '/donate' ? 'text-eco-green font-medium' : 'text-foreground hover:text-eco-green flex items-center font-medium'}`}>
            <HeartHandshake size={16} className="mr-1" />
            Donate
          </Link>
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" className={`${location.pathname === '/dashboard' ? 'text-eco-green' : 'text-foreground hover:text-eco-green'}`}>
                  Dashboard
                </Button>
              </Link>
              <NotificationBell />
              {isAdmin ? (
                <Link to="/admin">
                  <Button variant="outline" className={`flex items-center gap-1 ${location.pathname === '/admin' ? 'bg-amber-50 border-amber-500 text-amber-600' : 'border-amber-500 text-amber-600 hover:bg-amber-50'}`}>
                    <Shield size={16} />
                    <span>Admin</span>
                  </Button>
                </Link>
              ) : (
                <Link to="/admin-login">
                  <Button variant="outline" className="flex items-center gap-1 border-amber-500 text-amber-600 hover:bg-amber-50">
                    <Shield size={16} />
                    <span>Admin</span>
                  </Button>
                </Link>
              )}
              <Link to="/profile">
                <Button variant="outline" className="flex items-center gap-2 border-eco-green text-eco-green hover:bg-eco-green hover:text-white">
                  <User size={16} />
                  <span>Profile</span>
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                onClick={signOut}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut size={16} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" className="text-foreground hover:text-eco-green">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-eco-green hover:bg-eco-green-dark text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          {isLoggedIn && <NotificationBell />}
          <Button variant="ghost" size="sm" onClick={toggleMenu} aria-label="Toggle menu" className="ml-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 z-50">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-foreground hover:text-eco-green font-medium" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/about" className="text-foreground hover:text-eco-green font-medium" onClick={toggleMenu}>
              About
            </Link>
            <Link to="/projects" className="text-foreground hover:text-eco-green font-medium" onClick={toggleMenu}>
              Projects
            </Link>
            <Link to="/resources" className="text-foreground hover:text-eco-green font-medium" onClick={toggleMenu}>
              Resources
            </Link>
            <Link to="/contact" className="text-foreground hover:text-eco-green font-medium" onClick={toggleMenu}>
              <MessageSquare size={16} className="inline mr-1" />
              Contact
            </Link>
            <Link to="/donate" className="text-foreground hover:text-eco-green font-medium" onClick={toggleMenu}>
              <HeartHandshake size={16} className="inline mr-1" />
              Donate
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start text-foreground hover:text-eco-green">
                    Dashboard
                  </Button>
                </Link>
                <Link to="/notifications" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start text-foreground hover:text-eco-green">
                    Notifications
                  </Button>
                </Link>
                {isAdmin ? (
                  <Link to="/admin" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full justify-start flex items-center gap-1 border-amber-500 text-amber-600 hover:bg-amber-50">
                      <Shield size={16} />
                      <span>Admin</span>
                    </Button>
                  </Link>
                ) : (
                  <Link to="/admin-login" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full justify-start flex items-center gap-1 border-amber-500 text-amber-600 hover:bg-amber-50">
                      <Shield size={16} />
                      <span>Admin</span>
                    </Button>
                  </Link>
                )}
                <Link to="/profile" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full justify-start flex items-center gap-2 border-eco-green text-eco-green hover:bg-eco-green hover:text-white">
                    <User size={16} />
                    <span>Profile</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={handleUserLogout}
                  className="w-full justify-start text-red-500 hover:text-red-700"
                >
                  <LogOut size={16} className="mr-2" />
                  <span>Logout</span>
                </Button>
                {isAdmin && (
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      handleAdminLogout();
                      toggleMenu();
                    }}
                    className="w-full justify-start text-red-500 hover:text-red-700"
                  >
                    <LogOut size={16} className="mr-2" />
                    <span>Logout Admin</span>
                  </Button>
                )}
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start text-foreground hover:text-eco-green">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={toggleMenu}>
                  <Button className="w-full bg-eco-green hover:bg-eco-green-dark text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
