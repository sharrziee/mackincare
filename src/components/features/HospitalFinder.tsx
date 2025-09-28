import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  MapPin,
  Star,
  Phone,
  Clock,
  Car,
  Ambulance,
  Heart,
  Brain,
  Baby,
  Stethoscope,
  Search,
  Navigation,
  Shield,
  Wifi,
  Coffee,
  ParkingCircle
} from "lucide-react";
import hospitalBrawijaya from "@/assets/hospital-brawijaya.jpg";
import hospitalRssa from "@/assets/hospital-rssa.jpg";
import hospitalWaluya from "@/assets/hospital-waluya.jpg";

const HospitalFinder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const hospitals = [
    {
      id: 1,
      name: "RS Brawijaya",
      type: "Rumah Sakit Umum",
      address: "Jl. Veteran No.1, Lowokwaru, Malang",
      phone: "+62 856-3470-666",
      distance: "1.2 km",
      rating: 4.5,
      reviews: 1250,
      emergency: true,
      operational: "24 Jam",
      image: hospitalBrawijaya,
      specialties: ["Kardiologi", "Neurologi", "Ortopedi", "Anak"],
      facilities: ["IGD 24 Jam", "ICU", "NICU", "Farmasi", "Laboratorium", "Radiologi"],
      amenities: ["Parkir", "WiFi", "Kantin", "ATM"],
      insurance: ["BPJS", "Prudential", "Allianz", "AXA"],
      doctors: 45,
      beds: 150,
      coordinates: { lat: -7.9666, lng: 112.6326 }
    },
    {
      id: 2,
      name: "RSSA Malang",
      type: "Rumah Sakit Swasta",
      address: "Jl. Mayjen Haryono No.169, Lowokwaru, Malang",
      phone: "+62 856-3470-666",
      distance: "2.8 km",
      rating: 4.7,
      reviews: 890,
      emergency: true,
      operational: "24 Jam",
      image: hospitalRssa,
      specialties: ["Jantung", "Saraf", "Mata", "THT"],
      facilities: ["IGD 24 Jam", "ICU", "CCU", "Farmasi", "Laboratorium"],
      amenities: ["Parkir", "WiFi", "Kantin", "Mushola"],
      insurance: ["BPJS", "Mandiri Inhealth", "BRI Life"],
      doctors: 38,
      beds: 120,
      coordinates: { lat: -7.9797, lng: 112.6304 }
    },
    {
      id: 3,
      name: "RS Panti Waluya",
      type: "Rumah Sakit Swasta",
      address: "Jl. Nusakambangan No.56, Lowokwaru, Malang",
      phone: "+62 856-3470-666",
      distance: "3.5 km",
      rating: 4.3,
      reviews: 650,
      emergency: true,
      operational: "24 Jam",
      image: hospitalWaluya,
      specialties: ["Kandungan", "Anak", "Bedah", "Penyakit Dalam"],
      facilities: ["IGD", "ICU", "NICU", "Farmasi", "Laboratorium", "CT Scan"],
      amenities: ["Parkir", "WiFi", "Kantin"],
      insurance: ["BPJS", "Sinarmas", "Great Eastern"],
      doctors: 32,
      beds: 100,
      coordinates: { lat: -7.9553, lng: 112.6176 }
    }
  ];

  const cities = ["Malang", "Surabaya", "Jakarta", "Bandung", "Yogyakarta"];
  const hospitalTypes = ["Rumah Sakit Umum", "Rumah Sakit Swasta", "Klinik", "Puskesmas"];

  const filteredHospitals = hospitals.filter(hospital => 
    (searchQuery === "" || hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     hospital.address.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCity === "" || hospital.address.toLowerCase().includes(selectedCity.toLowerCase())) &&
    (selectedType === "" || hospital.type === selectedType)
  );

  const HospitalDetail = ({ hospital }: { hospital: any }) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Lihat Detail
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{hospital.name}</DialogTitle>
            <DialogDescription>{hospital.type}</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <img 
              src={hospital.image} 
              alt={hospital.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Informasi Umum</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    {hospital.address}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    {hospital.phone}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    {hospital.operational}
                  </div>
                  <div className="flex items-center">
                    <Car className="h-4 w-4 mr-2 text-muted-foreground" />
                    {hospital.distance} dari lokasi Anda
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Statistik</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-2xl font-bold text-healthcare-primary">{hospital.doctors}</p>
                    <p className="text-muted-foreground">Dokter</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-2xl font-bold text-healthcare-secondary">{hospital.beds}</p>
                    <p className="text-muted-foreground">Tempat Tidur</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Spesialisasi</h4>
              <div className="flex flex-wrap gap-2">
                {hospital.specialties.map((specialty: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Fasilitas Medis</h4>
              <div className="grid grid-cols-2 gap-2">
                {hospital.facilities.map((facility: string, index: number) => (
                  <div key={index} className="flex items-center text-sm">
                    <Shield className="h-4 w-4 mr-2 text-healthcare-primary" />
                    {facility}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Fasilitas Umum</h4>
              <div className="flex flex-wrap gap-4">
                {hospital.amenities.map((amenity: string, index: number) => {
                  const icons: any = {
                    "Parkir": ParkingCircle,
                    "WiFi": Wifi,
                    "Kantin": Coffee,
                    "ATM": Car,
                    "Mushola": Car
                  };
                  const IconComponent = icons[amenity] || Car;
                  return (
                    <div key={index} className="flex items-center text-sm">
                      <IconComponent className="h-4 w-4 mr-1 text-muted-foreground" />
                      {amenity}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Asuransi Diterima</h4>
              <div className="flex flex-wrap gap-2">
                {hospital.insurance.map((insurance: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {insurance}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button className="flex-1" variant="healthcare">
                <Navigation className="h-4 w-4 mr-2" />
                Petunjuk Arah
              </Button>
              <Button className="flex-1" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Hubungi
              </Button>
              {hospital.emergency && (
                <Button variant="destructive" className="flex-1">
                  <Ambulance className="h-4 w-4 mr-2" />
                  Darurat
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Cari Rumah Sakit</h1>
        <p className="text-muted-foreground">Temukan rumah sakit terdekat dengan fasilitas terbaik</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari rumah sakit..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih Kota" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Semua Kota</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city.toLowerCase()}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder="Jenis Rumah Sakit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Semua Jenis</SelectItem>
            {hospitalTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex flex-col">
            <Ambulance className="h-6 w-6 mb-2 text-red-500" />
            IGD Terdekat
          </Button>
          <Button variant="outline" className="h-20 flex flex-col">
            <Heart className="h-6 w-6 mb-2 text-pink-500" />
            Spesialis Jantung
          </Button>
          <Button variant="outline" className="h-20 flex flex-col">
            <Baby className="h-6 w-6 mb-2 text-blue-500" />
            Rumah Sakit Anak
          </Button>
          <Button variant="outline" className="h-20 flex flex-col">
            <Shield className="h-6 w-6 mb-2 text-green-500" />
            BPJS Tersedia
          </Button>
        </div>
      </div>

      {/* Hospital List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Rumah Sakit ({filteredHospitals.length})</h2>
          <Select defaultValue="distance">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Urutkan berdasarkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Jarak Terdekat</SelectItem>
              <SelectItem value="rating">Rating Tertinggi</SelectItem>
              <SelectItem value="name">Nama A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-6">
          {filteredHospitals.map((hospital) => (
            <Card key={hospital.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="md:flex">
                <div className="md:w-64 h-48 md:h-auto">
                  <img 
                    src={hospital.image} 
                    alt={hospital.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{hospital.name}</h3>
                        {hospital.emergency && (
                          <Badge className="bg-red-100 text-red-800">IGD 24 Jam</Badge>
                        )}
                      </div>
                      
                      <p className="text-healthcare-primary font-medium mb-1">{hospital.type}</p>
                      
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {hospital.address}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          {hospital.phone}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {hospital.operational}
                        </div>
                        <div className="flex items-center">
                          <Car className="h-4 w-4 mr-2" />
                          {hospital.distance} dari lokasi Anda
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                          <span className="font-medium">{hospital.rating}</span>
                          <span className="text-muted-foreground text-sm ml-1">({hospital.reviews} ulasan)</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hospital.specialties.slice(0, 3).map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {hospital.specialties.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{hospital.specialties.length - 3} lainnya
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="lg:text-right space-y-2">
                      <HospitalDetail hospital={hospital} />
                      <Button variant="healthcare" className="w-full">
                        <Navigation className="h-4 w-4 mr-2" />
                        Petunjuk Arah
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Phone className="h-4 w-4 mr-2" />
                        Hubungi
                      </Button>
                      {hospital.emergency && (
                        <Button variant="destructive" className="w-full">
                          <Ambulance className="h-4 w-4 mr-2" />
                          Panggil Ambulans
                        </Button>
                      )}
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

export default HospitalFinder;