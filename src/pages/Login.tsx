import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, EyeOff, Loader2, Mail, Lock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

// Form validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional()
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form
      loginSchema.parse(formData);
      setErrors({});
      
      setIsLoading(true);
      // Only pass email and password to login function
      await login(formData.email, formData.password, formData.rememberMe);
      
      // Show success toast and navigate to home
      toast({
        title: "Login Successful",
        description: `Welcome back to NETHRA VIGIL`,
      });
      
      // Navigate to home after successful login
      navigate('/');
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const validationErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            validationErrors[err.path[0]] = err.message;
          }
        });
        setErrors(validationErrors);
      } else {
        // Handle authentication errors
        toast({
          title: "Login Failed",
          description: error instanceof Error ? error.message : "Invalid credentials",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background cyber-grid p-4">
      <Card className="w-full max-w-md mx-4 bg-card/90 backdrop-blur-sm border-border/50 shadow-xl glow-effect">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              NETHRA VIGIL
            </h1>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Welcome Back</CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to access your cybersecurity dashboard
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-background/50 ${errors.email ? 'border-destructive' : ''} pl-10`}
                />
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email}
                </p>
              )}
            </div>
            
            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`bg-background/50 ${errors.password ? 'border-destructive' : ''} pl-10 pr-10`}
                />
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => 
                    setFormData({...formData, rememberMe: checked as boolean})
                  }
                />
                <Label htmlFor="rememberMe" className="text-sm font-medium leading-none">
                  Remember me
                </Label>
              </div>
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  toast({
                    title: "Feature Coming Soon",
                    description: "Password reset functionality will be available soon.",
                  });
                }}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full mt-2 h-11 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Don't have an account?
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/signup">
              Create an account
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
