"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Moon, Sun, Phone } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const navItems = [
    { href: "/", label: "Ana Sayfa" },
    { href: "/is-makinalari", label: "İş Makinaları" },
    { href: "/yedek-parcalar", label: "Yedek Parçalar" },
    { href: "/iletisim", label: "İletişim" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Kepçeci Logo" width={200} height={200} className="h-40 w-auto" />
          
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute inset-0 rounded-md bg-[#fcb912]/20 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
              <span className="absolute inset-0 rounded-md shadow-[0_0_15px_rgba(252,185,18,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          ))}
        </div>

        {/* Right side - Phone and Theme Toggle */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-3 text-sm">
            <Image src="/borusan-logo.svg" alt="Borusan Cat" width={80} height={22} className="h-5 w-auto" />
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-[#fcb912]" />
              <span className="font-medium">0 546 486 5191</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="hover:bg-[#fcb912]/10 transition-colors duration-200"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Tema değiştir</span>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menüyü aç</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium hover:text-[#fcb912] transition-colors duration-300 relative group"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span className="absolute inset-0 rounded-md bg-[#fcb912]/10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                  </Link>
                ))}
                <div className="flex items-center space-x-2 pt-4 border-t">
                  <Phone className="h-4 w-4 text-[#fcb912]" />
                  <span className="font-medium">0 546 486 5191</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
