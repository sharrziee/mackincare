import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { Stethoscope, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type UserRole = "user" | "doctor" | "admin";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "user" as UserRole,
    // Doctor specific fields
    specialization: "",
    hospital: "",
    licenseNumber: "",
    experience: "",
    // User specific fields
    dateOfBirth: "",
    gender: "",
    address: "",
    // Admin specific fields
    department: "",
    adminCode: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const specializations = [
    "Umum", "Anak", "Penyakit Dalam", "Bedah", "Kandungan", "Jantung", 
    "Saraf", "THT", "Mata", "Kulit", "Jiwa", "Gigi", "Orthopedi", "Urologi"
  ];

  const hospitals = [
    "RS Umum Daerah Dr. Saiful Anwar",
    "RS Lavalette",
    "RS Panti Waluya",
    "RS Brawijaya",
    "RS Islam Aisyiyah",
    "RS Permata Bunda",
    "RSIA Melinda",
    "RS UMM"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSymbol,
      checks: { minLength, hasUpper, hasLower, hasNumber, hasSymbol }
    };
  };

  const passwordValidation = validatePassword(formData.password);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      toast({
        title: "Error",
        description: "Anda harus menyetujui syarat dan ketentuan",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Password dan konfirmasi password tidak sama",
        variant: "destructive"
      });
      return;
    }

    if (!passwordValidation.isValid) {
      toast({
        title: "Error",
        description: "Password tidak memenuhi persyaratan keamanan",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      toast({
        title: "Registrasi Berhasil!",
        description: `Akun ${formData.role === 'user' ? 'pasien' : formData.role} telah dibuat. Silakan login untuk melanjutkan.`,
      });
      
      // Store user role for redirect after login
      localStorage.setItem('userRole', formData.role);
      localStorage.setItem('userName', formData.fullName);
      
      navigate("/login");
      setIsLoading(false);
    }, 2000);
  };

  const getRoleInfo = (selectedRole: UserRole) => {
    switch (selectedRole) {
      case "admin":
        return {
          title: "Registrasi Admin",
          description: "Daftar sebagai administrator sistem",
          color: "bg-healthcare-danger/10 text-healthcare-danger border-healthcare-danger/20"
        };
      case "doctor":
        return {
          title: "Registrasi Dokter",
          description: "Bergabung sebagai tenaga medis profesional",
          color: "bg-healthcare-primary/10 text-healthcare-primary border-healthcare-primary/20"
        };
      default:
        return {
          title: "Registrasi Pasien",
          description: "Buat akun untuk mengakses layanan kesehatan",
          color: "bg-healthcare-secondary/10 text-healthcare-secondary border-healthcare-secondary/20"
        };
    }
  };

  const roleInfo = getRoleInfo(formData.role);

  return (
    <div className="min-h-screen bg-gradient-hero py-8 px-4">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative w-full max-w-2xl mx-auto">
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
              <CardTitle className="text-2xl">Buat Akun Baru</CardTitle>
              <CardDescription>
                Bergabunglah dengan platform kesehatan terpercaya
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
            <form onSubmit={handleRegister} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">Daftar Sebagai</Label>
                <Select value={formData.role} onValueChange={(value: UserRole) => handleInputChange("role", value)}>
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

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nama Lengkap</Label>
                  <Input
                    id="fullName"
                    placeholder="Masukkan nama lengkap"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contoh@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  placeholder="+62 812-3456-7890"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Buat password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Ulangi password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Password Requirements */}
              {formData.password && (
                <div className="text-xs space-y-1">
                  <p className="font-medium">Persyaratan Password:</p>
                  <div className="grid grid-cols-2 gap-1">
                    <span className={passwordValidation.checks.minLength ? "text-healthcare-success" : "text-muted-foreground"}>
                      ✓ Minimal 8 karakter
                    </span>
                    <span className={passwordValidation.checks.hasUpper ? "text-healthcare-success" : "text-muted-foreground"}>
                      ✓ Huruf besar
                    </span>
                    <span className={passwordValidation.checks.hasLower ? "text-healthcare-success" : "text-muted-foreground"}>
                      ✓ Huruf kecil
                    </span>
                    <span className={passwordValidation.checks.hasNumber ? "text-healthcare-success" : "text-muted-foreground"}>
                      ✓ Angka
                    </span>
                    <span className={passwordValidation.checks.hasSymbol ? "text-healthcare-success" : "text-muted-foreground"}>
                      ✓ Simbol (!@#$%)
                    </span>
                  </div>
                </div>
              )}

              {/* Role-specific fields */}
              {formData.role === "doctor" && (
                <div className="space-y-4 p-4 bg-healthcare-primary/5 rounded-lg">
                  <h3 className="font-semibold text-healthcare-primary">Informasi Dokter</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Spesialisasi</Label>
                      <Select value={formData.specialization} onValueChange={(value) => handleInputChange("specialization", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih spesialisasi" />
                        </SelectTrigger>
                        <SelectContent>
                          {specializations.map(spec => (
                            <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hospital">Rumah Sakit</Label>
                      <Select value={formData.hospital} onValueChange={(value) => handleInputChange("hospital", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih rumah sakit" />
                        </SelectTrigger>
                        <SelectContent>
                          {hospitals.map(hospital => (
                            <SelectItem key={hospital} value={hospital}>{hospital}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">Nomor STR</Label>
                      <Input
                        id="licenseNumber"
                        placeholder="Nomor Surat Tanda Registrasi"
                        value={formData.licenseNumber}
                        onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Pengalaman (tahun)</Label>
                      <Input
                        id="experience"
                        type="number"
                        placeholder="Lama pengalaman"
                        value={formData.experience}
                        onChange={(e) => handleInputChange("experience", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.role === "user" && (
                <div className="space-y-4 p-4 bg-healthcare-secondary/5 rounded-lg">
                  <h3 className="font-semibold text-healthcare-secondary">Informasi Pasien</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Tanggal Lahir</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Jenis Kelamin</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Laki-laki</SelectItem>
                          <SelectItem value="female">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat</Label>
                    <Textarea
                      id="address"
                      placeholder="Alamat lengkap"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              {formData.role === "admin" && (
                <div className="space-y-4 p-4 bg-healthcare-danger/5 rounded-lg">
                  <h3 className="font-semibold text-healthcare-danger">Informasi Admin</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Departemen</Label>
                      <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih departemen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="it">IT & Sistem</SelectItem>
                          <SelectItem value="medical">Medis</SelectItem>
                          <SelectItem value="operations">Operasional</SelectItem>
                          <SelectItem value="customer">Customer Service</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminCode">Kode Admin</Label>
                      <Input
                        id="adminCode"
                        placeholder="Kode khusus admin"
                        value={formData.adminCode}
                        onChange={(e) => handleInputChange("adminCode", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                />
                <Label htmlFor="terms" className="text-sm">
                  Saya menyetujui{" "}
                  <Link to="/terms" className="text-healthcare-primary hover:underline">
                    syarat dan ketentuan
                  </Link>
                  {" "}serta{" "}
                  <Link to="/privacy" className="text-healthcare-primary hover:underline">
                    kebijakan privasi
                  </Link>
                </Label>
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                className="w-full"
                variant="hero"
                size="lg"
                disabled={isLoading || !acceptTerms}
              >
                {isLoading ? "Memproses..." : "Daftar Sekarang"}
              </Button>

              {/* Login Link */}
              <div className="text-center text-sm text-muted-foreground">
                Sudah punya akun?{" "}
                <Link to="/login" className="text-healthcare-primary hover:underline font-medium">
                  Masuk di sini
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;