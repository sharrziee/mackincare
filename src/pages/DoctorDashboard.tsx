import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Stethoscope,
  MessageSquare,
  Calendar,
  Users,
  Clock,
  Star,
  TrendingUp,
  Bell,
  Activity,
  Phone,
  Video,
  FileText,
  Settings,
  Award,
  DollarSign
} from "lucide-react";

const DoctorDashboard = () => {
  const [isOnline, setIsOnline] = useState(true);

  const todayStats = [
    { label: "Konsultasi Hari Ini", value: "12", trend: "+3", color: "text-healthcare-primary" },
    { label: "Pasien Baru", value: "4", trend: "+2", color: "text-healthcare-secondary" },
    { label: "Rating Rata-rata", value: "4.9", trend: "+0.1", color: "text-healthcare-success" },
    { label: "Pendapatan Hari Ini", value: "1.8M", trend: "+400K", color: "text-healthcare-accent" }
  ];

  const upcomingAppointments = [
    {
      patient: "Sarah Putri",
      time: "14:00",
      type: "Video Call",
      complaint: "Konsultasi rutin kehamilan",
      avatar: "SP",
      priority: "normal"
    },
    {
      patient: "Ahmad Rizky",
      time: "14:30",
      type: "Chat",
      complaint: "Nyeri dada sebelah kiri",
      avatar: "AR",
      priority: "urgent"
    },
    {
      patient: "Maya Sari",
      time: "15:00",
      type: "Video Call",
      complaint: "Kontrol gula darah",
      avatar: "MS",
      priority: "normal"
    },
    {
      patient: "Budi Santoso",
      time: "15:30",
      type: "Chat",
      complaint: "Konsultasi hasil lab",
      avatar: "BS",
      priority: "follow-up"
    }
  ];

  const recentConsultations = [
    {
      patient: "Lisa Andriani",
      time: "13:30",
      duration: "25 min",
      type: "Video Call",
      diagnosis: "Hipertensi ringan",
      status: "completed",
      rating: 5
    },
    {
      patient: "Rizky Pratama",
      time: "13:00",
      duration: "15 min",
      type: "Chat",
      diagnosis: "Gastritis akut",
      status: "completed",
      rating: 4
    },
    {
      patient: "Dewi Sartika",
      time: "12:30",
      duration: "30 min",
      type: "Video Call",
      diagnosis: "Kontrol diabetes",
      status: "completed",
      rating: 5
    }
  ];

  const monthlyStats = [
    { title: "Total Konsultasi", value: "324", change: "+12%", icon: Users },
    { title: "Pasien Baru", value: "89", change: "+18%", icon: TrendingUp },
    { title: "Pendapatan", value: "48.5M", change: "+15%", icon: DollarSign },
    { title: "Rating Dokter", value: "4.9/5", change: "+0.1", icon: Star }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-healthcare-danger/10 text-healthcare-danger border-healthcare-danger/20";
      case "follow-up":
        return "bg-healthcare-warning/10 text-healthcare-warning border-healthcare-warning/20";
      default:
        return "bg-healthcare-success/10 text-healthcare-success border-healthcare-success/20";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "Mendesak";
      case "follow-up":
        return "Follow Up";
      default:
        return "Normal";
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
              <Badge variant="secondary">Doctor Portal</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="online-status" className="text-sm">Status Online</Label>
                <Switch 
                  id="online-status"
                  checked={isOnline}
                  onCheckedChange={setIsOnline}
                />
                <Badge className={isOnline ? "bg-healthcare-success" : "bg-gray-400"}>
                  {isOnline ? "Online" : "Offline"}
                </Badge>
              </div>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-healthcare-danger">
                  5
                </Badge>
              </Button>
              
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src="/placeholder-doctor.jpg" />
                  <AvatarFallback className="bg-healthcare-primary text-white">DR</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Dr. Maya Sari, Sp.PD</p>
                  <p className="text-xs text-muted-foreground">Penyakit Dalam</p>
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
            Selamat Datang, <span className="text-healthcare-primary">Dr. Maya!</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Dashboard untuk mengelola konsultasi dan jadwal praktik Anda
          </p>
          
          {/* Today's Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {todayStats.map((stat, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                  <div className={`flex items-center ${stat.color}`}>
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{stat.trend}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="healthcare" className="h-20 flex flex-col">
              <MessageSquare className="h-6 w-6 mb-2" />
              Mulai Konsultasi
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              Atur Jadwal
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <FileText className="h-6 w-6 mb-2" />
              Buat Resep
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <Activity className="h-6 w-6 mb-2" />
              Lihat Statistik
            </Button>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appointments">Jadwal Hari Ini</TabsTrigger>
            <TabsTrigger value="consultations">Konsultasi Selesai</TabsTrigger>
            <TabsTrigger value="statistics">Statistik</TabsTrigger>
            <TabsTrigger value="settings">Pengaturan</TabsTrigger>
          </TabsList>

          {/* Today's Appointments */}
          <TabsContent value="appointments" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Jadwal Konsultasi Hari Ini</h3>
              <Badge className="bg-healthcare-primary/10 text-healthcare-primary">
                {upcomingAppointments.length} Konsultasi
              </Badge>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <Card key={index} className="p-6 hover:shadow-card transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-healthcare-secondary text-white">
                          {appointment.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{appointment.patient}</h4>
                          <Badge className={getPriorityColor(appointment.priority)}>
                            {getPriorityLabel(appointment.priority)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{appointment.complaint}</p>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          {appointment.time} • {appointment.type}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {appointment.type === "Video Call" ? (
                        <Button variant="healthcare" size="sm">
                          <Video className="h-4 w-4 mr-1" />
                          Mulai Video
                        </Button>
                      ) : (
                        <Button variant="healthcare" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Mulai Chat
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Lihat Riwayat
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recent Consultations */}
          <TabsContent value="consultations" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Konsultasi Hari Ini</h3>
              <Button variant="outline">Lihat Semua</Button>
            </div>
            <div className="space-y-4">
              {recentConsultations.map((consultation, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback className="bg-healthcare-primary text-white">
                          {consultation.patient.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{consultation.patient}</h4>
                        <p className="text-sm text-healthcare-primary font-medium">{consultation.diagnosis}</p>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          {consultation.time} • {consultation.duration} • {consultation.type}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-healthcare-success/10 text-healthcare-success mb-2">
                        Selesai
                      </Badge>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < consultation.rating
                                ? "text-yellow-500 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Statistics */}
          <TabsContent value="statistics" className="space-y-4">
            <h3 className="text-xl font-semibold">Statistik Bulanan</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {monthlyStats.map((stat, index) => (
                <Card key={index} className="p-6 hover:shadow-card transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-healthcare-success">
                      {stat.change}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-sm text-muted-foreground">{stat.title}</h4>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </Card>
              ))}
            </div>

            {/* Performance Metrics */}
            <Card className="p-6">
              <h4 className="font-semibold mb-4">Performa Dokter</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-healthcare-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="h-8 w-8 text-healthcare-primary" />
                  </div>
                  <p className="text-2xl font-bold text-healthcare-primary">4.9/5</p>
                  <p className="text-sm text-muted-foreground">Rating Rata-rata</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-healthcare-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="h-8 w-8 text-healthcare-secondary" />
                  </div>
                  <p className="text-2xl font-bold text-healthcare-secondary">1,240</p>
                  <p className="text-sm text-muted-foreground">Total Pasien</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-healthcare-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="h-8 w-8 text-healthcare-accent" />
                  </div>
                  <p className="text-2xl font-bold text-healthcare-accent">95%</p>
                  <p className="text-sm text-muted-foreground">Tingkat Kepuasan</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-4">
            <h3 className="text-xl font-semibold">Pengaturan Praktik</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-semibold mb-4">Jadwal Praktik</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Senin - Jumat</Label>
                    <Badge variant="secondary">08:00 - 17:00</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Sabtu</Label>
                    <Badge variant="secondary">08:00 - 12:00</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Minggu</Label>
                    <Badge variant="outline">Libur</Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Ubah Jadwal
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-semibold mb-4">Tarif Konsultasi</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Chat</Label>
                    <Badge className="bg-healthcare-primary/10 text-healthcare-primary">Rp 100.000</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Video Call</Label>
                    <Badge className="bg-healthcare-secondary/10 text-healthcare-secondary">Rp 150.000</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Voice Call</Label>
                    <Badge className="bg-healthcare-accent/10 text-healthcare-accent">Rp 120.000</Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Update Tarif
                  </Button>
                </div>
              </Card>
            </div>

            {/* Profile Settings */}
            <Card className="p-6">
              <h4 className="font-semibold mb-4">Profil Dokter</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="doctorName">Nama Lengkap</Label>
                    <Input defaultValue="Dr. Maya Sari, Sp.PD" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="specialization">Spesialisasi</Label>
                    <Input defaultValue="Spesialis Penyakit Dalam" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="hospital">Rumah Sakit</Label>
                    <Input defaultValue="RS Brawijaya Malang" className="mt-1" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="experience">Pengalaman</Label>
                    <Input defaultValue="8 tahun" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="education">Pendidikan</Label>
                    <Input defaultValue="S2 Kedokteran - Universitas Brawijaya" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio Singkat</Label>
                    <Textarea defaultValue="Dokter spesialis penyakit dalam dengan pengalaman 8 tahun..." className="mt-1" />
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 mt-6">
                <Button variant="healthcare">
                  Simpan Perubahan
                </Button>
                <Button variant="outline">
                  Reset
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboard;