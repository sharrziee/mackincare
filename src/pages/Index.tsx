import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Stethoscope, 
  Heart, 
  Users, 
  Clock, 
  Shield, 
  Star,
  Calendar,
  MessageSquare,
  MapPin,
  Pill,
  Activity,
  UserCheck
} from "lucide-react";
import heroImage from "@/assets/hero-healthcare.jpg";

const Index = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Konsultasi Online",
      description: "Chat langsung dengan dokter spesialis kapan saja"
    },
    {
      icon: MapPin,
      title: "Cari Rumah Sakit",
      description: "Temukan rumah sakit terdekat dengan mudah"
    },
    {
      icon: Pill,
      title: "Apotek Online",
      description: "Beli obat dengan resep dokter secara online"
    },
    {
      icon: Calendar,
      title: "Booking Appointment",
      description: "Jadwalkan kunjungan ke dokter atau rumah sakit"
    },
    {
      icon: Activity,
      title: "Health Tracker",
      description: "Monitor kesehatan dan riwayat medis Anda"
    },
    {
      icon: UserCheck,
      title: "Verifikasi Dokter",
      description: "Semua dokter telah terverifikasi dan berpengalaman"
    }
  ];

  const stats = [
    { number: "10K+", label: "Pasien Terlayani" },
    { number: "500+", label: "Dokter Spesialis" },
    { number: "50+", label: "Rumah Sakit Partner" },
    { number: "24/7", label: "Layanan Siaga" }
  ];

  const healthNews = [
    {
      title: "Tips Menjaga Kesehatan di Musim Hujan",
      category: "Kesehatan Umum",
      time: "2 jam yang lalu",
      image: "🌧️"
    },
    {
      title: "Pentingnya Vaksinasi untuk Anak",
      category: "Anak & Balita",
      time: "5 jam yang lalu", 
      image: "💉"
    },
    {
      title: "Cara Mengatasi Stress di Tempat Kerja",
      category: "Mental Health",
      time: "1 hari yang lalu",
      image: "🧠"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-healthcare-primary" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                MACKIN-Care
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Masuk</Button>
              </Link>
              <Link to="/register">
                <Button variant="hero">Daftar Sekarang</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <Badge className="bg-healthcare-accent/10 text-healthcare-accent border-healthcare-accent/20">
                Platform Kesehatan #1 di Indonesia
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Kesehatan Anda,{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Prioritas Kami
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Akses layanan kesehatan terlengkap dengan mudah. Konsultasi dokter, 
                cari rumah sakit, beli obat - semua dalam satu platform terpercaya.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    <Heart className="mr-2 h-5 w-5" />
                    Mulai Konsultasi
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Users className="mr-2 h-5 w-5" />
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <img 
                src={heroImage} 
                alt="Healthcare consultation" 
                className="rounded-2xl shadow-card w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-card animate-bounce-in">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Terpercaya</p>
                    <p className="text-sm text-muted-foreground">100% Aman</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-healthcare-primary/10 text-healthcare-primary border-healthcare-primary/20">
              Layanan Unggulan
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Solusi Kesehatan{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Terlengkap
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dapatkan akses ke layanan kesehatan berkualitas dengan teknologi terdepan
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-0 shadow-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Health News Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-healthcare-secondary/10 text-healthcare-secondary border-healthcare-secondary/20">
              Berita Kesehatan
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Update Terkini{" "}
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Dunia Kesehatan
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Tetap update dengan informasi kesehatan terbaru
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {healthNews.map((news, index) => (
              <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1">
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
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {news.time}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Siap Memulai Perjalanan Kesehatan Anda?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan pengguna yang telah merasakan kemudahan 
              layanan kesehatan digital terpercaya
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="accent" size="lg" className="w-full sm:w-auto">
                  <Star className="mr-2 h-5 w-5" />
                  Daftar Gratis Sekarang
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-foreground">
                <MessageSquare className="mr-2 h-5 w-5" />
                Hubungi Tim Kami
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Stethoscope className="h-6 w-6 text-healthcare-primary" />
                <span className="text-xl font-bold">MACKIN-Care</span>
              </div>
              <p className="text-white/70 mb-4">
                Platform kesehatan digital terpercaya untuk semua kebutuhan medis Anda.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white">Konsultasi Dokter</a></li>
                <li><a href="#" className="hover:text-white">Apotek Online</a></li>
                <li><a href="#" className="hover:text-white">Booking RS</a></li>
                <li><a href="#" className="hover:text-white">Health Tracker</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Bantuan</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Hubungi Kami</a></li>
                <li><a href="#" className="hover:text-white">Pusat Bantuan</a></li>
                <li><a href="#" className="hover:text-white">Kebijakan Privasi</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-white/70">
                <li>📞 +62 812-3456-7890</li>
                <li>✉️ info@mackincare.com</li>
                <li>📍 Jakarta, Indonesia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/70">
            <p>&copy; 2024 MACKIN-Care. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;