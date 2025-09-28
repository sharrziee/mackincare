import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Shield,
  Star,
  CheckCircle,
  AlertCircle,
  Clock,
  Search,
  Filter,
  Award,
  GraduationCap,
  MapPin,
  Phone,
  User,
  FileText,
  Calendar,
  Stethoscope
} from "lucide-react";

const DoctorVerification = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

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
      verified: true,
      verificationDate: "2024-01-15",
      licenseNumber: "STR-12345678",
      education: [
        { degree: "S3 Kardiologi", institution: "Universitas Indonesia", year: "2015" },
        { degree: "S2 Kedokteran", institution: "Universitas Indonesia", year: "2010" },
        { degree: "S1 Kedokteran", institution: "Universitas Brawijaya", year: "2008" }
      ],
      certifications: [
        { name: "Fellowship Interventional Cardiology", issuer: "ESC", year: "2016" },
        { name: "Advanced Cardiac Life Support", issuer: "AHA", year: "2023" },
        { name: "Echocardiography Certification", issuer: "ASE", year: "2018" }
      ],
      workHistory: [
        { position: "Konsultan Kardiologi", hospital: "RS Brawijaya", period: "2016-sekarang" },
        { position: "Residen Kardiologi", hospital: "RSUPN Cipto Mangunkusumo", period: "2010-2015" }
      ],
      documents: {
        license: { status: "verified", uploadDate: "2024-01-10" },
        diploma: { status: "verified", uploadDate: "2024-01-10" },
        certification: { status: "verified", uploadDate: "2024-01-10" },
        workPermit: { status: "verified", uploadDate: "2024-01-10" }
      },
      patients: 1250,
      consultations: 3420,
      emergencyAvailable: true
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
      verified: true,
      verificationDate: "2024-02-20",
      licenseNumber: "STR-87654321",
      education: [
        { degree: "S3 Neurologi", institution: "Universitas Gadjah Mada", year: "2018" },
        { degree: "S2 Kedokteran", institution: "Universitas Gadjah Mada", year: "2012" },
        { degree: "S1 Kedokteran", institution: "Universitas Airlangga", year: "2010" }
      ],
      certifications: [
        { name: "Fellowship Stroke Management", issuer: "WSO", year: "2019" },
        { name: "Neurointensive Care", issuer: "NCS", year: "2020" },
        { name: "EEG Interpretation", issuer: "ACNS", year: "2017" }
      ],
      workHistory: [
        { position: "Konsultan Neurologi", hospital: "RSSA Malang", period: "2018-sekarang" },
        { position: "Residen Neurologi", hospital: "RSUP Dr. Sardjito", period: "2012-2018" }
      ],
      documents: {
        license: { status: "verified", uploadDate: "2024-02-15" },
        diploma: { status: "verified", uploadDate: "2024-02-15" },
        certification: { status: "verified", uploadDate: "2024-02-15" },
        workPermit: { status: "pending", uploadDate: "2024-02-18" }
      },
      patients: 980,
      consultations: 2150,
      emergencyAvailable: false
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
      verified: false,
      verificationDate: null,
      licenseNumber: "STR-11223344",
      education: [
        { degree: "S2 Pediatri", institution: "Universitas Airlangga", year: "2016" },
        { degree: "S1 Kedokteran", institution: "Universitas Brawijaya", year: "2014" }
      ],
      certifications: [
        { name: "Pediatric Emergency Medicine", issuer: "AAP", year: "2017" },
        { name: "Pediatric Life Support", issuer: "AHA", year: "2023" }
      ],
      workHistory: [
        { position: "Dokter Spesialis Anak", hospital: "RS Panti Waluya", period: "2016-sekarang" }
      ],
      documents: {
        license: { status: "pending", uploadDate: "2024-12-18" },
        diploma: { status: "under_review", uploadDate: "2024-12-18" },
        certification: { status: "pending", uploadDate: "2024-12-18" },
        workPermit: { status: "pending", uploadDate: "2024-12-18" }
      },
      patients: 650,
      consultations: 1200,
      emergencyAvailable: true
    }
  ];

  const getStatusBadge = (verified: boolean, documents: any) => {
    if (verified) {
      return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Terverifikasi</Badge>;
    }
    
    const pendingDocs = Object.values(documents).some((doc: any) => doc.status === "pending" || doc.status === "under_review");
    if (pendingDocs) {
      return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Dalam Review</Badge>;
    }
    
    return <Badge className="bg-red-100 text-red-800"><AlertCircle className="h-3 w-3 mr-1" />Belum Terverifikasi</Badge>;
  };

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800">Terverifikasi</Badge>;
      case "under_review":
        return <Badge className="bg-blue-100 text-blue-800">Dalam Review</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Menunggu</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Ditolak</Badge>;
      default:
        return <Badge variant="secondary">Tidak Ada</Badge>;
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = searchQuery === "" || 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === "" ||
      (selectedStatus === "verified" && doctor.verified) ||
      (selectedStatus === "pending" && !doctor.verified) ||
      (selectedStatus === "emergency" && doctor.emergencyAvailable);
    
    return matchesSearch && matchesStatus;
  });

  const DoctorDetails = ({ doctor }: { doctor: any }) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">
            <User className="h-4 w-4 mr-2" />
            Lihat Detail
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Verifikasi Dokter</DialogTitle>
            <DialogDescription>
              Detail lengkap dan status verifikasi {doctor.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Doctor Profile */}
            <Card className="p-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={doctor.photo} alt={doctor.name} />
                  <AvatarFallback className="bg-healthcare-primary text-white text-lg">
                    {doctor.name.split(' ')[1]?.charAt(0)}{doctor.name.split(' ')[2]?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-semibold">{doctor.name}</h3>
                    {getStatusBadge(doctor.verified, doctor.documents)}
                  </div>
                  <p className="text-healthcare-primary font-medium mb-1">{doctor.specialty}</p>
                  <p className="text-muted-foreground mb-2">{doctor.hospital}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                      <span>{doctor.rating} ({doctor.reviews} ulasan)</span>
                    </div>
                    <span>{doctor.experience} pengalaman</span>
                    <span>STR: {doctor.licenseNumber}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Tabs defaultValue="education" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="education">Pendidikan</TabsTrigger>
                <TabsTrigger value="certifications">Sertifikasi</TabsTrigger>
                <TabsTrigger value="experience">Pengalaman</TabsTrigger>
                <TabsTrigger value="documents">Dokumen</TabsTrigger>
              </TabsList>

              <TabsContent value="education" className="space-y-4">
                <h4 className="font-semibold">Riwayat Pendidikan</h4>
                <div className="space-y-3">
                  {doctor.education.map((edu: any, index: number) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-5 w-5 text-healthcare-primary" />
                        <div>
                          <h5 className="font-medium">{edu.degree}</h5>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                          <p className="text-xs text-muted-foreground">Lulus tahun {edu.year}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="certifications" className="space-y-4">
                <h4 className="font-semibold">Sertifikasi Profesional</h4>
                <div className="space-y-3">
                  {doctor.certifications.map((cert: any, index: number) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-healthcare-accent" />
                        <div>
                          <h5 className="font-medium">{cert.name}</h5>
                          <p className="text-sm text-muted-foreground">Penerbit: {cert.issuer}</p>
                          <p className="text-xs text-muted-foreground">Tahun {cert.year}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                <h4 className="font-semibold">Riwayat Pekerjaan</h4>
                <div className="space-y-3">
                  {doctor.workHistory.map((work: any, index: number) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center gap-3">
                        <Stethoscope className="h-5 w-5 text-healthcare-secondary" />
                        <div>
                          <h5 className="font-medium">{work.position}</h5>
                          <p className="text-sm text-muted-foreground">{work.hospital}</p>
                          <p className="text-xs text-muted-foreground">{work.period}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-healthcare-primary">{doctor.patients}</p>
                    <p className="text-sm text-muted-foreground">Pasien</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-healthcare-secondary">{doctor.consultations}</p>
                    <p className="text-sm text-muted-foreground">Konsultasi</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${doctor.emergencyAvailable ? 'text-green-600' : 'text-gray-400'}`}>
                      {doctor.emergencyAvailable ? '24/7' : 'No'}
                    </p>
                    <p className="text-sm text-muted-foreground">Emergency</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <h4 className="font-semibold">Status Dokumen</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Surat Tanda Registrasi (STR)</p>
                        <p className="text-sm text-muted-foreground">Upload: {doctor.documents.license.uploadDate}</p>
                      </div>
                    </div>
                    {getDocumentStatusBadge(doctor.documents.license.status)}
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Ijazah Pendidikan</p>
                        <p className="text-sm text-muted-foreground">Upload: {doctor.documents.diploma.uploadDate}</p>
                      </div>
                    </div>
                    {getDocumentStatusBadge(doctor.documents.diploma.status)}
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Sertifikat Kompetensi</p>
                        <p className="text-sm text-muted-foreground">Upload: {doctor.documents.certification.uploadDate}</p>
                      </div>
                    </div>
                    {getDocumentStatusBadge(doctor.documents.certification.status)}
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Surat Izin Praktik</p>
                        <p className="text-sm text-muted-foreground">Upload: {doctor.documents.workPermit.uploadDate}</p>
                      </div>
                    </div>
                    {getDocumentStatusBadge(doctor.documents.workPermit.status)}
                  </div>
                </div>
                
                {!doctor.verified && (
                  <div className="flex gap-2 pt-4 border-t">
                    <Button variant="healthcare" className="flex-1">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Verifikasi Dokter
                    </Button>
                    <Button variant="destructive" className="flex-1">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Tolak Verifikasi
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Verifikasi Dokter</h1>
        <p className="text-muted-foreground">Kelola dan verifikasi kredensial dokter di platform</p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {doctors.filter(d => d.verified).length}
              </p>
              <p className="text-sm text-muted-foreground">Terverifikasi</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {doctors.filter(d => !d.verified).length}
              </p>
              <p className="text-sm text-muted-foreground">Menunggu Review</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {doctors.filter(d => d.emergencyAvailable).length}
              </p>
              <p className="text-sm text-muted-foreground">Emergency 24/7</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{doctors.length}</p>
              <p className="text-sm text-muted-foreground">Total Dokter</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari dokter, spesialis, atau rumah sakit..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          className="px-3 py-2 border rounded-md"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Semua Status</option>
          <option value="verified">Terverifikasi</option>
          <option value="pending">Menunggu Review</option>
          <option value="emergency">Emergency Available</option>
        </select>
      </div>

      {/* Doctors List */}
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
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{doctor.name}</h3>
                      {getStatusBadge(doctor.verified, doctor.documents)}
                      {doctor.emergencyAvailable && (
                        <Badge className="bg-red-100 text-red-800">Emergency 24/7</Badge>
                      )}
                    </div>
                    
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
                      <span className="text-sm text-muted-foreground">{doctor.experience} pengalaman</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>STR: {doctor.licenseNumber}</span>
                      {doctor.verificationDate && (
                        <span>Verified: {doctor.verificationDate}</span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                      <div className="text-center">
                        <p className="font-bold text-healthcare-primary">{doctor.patients}</p>
                        <p className="text-xs text-muted-foreground">Pasien</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-healthcare-secondary">{doctor.consultations}</p>
                        <p className="text-xs text-muted-foreground">Konsultasi</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-healthcare-accent">{doctor.education.length}</p>
                        <p className="text-xs text-muted-foreground">Pendidikan</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:text-right space-y-2">
                    <DoctorDetails doctor={doctor} />
                    {!doctor.verified && (
                      <>
                        <Button variant="healthcare" size="sm" className="w-full">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Verifikasi
                        </Button>
                        <Button variant="destructive" size="sm" className="w-full">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Tolak
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Hubungi
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DoctorVerification;