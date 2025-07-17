import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kepçeci İş Makinaları - Van, Hakkari, Bitlis'te Tek Yetkili Caterpillar Servisi",
  description:
    "30+ yıllık deneyimimizle Van, Hakkari, Bitlis illerinde tek yetkili Borusan Caterpillar servisi. İş makinası alım-satım, yedek parça ve servis hizmetleri.",
  keywords: [
    "Kepçeci İş Makinaları",
    "Caterpillar Servisi",
    "Van Caterpillar",
    "Hakkari Caterpillar",
    "Bitlis Caterpillar",
    "İş Makinası Servisi",
    "Borusan Caterpillar",
    "Yedek Parça",
    "İş Makinası Alım Satım",
    "İş Makinası Kiralama",
    "Servis Hizmetleri",
    "Makina Revizyon",
    "Makina Bakım",
    "Makina Yedek Parça",
    "Caterpillar Yetkili Servisi",
    "Caterpillar Yedek Parça",
    "Caterpillar Bakım",
    "Caterpillar Kiralama",
    "Caterpillar Alım Satım",
    "Makina",
    "İş Makinası",
  ],
  authors: [{ name: "Hüseyin Kocatürk" }, { name: "Abdullah Aldemir" }],
  generator: "Hüseyin Kocatürk, Abdullah Aldemir",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    title: "Kepçeci İş Makinaları - Van, Hakkari, Bitlis'te Tek Yetkili Caterpillar Servisi",
    description: "30+ yıllık deneyimimizle Van, Hakkari, Bitlis illerinde tek yetkili Borusan Caterpillar servisi. İş makinası alım-satım, yedek parça ve servis hizmetleri.",
    url: "https://kepceciismakinalari.com",
    siteName: "Kepçeci İş Makinaları",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Kepçeci İş Makinaları Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Kepçeci İş Makinaları - Van, Hakkari, Bitlis'te Tek Yetkili Caterpillar Servisi",
    description: "30+ yıllık deneyimimizle Van, Hakkari, Bitlis illerinde tek yetkili Borusan Caterpillar servisi.",
    images: ["/logo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  },
  alternates: {
    canonical: "https://kepceciismakinalari.com"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://kepceciismakinalari.com" />
        <link rel="icon" href="/logo.png" />
      </head>
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
