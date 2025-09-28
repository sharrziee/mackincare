import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ChatInterface from '@/components/chat/ChatInterface';
import DoctorProfile from '@/components/features/DoctorProfile';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Heart, 
  Brain, 
  Baby, 
  Eye, 
  Bone, 
  Stethoscope,
  Star,
  Clock,
  MessageCircle,
  Video,
  Phone,
  Calendar as CalendarIcon,
  User,
  MapPin,
  Award,
  BookOpen,
  CheckCircle
} from 'lucide-react';

const OnlineConsultation = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { toast } = useToast();

  const specialties = [
    { id: "kardiologi", name: "Kardiologi", icon: Heart, color: "text-red-500" },
    { id: "neurologi", name: "Neurologi", icon: Brain, color: "text-purple-500" },
    { id: "anak", name: "Pediatri", icon: Baby, color: "text-pink-500" },
    { id: "mata", name: "Mata", icon: Eye, color: "text-green-500" },
    { id: "ortopedi", name: "Ortopedi", icon: Bone, color: "text-blue-500" },
    { id: "penyakit-dalam", name: "Penyakit Dalam", icon: Stethoscope, color: "text-indigo-500" }
  ];

  const doctors = [
    {
      name: "Dr. Sarah Wijaya",
      specialty: "Kardiologi",
      experience: "8 tahun",
      rating: 4.9,
      price: 150000,
      available: true,
      nextAvailable: "15:30",
      image: "/placeholder.svg",
      hospital: "RS Jantung Harapan Kita",
      education: "Sp.JP, FIHA",
      consultations: 1250,
      description: "Spesialis jantung dengan pengalaman menangani berbagai kasus kardiovaskular. Berpengalaman dalam ekokardiografi dan kateterisasi jantung.",
      languages: ["Indonesia", "English"],
      services: ["Konsultasi Umum", "EKG", "Ekokardiografi", "Stress Test"]
    },
    {
      name: "Dr. Ahmad Rahman",
      specialty: "Neurologi", 
      experience: "12 tahun",
      rating: 4.8,
      price: 175000,
      available: false,
      nextAvailable: "09:00 (Besok)",
      image: "/placeholder.svg",
      hospital: "RSUP Dr. Sardjito",
      education: "Sp.S, PhD",
      consultations: 2100,
      description: "Ahli neurologi dengan spesialisasi stroke, epilepsi, dan gangguan neurodegeneratif. Aktif dalam penelitian neurologi klinis.",
      languages: ["Indonesia", "English", "Arabic"],
      services: ["Konsultasi Neurologis", "EEG", "EMG", "Lumbal Pungsi"]
    },
    {
      name: "Dr. Lisa Chen", 
      specialty: "Pediatri",
      experience: "6 tahun",
      rating: 4.7,
      price: 125000,
      available: true,
      nextAvailable: "14:00",
      image: "/placeholder.svg",
      hospital: "RS Anak dan Bunda",
      education: "Sp.A, M.Kes",
      consultations: 890,
      description: "Dokter anak yang berpengalaman menangani tumbuh kembang anak, imunisasi, dan penyakit anak. Ramah dan sabar dengan anak-anak.",
      languages: ["Indonesia", "English", "Chinese"],
      services: ["Konsultasi Anak", "Imunisasi", "Tumbuh Kembang", "Gizi Anak"]
    },
    {
      name: "Dr. Michael Torres", 
      specialty: "Dermatologi",
      experience: "10 tahun",
      rating: 4.9,
      price: 160000,
      available: true,
      nextAvailable: "16:00",
      image: "/placeholder.svg",
      hospital: "RS Kulit dan Kelamin",
      education: "Sp.KK, FINSDV",
      consultations: 1680,
      description: "Spesialis kulit dan kelamin dengan keahlian dalam dermatologi estetik, dermatologi medis, dan venereologi.",
      languages: ["Indonesia", "English", "Spanish"],
      services: ["Konsultasi Kulit", "Terapi Jerawat", "Laser Treatment", "Bedah Kulit"]
    },
    {
      name: "Dr. Siti Nurhaliza", 
      specialty: "Obstetri & Ginekologi",
      experience: "9 tahun",
      rating: 4.8,
      price: 170000,
      available: true,
      nextAvailable: "13:30",
      image: "/placeholder.svg",
      hospital: "RS Bunda",
      education: "Sp.OG, M.Kes",
      consultations: 1420,
      description: "Dokter kandungan dan kebidanan dengan pengalaman menangani kehamilan, persalinan, dan masalah reproduksi wanita.",
      languages: ["Indonesia", "English"],
      services: ["Konsultasi Kandungan", "USG 4D", "KB", "Prenatal Care"]
    }
  ];

  const filteredDoctors = doctors.filter(doctor => 
    (selectedSpecialty === '' || doctor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())) &&
    (searchQuery === '' || 
     doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleStartConsultation = (doctor: any) => {
    setSelectedDoctor(doctor);
    setShowChat(true);
    toast({
      title: "Konsultasi Dimulai",
      description: `Anda akan terhubung dengan Dr. ${doctor.name}`,
    });
  };

  const ConsultationBooking = ({ doctor }: { doctor: any }) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [complaint, setComplaint] = useState<string>('');
    const [consultationType, setConsultationType] = useState<string>('chat');

    const availableSlots = [
      "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
      "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
      "16:00", "16:30"
    ];

    const handleBooking = () => {
      if (!selectedDate || !selectedTime || !complaint.trim()) {
        toast({
          title: "Data Tidak Lengkap",
          description: "Mohon lengkapi semua informasi yang diperlukan.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Konsultasi Berhasil Dijadwalkan!",
        description: `Dr. ${doctor.name} - ${selectedDate.toLocaleDateString('id-ID')} ${selectedTime}`,
      });
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Jadwalkan Nanti
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Booking Konsultasi</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Doctor Info */}
            <div className="flex items-center space-x-3 p-3 bg-secondary/50 rounded-lg">
              <Avatar>
                <AvatarImage src={doctor.image} />
                <AvatarFallback>{doctor.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Dr. {doctor.name}</p>
                <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                <p className="text-sm font-medium text-healthcare-primary">
                  Rp {doctor.price.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Consultation Type */}
            <div className="space-y-3">
              <Label>Tipe Konsultasi</Label>
              <RadioGroup value={consultationType} onValueChange={setConsultationType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="chat" id="chat" />
                  <Label htmlFor="chat" className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>Chat</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="video" id="video" />
                  <Label htmlFor="video" className="flex items-center space-x-2">
                    <Video className="h-4 w-4" />
                    <span>Video Call</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="voice" id="voice" />
                  <Label htmlFor="voice" className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Voice Call</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Date Selection */}
            <div className="space-y-3">
              <Label>Pilih Tanggal</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date.getDay() === 0}
                className="rounded-md border"
              />
            </div>

            {/* Time Selection */}
            <div className="space-y-3">
              <Label>Pilih Waktu</Label>
              <div className="grid grid-cols-4 gap-2">
                {availableSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={selectedTime === slot ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(slot)}
                    className="text-xs"
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>

            {/* Complaint */}
            <div className="space-y-3">
              <Label>Keluhan/Gejala</Label>
              <Textarea
                placeholder="Jelaskan keluhan atau gejala yang Anda alami..."
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                rows={3}
              />
            </div>

            <Button onClick={handleBooking} className="w-full">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Konfirmasi Booking
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  if (showChat && selectedDoctor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button variant="outline" onClick={() => setShowChat(false)}>
            ← Kembali ke Daftar Dokter
          </Button>
        </div>
        <ChatInterface 
          doctorName={selectedDoctor.name}
          doctorSpecialty={selectedDoctor.specialty}
          isActive={selectedDoctor.available}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Konsultasi Online</h1>
        <p className="text-muted-foreground text-lg">
          Konsultasi dengan dokter spesialis terpercaya kapan saja, di mana saja
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari dokter atau spesialis..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="md:w-64">
              <SelectValue placeholder="Pilih Spesialis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Semua Spesialis</SelectItem>
              {specialties.map((specialty) => (
                <SelectItem key={specialty.id} value={specialty.id}>
                  {specialty.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Specialties Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Pilih Spesialis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {specialties.map((specialty) => (
            <Card 
              key={specialty.id}
              className={`cursor-pointer hover:shadow-md transition-all duration-300 ${
                selectedSpecialty === specialty.id ? 'ring-2 ring-healthcare-primary' : ''
              }`}
              onClick={() => setSelectedSpecialty(selectedSpecialty === specialty.id ? '' : specialty.id)}
            >
              <CardContent className="p-4 text-center">
                <specialty.icon className={`h-12 w-12 mx-auto mb-3 ${specialty.color}`} />
                <p className="font-medium text-sm">{specialty.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Available Doctors Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Dokter Tersedia</h2>
          <Badge variant="secondary" className="px-3 py-1">
            {filteredDoctors.length} dokter ditemukan
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={doctor.image} />
                    <AvatarFallback>{doctor.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Dr. {doctor.name}</CardTitle>
                    <p className="text-healthcare-primary font-medium">{doctor.specialty}</p>
                    <p className="text-sm text-muted-foreground">{doctor.hospital}</p>
                    <p className="text-xs text-muted-foreground">{doctor.education}</p>
                  </div>
                  <Badge variant={doctor.available ? "default" : "secondary"}>
                    {doctor.available ? "Online" : "Offline"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-muted-foreground">({doctor.consultations})</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4 text-healthcare-secondary" />
                    <span className="text-muted-foreground">{doctor.experience}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-healthcare-primary">
                    Rp {doctor.price.toLocaleString()}
                  </span>
                  {doctor.available && (
                    <div className="flex items-center space-x-1 text-sm text-healthcare-success">
                      <Clock className="h-4 w-4" />
                      <span>Tersedia {doctor.nextAvailable}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1" 
                      disabled={!doctor.available}
                      onClick={() => handleStartConsultation(doctor)}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {doctor.available ? 'Konsultasi Sekarang' : 'Tidak Tersedia'}
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <ConsultationBooking doctor={doctor} />
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setShowProfile(true);
                      }}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Lihat Profil
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Doctor Profile Modal */}
        {selectedDoctor && (
          <DoctorProfile
            doctor={selectedDoctor}
            isOpen={showProfile}
            onClose={() => setShowProfile(false)}
            onConsult={() => {
              setShowProfile(false);
              handleStartConsultation(selectedDoctor);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default OnlineConsultation;