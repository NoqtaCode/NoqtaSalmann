import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import Script from "next/script";
import { BRAND_DESCRIPTION, BRAND_NAME, categories } from "../lib/brand";
import { getPublicSiteSettings, getSiteName } from "../lib/site-settings";
import FloatingActions from "../components/ui/FloatingActions";
import "./globals.css";

const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
});

export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  themeColor: "#173a31",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();
  const siteName = settings.siteName?.trim() || BRAND_NAME;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nakheel-seyaj.com";
  const description = settings.description?.trim() || 
    "مؤسسة متخصصة في تركيب شبوك المزارع والأراضي، الشبوك الأمنية والشائكة، وتوريد وزراعة أرقى سلالات نخيل التمور ونخيل الواشنطونيا للقصور والمشاريع، وتوريد وتركيب الثيل الطبيعي والصناعي وتنسيق المسطحات الخضراء بأعلى جودة وضمان في السعودية.";
  const shareImage = settings.heroImageUrl || categories[0].image;
  const siteIcon = settings.logoImageUrl || "/favicon.ico";

  const keywords = [
    // كلمات الشبوك والتسوير
    "تركيب شبوك", "شبوك مزارع", "تسوير أراضي", "شبوك زراعية", "شبوك أمنية", "شبوك شايكة", "سياج مزارع",
    "مقاول شبوك", "مقاول شبوك الرياض", "شبوك مجلفنة", "أسعار تركيب الشبوك", "بوابات شبوك", "شبوك كسارات",
    "شبوك خيول", "شبوك محميات", "تسوير مخططات", "سياج أمني", "تركيب شبك مزارع", "تسوير مزارع الرياض",
    // كلمات النخيل والزراعة
    "توريد نخيل", "زراعة نخيل", "غرس نخيل", "بيع نخيل", "نخيل واشنطونيا", "نخيل زينة", "نخيل تمور",
    "نخيل سكري", "نخيل خلاص", "نخيل برحي", "نخيل مجدول", "قلع ونقل نخيل", "نقل نخيل بالرياض",
    "تكريب نخيل", "تنظيف نخيل", "مكافحة سوسة النخيل", "شبكات ري نخيل", "مشاتل نخيل", "تنسيق مزارع",
    // كلمات الثيل والمسطحات الخضراء
    "ثيل طبيعي", "ثيل صناعي", "تركيب ثيل", "عشب صناعي", "تنسيق حدائق", "مسطحات خضراء", "ثيل للحدائق",
    "ثيل للملاعب", "عشب طبيعي", "تنسيق مزارع", "ري أوتوماتيكي", "صيانة ثيل",
    // كلمات عامة للمقاولات
    "مقاولات زراعية السعودية", "سياج ونخيل المملكة", "مقاول مزارع معتمد", siteName
  ];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${siteName} | تركيب شبوك وتوريد نخيل وتركيب ثيل في السعودية`,
      template: `%s | ${siteName}`,
    },
    description,
    keywords,
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    applicationName: siteName,
    verification: {
      google: [
        "bOyx4ccipeKQO1eUBTPzaiA88qklJqjqH9U0aJTMcvQ",
        "kHp0HoG2JwtcXvGk4id5oXaRyFCJ1Cp19R_2c2LlOZY",
        ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? [process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION] : [])
      ],
    },
    formatDetection: {
      telephone: true,
      address: true,
      email: true,
    },
    alternates: {
      canonical: "/",
      languages: {
        "ar-SA": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: "ar_SA",
      url: siteUrl,
      title: `${siteName} | تركيب شبوك وتوريد وزراعة النخيل في السعودية`,
      description,
      siteName,
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: `${siteName} - خدمات تركيب الشبوك وتوريد النخيل`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteName} | تركيب شبوك وتوريد وزراعة النخيل في السعودية`,
      description,
      images: [shareImage],
      creator: `@${siteName.replace(/\s+/g, '')}`,
    },
    icons: {
      icon: siteIcon,
      shortcut: siteIcon,
      apple: siteIcon,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [siteName, settings] = await Promise.all([getSiteName(), getPublicSiteSettings()]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nakheel-seyaj.com";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const phone = settings.phone || "";

  // Schema.org Graph المتكامل لدعم محركات البحث وRich Snippets
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteUrl}/#organization`,
        "name": siteName,
        "url": siteUrl,
        "logo": settings.logoImageUrl || `${siteUrl}/favicon.ico`,
        "image": settings.heroImageUrl || categories[0].image,
        "description": "حلول متخصصة في تركيب شبوك المزارع والأراضي، الشبوك الأمنية، وتوريد وزراعة أجود أنواع النخيل ونخيل الزينة وشبكات الري في السعودية.",
        "telephone": phone,
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "SA",
          "addressRegion": "الرياض",
          "streetAddress": settings.address || "المملكة العربية السعودية"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "24.7136",
          "longitude": "46.6753"
        },
        "areaServed": [
          { "@type": "City", "name": "الرياض" },
          { "@type": "Country", "name": "Saudi Arabia" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `خدمات ${siteName}`,
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "تركيب شبوك المزارع والأراضي الكبرى",
                "description": "تسوير متكامل للمزارع والمخططات بأعمدة مجلفنة وقواعد خرسانية مسلحة."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "الشبوك الأمنية والشائكة للمنشآت والمواقع",
                "description": "تركيب سياج أمني وأسلاك شائكة كونسرتينا لحماية المستودعات والمصانع."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "توريد وغرس نخيل التمور العربي الأصيل",
                "description": "توريد سلالات خلاص وسكري وبرحي ومجدول مفحوصة بيئياً مع ضمان نجاح الغرس."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "نخيل الزينة والواشنطونيا للقصور والمشاريع",
                "description": "تنسيق وغرس نخيل واشنطونيا أمريكي للفلل والقصور والمداخل الفارهة."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "قلع ونقل وغرس النخيل الكبير بالمعدات الثقيلة",
                "description": "رافعات وأوناش هيدروليكية لنقل وقلع النخيل العملاق بنسب نجاح قياسية."
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": siteName,
        "inLanguage": "ar-SA",
        "publisher": { "@id": `${siteUrl}/#organization` }
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "ما هي أنواع الشبوك المتوفرة للتركيب لديكم؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "نوفر شبوك تسوير المزارع والأراضي الكبرى، الشبوك الأمنية والشائكة للمنشآت والكسارات، شبوك المحميات والمرابط، بالإضافة إلى تصنيع البوابات الحديدية السحب والمفصلية، بحديد مجلفن غمس ساخن مقاوم للصدأ."
            }
          },
          {
            "@type": "Question",
            "name": "ما هي أنواع النخيل التي تقومون بتوريدها وزراعتها؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "نقوم بتوريد وزراعة أجود سلالات نخيل التمور (خلاص، سكري، برحي، مجدول، عجوة، صقعي)، بالإضافة إلى نخيل الزينة والواشنطونيا للقصور والفلل والمنتجعات مع ضمان نجاح الغرس وخلوه التام من الآفات."
            }
          },
          {
            "@type": "Question",
            "name": "هل توفرون خدمة نقل وقلع النخيل الكبير والمعمر؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "نعم، نمتلك أسطول رافعات وأوناش هيدروليكية متخصصة لقلع ونقل وغرس النخيل الكبير من موقع لآخر مع حماية تامة للجذور والجمارة بنسبة نجاح غرس تتجاوز 98%."
            }
          },
          {
            "@type": "Question",
            "name": "هل تنفذون أعمال تسوير الأراضي في مختلف مناطق المملكة؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "نعم، ننفذ مشاريع الشبوك وتسوير المزارع وتوريد النخيل في مدينة الرياض وكافة مناطق ومدن المملكة العربية السعودية."
            }
          },
          {
            "@type": "Question",
            "name": "كيف يمكنني طلب معاينة ميدانية أو عرض سعر؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "يمكنكم التواصل معنا مباشرة عبر الاتصال الهاتفي أو محادثة الواتساب لتحديد موعد المعاينة والرفع المساحي للموقع وتقديم عرض سعر فوري ومفصل."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
        {/* Google Ads Tag (gtag.js) */}
        {googleAdsId && <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`} />}
        {googleAdsId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${googleAdsId}');`,
            }}
          />
        )}
      </head>
      <body className={arabicFont.className}>
        {children}
        <FloatingActions phone={phone} whatsapp={settings.whatsapp} />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
