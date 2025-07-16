import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kepçeci İş Makinaları - Doğu Anadolu Caterpillar Servisi",
  description:
    "30+ yıllık deneyimimizle Doğu Anadolu Bölgesinin yetkili Borusan Caterpillar servisi. İş makinası alım-satım, yedek parça ve servis hizmetleri.",
    generator: 'Hüseyin Kocatürk , Abdullah Aldemir',
icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    title: "Kepçeci İş Makinaları - Doğu Anadolu Caterpillar Servisi",
    description:"30+ yıllık deneyimimizle Doğu Anadolu Bölgesinin yetkili Borusan Caterpillar servisi. İş makinası alım-satım, yedek parça ve servis hizmetleri.",
    url: "https://kepceciismakinalari.com",
    siteName: "Kepçeci İş Makinaları",
    locale: "tr_TR",
    type: "website",}
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          <main>
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
