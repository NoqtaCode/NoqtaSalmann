import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Fence, Sprout, Leaf } from "lucide-react";
import SiteNavbar from "../../components/layout/SiteNavbar";
import Footer from "../../components/layout/Footer";
import { categories, BRAND_NAME } from "../../lib/brand";
import { getPublicSiteSettings, getSiteName } from "../../lib/site-settings";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const [siteName, settings] = await Promise.all([getSiteName(), getPublicSiteSettings()]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://nakheel-seyaj.com";
  return { 
    title: `من نحن | ${siteName} لتسوير الأراضي وتوريد النخيل والثيل في السعودية`, 
    description: settings.aboutDescription || `تعرّف على ${siteName}، خبرة رائدة في تنفيذ شبوك المزارع، تسوير الأراضي، وتوريد وغرس النخيل وتركيب الثيل وتنسيق المسطحات في المملكة العربية السعودية.`,
    alternates: {
      canonical: `${siteUrl}/about`,
    },
    openGraph: {
      title: `من نحن | ${siteName} لتسوير الأراضي وتوريد النخيل والثيل`,
      description: `تعرّف على مسيرتنا في حماية الأراضي وتجهيز المزارع وتوريد النخيل والثيل في المملكة العربية السعودية.`,
      url: `${siteUrl}/about`,
    }
  };
}

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const settings = await getPublicSiteSettings();
  const siteName = settings.siteName || BRAND_NAME;
  const aboutHighlights = (settings.aboutHighlights || "حل يناسب طبيعة الموقع\nخطوات واضحة\nاهتمام بالتفاصيل\nتواصل مباشر").split("\n").filter(Boolean);
  const aboutSteps = [
    [settings.aboutStep1Title || "نفهم الموقع", settings.aboutStep1Description || "نسمع احتياجك ونتعرف على طبيعة الأرض."],
    [settings.aboutStep2Title || "نرتب الحل", settings.aboutStep2Description || "نوضح الخيارات وتفاصيل كل خطوة."],
    [settings.aboutStep3Title || "نتابع التنفيذ", settings.aboutStep3Description || "نبقى على تواصل حتى يكتمل العمل."],
  ];
  const pageCategories = categories.map((category) => {
    if (category.slug === "fences") {
      return { ...category, title: settings.fencesTitle || category.title, eyebrow: settings.fencesEyebrow || category.eyebrow, image: settings.categoryHomeImageUrls?.fences || category.image, imageAlt: settings.fencesImageAlt || category.imageAlt };
    } else if (category.slug === "palms") {
      return { ...category, title: settings.palmsTitle || category.title, eyebrow: settings.palmsEyebrow || category.eyebrow, image: settings.categoryHomeImageUrls?.palms || category.image, imageAlt: settings.palmsImageAlt || category.imageAlt };
    } else {
      return { ...category, title: settings.theelTitle || category.title, eyebrow: settings.theelEyebrow || category.eyebrow, image: settings.categoryHomeImageUrls?.theel || category.image, imageAlt: settings.theelImageAlt || category.imageAlt };
    }
  });
  return (
    <div className="min-h-screen bg-[#f3f5ef] text-[#173a31]" dir="rtl">
      <SiteNavbar />
      <main className="mx-auto max-w-[1400px] px-5 pb-20 pt-32 sm:px-9 sm:pt-40 lg:px-14">
        <section className="grid overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(32,62,42,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
            <span className="inline-flex w-fit rounded-full bg-[#eff4e5] px-4 py-2 text-xs font-black text-[#688747]">{settings.aboutLabel || "من نحن"}</span>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">{settings.aboutTitle || "نرتب المكان،"}<br /><span className="text-[#6b9345]">{settings.aboutSubTitle || "ونعتني بتفاصيله."}</span></h1>
            <p className="mt-5 whitespace-pre-line text-sm leading-8 text-[#68776b] sm:text-base">{settings.aboutDescription || `${siteName} يركز على حلول متكاملة تخدم أرضك: الشبوك لتنظيم المساحة وحمايتها، والنخيل والثيل لإضافة حياة وخضرة وتنسيق راقٍ للموقع. نبدأ بفهم احتياجك ونرتب الحل ليناسب أرضك.`}</p>
            <div className="mt-5 grid gap-2 text-xs font-bold text-[#5e705f] sm:grid-cols-2">{aboutHighlights.map((item) => <span key={item} className="flex items-center gap-2"><Check size={14} className="text-[#7da14d]" />{item}</span>)}</div>
            <Link href="/contact" className="mt-7 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[#173a31] px-5 text-sm font-black text-white hover:bg-[#2b5948]">{settings.aboutContactLabel || "تحدث معنا"} <ArrowLeft size={16} /></Link>
          </div>
          <div className="relative min-h-[320px] bg-[#dce4d2] sm:min-h-[460px]">
            <Image src={settings.aboutImageUrl || categories[1].image} alt={settings.aboutImageAlt || categories[1].imageAlt} fill unoptimized priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/70 bg-white/90 p-4 backdrop-blur sm:inset-x-6 sm:bottom-6 sm:p-5"><span><span className="block text-[10px] font-bold text-[#68776b]">{settings.aboutImageKicker || "نهتم بما تحتاجه الأرض"}</span><span className="mt-1 block text-lg font-black text-[#173a31]">{settings.aboutImageTitle || "شبوك ونخيل وثيل"}</span></span><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d2bb83] text-[#173a31]"><Leaf size={20} /></span></div>
          </div>
        </section>

        <section className="mt-12 sm:mt-16"><div className="mb-6 flex items-end justify-between gap-4"><div><span className="text-xs font-black tracking-[0.14em] text-[#75924e]">{settings.aboutStepsLabel || "كيف نعمل"}</span><h2 className="mt-2 text-2xl font-black sm:text-3xl">{settings.aboutStepsTitle || "خطواتنا بسيطة وواضحة."}</h2></div><span className="hidden text-xs font-bold text-[#8a968b] sm:block">{settings.aboutStepsHint || "من أول حديث حتى اكتمال العمل"}</span></div>
          <div className="grid gap-3 sm:grid-cols-3">{aboutSteps.map(([title, description], index) => <article key={title} className="rounded-[1.5rem] border border-[#e5ecdf] bg-white p-5 sm:p-7"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eff4e5] text-xs font-black text-[#688747]">0{index + 1}</span><h3 className="mt-4 text-lg font-black">{title}</h3><p className="mt-2 text-sm leading-7 text-[#7a867b]">{description}</p></article>)}</div>
        </section>

        <section className="mt-12 grid gap-3 sm:grid-cols-3">{pageCategories.map((category) => { const Icon = category.slug === "fences" ? Fence : category.slug === "palms" ? Sprout : Leaf; return <Link key={category.slug} href={`/projects/${category.slug}`} className="group flex items-center gap-4 rounded-[1.5rem] bg-[#eaf1df] p-5 transition hover:bg-[#e1eccf] sm:p-6"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#688747]"><Icon size={21} /></span><span className="min-w-0 flex-1"><span className="block text-[11px] font-bold text-[#859083]">{category.eyebrow}</span><span className="mt-1 block text-xl font-black">{category.title}</span></span><ArrowLeft size={17} className="text-[#688747] transition group-hover:-translate-x-1" /></Link>; })}</section>
      </main>
      <Footer />
    </div>
  );
}
