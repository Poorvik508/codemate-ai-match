import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code, Bot, Users, MessageSquare, User } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent animate-glow">
            <Code className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold gradient-text">Codemate</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/ai-chat" 
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              isActive("/ai-chat") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            <Bot className="h-4 w-4" />
            <span>AI Partner Finder</span>
          </Link>
          <Link 
            to="/matches" 
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              isActive("/matches") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Matches</span>
          </Link>
          <Link 
            to="/messaging" 
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              isActive("/messaging") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Messages</span>
          </Link>
          <Link 
            to="/profile" 
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              isActive("/profile") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
