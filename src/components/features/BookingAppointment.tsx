import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Star,
  User,
  Phone,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Stethoscope,
  Search,
  Filter
} from "lucide-react";

const BookingAppointment = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Wijaya, Sp.JP",
      specialty: "Kardiologi",
      hospital: "RS Brawijaya Lowokwaru, Malang",
      photo: "/api/placeholder/150/150",
      rating: 4.9,
      reviews: 1250,
      experience: "15 tahun",
      price: 200000,
      availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      timeSlots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      bookedSlots: { "2024-12-20": ["09:00", "14:00"], "2024-12-21": ["10:00"] },
      qualifications: ["S3 Kardiologi UI", "Fellowship Interventional Cardiology"],
      services: ["Konsultasi Jantung", "EKG", "Echocardiography", "Stress Test"]
    },
    {
      id: 2,
      name: "Dr. Ahmad Rizki, Sp.S",
      specialty: "Neurologi",
      hospital: "RSSA Lowokwaru, Malang",
      photo: "/api/placeholder/150/150",
      rating: 4.8,
      reviews: 980,
      experience: "12 tahun",
      price: 250000,
      availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
      timeSlots: ["08:00", "09:00", "10:00", "14:00", "15:00"],
      bookedSlots: { "2024-12-20": ["08:00", "15:00"], "2024-12-22": ["09:00"] },
      qualifications: ["S3 Neurologi UGM", "Fellowship Stroke Management"],
      services: ["Konsultasi Saraf", "EEG", "EMG", "Stroke Treatment"]
    },
    {
      id: 3,
      name: "Dr. Lisa Andriani, Sp.A",
      specialty: "Anak",
      hospital: "RS Panti Waluya Lowokwaru, Malang",
      photo: "/api/placeholder/150/150",
      rating: 4.9,
      reviews: 1450,
      experience: "10 tahun",
      price: 180000,
      availableDays: ["Tuesday", "Thursday", "Friday", "Saturday"],
      timeSlots: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"],
      bookedSlots: { "2024-12-19": ["09:00", "14:00"], "2024-12-21": ["10:00", "15:00"] },
      qualifications: ["S2 Pediatri Unair", "Certified Pediatric Emergency"],
      services: ["Konsultasi Anak", "Imunisasi", "Tumbuh Kembang", "Gizi Anak"]
    }
  ];

  const specialties = [
    "Kardiologi", "Neurologi", "Anak", "Penyakit Dalam", "Bedah", "Mata", "THT", "Kulit"
  ];

  const paymentMethods = [
    { id: "bpjs", name: "BPJS Kesehatan", logo: "🏥" },
    { id: "credit", name: "Kartu Kredit", logo: "💳" },
    { id: "debit", name: "Kartu Debit", logo: "💳" },
    { id: "ewallet", name: "E-Wallet", logo: "📱" },
    { id: "transfer", name: "Transfer Bank", logo: "🏦" }
  ];

  const filteredDoctors = doctors.filter(doctor => 
    (selectedSpecialty === "" || doctor.specialty === selectedSpecialty) &&
    (searchQuery === "" || doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getAvailableSlots = (doctor: any, date: Date) => {
    const dayName = format(date, "EEEE", { locale: id });
    const dateString = format(date, "yyyy-MM-dd");
    
    if (!doctor.availableDays.includes(dayName)) return [];
    
    const bookedSlots = doctor.bookedSlots[dateString] || [];
    return doctor.timeSlots.filter((slot: string) => !bookedSlots.includes(slot));
  };

  const BookingForm = ({ doctor }: { doctor: any }) => {
    const [bookingDate, setBookingDate] = useState<Date>();
    const [selectedTime, setSelectedTime] = useState("");
    const [patientName, setPatientName] = useState("");
    const [patientPhone, setPatientPhone] = useState("");
    const [complaint, setComplaint] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const availableSlots = bookingDate ? getAvailableSlots(doctor, bookingDate) : [];

    const handleSubmit = async () => {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      // Show success message
      alert("Appointment berhasil dibuat!");
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="healthcare" className="w-full">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Buat Janji
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Booking Appointment</DialogTitle>
            <DialogDescription>
              Jadwalkan konsultasi dengan {doctor.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Doctor Info */}
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={doctor.photo} alt={doctor.name} />
                  <AvatarFallback className="bg-healthcare-primary text-white">
                    {doctor.name.split(' ')[1]?.charAt(0)}{doctor.name.split(' ')[2]?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{doctor.name}</h3>
                  <p className="text-healthcare-primary">{doctor.specialty}</p>
                  <p className="text-sm text-muted-foreground">{doctor.hospital}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                    <span className="text-sm">{doctor.rating} ({doctor.reviews} ulasan)</span>
                  </div>
                </div>
              </div>
            </Card>

            <Tabs defaultValue="schedule" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="schedule">Jadwal</TabsTrigger>
                <TabsTrigger value="patient">Data Pasien</TabsTrigger>
                <TabsTrigger value="payment">Pembayaran</TabsTrigger>
              </TabsList>

              <TabsContent value="schedule" className="space-y-4">
                <div>
                  <Label>Pilih Tanggal</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {bookingDate ? format(bookingDate, "PPP", { locale: id }) : "Pilih tanggal"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={bookingDate}
                        onSelect={setBookingDate}
                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {bookingDate && (
                  <div>
                    <Label>Pilih Waktu</Label>
                    {availableSlots.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {availableSlots.map((slot: string) => (
                          <Button
                            key={slot}
                            variant={selectedTime === slot ? "healthcare" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(slot)}
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-2">
                        Tidak ada slot tersedia untuk tanggal ini
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <Label htmlFor="complaint">Keluhan Utama</Label>
                  <Textarea
                    id="complaint"
                    placeholder="Jelaskan keluhan atau alasan konsultasi..."
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="patient" className="space-y-4">
                <div>
                  <Label htmlFor="patient-name">Nama Lengkap Pasien</Label>
                  <Input
                    id="patient-name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <Label htmlFor="patient-phone">Nomor Telepon</Label>
                  <Input
                    id="patient-phone"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="Masukkan nomor telepon"
                  />
                </div>
                <div>
                  <Label htmlFor="patient-age">Usia</Label>
                  <Input
                    id="patient-age"
                    type="number"
                    placeholder="Masukkan usia"
                  />
                </div>
                <div>
                  <Label htmlFor="patient-gender">Jenis Kelamin</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Laki-laki</SelectItem>
                      <SelectItem value="female">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="payment" className="space-y-4">
                <div>
                  <Label>Metode Pembayaran</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {paymentMethods.map((method) => (
                      <Card
                        key={method.id}
                        className={`p-3 cursor-pointer transition-all duration-300 ${
                          paymentMethod === method.id ? 'ring-2 ring-healthcare-primary' : ''
                        }`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{method.logo}</span>
                          <span className="text-sm font-medium">{method.name}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <Card className="p-4 bg-muted/30">
                  <h4 className="font-semibold mb-3">Ringkasan Booking</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Konsultasi dengan {doctor.name}</span>
                      <span>Rp {doctor.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Biaya Admin</span>
                      <span>Rp 5.000</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>Rp {(doctor.price + 5000).toLocaleString()}</span>
                    </div>
                  </div>
                </Card>

                <Button 
                  className="w-full" 
                  onClick={handleSubmit}
                  disabled={!bookingDate || !selectedTime || !patientName || !paymentMethod || isSubmitting}
                  variant="healthcare"
                >
                  {isSubmitting ? (
                    "Memproses..."
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Konfirmasi Booking - Rp {(doctor.price + 5000).toLocaleString()}
                    </>
                  )}
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const DoctorProfile = ({ doctor }: { doctor: any }) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">
            <User className="h-4 w-4 mr-2" />
            Lihat Profil
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Profil Dokter</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={doctor.photo} alt={doctor.name} />
                <AvatarFallback className="bg-healthcare-primary text-white text-lg">
                  {doctor.name.split(' ')[1]?.charAt(0)}{doctor.name.split(' ')[2]?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-semibold">{doctor.name}</h3>
                <p className="text-healthcare-primary font-medium">{doctor.specialty}</p>
                <p className="text-muted-foreground">{doctor.hospital}</p>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="text-muted-foreground ml-1">({doctor.reviews} ulasan)</span>
                  <span className="ml-4 text-muted-foreground">{doctor.experience} pengalaman</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Kualifikasi</h4>
                <ul className="space-y-2">
                  {doctor.qualifications.map((qual: string, index: number) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-2 text-healthcare-success" />
                      {qual}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Layanan</h4>
                <div className="space-y-2">
                  {doctor.services.map((service: string, index: number) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-2">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Jadwal Praktik</h4>
              <div className="grid grid-cols-3 gap-3">
                {doctor.availableDays.map((day: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-center py-2">
                    {day}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Jam praktik: {doctor.timeSlots[0]} - {doctor.timeSlots[doctor.timeSlots.length - 1]}
              </p>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-semibold">Biaya Konsultasi</p>
                <p className="text-sm text-muted-foreground">Belum termasuk biaya admin</p>
              </div>
              <span className="text-2xl font-bold text-healthcare-primary">
                Rp {doctor.price.toLocaleString()}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Booking Appointment</h1>
        <p className="text-muted-foreground">Jadwalkan konsultasi dengan dokter pilihan Anda</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
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
          <SelectTrigger className="sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter Spesialis" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Semua Spesialis</SelectItem>
            {specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Information Cards */}
      <div className="mb-8 grid md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-healthcare-primary/10 rounded-lg flex items-center justify-center">
              <CalendarIcon className="h-6 w-6 text-healthcare-primary" />
            </div>
            <div>
              <h4 className="font-semibold">Booking Mudah</h4>
              <p className="text-sm text-muted-foreground">Pilih jadwal sesuai kebutuhan</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-healthcare-secondary/10 rounded-lg flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-healthcare-secondary" />
            </div>
            <div>
              <h4 className="font-semibold">Dokter Terpercaya</h4>
              <p className="text-sm text-muted-foreground">Konsultasi dengan ahli</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-healthcare-success/10 rounded-lg flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-healthcare-success" />
            </div>
            <div>
              <h4 className="font-semibold">Pembayaran Aman</h4>
              <p className="text-sm text-muted-foreground">Berbagai metode pembayaran</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Doctors List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Dokter Tersedia ({filteredDoctors.length})</h2>
          <Select defaultValue="rating">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating Tertinggi</SelectItem>
              <SelectItem value="price">Harga Terendah</SelectItem>
              <SelectItem value="experience">Pengalaman Terbanyak</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-shrink-0">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={doctor.photo} alt={doctor.name} />
                    <AvatarFallback className="bg-healthcare-primary text-white text-lg">
                      {doctor.name.split(' ')[1]?.charAt(0)}{doctor.name.split(' ')[2]?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
                      <p className="text-healthcare-primary font-medium mb-1">{doctor.specialty}</p>
                      <div className="flex items-center text-muted-foreground text-sm mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        {doctor.hospital}
                      </div>
                      
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                          <span className="font-medium">{doctor.rating}</span>
                          <span className="text-muted-foreground text-sm ml-1">({doctor.reviews} ulasan)</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="h-4 w-4 mr-1" />
                          {doctor.experience} pengalaman
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {doctor.services.slice(0, 3).map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {doctor.services.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{doctor.services.length - 3} layanan
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        Tersedia: {doctor.availableDays.slice(0, 3).join(", ")}
                        {doctor.availableDays.length > 3 && ` +${doctor.availableDays.length - 3} hari`}
                      </div>
                    </div>
                    
                    <div className="lg:text-right">
                      <div className="mb-4">
                        <p className="text-2xl font-bold text-healthcare-primary">
                          Rp {doctor.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">per konsultasi</p>
                      </div>
                      
                      <div className="space-y-2">
                        <BookingForm doctor={doctor} />
                        <DoctorProfile doctor={doctor} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingAppointment;