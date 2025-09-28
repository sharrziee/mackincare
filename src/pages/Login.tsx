import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { Stethoscope, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type UserRole = "user" | "doctor" | "admin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("user");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      toast({
        title: "Login Berhasil!",
        description: `Selamat datang kembali sebagai ${role}`,
      });
      
      // Store user session
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', role);
      
      // Navigate to respective dashboard
      switch (role) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "doctor":
          navigate("/doctor-dashboard");
          break;
        default:
          navigate("/patient-dashboard");
      }
      setIsLoading(false);
    }, 2000);
  };

  const getRoleInfo = (selectedRole: UserRole) => {
    switch (selectedRole) {
      case "admin":
        return {
          title: "Admin Panel",
          description: "Kelola sistem healthcare secara menyeluruh",
          color: "bg-healthcare-danger/10 text-healthcare-danger border-healthcare-danger/20"
        };
      case "doctor":
        return {
          title: "Portal Dokter",
          description: "Layani konsultasi dan kelola jadwal praktik",
          color: "bg-healthcare-primary/10 text-healthcare-primary border-healthcare-primary/20"
        };
      default:
        return {
          title: "Portal Pasien",
          description: "Akses layanan kesehatan lengkap",
          color: "bg-healthcare-secondary/10 text-healthcare-secondary border-healthcare-secondary/20"
        };
    }
  };

  const roleInfo = getRoleInfo(role);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative w-full max-w-md">
        {/* Back to Home */}
        <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Beranda
        </Link>

        <Card className="shadow-card border-0">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Stethoscope className="h-8 w-8 text-healthcare-primary" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                MACKIN-Care
              </span>
            </div>
            <div>
              <CardTitle className="text-2xl">Masuk ke Akun</CardTitle>
              <CardDescription>
                Pilih role dan masuk untuk mengakses dashboard
              </CardDescription>
            </div>
            <Badge className={roleInfo.color}>
              {roleInfo.title}
            </Badge>
            <p className="text-sm text-muted-foreground">
              {roleInfo.description}
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">Masuk Sebagai</Label>
                <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">👤 Pasien</SelectItem>
                    <SelectItem value="doctor">👨‍⚕️ Dokter</SelectItem>
                    <SelectItem value="admin">⚙️ Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contoh@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Password harus mengandung minimal 8 karakter dengan kombinasi huruf, angka, dan simbol
                </p>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full"
                variant="hero"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>

              {/* Forgot Password */}
              <div className="text-center">
                <Link to="/forgot-password" className="text-sm text-healthcare-primary hover:underline">
                  Lupa password?
                </Link>
              </div>

              {/* Register Link */}
              <div className="text-center text-sm text-muted-foreground">
                Belum punya akun?{" "}
                <Link to="/register" className="text-healthcare-primary hover:underline font-medium">
                  Daftar sekarang
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-4 border-healthcare-accent/20 bg-healthcare-accent/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-healthcare-accent">Demo Credentials</CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-2">
            <div><strong>Admin:</strong> admin@mackincare.com / Admin@123</div>
            <div><strong>Dokter:</strong> dokter@mackincare.com / Dokter@123</div>
            <div><strong>User:</strong> user@mackincare.com / User@123</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;