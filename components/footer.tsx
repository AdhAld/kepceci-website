import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
               <Image src="/logo.png" alt="Kepçeci Logo" width={200} height={200} className="h-40 w-auto" /> 
               <Image src="/borusan-logo.svg" alt="Borusan Cat" width={140} height={38} className="h-12 w-auto" />
              </div>
            
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Hızlı Linkler</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link href="/is-makinalari" className="text-muted-foreground hover:text-foreground transition-colors">
                    İş Makinaları
                  </Link>
                </li>
                <li>
                  <Link
                    href="/yedek-parcalar"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Yedek Parçalar
                  </Link>
                </li>
                <li>
                  <Link href="/iletisim" className="text-muted-foreground hover:text-foreground transition-colors">
                    İletişim
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-lg mb-4">İletişim</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-[#fcb912] mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    SEYRANTEPE MAH. SANAYİ SİTESİ 10/5 SK. B1 BLOK NO:15 
                    <br />
                    VAN / TUŞBA
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-[#fcb912]" />
                  <span className="text-muted-foreground">0546 486 5191</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-[#fcb912]" />
                  <span className="text-muted-foreground">kepceciismakinalari@hotmail.com</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 text-[#fcb912] mt-0.5" />
                  <div className="text-muted-foreground">
                    <div>Pzt-Cum: 08:00-18:00</div>
                    <div>Cmt: 08:00-16:00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Kepçeci İş Makinaları. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-xs text-muted-foreground">Borusan Caterpillar Yetkili Servisi</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
