"use client"

import type React from "react"
import { useState, useRef } from "react"
import toast, { Toaster } from 'react-hot-toast'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Navigation } from "lucide-react"

export default function IletisimPage() {
  const [serviceType, setServiceType] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (isSubmitting) return
    
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    const formValues = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      serviceType: serviceType,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      urgent: formData.get('urgent') === 'on',
      source: 'contact'
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
        setServiceType("")
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

  const handleDirectionsClick = () => {
    const address = "SEYRANTEPE MAH. SANAYİ SİTESİ 10/5 SK. B1 BLOK NO:15 VAN / TUŞBA"
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/place/Kep%C3%A7eci+I%C5%9F+Makina/@38.5296139,43.3546636,17z/data=!3m1!4b1!4m6!3m5!1s0x40127ad1d9faf473:0x5b0d7c6e4cc177dd!8m2!3d38.5296139!4d43.3546636!16s%2Fg%2F11wq30mbvn?entry=ttu&g_ep=EgoyMDI1MDcwNi4wIKXMDSoASAFQAw%3D%3D`, "_blank")
  }

  const handleSocialClick = (platform: string) => {
    alert(`${platform} sayfamız yakında aktif olacak!`)
  }

  return (
    <div className="min-h-screen py-16">
      <Toaster />
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">İletişim</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Sorularınız, talepleriniz veya acil servis ihtiyaçlarınız için bizimle iletişime geçin. Uzman ekibimiz
              size yardımcı olmaya hazır.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">İletişim Formu</CardTitle>
                <CardDescription>Detaylı bilgi ve hızlı dönüş için formu doldurun</CardDescription>
              </CardHeader>
              <CardContent>
                <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Ad</Label>
                      <Input id="firstName" name="firstName" placeholder="Adınızı girin" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Soyad</Label>
                      <Input id="lastName" name="lastName" placeholder="Soyadınızı girin" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input id="phone" name="phone" placeholder="0532 123 45 67" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input id="email" name="email" type="email" placeholder="ornek@email.com" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Şirket/Kurum</Label>
                    <Input id="company" name="company" placeholder="Şirket adınızı girin (opsiyonel)" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Hizmet Türü</Label>
                    <Select value={serviceType} onValueChange={setServiceType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Hizmet türünü seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="satis">Makina Alım/Satım</SelectItem>
                        <SelectItem value="kiralama">Makina Kiralama</SelectItem>
                        <SelectItem value="servis">Servis/Bakım</SelectItem>
                        <SelectItem value="yedek-parca">Yedek Parça</SelectItem>
                        <SelectItem value="revizyon">Revizyon İşlemleri</SelectItem>
                        <SelectItem value="diger">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Konu</Label>
                    <Input id="subject" name="subject" placeholder="Mesaj konusunu belirtin" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mesaj</Label>
                    <Textarea id="message" name="message" placeholder="Detaylı mesajınızı yazın..." rows={5} required />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="urgent" name="urgent" />
                    <Label htmlFor="urgent" className="text-sm">
                      Bu acil bir durumdur, öncelikli olarak değerlendirilsin
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#fcb912] text-black hover:bg-[#fcb912]/90 text-lg py-3 btn-effect btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">İletişim Bilgileri</CardTitle>
                  <CardDescription>Doğrudan iletişim kurmak için</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#fcb912] rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Adres</h3>
                      <p className="text-muted-foreground">
                        SEYRANTEPE MAH. SANAYİ SİTESİ 10/5 SK. B1 BLOK NO:15 VAN / TUŞBA
                        <br />
                        Türkiye
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Telefon</h3>
                      <p className="text-muted-foreground">
                        Genel:{" "}
                        <a href="tel:+904321234567" className="hover:text-[#fcb912] transition-colors">
                          0 546 486 5191
                        </a>
                        <br />
                     
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">E-posta</h3>
                      <p className="text-muted-foreground">
                        Genel:{" "}
                        <a href="mailto:kepceciismakinalari@hotmail.com" className="hover:text-[#fcb912] transition-colors">
                          kepceciismakinalari@hotmail.com
                        </a>
                
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Çalışma Saatleri</h3>
                      <p className="text-muted-foreground">
                        Pazartesi - Cuma: 08:00 - 18:00
                        <br />
                        Cumartesi: 08:00 - 16:00
                        <br />
                        Pazar: Kapalı
                        <br />
                        <span className="text-[#fcb912] font-medium">Acil Servis: 7/24</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle>Sosyal Medya</CardTitle>
                  <CardDescription>Güncel haberler ve duyurular için takip edin</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="btn-effect bg-transparent"
                      onClick={() => handleSocialClick("Facebook")}
                    >
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="btn-effect bg-transparent"
                      onClick={() => handleSocialClick("Instagram")}
                    >
                      <Instagram className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="btn-effect bg-transparent"
                      onClick={() => handleSocialClick("LinkedIn")}
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <MapPin className="h-6 w-6" />
                Konum
              </CardTitle>
              <CardDescription>Kepçeci İş Makinaları - Van/Tuşba</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 rounded-b-lg overflow-hidden relative">
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
                <div className="absolute top-4 right-4 z-10">
                  <Button
                    className="bg-[#fcb912] text-black hover:bg-[#fcb912]/90 btn-effect btn-glow shadow-lg"
                    onClick={handleDirectionsClick}
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Yol Tarifi Al
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
