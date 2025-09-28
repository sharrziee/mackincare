import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import healthNewsAI from "@/assets/health-news-ai.jpg";
import healthNewsRain from "@/assets/health-news-rain.jpg";
import healthNewsVaccination from "@/assets/health-news-vaccination.jpg";
import healthNewsStress from "@/assets/health-news-stress.jpg";
import { 
  Search, 
  Calendar, 
  Eye, 
  Share2, 
  BookOpen, 
  Heart, 
  Activity,
  Users,
  Clock,
  Tag,
  TrendingUp,
  Shield,
  Zap,
  Droplets
} from "lucide-react";

const HealthNews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { id: "update", name: "Update Terkini", icon: TrendingUp },
    { id: "tips", name: "Tips Kesehatan", icon: Heart },
    { id: "vaksinasi", name: "Vaksinasi", icon: Shield },
    { id: "stress", name: "Kesehatan Mental", icon: Activity }
  ];

  const featuredArticles = [
    {
      id: 1,
      title: "Update Terkini Dunia Kesehatan",
      excerpt: "Perkembangan terbaru dalam teknologi medis dan penelitian kesehatan global tahun 2024",
      category: "update",
      image: healthNewsAI,
      author: "Dr. Sarah Wijaya",
      date: "2024-01-15",
      readTime: "5 menit",
      views: 15420,
      content: `
        <h3>Revolusi AI dalam Dunia Medis</h3>
        <p>Teknologi kecerdasan buatan (AI) telah mencapai akurasi 95% dalam diagnosis medis, melampaui kemampuan dokter manusia dalam beberapa kasus spesifik. Inovasi ini telah diterapkan di berbagai rumah sakit di Lowokwaru, Malang.</p>
        
        <h4>Perkembangan Utama:</h4>
        <ul>
          <li>AI dapat mendeteksi kanker payudara 20% lebih cepat dari radiolog</li>
          <li>Sistem diagnosis otomatis untuk COVID-19 dari rontgen dada</li>
          <li>Robot bedah dengan presisi hingga 0.1mm</li>
          <li>Telemedicine mencapai 300% peningkatan pengguna</li>
        </ul>
        
        <h4>Dampak di Indonesia:</h4>
        <p>Implementasi AI medis di Indonesia diperkirakan akan mengurangi waktu diagnosis hingga 60% dan meningkatkan akurasi pengobatan sebesar 40%. Rumah sakit-rumah sakit besar di Malang telah mulai mengadopsi teknologi ini.</p>
        
        <p>Untuk informasi lebih lanjut, hubungi <strong>+62 856-3470-666</strong></p>
      `
    },
    {
      id: 2,
      title: "Tips Menjaga Kesehatan di Musim Hujan",
      excerpt: "Panduan lengkap untuk menjaga daya tahan tubuh dan mencegah penyakit selama musim penghujan",
      category: "tips",
      image: healthNewsRain,
      author: "Dr. Ahmad Sudrajat",
      date: "2024-01-10",
      readTime: "7 menit",
      views: 12350,
      content: `
        <h3>Strategi Kesehatan di Musim Hujan</h3>
        <p>Musim hujan di Lowokwaru, Malang membawa tantangan tersendiri bagi kesehatan. Kelembaban tinggi dan perubahan suhu dapat melemahkan sistem imun.</p>
        
        <h4>Tips Utama:</h4>
        <ol>
          <li><strong>Konsumsi Vitamin C:</strong> 1000mg setiap hari untuk meningkatkan daya tahan tubuh</li>
          <li><strong>Jaga Kebersihan:</strong> Cuci tangan minimal 8 kali sehari</li>
          <li><strong>Olahraga Teratur:</strong> 30 menit setiap hari, bisa di dalam ruangan</li>
          <li><strong>Konsumsi Air Hangat:</strong> Minimal 8 gelas sehari</li>
          <li><strong>Istirahat Cukup:</strong> 7-8 jam tidur berkualitas</li>
        </ol>
        
        <h4>Makanan Penambah Imun:</h4>
        <ul>
          <li>Jahe dan kunyit untuk antiinflamasi alami</li>
          <li>Sayuran hijau kaya vitamin dan mineral</li>
          <li>Buah citrus untuk vitamin C alami</li>
          <li>Yogurt untuk probiotik yang baik</li>
        </ul>
        
        <p>Jika mengalami gejala flu atau demam, segera konsultasi ke dokter terdekat atau hubungi <strong>+62 856-3470-666</strong></p>
      `
    },
    {
      id: 3,
      title: "Pentingnya Vaksinasi untuk Anak",
      excerpt: "Mengapa vaksinasi rutin sangat penting untuk melindungi anak dari berbagai penyakit berbahaya",
      category: "vaksinasi",
      image: healthNewsVaccination,
      author: "Dr. Lisa Andriani, Sp.A",
      date: "2024-01-05",
      readTime: "6 menit",
      views: 18750,
      content: `
        <h3>Pentingnya Vaksinasi untuk Anak</h3>
        <p>Vaksinasi adalah salah satu pencegahan paling efektif untuk melindungi anak dari penyakit serius. Di Lowokwaru, Malang, cakupan vaksinasi telah mencapai 95%.</p>
        
        <h4>Vaksin Wajib untuk Anak:</h4>
        <ol>
          <li><strong>BCG:</strong> Melindungi dari tuberkulosis (0-2 bulan)</li>
          <li><strong>Hepatitis B:</strong> Mencegah infeksi hati (0-7 hari)</li>
          <li><strong>Polio:</strong> Mencegah kelumpuhan (2-18 bulan)</li>
          <li><strong>DPT:</strong> Difteri, Pertusis, Tetanus (2-18 bulan)</li>
          <li><strong>Campak:</strong> Mencegah komplikasi serius (9-24 bulan)</li>
        </ol>
        
        <h4>Manfaat Vaksinasi:</h4>
        <ul>
          <li>Mencegah wabah penyakit menular</li>
          <li>Melindungi anak yang tidak bisa divaksin</li>
          <li>Mengurangi biaya pengobatan jangka panjang</li>
          <li>Meningkatkan kualitas hidup anak</li>
        </ul>
        
        <h4>Jadwal Vaksinasi Lengkap:</h4>
        <p>Pastikan mengikuti jadwal vaksinasi yang telah ditetapkan oleh Kementerian Kesehatan. Konsultasikan dengan dokter anak untuk jadwal yang tepat.</p>
        
        <p>Untuk informasi vaksinasi atau reservasi, hubungi <strong>+62 856-3470-666</strong></p>
      `
    },
    {
      id: 4,
      title: "Cara Mengatasi Stress di Tempat Kerja",
      excerpt: "Strategi efektif untuk mengelola stress dan menjaga kesehatan mental di lingkungan kerja",
      category: "stress",
      image: healthNewsStress,
      author: "Dr. Maya Sari, Sp.KJ",
      date: "2024-01-01",
      readTime: "8 menit",
      views: 14200,
      content: `
        <h3>Mengelola Stress di Tempat Kerja</h3>
        <p>Stress kerja menjadi masalah umum di era modern. Di Lowokwaru, Malang, 68% pekerja mengalami stress tingkat sedang hingga tinggi.</p>
        
        <h4>Penyebab Stress Kerja:</h4>
        <ul>
          <li>Beban kerja berlebihan</li>
          <li>Deadline yang ketat</li>
          <li>Konflik dengan rekan kerja</li>
          <li>Ketidakpastian pekerjaan</li>
          <li>Work-life balance yang buruk</li>
        </ul>
        
        <h4>Strategi Mengatasi Stress:</h4>
        <ol>
          <li><strong>Teknik Pernapasan:</strong> Latihan pernapasan dalam 5 menit setiap 2 jam</li>
          <li><strong>Manajemen Waktu:</strong> Prioritaskan tugas dan buat jadwal realistis</li>
          <li><strong>Komunikasi Efektif:</strong> Sampaikan kebutuhan dengan jelas</li>
          <li><strong>Istirahat Aktif:</strong> Berjalan kaki 10 menit setiap jam</li>
          <li><strong>Hobi dan Relaksasi:</strong> Alokasikan waktu untuk aktivitas menyenangkan</li>
        </ol>
        
        <h4>Kapan Perlu Bantuan Profesional:</h4>
        <ul>
          <li>Susah tidur lebih dari 2 minggu</li>
          <li>Kehilangan motivasi kerja</li>
          <li>Sering merasa cemas atau panik</li>
          <li>Gangguan fisik tanpa penyebab medis</li>
        </ul>
        
        <p>Jika mengalami stress berkelanjutan, segera konsultasi dengan psikolog atau psikiater. Hubungi <strong>+62 856-3470-666</strong> untuk konsultasi kesehatan mental.</p>
      `
    }
  ];

  const filteredArticles = featuredArticles.filter(article => 
    (searchQuery === "" || article.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory === "" || article.category === selectedCategory)
  );

  const ArticleDetail = ({ article }: { article: any }) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Baca Selengkapnya
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{article.title}</DialogTitle>
            <DialogDescription className="flex items-center gap-4 text-sm">
              <span>Oleh {article.author}</span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(article.date).toLocaleDateString('id-ID')}
              </span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <img src={article.image} alt={article.title} className="w-full h-64 object-cover rounded-lg" />
            <div className="prose prose-slate max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Health News & Tips</h1>
        <p className="text-muted-foreground">Update terkini dunia kesehatan dan tips menjaga kesehatan</p>
      </div>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cari artikel kesehatan..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <Tag className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Pilih Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Semua Kategori</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="md:flex">
              <div className="md:w-80 h-48 md:h-auto">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-6">
                <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center"><Users className="h-4 w-4 mr-1" />{article.author}</span>
                  <span className="flex items-center"><Clock className="h-4 w-4 mr-1" />{article.readTime}</span>
                  <span className="flex items-center"><Eye className="h-4 w-4 mr-1" />{article.views.toLocaleString()}</span>
                </div>
                <ArticleDetail article={article} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HealthNews;