import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Heart,
  Activity,
  Weight,
  Ruler,
  Droplets,
  Thermometer,
  Pill,
  Calendar,
  TrendingUp,
  TrendingDown,
  Target,
  AlertCircle,
  CheckCircle,
  Plus,
  Minus
} from "lucide-react";

const HealthTracker = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [healthData, setHealthData] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "",
    bloodType: "",
    allergies: "",
    medications: "",
    medicalHistory: [],
    exerciseFrequency: "",
    smokingStatus: "",
    alcoholConsumption: ""
  });

  const [vitalSigns, setVitalSigns] = useState({
    bloodPressure: { systolic: "", diastolic: "" },
    heartRate: "",
    temperature: "",
    bloodSugar: "",
    weight: ""
  });

  const medicalConditions = [
    "Diabetes", "Hipertensi", "Asma", "Jantung", "Stroke", 
    "Kolesterol Tinggi", "Osteoporosis", "Arthritis", "Migrain", "Tiroid"
  ];

  const healthMetrics = [
    {
      title: "BMI",
      value: "23.5",
      status: "Normal",
      color: "text-green-600",
      icon: Weight,
      target: "18.5-25",
      description: "Berat badan ideal"
    },
    {
      title: "Tekanan Darah",
      value: "120/80",
      status: "Normal",
      color: "text-green-600",
      icon: Heart,
      target: "<140/90",
      description: "Dalam batas normal"
    },
    {
      title: "Detak Jantung",
      value: "72 bpm",
      status: "Normal",
      color: "text-green-600",
      icon: Activity,
      target: "60-100 bpm",
      description: "Ritme normal"
    },
    {
      title: "Gula Darah",
      value: "95 mg/dL",
      status: "Normal",
      color: "text-green-600",
      icon: Droplets,
      target: "<100 mg/dL",
      description: "Puasa normal"
    }
  ];

  const healthGoals = [
    {
      title: "Turun Berat Badan",
      current: 68,
      target: 65,
      unit: "kg",
      progress: 60,
      deadline: "2024-03-01"
    },
    {
      title: "Olahraga Rutin",
      current: 3,
      target: 5,
      unit: "hari/minggu",
      progress: 60,
      deadline: "2024-02-01"
    },
    {
      title: "Minum Air",
      current: 1.8,
      target: 2.5,
      unit: "liter/hari",
      progress: 72,
      deadline: "Harian"
    }
  ];

  const recentRecords = [
    {
      date: "2024-12-20",
      type: "Tekanan Darah",
      value: "125/82 mmHg",
      status: "Normal",
      icon: Heart,
      color: "text-green-600"
    },
    {
      date: "2024-12-19",
      type: "Berat Badan",
      value: "68.2 kg",
      status: "Turun 0.3 kg",
      icon: Weight,
      color: "text-blue-600"
    },
    {
      date: "2024-12-18",
      type: "Gula Darah",
      value: "98 mg/dL",
      status: "Normal",
      icon: Droplets,
      color: "text-green-600"
    },
    {
      date: "2024-12-17",
      type: "Olahraga",
      value: "45 menit",
      status: "Cardio & Strength",
      icon: Activity,
      color: "text-purple-600"
    }
  ];

  const handleHealthDataChange = (field: string, value: any) => {
    setHealthData(prev => ({ ...prev, [field]: value }));
  };

  const handleMedicalHistoryChange = (condition: string, checked: boolean) => {
    setHealthData(prev => ({
      ...prev,
      medicalHistory: checked 
        ? [...prev.medicalHistory, condition]
        : prev.medicalHistory.filter(item => item !== condition)
    }));
  };

  const calculateBMI = () => {
    if (healthData.height && healthData.weight) {
      const heightInM = parseFloat(healthData.height) / 100;
      const weight = parseFloat(healthData.weight);
      return (weight / (heightInM * heightInM)).toFixed(1);
    }
    return "0";
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { status: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { status: "Normal", color: "text-green-600" };
    if (bmi < 30) return { status: "Overweight", color: "text-yellow-600" };
    return { status: "Obese", color: "text-red-600" };
  };

  const HealthAssessment = () => {
    const steps = [
      {
        title: "Data Dasar",
        fields: (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Tinggi Badan (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={healthData.height}
                  onChange={(e) => handleHealthDataChange("height", e.target.value)}
                  placeholder="170"
                />
              </div>
              <div>
                <Label htmlFor="weight">Berat Badan (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={healthData.weight}
                  onChange={(e) => handleHealthDataChange("weight", e.target.value)}
                  placeholder="65"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Usia</Label>
                <Input
                  id="age"
                  type="number"
                  value={healthData.age}
                  onChange={(e) => handleHealthDataChange("age", e.target.value)}
                  placeholder="30"
                />
              </div>
              <div>
                <Label>Jenis Kelamin</Label>
                <Select value={healthData.gender} onValueChange={(value) => handleHealthDataChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Laki-laki</SelectItem>
                    <SelectItem value="female">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Golongan Darah</Label>
              <Select value={healthData.bloodType} onValueChange={(value) => handleHealthDataChange("bloodType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih golongan darah" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="AB">AB</SelectItem>
                  <SelectItem value="O">O</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      },
      {
        title: "Riwayat Medis",
        fields: (
          <div className="space-y-4">
            <div>
              <Label>Riwayat Penyakit (pilih yang pernah dialami)</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {medicalConditions.map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={condition}
                      checked={healthData.medicalHistory.includes(condition)}
                      onCheckedChange={(checked) => handleMedicalHistoryChange(condition, checked as boolean)}
                    />
                    <Label htmlFor={condition} className="text-sm">{condition}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="allergies">Alergi</Label>
              <Textarea
                id="allergies"
                value={healthData.allergies}
                onChange={(e) => handleHealthDataChange("allergies", e.target.value)}
                placeholder="Sebutkan alergi yang Anda miliki..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="medications">Obat yang Sedang Dikonsumsi</Label>
              <Textarea
                id="medications"
                value={healthData.medications}
                onChange={(e) => handleHealthDataChange("medications", e.target.value)}
                placeholder="Sebutkan obat yang sedang dikonsumsi..."
                rows={3}
              />
            </div>
          </div>
        )
      },
      {
        title: "Gaya Hidup",
        fields: (
          <div className="space-y-4">
            <div>
              <Label>Frekuensi Olahraga</Label>
              <Select value={healthData.exerciseFrequency} onValueChange={(value) => handleHealthDataChange("exerciseFrequency", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih frekuensi olahraga" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Tidak pernah</SelectItem>
                  <SelectItem value="rarely">Jarang (1-2x seminggu)</SelectItem>
                  <SelectItem value="sometimes">Kadang-kadang (3-4x seminggu)</SelectItem>
                  <SelectItem value="often">Sering (5-6x seminggu)</SelectItem>
                  <SelectItem value="daily">Setiap hari</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status Merokok</Label>
              <Select value={healthData.smokingStatus} onValueChange={(value) => handleHealthDataChange("smokingStatus", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status merokok" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Tidak pernah</SelectItem>
                  <SelectItem value="former">Mantan perokok</SelectItem>
                  <SelectItem value="light">Perokok ringan (1-10 batang/hari)</SelectItem>
                  <SelectItem value="moderate">Perokok sedang (11-20 batang/hari)</SelectItem>
                  <SelectItem value="heavy">Perokok berat (&gt;20 batang/hari)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Konsumsi Alkohol</Label>
              <Select value={healthData.alcoholConsumption} onValueChange={(value) => handleHealthDataChange("alcoholConsumption", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih konsumsi alkohol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Tidak pernah</SelectItem>
                  <SelectItem value="rarely">Jarang</SelectItem>
                  <SelectItem value="social">Sosial (acara khusus)</SelectItem>
                  <SelectItem value="weekly">Mingguan</SelectItem>
                  <SelectItem value="daily">Harian</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      }
    ];

    return (
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Health Assessment</CardTitle>
          <CardDescription>
            Lengkapi data kesehatan Anda untuk mendapatkan analisis yang akurat
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{steps[currentStep - 1].title}</h3>
            <Badge variant="outline">
              Langkah {currentStep} dari {steps.length}
            </Badge>
          </div>
          
          <Progress value={(currentStep / steps.length) * 100} className="w-full" />
          
          <div className="min-h-96">
            {steps[currentStep - 1].fields}
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              <Minus className="h-4 w-4 mr-2" />
              Sebelumnya
            </Button>
            
            {currentStep < steps.length ? (
              <Button 
                onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                variant="healthcare"
              >
                Selanjutnya
                <Plus className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button variant="healthcare">
                <CheckCircle className="h-4 w-4 mr-2" />
                Selesai
              </Button>
            )}
          </div>
          
          {healthData.height && healthData.weight && (
            <Card className="p-4 bg-muted/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">BMI Anda</p>
                  <p className="text-sm text-muted-foreground">
                    {getBMIStatus(parseFloat(calculateBMI())).status}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${getBMIStatus(parseFloat(calculateBMI())).color}`}>
                    {calculateBMI()}
                  </p>
                  <p className="text-sm text-muted-foreground">kg/m²</p>
                </div>
              </div>
            </Card>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Health Tracker</h1>
        <p className="text-muted-foreground">Monitor dan kelola kesehatan Anda secara komprehensif</p>
      </div>

      <Tabs defaultValue="assessment" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
          <TabsTrigger value="metrics">Metrik Kesehatan</TabsTrigger>
          <TabsTrigger value="goals">Target Kesehatan</TabsTrigger>
          <TabsTrigger value="records">Riwayat Data</TabsTrigger>
        </TabsList>

        <TabsContent value="assessment">
          <HealthAssessment />
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthMetrics.map((metric, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                  <Badge variant={metric.status === "Normal" ? "default" : "destructive"}>
                    {metric.status}
                  </Badge>
                </div>
                <h3 className="font-semibold mb-1">{metric.title}</h3>
                <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                <p className="text-sm text-muted-foreground mt-2">{metric.description}</p>
                <p className="text-xs text-muted-foreground mt-1">Target: {metric.target}</p>
              </Card>
            ))}
          </div>

          <Card className="p-6">
            <CardHeader>
              <CardTitle>Catat Vital Signs Hari Ini</CardTitle>
              <CardDescription>Input data kesehatan terbaru Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label>Tekanan Darah (mmHg)</Label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="120" 
                      value={vitalSigns.bloodPressure.systolic}
                      onChange={(e) => setVitalSigns(prev => ({
                        ...prev,
                        bloodPressure: { ...prev.bloodPressure, systolic: e.target.value }
                      }))}
                    />
                    <span className="self-center">/</span>
                    <Input 
                      placeholder="80" 
                      value={vitalSigns.bloodPressure.diastolic}
                      onChange={(e) => setVitalSigns(prev => ({
                        ...prev,
                        bloodPressure: { ...prev.bloodPressure, diastolic: e.target.value }
                      }))}
                    />
                  </div>
                </div>
                <div>
                  <Label>Detak Jantung (bpm)</Label>
                  <Input 
                    placeholder="72" 
                    value={vitalSigns.heartRate}
                    onChange={(e) => setVitalSigns(prev => ({ ...prev, heartRate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Suhu Tubuh (°C)</Label>
                  <Input 
                    placeholder="36.5" 
                    value={vitalSigns.temperature}
                    onChange={(e) => setVitalSigns(prev => ({ ...prev, temperature: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Gula Darah (mg/dL)</Label>
                  <Input 
                    placeholder="95" 
                    value={vitalSigns.bloodSugar}
                    onChange={(e) => setVitalSigns(prev => ({ ...prev, bloodSugar: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Berat Badan (kg)</Label>
                  <Input 
                    placeholder="65" 
                    value={vitalSigns.weight}
                    onChange={(e) => setVitalSigns(prev => ({ ...prev, weight: e.target.value }))}
                  />
                </div>
              </div>
              <Button variant="healthcare" className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Simpan Data
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid gap-6">
            {healthGoals.map((goal, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">{goal.title}</h3>
                  <Badge variant="outline">Target: {goal.deadline}</Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="w-full" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Saat ini: {goal.current} {goal.unit}</span>
                    <span>Target: {goal.target} {goal.unit}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-4">
                  {goal.progress >= 100 ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : goal.progress >= 80 ? (
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  ) : goal.progress >= 50 ? (
                    <Target className="h-5 w-5 text-yellow-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className="text-sm">
                    {goal.progress >= 100 ? "Target tercapai!" : 
                     goal.progress >= 80 ? "Hampir tercapai" :
                     goal.progress >= 50 ? "On track" : "Perlu lebih giat"}
                  </span>
                </div>
              </Card>
            ))}
          </div>
          
          <Button variant="healthcare">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Target Baru
          </Button>
        </TabsContent>

        <TabsContent value="records" className="space-y-6">
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Riwayat Data Kesehatan</CardTitle>
              <CardDescription>Pantau perkembangan kesehatan Anda dari waktu ke waktu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRecords.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-muted/50`}>
                        <record.icon className={`h-5 w-5 ${record.color}`} />
                      </div>
                      <div>
                        <p className="font-medium">{record.type}</p>
                        <p className="text-sm text-muted-foreground">{record.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{record.value}</p>
                      <p className={`text-sm ${record.color}`}>{record.status}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Lihat Semua Riwayat
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthTracker;