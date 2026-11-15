import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, Images } from "lucide-react";
import SiteNavbar from "../../components/layout/SiteNavbar";
import Footer from "../../components/layout/Footer";
import { categories, BRAND_NAME } from "../../lib/brand";
import type { Metadata } from "next";
import { getPublicSiteSettings } from "../../lib/site-settings";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://nakheel-seyaj.com";
  const siteName = settings.siteName || BRAND_NAME;
  return { 
    title: `معرض صور مشاريع الشبوك ومزارع النخيل والثيل | ${siteName}`, 
    description: `استعرض صور أعمالنا ومشاريعنا المنجزة على أرض الواقع: تركيب شبوك المزارع والمواقع الأمنية، وتوريد وزراعة وتنسيق نخيل التمور والواشنطونيا، وتوريد وتركيب الثيل في مختلف مناطق المملكة.`,
    alternates: {
      canonical: `${siteUrl}/gallery`,
    },
    openGraph: {
      title: `معرض صور مشاريع الشبوك ومزارع النخيل والثيل | ${siteName}`,
      description: `شاهد صور حية من مشاريع تركيب الشبوك وتوريد وغرس النخيل وتركيب الثيل في السعودية.`,
      url: `${siteUrl}/gallery`,
    }
  };
}

export default async function GalleryPage() {
  const settings = await getPublicSiteSettings();
  const pageCategories = categories.map((category) => {
    if (category.slug === "fences") {
      return { ...category, title: settings.fencesTitle || category.title, eyebrow: settings.fencesEyebrow || category.eyebrow, description: settings.fencesDescription || category.description, image: settings.categoryHomeImageUrls?.fences || category.image, imageAlt: settings.fencesImageAlt || category.imageAlt };
    } else if (category.slug === "palms") {
      return { ...category, title: settings.palmsTitle || category.title, eyebrow: settings.palmsEyebrow || category.eyebrow, description: settings.palmsDescription || category.description, image: settings.categoryHomeImageUrls?.palms || category.image, imageAlt: settings.palmsImageAlt || category.imageAlt };
    } else {
      return { ...category, title: settings.theelTitle || category.title, eyebrow: settings.theelEyebrow || category.eyebrow, description: settings.theelDescription || category.description, image: settings.categoryHomeImageUrls?.theel || category.image, imageAlt: settings.theelImageAlt || category.imageAlt };
    }
  });
  return (
    <div className="min-h-screen bg-[#f7f9f6] text-[#0d231b]" dir="rtl">
      <SiteNavbar />
      <main className="mx-auto max-w-[1400px] px-5 pb-20 pt-32 sm:px-9 sm:pt-40 lg:px-14">
        <section className="mb-9 grid gap-5 rounded-[2rem] bg-[#eaf1df] p-6 sm:mb-12 sm:grid-cols-[1fr_0.65fr] sm:items-end sm:p-10">
          <div><span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-black text-[#688747]"><Images size={14} /> {settings.galleryLabel || "معرض الأعمال"}</span><h1 className="mt-4 text-4xl font-black sm:text-6xl">{settings.galleryTitle || "أفكار من أرض الواقع."}</h1></div>
          <p className="max-w-lg text-sm leading-7 text-[#68776b] sm:text-base">{settings.galleryDescription || "تصفح الأعمال حسب المجال، وشاهد الصور المضافة لكل قسم."}</p>
        </section>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pageCategories.map((category, index) => <Link key={category.slug} href={`/projects/${category.slug}`} className="group relative isolate block min-h-[360px] overflow-hidden rounded-[1.75rem] bg-[#dce4d2] sm:min-h-[500px] sm:rounded-[2rem]">
            <Image src={category.image} alt={category.imageAlt} fill unoptimized sizes="(max-width: 1024px) 100vw, 33vw" className="-z-20 object-cover transition duration-700 group-hover:scale-[1.04]" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#10261e]/80 via-[#10261e]/5 to-transparent" />
            <span className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/20 px-4 py-2 text-xs font-bold text-white backdrop-blur"><span className="text-[#d2bb83]">0{index + 1}</span>{category.eyebrow}</span>
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white sm:inset-x-8 sm:bottom-8"><span><span className="block text-xs font-bold text-white/80">{settings.galleryCardActionLabel || "استعرض المجال"}</span><span className="mt-1 block text-3xl font-black sm:text-4xl">{category.title}</span><span className="mt-2 block max-w-md text-sm leading-6 text-white/90">{category.description}</span></span><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d2bb83] text-[#173a31] transition group-hover:-translate-x-1"><ArrowLeft size={18} /></span></div>
          </Link>)}
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl border border-[#e6ece2] bg-white p-5 sm:flex-row sm:items-center sm:px-7"><p className="text-sm font-bold text-[#58695e]">{settings.galleryContactPrompt || "تبحث عن حل لموقعك؟"}</p><Link href="/contact" className="inline-flex items-center gap-2 text-sm font-black text-[#55733c]">{settings.navQuoteLabel || "تواصل معنا"} <ArrowUpLeft size={15} /></Link></div>
      </main>
      <Footer />
    </div>
  );
}
