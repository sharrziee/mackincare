import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Star, 
  MapPin, 
  GraduationCap, 
  MessageCircle, 
  Calendar,
  Clock,
  Award,
  Users,
  BookOpen,
  Languages
} from 'lucide-react';

interface Doctor {
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  price: number;
  available: boolean;
  nextAvailable: string;
  image: string;
  hospital: string;
  education: string;
  consultations: number;
  description: string;
  languages: string[];
  services: string[];
}

interface DoctorProfileProps {
  doctor: Doctor;
  isOpen: boolean;
  onClose: () => void;
  onConsult: () => void;
}

const DoctorProfile = ({ doctor, isOpen, onClose, onConsult }: DoctorProfileProps) => {
  const schedule = [
    { day: "Senin", time: "08:00 - 16:00" },
    { day: "Selasa", time: "08:00 - 16:00" },
    { day: "Rabu", time: "08:00 - 16:00" },
    { day: "Kamis", time: "08:00 - 16:00" },
    { day: "Jumat", time: "08:00 - 16:00" },
    { day: "Sabtu", time: "08:00 - 12:00" },
    { day: "Minggu", time: "Libur" }
  ];

  const reviews = [
    {
      patient: "Andi S.",
      rating: 5,
      comment: "Dokter sangat profesional dan ramah. Penjelasan yang diberikan sangat detail dan mudah dipahami.",
      date: "2 hari yang lalu"
    },
    {
      patient: "Maya L.",
      rating: 5,
      comment: "Konsultasi yang sangat membantu. Dr. Sarah sangat sabar menjawab semua pertanyaan saya.",
      date: "1 minggu yang lalu"
    },
    {
      patient: "Budi W.",
      rating: 4,
      comment: "Pelayanan baik, waktu konsultasi tepat. Akan konsultasi lagi jika diperlukan.",
      date: "2 minggu yang lalu"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Profil Dokter</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Doctor Header */}
          <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24 mx-auto md:mx-0">
              <AvatarImage src={doctor.image} />
              <AvatarFallback className="text-2xl">
                {doctor.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-foreground">Dr. {doctor.name}</h3>
              <p className="text-lg text-healthcare-primary font-semibold">{doctor.specialty}</p>
              <p className="text-muted-foreground">{doctor.education}</p>
              
              <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-semibold">{doctor.rating}</span>
                  <span className="text-muted-foreground">({doctor.consultations} konsultasi)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="h-4 w-4 text-healthcare-primary" />
                  <span className="text-sm">{doctor.experience} pengalaman</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4 text-healthcare-secondary" />
                  <span className="text-sm">{doctor.hospital}</span>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="text-2xl font-bold text-healthcare-primary">
                Rp {doctor.price.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">per konsultasi</p>
              <Badge 
                variant={doctor.available ? "default" : "secondary"} 
                className="mt-2"
              >
                {doctor.available ? "Tersedia" : `Tersedia ${doctor.nextAvailable}`}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Tabs Content */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">Tentang</TabsTrigger>
              <TabsTrigger value="services">Layanan</TabsTrigger>
              <TabsTrigger value="schedule">Jadwal</TabsTrigger>
              <TabsTrigger value="reviews">Ulasan</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Tentang Dokter</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {doctor.description}
                  </p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <GraduationCap className="h-5 w-5" />
                      <span>Pendidikan</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold">{doctor.education}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Spesialis {doctor.specialty}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Languages className="h-5 w-5" />
                      <span>Bahasa</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map((lang, index) => (
                        <Badge key={index} variant="outline">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="services" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Layanan yang Tersedia</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {doctor.services.map((service, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border">
                        <div className="w-2 h-2 bg-healthcare-primary rounded-full"></div>
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Jadwal Praktik</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {schedule.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 rounded-lg border">
                        <span className="font-medium">{item.day}</span>
                        <span className={`${item.time === 'Libur' ? 'text-muted-foreground' : 'text-healthcare-primary'} font-medium`}>
                          {item.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Ulasan Pasien</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviews.map((review, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{review.patient}</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-2">{review.comment}</p>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <Button 
              onClick={onConsult}
              className="flex-1" 
              disabled={!doctor.available}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Konsultasi Sekarang
            </Button>
            <Button variant="outline" className="flex-1">
              <Calendar className="mr-2 h-4 w-4" />
              Jadwalkan Nanti
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorProfile;