import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Login Successful!",
      description: "Welcome back to Codemate.",
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-background to-secondary flex items-center">
      <div className="container mx-auto max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-accent animate-glow">
              <Code className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your Codemate account</p>
        </div>

        <Card className="gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked)}
                />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              >
                Sign In
              </Button>

              <div className="text-center">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary hover:underline">
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
