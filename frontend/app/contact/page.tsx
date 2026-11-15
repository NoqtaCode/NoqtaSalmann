import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import SiteNavbar from "../../components/layout/SiteNavbar";
import Footer from "../../components/layout/Footer";
import { getPublicSiteSettings, getSiteName } from "../../lib/site-settings";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const [siteName, settings] = await Promise.all([getSiteName(), getPublicSiteSettings()]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://nakheel-seyaj.com";
  return { 
    title: `اتصل بنا | طلب عرض سعر تركيب شبوك وتوريد نخيل وتركيب ثيل | ${siteName}`, 
    description: `تواصل مع ${siteName} لطلب معاينة ميدانية لموقعك وعرض سعر فوري لتسوير المزارع والأراضي بالشبوك المجلفنة أو توريد وزراعة النخيل أو تركيب وتوريد الثيل في السعودية.`,
    alternates: {
      canonical: `${siteUrl}/contact`,
    },
    openGraph: {
      title: `اتصل بنا | طلب عرض سعر تركيب شبوك وتوريد نخيل وتركيب ثيل | ${siteName}`,
      description: `تواصل فوري عبر الواتساب والاتصال الهاتفي لمعاينة الموقع وطلب عروض الأسعار.`,
      url: `${siteUrl}/contact`,
    }
  };
}

export default async function ContactPage() {
  const [siteName, settings] = await Promise.all([getSiteName(), getPublicSiteSettings()]);
  const contact = settings;
  const phone = contact.phone || "0502237446";
  const phoneLink = phone.replace(/[^\d+]/g, "");
  const rawWhatsapp = (contact.whatsapp || phone || "0502237446").replace(/\D/g, "");
  const waNumber = rawWhatsapp.startsWith("05")
    ? `966${rawWhatsapp.slice(1)}`
    : rawWhatsapp.startsWith("5")
    ? `966${rawWhatsapp}`
    : rawWhatsapp;

  return (
    <div className="min-h-screen bg-[#f7f9f6] text-[#0d231b]" dir="rtl">
      <SiteNavbar />
      <main className="mx-auto max-w-[1400px] px-5 pb-20 pt-32 sm:px-9 sm:pt-40 lg:px-14">
        <section className="grid gap-7 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-14">
          <div className="py-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf1df] px-4 py-2 text-xs font-black text-[#688747]">
              {settings.contactLabel || "تواصل معنا"} <span className="h-1.5 w-1.5 rounded-full bg-[#8cb052]" />
            </span>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl text-[#0d231b]">
              {settings.contactTitle || "كل مشروع يبدأ بحديث بسيط."}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-8 text-[#58695e] sm:text-base">
              {settings.contactDescription || "أخبرنا عن أرضك واحتياجك من الشبوك أو النخيل أو الثيل، ونرتب معك أفضل بداية بالمعاينة وعرض السعر المناسب."}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/projects/fences" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold shadow-sm ring-1 ring-[#e5ece1] hover:ring-[#dca842] transition">
                {settings.contactFencesLabel || settings.fencesTitle || "معرض الشبوك"} <ArrowLeft size={14} />
              </Link>
              <Link href="/projects/palms" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold shadow-sm ring-1 ring-[#e5ece1] hover:ring-[#dca842] transition">
                {settings.contactPalmsLabel || settings.palmsTitle || "معرض النخيل"} <ArrowLeft size={14} />
              </Link>
              <Link href="/projects/theel" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold shadow-sm ring-1 ring-[#e5ece1] hover:ring-[#dca842] transition">
                {settings.theelTitle || "معرض الثيل"} <ArrowLeft size={14} />
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0d231b] p-6 text-white shadow-[0_25px_70px_rgba(13,35,27,0.25)] sm:p-9 border border-white/10">
            <div className="absolute -left-10 -top-16 h-48 w-48 rounded-full bg-[#dca842]/15 blur-2xl" />
            <div className="relative">
              <span className="text-xs font-bold text-[#dca842]">{siteName}</span>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl text-white">
                {settings.contactPanelTitle || "نحن جاهزون لسماع فكرتك."}
              </h2>
              <p className="mt-2.5 text-sm leading-7 text-white/80">
                {settings.contactPanelDescription || "تواصل معنا مباشرة عبر القناة الأنسب لك لتحديد موعد المعاينة أو طلب عرض السعر:"}
              </p>
            </div>

            {/* بطاقات الواتساب والاتصال الفاخرة بدون إظهار الأرقام كنص خام */}
            <div className="relative mt-8 flex flex-col gap-3.5">
              {/* كارت محادثة الواتساب الفاخر */}
              <a 
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent("السلام عليكم ورحمة الله، أود الاستفسار عن خدمات الشبوك والنخيل والثيل")}`}
                target="_blank" 
                rel="noreferrer" 
                className="group relative flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-[#25D366] to-[#1ebe5d] p-5 text-white shadow-[0_12px_30px_rgba(37,211,102,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(37,211,102,0.45)] active:scale-98"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-md shadow-inner transition group-hover:scale-110">
                    <MessageCircle size={26} />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black">محادثة واتساب سريعة</h3>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-bold text-white">
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> متاح الآن
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-white/90 font-medium">
                      استفسار فوري وتحديد موعد المعاينة وعروض الأسعار
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition group-hover:bg-white group-hover:text-[#25D366]">
                  <ArrowUpLeft size={18} />
                </span>
              </a>

              {/* كارت الاتصال الهاتفي المباشر الفاخر */}
              <a 
                href={`tel:${phoneLink}`}
                className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-[#dca842]/40 bg-gradient-to-r from-[#0d231b] via-[#143529] to-[#0d231b] p-5 text-white shadow-[0_12px_30px_rgba(13,35,27,0.3)] transition-all duration-300 hover:-translate-y-1 hover:border-[#dca842] hover:shadow-[0_16px_36px_rgba(220,168,66,0.25)] active:scale-98"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#dca842]/20 text-[#dca842] border border-[#dca842]/30 backdrop-blur-md transition group-hover:scale-110 group-hover:bg-[#dca842] group-hover:text-[#0d231b]">
                    <Phone size={24} />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black">اتصال هاتفي مباشر</h3>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#dca842]/20 text-[#dca842] px-2 py-0.5 text-[10px] font-bold">
                        خدمة العملاء
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-white/75 font-medium">
                      تواصل مباشر لمناقشة أبعاد موقعك والمواصفات
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#dca842] transition group-hover:bg-[#dca842] group-hover:text-[#0d231b]">
                  <ArrowUpLeft size={18} />
                </span>
              </a>

              {/* البريد الإلكتروني والعنوان إن وجدا */}
              {(contact.email || contact.address) && (
                <div className="mt-2 flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs font-bold text-white/80">
                  {contact.email && (
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-3 transition hover:text-[#dca842]">
                      <Mail size={16} className="text-[#dca842]" />
                      <span>{contact.email}</span>
                    </a>
                  )}
                  {contact.address && (
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-[#dca842]" />
                      <span>{contact.address}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-[#dfe7dc] pt-5 text-xs font-bold text-[#879387] sm:flex-row sm:items-center">
          <span>{siteName}</span>
          <Link href="/" className="inline-flex items-center gap-2 hover:text-[#55733c]">
            {settings.navHomeLabel || "العودة للرئيسية"} <ArrowUpLeft size={14} />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
