import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OnlineConsultation from '@/components/features/OnlineConsultation';
import HospitalFinder from '@/components/features/HospitalFinder';
import OnlinePharmacy from '@/components/features/OnlinePharmacy';
import BookingAppointment from '@/components/features/BookingAppointment';
import HealthTracker from '@/components/features/HealthTracker';
import HealthNews from '@/components/features/HealthNews';
import { 
  MessageSquare, 
  Calendar, 
  MapPin, 
  Pill, 
  Activity, 
  Newspaper,
  Bell,
  User,
  Settings,
  LogOut,
  Heart,
  Clock,
  FileText
} from 'lucide-react';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userName] = useState('John Doe'); // This should come from auth context

  const quickActions = [
    {
      title: "Konsultasi Cepat",
      description: "Chat dengan dokter online",
      icon: MessageSquare,
      color: "bg-healthcare-primary",
      action: () => setActiveTab('consultation')
    },
    {
      title: "Buat Janji",
      description: "Jadwalkan appointment",
      icon: Calendar,
      color: "bg-healthcare-secondary",
      action: () => setActiveTab('booking')
    },
    {
      title: "Cari RS Terdekat",
      description: "Temukan rumah sakit",
      icon: MapPin,
      color: "bg-healthcare-accent",
      action: () => setActiveTab('hospital')
    },
    {
      title: "Beli Obat",
      description: "Apotek online terpercaya",
      icon: Pill,
      color: "bg-healthcare-success",
      action: () => setActiveTab('pharmacy')
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Wijaya",
      specialty: "Kardiologi",
      date: "2024-01-15",
      time: "14:30",
      type: "Video Call",
      status: "confirmed"
    },
    {
      id: 2,
      doctor: "Dr. Ahmad Rahman",
      specialty: "Neurologi",
      date: "2024-01-18",
      time: "10:00",
      type: "In Person",
      status: "pending"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Konsultasi selesai",
      detail: "dengan Dr. Lisa Chen",
      time: "2 jam yang lalu",
      icon: MessageSquare
    },
    {
      id: 2,
      action: "Resep diterima",
      detail: "Paracetamol 500mg",
      time: "1 hari yang lalu",
      icon: Pill
    },
    {
      id: 3,
      action: "Pemeriksaan terjadwal",
      detail: "Lab test di RS Bunda",
      time: "2 hari yang lalu",
      icon: Calendar
    }
  ];

  if (activeTab !== 'dashboard') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center space-x-2"
              >
                ← Kembali ke Dashboard
              </Button>
              <div className="flex items-center space-x-4">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <Avatar>
                  <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <main className="container mx-auto px-4 py-6">
          {activeTab === 'consultation' && <OnlineConsultation />}
          {activeTab === 'hospital' && <HospitalFinder />}
          {activeTab === 'pharmacy' && <OnlinePharmacy />}
          {activeTab === 'booking' && <BookingAppointment />}
          {activeTab === 'health-tracker' && <HealthTracker />}
          {activeTab === 'health-news' && <HealthNews />}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard Pasien</h1>
              <p className="text-muted-foreground">Selamat datang, {userName}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={action.action}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`${action.color} rounded-lg p-3`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Jadwal Mendatang</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{appointment.doctor.split(' ')[1][0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{appointment.doctor}</p>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span>{appointment.date}</span>
                            <span>•</span>
                            <span>{appointment.time}</span>
                            <span>•</span>
                            <span>{appointment.type}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                        {appointment.status === 'confirmed' ? 'Dikonfirmasi' : 'Pending'}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab('booking')}>
                  Lihat Semua Jadwal
                </Button>
              </CardContent>
            </Card>

            {/* Health Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Ringkasan Kesehatan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-secondary/50 rounded-lg">
                    <Heart className="h-6 w-6 mx-auto mb-2 text-red-500" />
                    <p className="text-2xl font-bold">78</p>
                    <p className="text-xs text-muted-foreground">BPM</p>
                  </div>
                  <div className="text-center p-3 bg-secondary/50 rounded-lg">
                    <Activity className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                    <p className="text-2xl font-bold">120/80</p>
                    <p className="text-xs text-muted-foreground">mmHg</p>
                  </div>
                  <div className="text-center p-3 bg-secondary/50 rounded-lg">
                    <User className="h-6 w-6 mx-auto mb-2 text-green-500" />
                    <p className="text-2xl font-bold">70</p>
                    <p className="text-xs text-muted-foreground">kg</p>
                  </div>
                  <div className="text-center p-3 bg-secondary/50 rounded-lg">
                    <FileText className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                    <p className="text-2xl font-bold">175</p>
                    <p className="text-xs text-muted-foreground">cm</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab('health-tracker')}>
                  Lihat Detail Health Tracker
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Aktivitas Terbaru</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="bg-secondary/50 rounded-full p-2">
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.detail}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Navigation */}
            <Card>
              <CardHeader>
                <CardTitle>Menu Fitur</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('health-tracker')}>
                    <Activity className="mr-2 h-4 w-4" />
                    Health Tracker
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('health-news')}>
                    <Newspaper className="mr-2 h-4 w-4" />
                    Berita Kesehatan
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Pengaturan
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;