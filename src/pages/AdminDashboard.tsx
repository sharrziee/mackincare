import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Stethoscope,
  Users,
  Activity,
  TrendingUp,
  Bell,
  Settings,
  Shield,
  Database,
  UserCheck,
  AlertTriangle,
  BarChart3,
  MessageSquare,
  Calendar,
  DollarSign,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye
} from "lucide-react";

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const systemStats = [
    { label: "Total Pengguna", value: "15,240", trend: "+1,205", color: "text-healthcare-primary", percentage: "+8.5%" },
    { label: "Dokter Aktif", value: "524", trend: "+45", color: "text-healthcare-secondary", percentage: "+9.4%" },
    { label: "Konsultasi Bulan Ini", value: "8,947", trend: "+1,234", color: "text-healthcare-success", percentage: "+16.0%" },
    { label: "Revenue", value: "₹2.4M", trend: "+₹340K", color: "text-healthcare-accent", percentage: "+12.3%" }
  ];

  const recentUsers = [
    {
      name: "Dr. Sarah Wijaya",
      email: "sarah.wijaya@hospital.com",
      role: "Dokter",
      specialty: "Anak",
      status: "active",
      joinDate: "2024-12-15",
      avatar: "SW"
    },
    {
      name: "Ahmad Rizki",
      email: "ahmad.rizki@email.com",
      role: "Pasien",
      specialty: "-",
      status: "active",
      joinDate: "2024-12-14",
      avatar: "AR"
    },
    {
      name: "Dr. Maya Sari",
      email: "maya.sari@hospital.com",
      role: "Dokter",
      specialty: "Kulit",
      status: "pending",
      joinDate: "2024-12-13",
      avatar: "MS"
    },
    {
      name: "Budi Santoso",
      email: "budi.santoso@email.com",
      role: "Pasien",
      specialty: "-",
      status: "active",
      joinDate: "2024-12-12",
      avatar: "BS"
    }
  ];

  const systemAlerts = [
    {
      type: "warning",
      title: "Server Load Tinggi",
      description: "CPU usage mencapai 85%",
      time: "5 menit lalu",
      priority: "medium"
    },
    {
      type: "info",
      title: "Update Sistem",
      description: "Pembaruan keamanan tersedia",
      time: "1 jam lalu",
      priority: "low"
    },
    {
      type: "error",
      title: "Payment Gateway Error",
      description: "3 transaksi gagal dalam 10 menit terakhir",
      time: "15 menit lalu",
      priority: "high"
    },
    {
      type: "success",
      title: "Backup Completed",
      description: "Database backup berhasil",
      time: "2 jam lalu",
      priority: "low"
    }
  ];

  const topDoctors = [
    {
      name: "Dr. Budi Santoso, Sp.JP",
      specialty: "Kardiologi",
      patients: 340,
      rating: 4.9,
      revenue: "₹850K",
      avatar: "BS"
    },
    {
      name: "Dr. Lisa Andriani, Sp.OG",
      specialty: "Kandungan",
      patients: 298,
      rating: 4.8,
      revenue: "₹720K",
      avatar: "LA"
    },
    {
      name: "Dr. Rizky Pratama, Sp.S",
      specialty: "Saraf",
      patients: 256,
      rating: 4.7,
      revenue: "₹680K",
      avatar: "RP"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-healthcare-success/10 text-healthcare-success border-healthcare-success/20";
      case "pending":
        return "bg-healthcare-warning/10 text-healthcare-warning border-healthcare-warning/20";
      case "suspended":
        return "bg-healthcare-danger/10 text-healthcare-danger border-healthcare-danger/20";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-healthcare-danger" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-healthcare-warning" />;
      case "success":
        return <UserCheck className="h-4 w-4 text-healthcare-success" />;
      default:
        return <Activity className="h-4 w-4 text-healthcare-secondary" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Stethoscope className="h-6 w-6 text-healthcare-primary" />
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  MACKIN-Care
                </span>
              </div>
              <Badge className="bg-healthcare-danger/10 text-healthcare-danger border-healthcare-danger/20">
                Admin Panel
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari pengguna, dokter..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-healthcare-danger">
                  12
                </Badge>
              </Button>
              
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src="/placeholder-admin.jpg" />
                  <AvatarFallback className="bg-healthcare-danger text-white">AD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">Super Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Dashboard <span className="text-healthcare-danger">Administrator</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Kelola sistem healthcare MACKIN-Care secara menyeluruh
          </p>
          
          {/* System Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {systemStats.map((stat, index) => (
              <Card key={index} className="p-4 hover:shadow-card transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                  <div className={`text-right`}>
                    <div className={`flex items-center ${stat.color}`}>
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">{stat.percentage}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{stat.trend}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">System Alerts</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {systemAlerts.map((alert, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{alert.title}</h4>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                  <Badge 
                    className={
                      alert.priority === "high" 
                        ? "bg-healthcare-danger/10 text-healthcare-danger" 
                        : alert.priority === "medium"
                        ? "bg-healthcare-warning/10 text-healthcare-warning"
                        : "bg-healthcare-success/10 text-healthcare-success"
                    }
                  >
                    {alert.priority}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="users">Pengguna</TabsTrigger>
            <TabsTrigger value="doctors">Dokter</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="content">Konten</TabsTrigger>
            <TabsTrigger value="settings">Pengaturan</TabsTrigger>
          </TabsList>

          {/* Users Management */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Manajemen Pengguna</h3>
              <Button variant="healthcare">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Pengguna
              </Button>
            </div>
            <div className="space-y-4">
              {recentUsers.map((user, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-healthcare-primary text-white">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{user.name}</h4>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <span className="mr-4">{user.role}</span>
                          {user.specialty !== "-" && <span>• {user.specialty}</span>}
                          <span className="ml-4">Bergabung: {user.joinDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Lihat
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-healthcare-danger hover:text-healthcare-danger">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Hapus
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Doctors Management */}
          <TabsContent value="doctors" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Top Performing Doctors</h3>
              <Button variant="outline">Lihat Semua</Button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {topDoctors.map((doctor, index) => (
                <Card key={index} className="p-6 hover:shadow-card transition-all duration-300">
                  <div className="text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-4">
                      <AvatarFallback className="bg-healthcare-primary text-white text-lg">
                        {doctor.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold">{doctor.name}</h4>
                    <p className="text-sm text-healthcare-primary font-medium">{doctor.specialty}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                      <div className="text-center">
                        <p className="text-lg font-bold text-healthcare-secondary">{doctor.patients}</p>
                        <p className="text-xs text-muted-foreground">Pasien</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-healthcare-success">{doctor.rating}</p>
                        <p className="text-xs text-muted-foreground">Rating</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-healthcare-accent">{doctor.revenue}</p>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-4">
            <h3 className="text-xl font-semibold">Platform Analytics</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Konsultasi Harian</h4>
                  <BarChart3 className="h-5 w-5 text-healthcare-primary" />
                </div>
                <p className="text-3xl font-bold text-healthcare-primary">342</p>
                <p className="text-sm text-muted-foreground">+12% dari kemarin</p>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Pendapatan Harian</h4>
                  <DollarSign className="h-5 w-5 text-healthcare-success" />
                </div>
                <p className="text-3xl font-bold text-healthcare-success">₹145K</p>
                <p className="text-sm text-muted-foreground">+8% dari kemarin</p>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Pengguna Baru</h4>
                  <Users className="h-5 w-5 text-healthcare-secondary" />
                </div>
                <p className="text-3xl font-bold text-healthcare-secondary">67</p>
                <p className="text-sm text-muted-foreground">+25% dari kemarin</p>
              </Card>
            </div>
          </TabsContent>

          {/* Content Management */}
          <TabsContent value="content" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Manajemen Konten</h3>
              <Button variant="healthcare">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Artikel
              </Button>
            </div>
            
            {/* Health Articles */}
            <div className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Artikel Kesehatan Terpublikasi</h4>
                  <Badge className="bg-healthcare-success/10 text-healthcare-success">4 Artikel</Badge>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <h5 className="font-medium">Update Terkini Dunia Kesehatan</h5>
                      <p className="text-sm text-muted-foreground">AI dalam diagnosis medis, terobosan terbaru...</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <span>15 Desember 2024</span>
                        <span className="mx-2">•</span>
                        <span>1,240 views</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant="secondary">Published</Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <h5 className="font-medium">Tips Menjaga Kesehatan di Musim Hujan</h5>
                      <p className="text-sm text-muted-foreground">Panduan lengkap mencegah penyakit musim hujan...</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <span>14 Desember 2024</span>
                        <span className="mx-2">•</span>
                        <span>890 views</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant="secondary">Published</Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <h5 className="font-medium">Pentingnya Vaksinasi untuk Anak</h5>
                      <p className="text-sm text-muted-foreground">Jadwal imunisasi dan manfaat vaksinasi...</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <span>13 Desember 2024</span>
                        <span className="mx-2">•</span>
                        <span>1,150 views</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant="secondary">Published</Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <h5 className="font-medium">Cara Mengatasi Stress di Tempat Kerja</h5>
                      <p className="text-sm text-muted-foreground">Strategi mengelola tekanan dan stres kerja...</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <span>12 Desember 2024</span>
                        <span className="mx-2">•</span>
                        <span>756 views</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant="secondary">Published</Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="settings" className="space-y-4">
            <h3 className="text-xl font-semibold">Pengaturan Sistem</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-semibold mb-4">Konfigurasi Aplikasi</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Maintenance Mode</Label>
                    <Badge variant="outline">Off</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Registration</Label>
                    <Badge className="bg-healthcare-success/10 text-healthcare-success">Open</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Payment Gateway</Label>
                    <Badge className="bg-healthcare-success/10 text-healthcare-success">Active</Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Ubah Konfigurasi
                  </Button>
                </div>
              </Card>
              
              <Card className="p-6">
                <h4 className="font-semibold mb-4">Database & Security</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Last Backup</Label>
                    <Badge variant="secondary">2 jam lalu</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>SSL Certificate</Label>
                    <Badge className="bg-healthcare-success/10 text-healthcare-success">Valid</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Security Scan</Label>
                    <Badge className="bg-healthcare-success/10 text-healthcare-success">Clean</Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Run Security Check
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;