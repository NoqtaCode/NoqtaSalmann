import Link from "next/link";
import Image from "next/image";
import { ArrowUpLeft, Code2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { categories, BRAND_NAME } from "../../lib/brand";
import { getPublicSiteSettings } from "../../lib/site-settings";

export default async function Footer() {
  const settings = await getPublicSiteSettings();
  const siteName = settings.siteName || BRAND_NAME;
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
    <footer className="bg-[#0e271f] text-white" dir="rtl">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-12 sm:px-9 sm:py-16 md:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_1fr] lg:px-14">
        <div className="max-w-md">
          <Link href="/" className="mb-5 inline-flex items-center gap-3 group" aria-label={siteName}>
            {settings.logoImageUrl ? (
              <div className="relative h-12 w-32 sm:h-14 sm:w-40 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={settings.logoImageUrl}
                  alt={`شعار ${siteName}`}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 130px, 160px"
                  className="object-contain object-right drop-shadow-md"
                />
              </div>
            ) : (
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#dca842] text-[#0d231b]">
                <span className="text-lg font-black">ش</span>
              </span>
            )}
            <span className="text-lg sm:text-xl font-black">{siteName}</span>
          </Link>
          <p className="max-w-sm text-sm leading-7 text-white/75">{settings.footerDescription || "حلول متخصصة في تركيب الشبوك وتوريد وزراعة النخيل وتركيب الثيل، من التخطيط للموقع حتى اكتمال التنفيذ."}</p>
          <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#dca842] hover:text-white transition">{settings.footerCtaLabel || "ابدأ الحديث عن مشروعك"} <ArrowUpLeft size={16} /></Link>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-black text-white/55">روابط سريعة</h2>
          <ul className="space-y-3 text-sm font-bold text-white/75">
            <li><Link href="/services" className="transition hover:text-[#dca842]">خدماتنا المتخصصة</Link></li>
            <li><Link href="/about" className="transition hover:text-[#dca842]">من نحن</Link></li>
            <li><Link href="/gallery" className="transition hover:text-[#dca842]">معرض الأعمال</Link></li>
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/projects/${category.slug}`} className="transition hover:text-[#dca842]">
                  {category.slug === "fences" ? settings.fencesTitle || category.title : category.slug === "palms" ? settings.palmsTitle || category.title : settings.theelTitle || category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-black text-white/55">{settings.footerContactLabel || "تواصل معنا"}</h2>
          <div className="flex flex-col gap-2.5">
            <a 
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent("السلام عليكم ورحمة الله، أود الاستفسار عن خدماتكم")}`} 
              target="_blank" 
              rel="noreferrer" 
              className="group inline-flex items-center justify-between gap-3 rounded-xl bg-[#25D366] px-4 py-3 text-xs font-black text-white shadow-sm transition-all duration-300 hover:brightness-110 hover:shadow-[0_4px_16px_rgba(37,211,102,0.35)] active:scale-95"
            >
              <span className="flex items-center gap-2.5">
                <MessageCircle size={17} />
                <span>{settings.contactWhatsAppLabel || "تواصل عبر واتساب"}</span>
              </span>
              <ArrowUpLeft size={14} className="transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a 
              href={`tel:${phoneLink}`} 
              className="group inline-flex items-center justify-between gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-black text-white backdrop-blur-sm transition-all duration-300 hover:border-[#dca842] hover:bg-white/15 hover:text-[#dca842] active:scale-95"
            >
              <span className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#dca842]" />
                <span>{settings.contactPhoneLabel || "اتصال هاتفي مباشر"}</span>
              </span>
              <ArrowUpLeft size={14} className="transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {contact.email && (
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 text-xs font-bold text-white/70 hover:text-[#dca842] transition pt-1">
                <Mail size={14} /> {contact.email}
              </a>
            )}
            {contact.address && (
              <div className="inline-flex items-center gap-2 text-xs font-bold text-white/70 pt-1">
                <MapPin size={14} /> {contact.address}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 sm:px-9 lg:px-14 pb-28 sm:pb-6">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 text-xs text-white/65 sm:flex-row">
          <span>© {new Date().getFullYear()} {siteName}. جميع الحقوق محفوظة.</span>
          <span className="hidden md:inline-block">{settings.footerTagline || "شبوك ونخيل وثيل — عناية تبدأ من الأرض."}</span>
          
          {/* شارة تصميم وتطوير NoqtaCode مع الرقم ورابط مباشر للواتساب */}
          <a
            href="https://wa.me/967737543563"
            target="_blank"
            rel="noreferrer"
            aria-label="تواصل مع NoqtaCode عبر واتساب 967737543563"
            className="group inline-flex items-center gap-2 rounded-full bg-black/40 border border-white/15 px-3.5 py-1.5 shadow-inner transition-all duration-300 hover:border-[#10b981]/60 hover:bg-black/60 hover:scale-105"
          >
            <span className="text-[#10b981] font-bold text-xs">تطوير وتصميم</span>
            <span className="inline-flex items-center gap-1 font-bold text-xs" dir="ltr">
              <span className="font-mono font-black text-[#f97316] text-xs tracking-tight">&lt;/&gt;</span>
              <span className="text-white">Noqta</span>
              <span className="text-[#f97316]">Code</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
