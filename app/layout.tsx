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
    "30+ yıllık deneyimimizle Doğu Anadolu Bölgesinin tek yetkili Borusan Caterpillar servisi. İş makinası alım-satım, yedek parça ve servis hizmetleri.",
    generator: 'Hüseyin Kocatürk , Abdullah Aldemir',
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
