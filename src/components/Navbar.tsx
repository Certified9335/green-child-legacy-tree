
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User, Menu, X } from "lucide-react";
import NotificationBell from "./notifications/NotificationBell";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This will be replaced with auth state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <Link to="/" className="text-foreground hover:text-eco-green font-medium">
            Home
          </Link>
          <Link to="/about" className="text-foreground hover:text-eco-green font-medium">
            About
          </Link>
          <Link to="/map" className="text-foreground hover:text-eco-green font-medium">
            Tree Map
          </Link>
          <Link to="/projects" className="text-foreground hover:text-eco-green font-medium">
            Projects
          </Link>
          <Link to="/resources" className="text-foreground hover:text-eco-green font-medium">
            Resources
          </Link>
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" className="text-foreground hover:text-eco-green">
                  Dashboard
                </Button>
              </Link>
              <NotificationBell />
              <Link to="/profile">
                <Button variant="outline" className="flex items-center gap-2 border-eco-green text-eco-green hover:bg-eco-green hover:text-white">
                  <User size={16} />
                  <span>Profile</span>
                </Button>
              </Link>
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
            <Link to="/map" className="text-foreground hover:text-eco-green font-medium" onClick={toggleMenu}>
              Tree Map
            </Link>
            <Link to="/projects" className="text-foreground hover:text-eco-green font-medium" onClick={toggleMenu}>
              Projects
            </Link>
            <Link to="/resources" className="text-foreground hover:text-eco-green font-medium" onClick={toggleMenu}>
              Resources
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
                <Link to="/profile" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full justify-start flex items-center gap-2 border-eco-green text-eco-green hover:bg-eco-green hover:text-white">
                    <User size={16} />
                    <span>Profile</span>
                  </Button>
                </Link>
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
