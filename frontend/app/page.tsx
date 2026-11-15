import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, Check, Fence, Sprout, Leaf, MapPin, SlidersHorizontal, ClipboardCheck, Images } from "lucide-react";
import SiteNavbar from "../components/layout/SiteNavbar";
import Footer from "../components/layout/Footer";
import { BRAND_NAME, categories } from "../lib/brand";
import { safeFetchFresh } from "../lib/sanity";
import { getPublicSiteSettings } from "../lib/site-settings";
import { defaultShowcaseProjects } from "../lib/default-projects";

export const dynamic = "force-dynamic";

function cleanDisplayTitle(title: string | undefined, category: string): string {
  if (!title || title.includes("WhatsApp Image") || title.includes("image-") || title.includes(".jpg") || title.includes(".png") || title.includes(".webp")) {
    if (category === "theel") return "مشروع توريد وتركيب ثيل طبيعي وصناعي";
    if (category === "fences" || category === "shabouk") return "مشروع تركيب وتوريد شبوك ومظلات";
    return "مشروع توريد وزراعة نخيل فاخر";
  }
  return title;
}

export default async function Home() {
  const [settings, projects] = await Promise.all([
      getPublicSiteSettings(),
    safeFetchFresh<{ _id: string; title: string; category: string; slug?: string; imageUrl: string; description?: string }[]>(`
      *[_type in ["project", "gallery"] && (status == "published" || _type == "gallery") && (defined(image.asset->url) || defined(mainImage.asset->url)) && category in ["fences", "palms", "shabouk", "nakheel", "theel"]]
        | order(_createdAt desc)[0...30] {
          _id, 
          "title": coalesce(title, select(category in ["fences", "shabouk"] => "مشروع تركيب وتوريد شبوك", category == "theel" => "مشروع توريد وتركيب ثيل", "مشروع توريد وزراعة نخيل")), 
          category, 
          "slug": coalesce(slug.current, select(category in ["fences", "shabouk"] => "fences", category == "theel" => "theel", "palms")), 
          "imageUrl": coalesce(image.asset->url, mainImage.asset->url), 
          description
        }
    `, []),
  ]);
  const siteSettings = settings ?? {};
  
  // توزيع متوازن لصور أعمالنا (3 شبوك + 3 نخيل + 3 ثيل) لضمان التنوع وعدم اقتصار المعرض على قسم واحد
  const defaultFences = defaultShowcaseProjects.filter(p => p.category === "fences");
  const defaultPalms = defaultShowcaseProjects.filter(p => p.category === "palms");
  const defaultTheel = defaultShowcaseProjects.filter(p => p.category === "theel");

  const sanityFences = (projects || []).filter(p => p.category === "fences" || p.category === "shabouk");
  const sanityPalms = (projects || []).filter(p => p.category === "palms" || p.category === "nakheel");
  const sanityTheel = (projects || []).filter(p => p.category === "theel");

  const pickCategoryItems = (sanityItems: typeof projects, defaultItems: typeof defaultShowcaseProjects, count = 3) => {
    const combined = [...(sanityItems || [])];
    for (const def of defaultItems) {
      if (combined.length >= count) break;
      if (!combined.some(item => item._id === def._id || item.imageUrl === def.imageUrl)) {
        combined.push(def);
      }
    }
    return combined.slice(0, count);
  };

  const selectedFences = pickCategoryItems(sanityFences, defaultFences, 3);
  const selectedPalms = pickCategoryItems(sanityPalms, defaultPalms, 3);
  const selectedTheel = pickCategoryItems(sanityTheel, defaultTheel, 3);

  // دمجها بشكل متناوب (شبوك، نخيل، ثيل) ليظهر المعرض متنوعاً ومنسقاً
  const showcaseList: { _id: string; title: string; category: string; slug?: string; imageUrl: string; description?: string }[] = [];
  for (let i = 0; i < 3; i++) {
    if (selectedFences[i]) showcaseList.push(selectedFences[i]);
    if (selectedPalms[i]) showcaseList.push(selectedPalms[i]);
    if (selectedTheel[i]) showcaseList.push(selectedTheel[i]);
  }
  const siteName = siteSettings.siteName?.trim() || BRAND_NAME;
  const phone = siteSettings.phone?.replace(/[^\d+]/g, "");
  const whatsapp = siteSettings.whatsapp?.replace(/\D/g, "") || siteSettings.phone?.replace(/\D/g, "");
  const pageCategories = categories.map((category) => {
    if (category.slug === "fences") {
      return { ...category, title: siteSettings.fencesTitle?.trim() || category.title, eyebrow: siteSettings.fencesEyebrow?.trim() || category.eyebrow, description: siteSettings.fencesDescription?.trim() || category.description, image: siteSettings.categoryHomeImageUrls?.fences || category.image, imageAlt: siteSettings.fencesImageAlt || category.imageAlt };
    } else if (category.slug === "palms") {
      return { ...category, title: siteSettings.palmsTitle?.trim() || category.title, eyebrow: siteSettings.palmsEyebrow?.trim() || category.eyebrow, description: siteSettings.palmsDescription?.trim() || category.description, image: siteSettings.categoryHomeImageUrls?.palms || category.image, imageAlt: siteSettings.palmsImageAlt || category.imageAlt };
    } else {
      return { ...category, title: siteSettings.theelTitle?.trim() || category.title, eyebrow: siteSettings.theelEyebrow?.trim() || category.eyebrow, description: siteSettings.theelDescription?.trim() || category.description, image: siteSettings.categoryHomeImageUrls?.theel || category.image, imageAlt: siteSettings.theelImageAlt || category.imageAlt };
    }
  });
  const detailsByCategory = {
    fences: { 
      intro: siteSettings.fencesCardDescription || "حلول تسوير هندسية متكاملة للأراضي والمزارع والمنشآت، بأعمدة مجلفنة وقواعد خرسانية مسلحة وسياج أمني وشائك.", 
      tags: (siteSettings.fencesCardTags || "تسوير المزارع الكبرى\nشبوك أمنية وشائكة\nشبوك المحميات والمرابط\nبوابات سحب ومفصلية").split("\n").filter(Boolean) 
    },
    palms: { 
      intro: siteSettings.palmsCardDescription || "توريد وغرس أجود سلالات نخيل التمور ونخيل الواشنطونيا للقصور، مع أحدث معدات النقل وتأسيس شبكات الري الذكية.", 
      tags: (siteSettings.palmsCardTags || "نخيل تمور فاخر (سكري وخلاص)\nواشنطونيا وزينة للقصور\nقلع ونقل بالمعدات الثقيلة\nشبكات ري وتكريب جمالي").split("\n").filter(Boolean) 
    },
    theel: {
      intro: siteSettings.theelCardDescription || "توريد وتركيب الثيل الطبيعي والصناعي لتنسيق الحدائق والمساحات الخضراء في الفلل والمجمعات، مع خدمات الصيانة الدورية.",
      tags: (siteSettings.theelCardTags || "ثيل طبيعي للحدائق\nعشب صناعي للأسطح\nتنسيق حدائق وملاعب\nصيانة وتسميد دوري").split("\n").filter(Boolean)
    },
  };

  const steps = [
    { number: "01", title: siteSettings.benefit1Title || "نفهم احتياجك", description: siteSettings.benefit1Description || "نتعرف على الأرض وما تحتاجه.", Icon: MapPin },
    { number: "02", title: siteSettings.benefit2Title || "نوضح الخيارات", description: siteSettings.benefit2Description || "نقترح ما يلائم مساحة الموقع.", Icon: SlidersHorizontal },
    { number: "03", title: siteSettings.benefit3Title || "نتابع التفاصيل", description: siteSettings.benefit3Description || "نبقى على تواصل خلال التنفيذ.", Icon: ClipboardCheck },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f9f6] text-[#0d231b]" dir="rtl">
      <SiteNavbar overlay />
      <main>
        <section id="home" className="relative isolate flex min-h-[760px] items-center overflow-hidden bg-[#10291f] lg:min-h-[900px]">
          <Image src={siteSettings.heroImageUrl || categories[1].image} alt={siteSettings.heroImageAlt || "صفوف من أشجار النخيل في حقل زراعي"} fill priority unoptimized sizes="100vw" className="-z-20 object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-l from-[#0b2119]/90 via-[#102b20]/65 to-[#102b20]/20" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0b2119]/70 via-transparent to-[#0b2119]/20" />
          <div className="mx-auto w-full max-w-[1440px] px-5 pb-24 pt-40 sm:px-9 sm:pb-28 sm:pt-44 lg:px-14">
            <div className="max-w-[780px]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold text-white/90 shadow-sm backdrop-blur-md"><span className="h-2 w-2 rounded-full bg-[#dca842]" /> {siteSettings.heroBadge || "حلول تبدأ من طبيعة أرضك"}</span>
              <h1 className="mt-7 text-5xl font-bold leading-[1.3] text-white sm:text-6xl lg:text-[5.2rem]">{siteSettings.heroTitle?.trim() || "شبوك ونخيل وثيل،"}<br /><span className="text-[#dca842]">{siteSettings.heroSubTitle?.trim() || "بشكل يليق بأرضك."}</span></h1>
              <p className="mt-6 max-w-xl text-lg leading-9 text-white/90 sm:text-xl sm:leading-10">{siteSettings.heroDescription?.trim() || `${siteName} يجهز المساحات بحلول عملية للشبوك والنخيل والثيل، من اختيار الأنسب للموقع حتى ترتيب التنفيذ.`}</p>
              
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link 
                  href="/gallery" 
                  className="inline-flex min-h-14 items-center gap-3 rounded-full bg-gradient-to-r from-[#dca842] via-[#e5b842] to-[#c99732] px-8 text-sm font-black text-[#0d231b] shadow-[0_10px_28px_rgba(220,168,66,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(220,168,66,0.5)] hover:brightness-105 active:scale-95"
                >
                  {siteSettings.heroGalleryLabel || "استكشف أعمالنا"} <ArrowLeft size={18} />
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex min-h-14 items-center gap-2 rounded-full border border-white/35 bg-white/15 px-7 text-sm font-black text-white shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/25 active:scale-95"
                >
                  {siteSettings.heroContactLabel || "تواصل معنا"} <ArrowUpLeft size={17} />
                </Link>
              </div>

              {/* خطوات ومميزات بطابع بصري راقٍ وواضح */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/15">
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-[#dca842]/50 hover:bg-white/15">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#dca842] to-[#c29131] text-[#0d231b] font-black text-xs shadow-md">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">{siteSettings.heroPerk1 || "معاينة الموقع والاحتياج"}</h4>
                    <p className="text-[11px] text-white/70 font-medium">رفع مساحي وفحص دقيق للأرض</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-[#dca842]/50 hover:bg-white/15">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#dca842] to-[#c29131] text-[#0d231b] font-black text-xs shadow-md">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">{siteSettings.heroPerk2 || "تحديد أفضل الحلول"}</h4>
                    <p className="text-[11px] text-white/70 font-medium">مواصفات هندسية وأسعار شفافة</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-[#dca842]/50 hover:bg-white/15">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#dca842] to-[#c29131] text-[#0d231b] font-black text-xs shadow-md">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">{siteSettings.heroPerk3 || "تنفيذ دقيق وإشراف كامل"}</h4>
                    <p className="text-[11px] text-white/70 font-medium">توريد معتمد وضمان شامل للعمل</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="intro-title" className="relative z-10 -mt-8 rounded-t-[2rem] bg-[#f7f9f6] pt-12 sm:-mt-10 sm:rounded-t-[3rem] sm:pt-16">
          <div className="mx-auto max-w-[1400px] px-5 pb-12 sm:px-9 sm:pb-16 lg:px-14">
            <div className="grid gap-7 border-b border-[#dfe7da] pb-10 md:grid-cols-[1fr_0.9fr] md:items-center md:gap-14 sm:pb-14">
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-[#718d4e]"><span className="h-px w-7 bg-[#9aab7b]" /> {siteSettings.introLabel || `عن ${siteName}`}</span>
                <h2 id="intro-title" className="mt-4 max-w-[620px] text-4xl font-bold leading-[1.4] sm:text-[2.75rem] lg:text-[3.1rem]">{siteSettings.introTitle?.trim() || "نرتّب حدود أرضك، ونضيف لها حياة."}</h2>
              </div>
              <div>
                <p className="max-w-[620px] text-base leading-8 text-[#58695e] sm:text-lg sm:leading-9">{siteSettings.introDescription || "لكل أرض احتياجها؛ نساعدك على تجهيز المساحة بحلول الشبوك والنخيل والثيل، باختيارات عملية تراعي طبيعة الموقع وتسهّل عليك ترتيب الخطوة القادمة."}</p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#e1e8db] bg-white px-3.5 py-2 text-[13px] font-bold text-[#52644f]"><Fence size={16} className="text-[#718d4e]" /> {siteSettings.introFenceLabel || "تنظيم وحماية المساحة"}</span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#e1e8db] bg-white px-3.5 py-2 text-[13px] font-bold text-[#52644f]"><Sprout size={16} className="text-[#718d4e]" /> {siteSettings.introPalmLabel || "تنسيق يليق بالمكان"}</span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#e1e8db] bg-white px-3.5 py-2 text-[13px] font-bold text-[#52644f]"><Leaf size={16} className="text-[#718d4e]" /> {siteSettings.introTheelLabel || "مسطحات خضراء وثيل"}</span>
                </div>
                <Link href="/about" className="mt-5 inline-flex items-center gap-2 text-base font-bold text-[#0d231b] transition hover:text-[#718d4e]">{siteSettings.introLinkLabel || "تعرّف علينا"} <ArrowLeft size={16} /></Link>
              </div>
            </div>
          </div>
        </section>

        <section id="fields" className="scroll-mt-28 bg-[#f7f9f6] pb-16 pt-2 sm:pb-24 sm:pt-3">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-9 lg:px-14">
            <div className="mb-7 flex flex-col justify-between gap-5 rounded-[1.75rem] border border-[#e2e9de] bg-[#fbfcf8] p-5 shadow-[0_12px_32px_rgba(31,57,42,0.04)] sm:mb-9 sm:flex-row sm:items-center sm:p-8">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf1df] px-3.5 py-1.5 text-[11px] font-black text-[#688747]"><span className="h-1.5 w-1.5 rounded-full bg-[#88a957]" /> {siteSettings.fieldsLabel || "مجالاتنا"}</span>
                <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">{siteSettings.fieldsTitle || "ثلاثة حلول أساسية، بتفاصيل تصنع الفرق."}</h2>
              </div>
              <div className="flex items-center gap-4 sm:max-w-[430px]"><div className="hidden shrink-0 items-center -space-x-2 sm:flex"><span className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#fbfcf8] bg-[#eaf1df] text-[#668747]"><Fence size={19} /></span><span className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#fbfcf8] bg-[#e4edda] text-[#668747]"><Sprout size={19} /></span><span className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#fbfcf8] bg-[#d8edda] text-[#668747]"><Leaf size={19} /></span></div><p className="text-sm leading-7 text-[#68776b] sm:text-base">{siteSettings.fieldsDescription || "خدمات مركزة تساعدك على تنظيم الأرض والاستفادة من مساحتها بطريقة أجمل."}</p></div>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {pageCategories.map((category, index) => {
                const details = detailsByCategory[category.slug as keyof typeof detailsByCategory];
                const Icon = category.slug === "fences" ? Fence : category.slug === "palms" ? Sprout : Leaf;
                const image = category.image;
                return (
                  <article key={category.slug} className="group overflow-hidden rounded-[1.75rem] border border-[#e9eee5] bg-[#f8faf6] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(34,62,43,0.12)] sm:rounded-[2rem]">
                    <Link href={`/projects/${category.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-[#dce4d2]">
                      <Image src={image} alt={category.imageAlt} fill unoptimized sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#10261e]/55 via-transparent to-transparent" />
                      <span className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/20 px-4 py-2 text-xs font-bold text-white backdrop-blur">0{index + 1} / {category.eyebrow}</span>
                      <span className="absolute bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#173a31] transition group-hover:bg-[#d2bb83]"><ArrowUpLeft size={18} /></span>
                    </Link>
                    <div className="p-5 sm:p-7">
                      <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eaf1df] text-[#658b3c]"><Icon size={21} /></span><div><h3 className="text-xl font-black sm:text-2xl">{category.title}</h3><span className="mt-0.5 block text-[11px] font-bold text-[#879387]">{category.eyebrow}</span></div></div>
                      <p className="mt-4 text-sm leading-7 text-[#68776b]">{details?.intro}</p>
                      <div className="mt-5 flex flex-wrap gap-2">{details?.tags.map((tag) => <span key={tag} className="rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-[#68776b]">{tag}</span>)}</div>
                      <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-[#edf2e8]">
                        <Link href={`/services#${category.slug === 'theel' ? 'theel-section' : category.slug === 'fences' ? 'fences-section' : 'palms-section'}`} className="inline-flex items-center gap-1.5 text-sm font-black text-[#173a31] transition hover:text-[#5c8037]">
                          تفاصيل الخدمة <ArrowLeft size={15} />
                        </Link>
                        <Link href={`/projects/${category.slug}`} className="text-xs font-bold text-[#74876b] transition hover:text-[#173a31]">
                          معرض الصور <ArrowUpLeft size={13} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-14 sm:px-9 sm:py-20 lg:px-14">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end sm:gap-8">
            <div><span className="inline-flex rounded-full bg-[#eaf1df] px-3.5 py-1.5 text-[11px] font-black text-[#688747]">{siteSettings.benefitsLabel || "ليش تبدأ معنا؟"}</span><h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">{siteSettings.benefitsTitle || "وضوح من أول خطوة، وعناية بكل تفصيل."}</h2></div>
            <p className="max-w-lg text-sm leading-7 text-[#68776b] sm:text-base">{siteSettings.benefitsDescription || "نبدأ بفهم الموقع، ونرتب لك الخيارات المناسبة للشبوك أو النخيل أو الثيل، ثم نتابع تفاصيل التنفيذ معك."}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map(({ number, title, description, Icon }, index) => <article key={number} className={`group relative min-h-[230px] overflow-hidden rounded-[1.6rem] border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(24,55,47,0.12)] sm:p-7 ${index === 1 ? "border-[#173a31] bg-[#173a31] text-white" : "border-[#e2e8de] bg-[#fbfcf8] text-[#173a31]"}`}>
              <div className="flex items-start justify-between">
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${index === 1 ? "bg-white/10 text-[#d2bb83]" : "bg-[#eaf1df] text-[#688747]"}`}><Icon size={21} strokeWidth={1.8} /></span>
                <span className={`text-sm font-black tracking-widest ${index === 1 ? "text-[#d2bb83]" : "text-[#879776]"}`}>{number}</span>
              </div>
              <h3 className="mt-7 text-lg font-black">{title}</h3>
              <p className={`mt-2 text-sm leading-7 ${index === 1 ? "text-white/65" : "text-[#748074]"}`}>{description}</p>
              <span className={`absolute inset-x-6 bottom-0 h-1 rounded-t-full transition-all duration-300 group-hover:inset-x-0 ${index === 1 ? "bg-[#d2bb83]" : "bg-[#dfe8d7] group-hover:bg-[#91a66d]"}`} />
            </article>)}
          </div>
        </section>

        <section id="works" className="mx-auto max-w-[1400px] px-5 pb-16 sm:px-9 sm:pb-24 lg:px-14">
          {/* ترويسة قسم أعمالنا وأزرار الانتقال المباشر */}
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end border-b border-[#e2e9de] pb-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf1df] px-3.5 py-1.5 text-xs font-black text-[#688747]">
                <Images size={14} /> {siteSettings.projectsLabel || "من أعمالنا الميدانية"}
              </span>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-[2.6rem] text-[#0d231b]">
                {siteSettings.projectsTitle || "صور من مشاريع الشبوك والنخيل والثيل"}
              </h2>
              <p className="mt-2 text-sm text-[#58695e] sm:text-base">
                نماذج من تنفيذنا الميداني في تسوير المزارع وتوريد النخيل وتركيب الثيل، اختر القسم لتصفح ألبومات الصور الكاملة:
              </p>
            </div>

            {/* أزرار سريعة للانتقال المباشر إلى الأقسام */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Link 
                href="/projects/fences" 
                className="inline-flex items-center gap-2 rounded-full border border-[#cbd8c5] bg-white px-5 py-2.5 text-xs font-black text-[#0d231b] shadow-sm transition hover:border-[#0d231b] hover:bg-[#0d231b] hover:text-white"
              >
                <Fence size={15} className="text-[#688747]" />
                تصفح صور الشبوك
              </Link>
              <Link 
                href="/projects/palms" 
                className="inline-flex items-center gap-2 rounded-full border border-[#cbd8c5] bg-white px-5 py-2.5 text-xs font-black text-[#0d231b] shadow-sm transition hover:border-[#0d231b] hover:bg-[#0d231b] hover:text-white"
              >
                <Sprout size={15} className="text-[#688747]" />
                تصفح صور النخيل
              </Link>
              <Link 
                href="/projects/theel" 
                className="inline-flex items-center gap-2 rounded-full border border-[#cbd8c5] bg-white px-5 py-2.5 text-xs font-black text-[#0d231b] shadow-sm transition hover:border-[#0d231b] hover:bg-[#0d231b] hover:text-white"
              >
                <Leaf size={15} className="text-[#688747]" />
                تصفح صور الثيل
              </Link>
            </div>
          </div>

          {/* شبكة صور المشاريع المتنوعة */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {showcaseList.map((project) => {
              const isFence = project.category === "fences" || project.category === "shabouk";
              const isTheel = project.category === "theel";
              const targetUrl = `/projects/${isFence ? "fences" : isTheel ? "theel" : "palms"}`;
              const categoryBadge = isFence ? "أعمال الشبوك" : isTheel ? "تركيب الثيل" : "توريد النخيل";
              const Icon = isFence ? Fence : isTheel ? Leaf : Sprout;

              return (
                <div 
                  key={project._id} 
                  className="group relative isolate flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-[#e4ebe0] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(13,35,27,0.1)]"
                >
                  <Link href={targetUrl} className="relative block aspect-[4/3] w-full overflow-hidden bg-[#dce4d2]">
                    <Image 
                      src={project.imageUrl} 
                      alt={cleanDisplayTitle(project.title, project.category)} 
                      fill 
                      unoptimized 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                      className="object-cover transition duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b2119]/80 via-transparent to-transparent" />
                    
                    {/* شارة نوع العمل */}
                    <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/45 px-3.5 py-1.5 text-[11px] font-bold text-white backdrop-blur-md shadow-sm">
                      <Icon size={13} className="text-[#dca842]" />
                      {categoryBadge}
                    </span>

                    <span className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0d231b] shadow-md transition group-hover:bg-[#dca842]">
                      <ArrowUpLeft size={17} />
                    </span>
                  </Link>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-lg font-black text-[#0d231b] group-hover:text-[#3e5f29] transition line-clamp-1">
                        {cleanDisplayTitle(project.title, project.category)}
                      </h3>
                      {project.description && (
                        <p className="mt-2 text-xs leading-6 text-[#68776b] line-clamp-2">
                          {project.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-[#edf2e8] flex items-center justify-between">
                      <Link 
                        href={targetUrl}
                        className="inline-flex items-center gap-1.5 text-xs font-black text-[#3e5f29] transition hover:text-[#0d231b]"
                      >
                        {isFence ? "تصفح ألبوم الشبوك" : isTheel ? "تصفح ألبوم الثيل" : "تصفح ألبوم النخيل"}
                        <ArrowLeft size={13} />
                      </Link>
                      <span className="text-[11px] font-medium text-[#879688]">
                        شاهد مزيداً من الصور
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* بوابات الأقسام الثلاثة */}
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {/* بوابة الشبوك */}
            <div className="relative isolate overflow-hidden rounded-[2rem] border border-[#d6e2cf] bg-gradient-to-br from-white to-[#f4f7f1] p-7 sm:p-9 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3.5">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d231b] text-[#dca842] shadow-sm">
                  <Fence size={24} />
                </span>
                <div>
                  <span className="text-xs font-bold text-[#688747]">قسم متخصص</span>
                  <h3 className="text-2xl font-black text-[#0d231b]">مشاريع وأعمال الشبوك</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#58695e]">
                استكشف كافة صور مشاريع تسوير المزارع الكبرى، الشبوك الأمنية والشائكة، بوابات المزارع، وسياج الأراضي في مختلف مناطق المملكة.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <Link 
                  href="/projects/fences" 
                  className="inline-flex items-center gap-2 rounded-full bg-[#0d231b] px-6 py-3 text-xs font-black text-white transition hover:bg-[#1a4032] shadow-md"
                >
                  استعراض صور الشبوك كاملة <ArrowLeft size={15} />
                </Link>
                <span className="text-xs font-bold text-[#688747]">مواصفات وضمان معتمد</span>
              </div>
            </div>

            {/* بوابة النخيل */}
            <div className="relative isolate overflow-hidden rounded-[2rem] border border-[#d6e2cf] bg-gradient-to-br from-white to-[#f4f7f1] p-7 sm:p-9 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3.5">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d231b] text-[#dca842] shadow-sm">
                  <Sprout size={24} />
                </span>
                <div>
                  <span className="text-xs font-bold text-[#688747]">قسم متخصص</span>
                  <h3 className="text-2xl font-black text-[#0d231b]">مشاريع وتوريد النخيل</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#58695e]">
                استكشف كافة صور توريد وزراعة نخيل الواشنطونيا للقصور، مزارع نخيل التمور (خلاص وسكري)، ونقل وقلع النخيل المعمر بالرافعات.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <Link 
                  href="/projects/palms" 
                  className="inline-flex items-center gap-2 rounded-full bg-[#0d231b] px-6 py-3 text-xs font-black text-white transition hover:bg-[#1a4032] shadow-md"
                >
                  استعراض صور النخيل كاملة <ArrowLeft size={15} />
                </Link>
                <span className="text-xs font-bold text-[#688747]">سلالات مضمونة وخالية من الآفات</span>
              </div>
            </div>

            {/* بوابة الثيل */}
            <div className="relative isolate overflow-hidden rounded-[2rem] border border-[#d6e2cf] bg-gradient-to-br from-white to-[#f4f7f1] p-7 sm:p-9 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3.5">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d231b] text-[#dca842] shadow-sm">
                  <Leaf size={24} />
                </span>
                <div>
                  <span className="text-xs font-bold text-[#688747]">قسم متخصص</span>
                  <h3 className="text-2xl font-black text-[#0d231b]">توريد وتركيب الثيل</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#58695e]">
                استكشف كافة صور مشاريع تركيب الثيل الطبيعي والصناعي للحدائق والفلل والملاعب، مع خدمات التنسيق الكامل للمساحات الخضراء.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <Link 
                  href="/projects/theel" 
                  className="inline-flex items-center gap-2 rounded-full bg-[#0d231b] px-6 py-3 text-xs font-black text-white transition hover:bg-[#1a4032] shadow-md"
                >
                  استعراض صور الثيل كاملة <ArrowLeft size={15} />
                </Link>
                <span className="text-xs font-bold text-[#688747]">ثيل طبيعي وصناعي معتمد</span>
              </div>
            </div>
          </div>
        </section>


        <section className="mx-auto max-w-[1400px] px-5 pb-16 sm:px-9 sm:pb-24 lg:px-14">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#173a31] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-16">
            <div className="absolute -left-12 -top-20 h-64 w-64 rounded-full bg-[#d2bb83]/15 blur-3xl" />
            <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><span className="text-xs font-black tracking-[0.14em] text-[#dca842]">{siteSettings.ctaEyebrow || "خطوتك القادمة"}</span><h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">{siteSettings.ctaTitle || "خلّنا نرتبها معك."}</h2><p className="mt-3 text-sm text-white/80">{siteSettings.ctaDescription || "تحدث معنا عن احتياجك من الشبوك أو النخيل أو الثيل."}</p></div><div className="flex flex-wrap gap-3"><Link href="/contact" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#dca842] to-[#f0c868] px-7 text-sm font-black text-[#0d231b] shadow-md transition hover:brightness-110 active:scale-95">{siteSettings.heroContactLabel || siteSettings.navQuoteLabel || "تواصل معنا"} <ArrowUpLeft size={16} /></Link>{whatsapp && <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/20">{siteSettings.contactWhatsAppLabel || "واتساب"}</a>}{phone && <a href={`tel:${phone}`} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/20">{siteSettings.contactPhoneLabel || "اتصال مباشر"}</a>}</div></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
