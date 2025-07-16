"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function YedekParcalarPage() {
  const router = useRouter()

  const spareParts = [
    {
      name: "Motor Yağ Filtresi",
      partNumber: "CAT-1R-0739",
      image: "/1r0739.png",
      category: "Filtre Grubu",
    },
    {
      name: "Yakıt/Su Ayırıcı Filtre",
      partNumber: "CAT-326-1644",
      image: "/3261644.jpeg",
      category: "Filtre Grubu",
    },
    {
      name: "Mazot Filtresi",
      partNumber: "CAT-1R-0762",
      image: "/1r0762.jpg",
      category: "Filtre Grubu",
    },
    {
      name: "Hidrolik Yağ Filtresi",
      partNumber: "CAT-1G-8878",
      image: "/1g8878.jpeg",
      category: "Filtre Grubu",
    },
    {
      name: "Hidrolik/Şanzıman Yağ Filtresi",
      partNumber: "CAT-132-8875",
      image: "/oilFilter.jpeg",
      category: "Filtre Grubu",
    },
    {
      name: "Ana Standart Verimli Motor Havası Filtresi",
      partNumber: "CAT-245-6375",
      image: "/havafiltre.jpeg",
      category: "Filtre Grubu",
    },
      {
      name: "Şanzıman Yağı",
      partNumber: "CAT-EM7X-7858",
      image: "/sanzimanyagi.png",
      category: "Yağ Grubu",
    },
      {
      name: "Hidrolik Yağı",
      partNumber: "CAT-309-6942",
      image: "/hidrolikyagi.jpg",
      category: "Yağ Grubu",
    },
      {
      name: "Şanzıman Yağı",
      partNumber: "CAT-EM7X-7855",
      image: "/sanziman2.jpeg",
      category: "Yağ Grubu",
    },
      {
      name: "Dizel Motor Yağı",
      partNumber: "CAT-EM3E-9848",
      image: "/dizelyagi.jpg",
      category: "Yağ Grubu",
    },
  ]

  const handlePriceInquiry = (partName: string, partNumber: string) => {
    alert(`${partName} (${partNumber}) için fiyat talebi alındı. En kısa sürede size dönüş yapacağız.`)
    router.push("/iletisim")
  }

  const handleCallNow = () => {
    window.location.href = "tel:+904321234567"
  }

  const handleCatalogRequest = () => {
    alert("Katalog talebiniz alındı. En kısa sürede size ulaştırılacaktır.")
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#fcb912] text-black">Orijinal Caterpillar</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Yedek Parçalar</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Orijinal Caterpillar yedek parçaları ile makinalarınızın performansını koruyun. Hızlı teslimat ve
              güvenilir kalite garantisi.
            </p>
          </div>

          {/* Parts Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16">
            {spareParts.map((part, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-40 overflow-hidden bg-white">
                  <Image
                    src={part.image || "/placeholder.svg"}
                    alt={part.name}
                    fill
                    objectFit="contain"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="text-xs w-fit">
                    {part.category}
                  </Badge>
                  <CardTitle className="text-sm font-semibold">{part.name}</CardTitle>
                  <CardDescription className="text-xs">Parça No: {part.partNumber}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  
                    <p className="text-sm  text-muted-foreground mb-3">Fiyat için iletişime geçiniz</p>
                    <div className="text-center"><Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs bg-transparent btn-effect"
                      onClick={() => handlePriceInquiry(part.name, part.partNumber)}
                    >
                      Fiyat Sor
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-[rgb(43,43,43)] to-[rgb(43,43,43)] text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Daha Fazla Ürün İçin</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Aradığınız yedek parçayı bulamadınız mı? Geniş stok yelpazemizden ihtiyacınız olan tüm orijinal
              Caterpillar parçalarını temin edebiliriz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#fcb912] text-black hover:bg-[#fcb912]/90 btn-effect btn-glow"
                onClick={handleCallNow}
              >
                <Phone className="mr-2 h-4 w-4" />
                Hemen Arayın
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent btn-effect"
                onClick={handleCatalogRequest}
              >
                Katalog İsteyin
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#fcb912] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">✓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Orijinal Parçalar</h3>
              <p className="text-muted-foreground">%100 orijinal Caterpillar yedek parçaları</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hızlı Teslimat</h3>
              <p className="text-muted-foreground">Stokta bulunan parçalar aynı gün kargo</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">🛡️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Garanti</h3>
              <p className="text-muted-foreground">Tüm parçalarımız resmi garanti kapsamında</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
