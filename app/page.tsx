"use client"

import type React from "react"
import { useState, useRef } from "react"
import toast, { Toaster } from 'react-hot-toast'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Wrench, Truck, Settings, Shield, Clock, Users, MapPin, Phone, Mail, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function HomePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleServicesClick = () => {
    const servicesSection = document.getElementById("services")
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleContactClick = () => {
    router.push("/iletisim")
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isSubmitting) return

    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const formValues = {
      firstName: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      source: 'homepage'
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      })

      if (response.ok) {
        toast.success('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', {
          duration: 4000,
          position: 'top-center',
        })

        // Reset form properly
        if (formRef.current) {
          formRef.current.reset()
        }
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Email gönderilemedi')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.', {
        duration: 4000,
        position: 'top-center',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Toaster />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-excavator.jpeg"
            alt="Caterpillar Excavator"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Multiple overlay layers for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
        </div>

        {/* Content */}
        <div className="container relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-[#fcb912] text-black hover:bg-[#fcb912]/90 shadow-lg">
              KEPÇECİ İŞ MAKİNALARI
            </Badge>
            
          <div className="flex space-x-4 mx-auto justify-center items-center">
            
            <div><h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
              Yetkili</h1></div>
              <div><Image
              src="/borusan-logo.svg"
              alt="Caterpillar Logo"
              width={150}
              height={75}
              className="mx-auto w-40 h-20 mb-6"
            /></div>
            <div><h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl"> Servisi</h1></div>
              </div>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg text-gray-100">
              30+ Yıllık Deneyim, Güvenilir Hizmet
            </p>
          

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#fcb912] text-black hover:bg-[#fcb912]/90 btn-effect btn-glow shadow-xl"
                onClick={handleServicesClick}
              >
                Hizmetlerimizi Keşfedin
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent/20 backdrop-blur-sm btn-effect shadow-xl"
                onClick={handleContactClick}
              >
                İletişime Geçin
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-24">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Kepçeci İş Makinaları Hakkında</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                30 yılı aşkın tecrübemizle, Van, Hakkari ve Bitlis illerinde Borusan Caterpillar’ın yetkili servisi olarak hizmet sunmaktayız.
                Güvenilirlik, kalite ve profesyonellik ilkelerimiz doğrultusunda sektörde güçlü bir konuma sahibiz.
              </p>
              <a
                href="https://www.borusancat.com/tr/contact/map"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-blue-500 hover:text-green-500 transition-colors"
              >
                Yetkili Servisler
              </a>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#fcb912] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-2">30+</h3>
                <p className="text-muted-foreground">Yıllık Deneyim</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Bölgede Tek</h3>
                <p className="text-muted-foreground">Yetkili Servis</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">1000+</h3>
                <p className="text-muted-foreground">Memnun Müşteri</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">7/24</h3>
                <p className="text-muted-foreground">Acil Servis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 lg:py-24 bg-muted/50">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Hizmetlerimiz</h2>
              <p className="text-lg text-muted-foreground">Kapsamlı iş makinası hizmetleri ile yanınızdayız</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Truck,
                  title: "İş Makinası Alım-Satım",
                  description: "Yeni ve ikinci el iş makinası alım-satım hizmetleri",
                  link: "/is-makinalari",
                },
                {
                  icon: Settings,
                  title: "Yedek Parça Tedariki",
                  description: "Orijinal Caterpillar yedek parçaları ve hızlı tedarik",
                  link: "/yedek-parcalar",
                },
                {
                  icon: Wrench,
                  title: "Dış Servis ve Bakım",
                  description: "Sahada profesyonel bakım ve onarım hizmetleri",
                  link: "/iletisim",
                },
                {
                  icon: Settings,
                  title: "Motor Revizyonu",
                  description: "Uzman ekibimizle kapsamlı motor revizyon hizmetleri",
                  link: "/iletisim",
                },
                {
                  icon: Settings,
                  title: "Şanzıman Revizyonu",
                  description: "Profesyonel şanzıman bakım ve revizyon işlemleri",
                  link: "/iletisim",
                },
                {
                  icon: Settings,
                  title: "Diferansiyel Revizyonu",
                  description: "Diferansiyel sistemleri bakım ve onarım hizmetleri",
                  link: "/iletisim",
                },
              ].map((service, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => router.push(service.link)}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-[#fcb912] rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-black" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Konum ve İletişim</h2>
              <p className="text-lg text-muted-foreground">Bizimle iletişime geçin, size en iyi hizmeti sunalım</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>İletişim Formu</CardTitle>
                  <CardDescription>Mesajınızı bırakın, en kısa sürede size dönüş yapalım</CardDescription>
                </CardHeader>
                <CardContent>
                  <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Ad Soyad</Label>
                        <Input id="name" name="name" placeholder="Adınızı ve soyadınızı girin" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input id="phone" name="phone" placeholder="Telefon numaranızı girin" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input id="email" name="email" type="email" placeholder="E-posta adresinizi girin" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Konu</Label>
                      <Input id="subject" name="subject" placeholder="Mesaj konusunu girin" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Mesaj</Label>
                      <Textarea id="message" name="message" placeholder="Mesajınızı yazın" rows={4} required />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#fcb912] text-black hover:bg-[#fcb912]/90 btn-effect btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>İletişim Bilgileri</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-[#fcb912] mt-1" />
                      <div>
                        <p className="font-medium">Adres</p>
                        <p className="text-muted-foreground">
                          SEYRANTEPE MAH. SANAYİ SİTESİ 10/5 SK. B1 BLOK NO:15
                          <br />
                          VAN , Türkiye
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-[#fcb912]" />
                      <div>
                        <p className="font-medium">Telefon</p>
                        <a
                          href="tel:+905464865191"
                          className="text-muted-foreground hover:text-[#fcb912] transition-colors"
                        >
                          0 546 486 5191
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-[#fcb912]" />
                      <div>
                        <p className="font-medium">E-posta</p>
                        <a
                          href="mailto:kepceciismakinalari@hotmail.com"
                          className="text-muted-foreground hover:text-[#fcb912] transition-colors"
                        >
                          kepceciismakinalari@hotmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-[#fcb912]" />
                      <div>
                        <p className="font-medium">Çalışma Saatleri</p>
                        <p className="text-muted-foreground">
                          Pazartesi - Cumartesi: 08:00 - 18:00
                          <br />
                          Pazar: Kapalı
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Google Map */}
                <Card>
                  <CardContent className="p-0">
                    <div className="h-64 rounded-lg overflow-hidden">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3057.3242!2d43.3546636!3d38.5296139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40127ad1d9faf473%3A0x5b0d7c6e4cc177dd!2sKep%C3%A7eci%20I%C5%9F%20Makina!5e0!3m2!1str!2str!4v1625000000000!5m2!1str!2str"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Kepçeci İş Makina Konumu"
                      ></iframe>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
