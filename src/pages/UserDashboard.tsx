import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  MessageSquare,
  MapPin,
  Pill,
  Calendar,
  Heart,
  Activity,
  Bell,
  Search,
  Star,
  Clock,
  Phone,
  Video,
  User,
  Settings,
  LogOut,
  Plus,
  TrendingUp,
  Shield
} from "lucide-react";
import dashboardImage from "@/assets/dashboard-medical.jpg";

const UserDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const quickActions = [
    {
      icon: MessageSquare,
      title: "Konsultasi Cepat",
      description: "Chat dengan dokter sekarang",
      color: "bg-healthcare-primary",
      action: "Mulai Chat"
    },
    {
      icon: Calendar,
      title: "Buat Janji",
      description: "Jadwalkan dengan dokter",
      color: "bg-healthcare-secondary",
      action: "Pilih Waktu"
    },
    {
      icon: MapPin,
      title: "Cari RS Terdekat",
      description: "Temukan rumah sakit",
      color: "bg-healthcare-accent",
      action: "Lihat Peta"
    },
    {
      icon: Pill,
      title: "Beli Obat",
      description: "Apotek online terpercaya",
      color: "bg-healthcare-success",
      action: "Belanja"
    }
  ];

  const recentConsultations = [
    {
      doctor: "Dr. Sarah Wijaya, Sp.A",
      specialty: "Anak",
      date: "15 Des 2024",
      time: "14:30",
      status: "Selesai",
      rating: 5
    },
    {
      doctor: "Dr. Ahmad Rizki, Sp.PD",
      specialty: "Penyakit Dalam",
      date: "12 Des 2024",
      time: "10:15",
      status: "Selesai",
      rating: 4
    },
    {
      doctor: "Dr. Maya Sari, Sp.Kul",
      specialty: "Kulit & Kelamin",
      date: "8 Des 2024",
      time: "16:45",
      status: "Selesai",
      rating: 5
    }
  ];

  const availableDoctors = [
    {
      name: "Dr. Budi Santoso, Sp.JP",
      specialty: "Kardiologi",
      hospital: "RS Brawijaya",
      rating: 4.9,
      consultations: 1250,
      price: "Rp 150.000",
      avatar: "BS",
      available: true
    },
    {
      name: "Dr. Lisa Andriani, Sp.OG",
      specialty: "Kandungan",
      hospital: "RS Panti Waluya",
      rating: 4.8,
      consultations: 980,
      price: "Rp 175.000",
      avatar: "LA",
      available: true
    },
    {
      name: "Dr. Rizky Pratama, Sp.S",
      specialty: "Saraf",
      hospital: "RSSA Malang",
      rating: 4.7,
      consultations: 750,
      price: "Rp 200.000",
      avatar: "RP",
      available: false
    }
  ];

  const healthNews = [
    {
      title: "Tips Menjaga Kesehatan Jantung di Usia Muda",
      category: "Kardiologi",
      time: "2 jam lalu",
      reads: "1.2k",
      image: "❤️"
    },
    {
      title: "Pentingnya Vaksinasi HPV untuk Wanita",
      category: "Kesehatan Wanita",
      time: "4 jam lalu",
      reads: "850",
      image: "💉"
    },
    {
      title: "Cara Mengatasi Gangguan Tidur",
      category: "Neurologi",
      time: "6 jam lalu",
      reads: "2.1k",
      image: "😴"
    }
  ];

  const healthStats = [
    { label: "Konsultasi Bulan Ini", value: "3", trend: "+1", color: "text-healthcare-primary" },
    { label: "Resep Aktif", value: "2", trend: "0", color: "text-healthcare-secondary" },
    { label: "Janji Mendatang", value: "1", trend: "+1", color: "text-healthcare-accent" },
    { label: "Health Score", value: "85", trend: "+5", color: "text-healthcare-success" }
  ];

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
              <Badge variant="secondary">Patient Portal</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari dokter, rumah sakit..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-healthcare-danger">
                  3
                </Badge>
              </Button>
              
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Pasien</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold mb-2">
                Selamat Datang, <span className="text-healthcare-primary">John!</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Kelola kesehatan Anda dengan mudah dan praktis
              </p>
              
              {/* Health Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {healthStats.map((stat, index) => (
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
            
            <div className="relative">
              <img 
                src={dashboardImage} 
                alt="Healthcare Dashboard" 
                className="rounded-xl w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-primary/20 rounded-xl flex items-center justify-center">
                <div className="text-white text-center">
                  <Shield className="h-12 w-12 mx-auto mb-2" />
                  <p className="font-semibold">Kesehatan Terlindungi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="outline" size="sm" className="w-full">
                    {action.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="doctors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="doctors">Dokter Tersedia</TabsTrigger>
            <TabsTrigger value="history">Riwayat Konsultasi</TabsTrigger>
            <TabsTrigger value="news">Berita Kesehatan</TabsTrigger>
          </TabsList>

          {/* Available Doctors */}
          <TabsContent value="doctors" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Dokter Siap Konsultasi</h3>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Lihat Semua
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableDoctors.map((doctor, index) => (
                <Card key={index} className="group hover:shadow-card transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-healthcare-primary text-white font-semibold">
                          {doctor.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{doctor.name}</h4>
                          {doctor.available ? (
                            <Badge className="bg-healthcare-success/10 text-healthcare-success">Online</Badge>
                          ) : (
                            <Badge variant="secondary">Offline</Badge>
                          )}
                        </div>
                        <p className="text-sm text-healthcare-primary font-medium">{doctor.specialty}</p>
                        <p className="text-sm text-muted-foreground">{doctor.hospital}</p>
                        <div className="flex items-center mt-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium ml-1">{doctor.rating}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({doctor.consultations} konsultasi)
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-healthcare-primary">{doctor.price}</span>
                      <span className="text-sm text-muted-foreground">per konsultasi</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant={doctor.available ? "healthcare" : "secondary"} 
                        size="sm" 
                        className="flex-1"
                        disabled={!doctor.available}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        disabled={!doctor.available}
                      >
                        <Video className="h-4 w-4 mr-1" />
                        Video
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Consultation History */}
          <TabsContent value="history" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Riwayat Konsultasi</h3>
              <Button variant="outline">Lihat Semua</Button>
            </div>
            <div className="space-y-4">
              {recentConsultations.map((consultation, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback className="bg-healthcare-primary text-white">
                          Dr
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{consultation.doctor}</h4>
                        <p className="text-sm text-healthcare-primary">{consultation.specialty}</p>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {consultation.date} • {consultation.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-healthcare-success/10 text-healthcare-success mb-2">
                        {consultation.status}
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

          {/* Health News */}
          <TabsContent value="news" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Berita Kesehatan Terkini</h3>
              <Button variant="outline">Lihat Semua</Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthNews.map((news, index) => (
                <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardHeader>
                    <div className="text-4xl mb-3">{news.image}</div>
                    <Badge variant="secondary" className="w-fit mb-2">
                      {news.category}
                    </Badge>
                    <CardTitle className="text-lg group-hover:text-healthcare-primary transition-colors">
                      {news.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {news.time}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {news.reads} pembaca
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom Navigation for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:hidden">
          <div className="flex justify-around">
            <Button variant="ghost" size="sm">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Calendar className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;