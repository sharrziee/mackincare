import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pill,
  ShoppingCart,
  Search,
  Filter,
  Star,
  Heart,
  Plus,
  Minus,
  Package,
  Truck,
  Shield,
  AlertCircle,
  Clock
} from "lucide-react";
import medicineParacetamol from "@/assets/medicine-paracetamol.jpg";
import medicineVitaminC from "@/assets/medicine-vitamin-c.jpg";
import medicalTensimeter from "@/assets/medical-tensimeter.jpg";

const OnlinePharmacy = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState<any[]>([]);

  const categories = [
    { id: "obat-bebas", name: "Obat Bebas", icon: "💊" },
    { id: "vitamin", name: "Vitamin & Suplemen", icon: "🍯" },
    { id: "alat-kesehatan", name: "Alat Kesehatan", icon: "🩺" },
    { id: "perawatan-tubuh", name: "Perawatan Tubuh", icon: "🧴" },
    { id: "mother-baby", name: "Ibu & Bayi", icon: "👶" },
    { id: "obat-resep", name: "Obat Resep", icon: "📋" }
  ];

  const products = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "obat-bebas",
      brand: "Sanbe",
      price: 8500,
      originalPrice: 10000,
      discount: 15,
      rating: 4.8,
      reviews: 2340,
      stock: 150,
      image: medicineParacetamol,
      description: "Obat pereda nyeri dan demam yang efektif",
      composition: "Paracetamol 500mg",
      indication: "Mengurangi demam dan meredakan nyeri ringan hingga sedang",
      dosage: "Dewasa: 1-2 tablet, 3-4 kali sehari",
      sideEffects: "Jarang terjadi efek samping jika digunakan sesuai dosis",
      prescription: false,
      fastDelivery: true,
      verified: true
    },
    {
      id: 2,
      name: "Vitamin C 1000mg",
      category: "vitamin",
      brand: "Blackmores",
      price: 125000,
      originalPrice: 150000,
      discount: 17,
      rating: 4.9,
      reviews: 1890,
      stock: 75,
      image: medicineVitaminC,
      description: "Suplemen vitamin C untuk meningkatkan daya tahan tubuh",
      composition: "Ascorbic Acid 1000mg",
      indication: "Meningkatkan sistem imun dan antioksidan",
      dosage: "1 tablet sehari setelah makan",
      sideEffects: "Dapat menyebabkan gangguan pencernaan pada beberapa orang",
      prescription: false,
      fastDelivery: true,
      verified: true
    },
    {
      id: 3,
      name: "Tensimeter Digital",
      category: "alat-kesehatan",
      brand: "Omron",
      price: 450000,
      originalPrice: 500000,
      discount: 10,
      rating: 4.7,
      reviews: 856,
      stock: 25,
      image: medicalTensimeter,
      description: "Tensimeter digital akurat untuk monitoring tekanan darah",
      composition: "Alat kesehatan digital",
      indication: "Mengukur tekanan darah sistol dan diastol",
      dosage: "Gunakan sesuai petunjuk manual",
      sideEffects: "-",
      prescription: false,
      fastDelivery: false,
      verified: true
    },
    {
      id: 4,
      name: "Amoxicillin 500mg",
      category: "obat-resep",
      brand: "Kimia Farma",
      price: 35000,
      originalPrice: 35000,
      discount: 0,
      rating: 4.6,
      reviews: 1200,
      stock: 200,
      image: medicineParacetamol,
      description: "Antibiotik untuk mengatasi infeksi bakteri",
      composition: "Amoxicillin Trihydrate 500mg",
      indication: "Mengatasi infeksi saluran pernapasan, kulit, dan saluran kemih",
      dosage: "500mg, 3 kali sehari selama 7-10 hari",
      sideEffects: "Mual, diare, ruam kulit (jarang)",
      prescription: true,
      fastDelivery: true,
      verified: true
    }
  ];

  const addToCart = (product: any, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateCartQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== productId));
    } else {
      setCart(prev => prev.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const filteredProducts = products.filter(product => 
    (searchQuery === "" || product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     product.brand.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory === "" || product.category === selectedCategory)
  );

  const ProductDetail = ({ product }: { product: any }) => {
    const [quantity, setQuantity] = useState(1);

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">
            Lihat Detail
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>{product.brand}</DialogDescription>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-healthcare-primary">
                    Rp {product.price.toLocaleString()}
                  </span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-sm text-muted-foreground line-through">
                        Rp {product.originalPrice.toLocaleString()}
                      </span>
                      <Badge className="bg-red-100 text-red-800">
                        -{product.discount}%
                      </Badge>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground text-sm ml-1">({product.reviews} ulasan)</span>
                </div>
                <Badge variant="outline">Stok: {product.stock}</Badge>
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                {product.verified && (
                  <Badge className="bg-green-100 text-green-800">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
                {product.fastDelivery && (
                  <Badge className="bg-blue-100 text-blue-800">
                    <Truck className="h-3 w-3 mr-1" />
                    Same Day
                  </Badge>
                )}
                {product.prescription && (
                  <Badge className="bg-orange-100 text-orange-800">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Perlu Resep
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-medium px-4">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                className="w-full mb-2" 
                onClick={() => addToCart(product, quantity)}
                variant="healthcare"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Tambah ke Keranjang
              </Button>
              <Button variant="outline" className="w-full">
                <Heart className="h-4 w-4 mr-2" />
                Simpan ke Wishlist
              </Button>
            </div>
            
            <div>
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Deskripsi</TabsTrigger>
                  <TabsTrigger value="usage">Penggunaan</TabsTrigger>
                  <TabsTrigger value="info">Info Penting</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Deskripsi Produk</h4>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Komposisi</h4>
                    <p className="text-sm text-muted-foreground">{product.composition}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Indikasi</h4>
                    <p className="text-sm text-muted-foreground">{product.indication}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="usage" className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Cara Penggunaan</h4>
                    <p className="text-sm text-muted-foreground">{product.dosage}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Aturan Konsumsi</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Gunakan sesuai petunjuk dokter atau kemasan</li>
                      <li>• Jangan melebihi dosis yang dianjurkan</li>
                      <li>• Simpan di tempat sejuk dan kering</li>
                      <li>• Jauhkan dari jangkauan anak-anak</li>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="info" className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Efek Samping</h4>
                    <p className="text-sm text-muted-foreground">{product.sideEffects}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Peringatan</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Konsultasikan dengan dokter jika gejala berlanjut</li>
                      <li>• Hentikan penggunaan jika terjadi reaksi alergi</li>
                      <li>• Tidak dianjurkan untuk ibu hamil dan menyusui</li>
                    </ul>
                  </div>
                  {product.prescription && (
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center text-orange-800">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        <span className="font-medium">Obat Keras</span>
                      </div>
                      <p className="text-sm text-orange-700 mt-1">
                        Produk ini memerlukan resep dokter. Upload resep Anda saat checkout.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const CartDrawer = () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="healthcare" className="relative">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Keranjang ({cart.length})
            {cart.length > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </Badge>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Keranjang Belanja</DialogTitle>
            <DialogDescription>
              {cart.length} produk dalam keranjang
            </DialogDescription>
          </DialogHeader>
          
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Keranjang kosong</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.brand}</p>
                    <p className="text-sm font-medium text-healthcare-primary">
                      Rp {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium px-2">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="text-xl font-bold text-healthcare-primary">
                    Rp {getTotalPrice().toLocaleString()}
                  </span>
                </div>
                <Button className="w-full" variant="healthcare">
                  <Package className="h-4 w-4 mr-2" />
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Apotek Online</h1>
        <p className="text-muted-foreground">Beli obat dan alat kesehatan dengan mudah dan aman</p>
      </div>

      {/* Search and Cart */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari obat, vitamin, alat kesehatan..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Semua Kategori</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <CartDrawer />
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Kategori Produk</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className={`p-4 cursor-pointer hover:shadow-md transition-all duration-300 ${
                selectedCategory === category.id ? 'ring-2 ring-healthcare-primary' : ''
              }`}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? "" : category.id)}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{category.icon}</div>
                <p className="text-sm font-medium">{category.name}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Produk ({filteredProducts.length})</h2>
          <Select defaultValue="popularity">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Paling Populer</SelectItem>
              <SelectItem value="price-low">Harga Terendah</SelectItem>
              <SelectItem value="price-high">Harga Tertinggi</SelectItem>
              <SelectItem value="rating">Rating Tertinggi</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {product.discount > 0 && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    -{product.discount}%
                  </Badge>
                )}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {product.verified && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      <Shield className="h-3 w-3" />
                    </Badge>
                  )}
                  {product.fastDelivery && (
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      <Clock className="h-3 w-3" />
                    </Badge>
                  )}
                  {product.prescription && (
                    <Badge className="bg-orange-100 text-orange-800 text-xs">
                      <AlertCircle className="h-3 w-3" />
                    </Badge>
                  )}
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-base line-clamp-2">{product.name}</CardTitle>
                <CardDescription className="text-sm">{product.brand}</CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-healthcare-primary">
                    Rp {product.price.toLocaleString()}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-xs text-muted-foreground line-through">
                      Rp {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                <Badge variant="outline" className="text-xs mb-3">
                  Stok: {product.stock}
                </Badge>
                
                <div className="space-y-2">
                  <ProductDetail product={product} />
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => addToCart(product)}
                    variant="healthcare"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Beli Sekarang
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnlinePharmacy;