"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function IsMakinalariPage() {
  const router = useRouter()

  const equipment = [
    {
      title: "Kazıcı Yükleyiciler",
      description:
        "Çok amaçlı kullanım için ideal kazıcı yükleyici makinaları. Hem kazma hem de yükleme işlemleri için mükemmel performans.",
      image: "kaziciyukleyici.jpeg",
      features: ["Hidrolik sistem", "Çok fonksiyonlu", "Dayanıklı yapı"],
    },
    {
      title: "Lastikli Yükleyiciler",
      description: "Yüksek kapasiteli lastikli yükleyiciler ile hızlı ve verimli malzeme taşıma işlemleri.",
      image: "/lastikliyukleyici.jpeg",
      features: ["Yüksek kapasite", "Hızlı hareket", "Düşük yakıt tüketimi"],
    },
    {
      title: "Greyderler",
      description: "Yol yapımı ve düzenleme işleri için profesyonel motor greyderleri. Hassas seviye ayarı.",
      image: "/greyder.jpeg",
      features: ["Hassas kontrol", "Güçlü motor", "Uzun ömür"],
    },
    {
      title: "Dozerler",
      description: "Ağır toprak işleri ve arazi düzenleme için güçlü bulldozer makinaları.",
      image: "/dozer.jpeg",
      features: ["Yüksek güç", "Sağlam yapı", "Verimli çalışma"],
    },
    {
      title: "Ekskavatörler",
      description: "Kazı işleri için çeşitli tonajlarda ekskavatör makinaları. Her iş için uygun model.",
      image: "/eskavatör.jpeg",
      features: ["Çeşitli tonajlar", "Hassas kontrol", "Güçlü performans"],
    },
  ]

  const handleDetailClick = (title: string) => {
    alert(`${title} hakkında detaylı bilgi için lütfen bizimle iletişime geçin.`)
    router.push("/iletisim")
  }

  const handleQuoteClick = () => {
    router.push("/iletisim")
  }

  const handleCatalogClick = () => {
    alert("Katalog talebiniz alındı. En kısa sürede size ulaştırılacaktır.")
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-4">
            <Badge className="mb-4 bg-[#fcb912] text-black">Caterpillar Yetkili Bayii</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">İş Makinaları</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Caterpillar'ın güvenilir ve dayanıklı iş makinaları ile projelerinizi başarıyla tamamlayın. Alım, satım ve
              kiralama seçenekleri mevcuttur.
            </p>
            <Image
              src="/cat.png"
              alt="cat"
              width={300}
              height={300}
              className="mt-2 w-24 h-24 border-b-2 border-b-black/50 flex justify-center mx-auto"
              objectFit="contain"
            />  
          </div>

          {/* Equipment Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipment.map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    objectFit="contain"
                    fill
                    className="p-4 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="text-base">{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      className="w-full bg-[#fcb912] text-black hover:bg-[#fcb912]/90 btn-effect btn-glow"
                      onClick={() => handleDetailClick(item.title)}
                    >
                      Detaylar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">İhtiyacınıza Uygun Makina Bulamadınız mı?</h2>
            <p className="text-muted-foreground mb-6">
              Geniş ürün yelpazemiz ve özel çözümlerimiz için bizimle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#fcb912] hover:bg-[#fcb912]/90 btn-effect btn-glow text-black"
                onClick={handleQuoteClick}
              >
                Teklif İsteyin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
