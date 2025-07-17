import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Email configuration
const GMAIL_USER = process.env.GMAIL_USER || 'abdullahald65@gmail.com'
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || 'yhcuiduisyzimtnu'

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      firstName, 
      lastName, 
      phone, 
      email, 
      company, 
      serviceType, 
      subject, 
      message, 
      urgent,
      source // 'homepage' or 'contact'
    } = body

    // Validate required fields
    if (!firstName || !phone || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Lütfen tüm gerekli alanları doldurunuz' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz' },
        { status: 400 }
      )
    }

    const fullName = lastName ? `${firstName} ${lastName}` : firstName

    // Email to admin
    const adminEmailOptions = {
      from: GMAIL_USER,
      to: GMAIL_USER,
      subject: `${urgent ? '🚨 ACİL - ' : ''}Yeni İletişim Formu: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #fcb912; padding: 20px; text-align: center;">
            <h1 style="color: #000; margin: 0;">Kepçeci İş Makinaları</h1>
            <h2 style="color: #000; margin: 10px 0 0 0;">Yeni İletişim Formu</h2>
          </div>
          
          <div style="padding: 20px; background-color: #f8f9fa;">
            ${urgent ? '<div style="background-color: #dc3545; color: white; padding: 10px; border-radius: 5px; margin-bottom: 20px; text-align: center; font-weight: bold;">⚠️ ACİL DURUM - ÖNCELİKLİ DEĞERLENDİRİN</div>' : ''}
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #333; border-bottom: 2px solid #fcb912; padding-bottom: 10px;">Müşteri Bilgileri</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Ad Soyad:</td>
                  <td style="padding: 8px 0;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Telefon:</td>
                  <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #fcb912; text-decoration: none;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">E-posta:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #fcb912; text-decoration: none;">${email}</a></td>
                </tr>
                ${company ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Şirket:</td>
                  <td style="padding: 8px 0;">${company}</td>
                </tr>
                ` : ''}
                ${serviceType ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Hizmet Türü:</td>
                  <td style="padding: 8px 0;">${getServiceTypeText(serviceType)}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Form Kaynağı:</td>
                  <td style="padding: 8px 0;">${source === 'homepage' ? 'Ana Sayfa' : 'İletişim Sayfası'}</td>
                </tr>
              </table>
              
              <h3 style="color: #333; border-bottom: 2px solid #fcb912; padding-bottom: 10px; margin-top: 20px;">Mesaj Detayları</h3>
              <p style="margin: 10px 0; font-weight: bold; color: #555;">Konu: ${subject}</p>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #fcb912;">
                <p style="margin: 0; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
              <p>Bu mesaj otomatik olarak gönderilmiştir.</p>
              <p>En kısa sürede müşteri ile iletişime geçiniz.</p>
            </div>
          </div>
        </div>
      `,
    }

    // Email to customer
    const customerEmailOptions = {
      from: GMAIL_USER,
      to: email,
      subject: 'Mesajınızı Aldık - Kepçeci İş Makinaları',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #fcb912; padding: 20px; text-align: center;">
            <h1 style="color: #000; margin: 0;">Kepçeci İş Makinaları</h1>
            <h2 style="color: #000; margin: 10px 0 0 0;">Mesajınız Alındı</h2>
          </div>
          
          <div style="padding: 20px; background-color: #f8f9fa;">
            <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #333;">Sayın ${fullName},</h3>
              
              <p style="line-height: 1.6; color: #555;">
                İletişim formunuz başarıyla alınmıştır. Mesajınız için teşekkür ederiz.
              </p>
              
              <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px; border-left: 4px solid #28a745; margin: 20px 0;">
                <p style="margin: 0; color: #155724; font-weight: bold;">✅ Mesajınız başarıyla iletildi</p>
                <p style="margin: 10px 0 0 0; color: #155724;">En kısa sürede size dönüş yapacağız.</p>
              </div>
              
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h4 style="margin: 0 0 10px 0; color: #333;">Mesaj Özeti:</h4>
                <p style="margin: 5px 0; color: #555;"><strong>Konu:</strong> ${subject}</p>
                ${serviceType ? `<p style="margin: 5px 0; color: #555;"><strong>Hizmet Türü:</strong> ${getServiceTypeText(serviceType)}</p>` : ''}
                ${urgent ? '<p style="margin: 5px 0; color: #dc3545; font-weight: bold;">⚠️ Acil durum olarak işaretlendi</p>' : ''}
              </div>
              
              <div style="background-color: #fcb912; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h4 style="margin: 0 0 10px 0; color: #000;">İletişim Bilgilerimiz:</h4>
                <p style="margin: 5px 0; color: #000;"><strong>Telefon:</strong> 0 546 486 5191</p>
                <p style="margin: 5px 0; color: #000;"><strong>E-posta:</strong> kepceciismakinalari@hotmail.com</p>
                <p style="margin: 5px 0; color: #000;"><strong>Adres:</strong> SEYRANTEPE MAH. SANAYİ SİTESİ 10/5 SK. B1 BLOK NO:15 VAN / TUŞBA</p>
              </div>
              
              <p style="line-height: 1.6; color: #555;">
                Acil durumlar için doğrudan telefon numaramızdan bize ulaşabilirsiniz.
              </p>
              
              <p style="line-height: 1.6; color: #555;">
                Saygılarımızla,<br>
                <strong>Kepçeci İş Makinaları Ekibi</strong>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
              <p>Bu mesaj otomatik olarak gönderilmiştir.</p>
              <p>30+ yıllık deneyimimizle Van, Hakkari ve Bitlis illerinde tek yetkili Caterpillar servisi</p>
            </div>
          </div>
        </div>
      `,
    }

    // Send emails
    await Promise.all([
      transporter.sendMail(adminEmailOptions),
      transporter.sendMail(customerEmailOptions),
    ])

    return NextResponse.json(
      { message: 'E-postalar başarıyla gönderildi', success: true },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email sending error:', error)
    
    // More specific error handling
    if (error instanceof Error) {
      if (error.message.includes('authentication')) {
        return NextResponse.json(
          { error: 'E-posta doğrulama hatası' },
          { status: 500 }
        )
      }
      if (error.message.includes('network')) {
        return NextResponse.json(
          { error: 'Ağ bağlantısı hatası' },
          { status: 500 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'E-posta gönderilirken beklenmeyen bir hata oluştu' },
      { status: 500 }
    )
  }
}

function getServiceTypeText(serviceType: string): string {
  const serviceTypes: Record<string, string> = {
    'satis': 'Makina Alım/Satım',
    'kiralama': 'Makina Kiralama',
    'servis': 'Servis/Bakım',
    'yedek-parca': 'Yedek Parça',
    'revizyon': 'Revizyon İşlemleri',
    'diger': 'Diğer'
  }
  return serviceTypes[serviceType] || serviceType
}
