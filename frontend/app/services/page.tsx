import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowUpLeft, 
  Check, 
  Fence, 
  Sprout, 
  Leaf,
  ShieldCheck, 
  Truck, 
  Droplets, 
  Sparkles, 
  Layers, 
  PhoneCall, 
  MessageCircle, 
  Award,
  Ruler,
  CheckCircle2,
  CalendarCheck
} from "lucide-react";
import SiteNavbar from "../../components/layout/SiteNavbar";
import Footer from "../../components/layout/Footer";
import { categories, BRAND_NAME } from "../../lib/brand";
import { getPublicSiteSettings, getSiteName } from "../../lib/site-settings";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [siteName, settings] = await Promise.all([getSiteName(), getPublicSiteSettings()]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://nakheel-seyaj.com";
  return { 
    title: `خدمات الشبوك والنخيل وتركيب الثيل | ${siteName}`, 
    description: `استكشف خدمات ${siteName} المتخصصة في تسوير المزارع والأراضي، الشبوك الأمنية، وتوريد وزراعة النخيل، وتوريد وتركيب الثيل الطبيعي والصناعي وتنسيق الحدائق في السعودية.`,
    alternates: {
      canonical: `${siteUrl}/services`,
    },
    openGraph: {
      title: `خدمات الشبوك والنخيل وتركيب الثيل | ${siteName}`,
      description: `حلول تسوير هندسية متكاملة وتوريد وزراعة النخيل وتوريد وتركيب الثيل الطبيعي والصناعي مع ضمان الجودة والإشراف في السعودية.`,
      url: `${siteUrl}/services`,
    }
  };
}

const fencesServices = [
  {
    id: "fences-farms",
    title: "شبوك تسوير المزارع والأراضي الكبرى",
    eyebrow: "حماية حدودية واسعة",
    description: "تسوير هندسي متكامل للمزارع والمخططات والأراضي الشاسعة بمواصفات تتحمل الرياح والحرارة العالية، مع تثبيت خرساني فائق المتانة.",
    features: [
      "أعمدة ومواسير مجلفنة عالية السماكة مقاومة للصدأ",
      "قواعد خرسانية مسلحة ومصبوبة بعمق مدروس",
      "أسلاك شبك بفتحات وسماكات متعددة حسب رغبة العميل",
      "شدادات سفلية وعلوية تمنع الارتخاء مع تقلبات الطقس"
    ],
    badge: "الأكثر طلباً للمزارع"
  },
  {
    id: "fences-security",
    title: "الشبوك الأمنية والشائكة للمنشآت والمواقع",
    eyebrow: "أعلى درجات الحماية",
    description: "حلول حماية أمنية مشددة للمستودعات، الكسارات، المصانع، والمحطات الحيوية، مزودة بأسلاك شائكة حلزونية لمنع التسلل والاقتراب.",
    features: [
      "سياج أمني معزز بارتفاعات مخصصة (2م حتى 3م وأكثر)",
      "تركيب أسلاك شائكة حلزونية (كونسرتينا) ومستقيمة",
      "تأمين شامل للمنشآت والمشاريع الحيوية",
      "مطابقة لأعلى معايير الأمن والسلامة المعتمدة"
    ],
    badge: "حماية قصوى"
  },
  {
    id: "fences-reserves",
    title: "شبوك المحميات والمرابط ومزارع الخيول",
    eyebrow: "أمان متكامل للحيوانات",
    description: "شبوك مخصصة لحماية المرابط والمحميات والحيوانات، مصممة بحواف غير حادة ومصدات آمنة تحمي الخيل والمواشي وتمنع دخول المتطفلين.",
    features: [
      "تصميم آمن يمنع إصابة الخيول والمواشي تماماً",
      "إمكانية دمج سواتر ومصدات الرياح والأتربة",
      "أبواب تقسيم داخلية لتسهيل حركة الحيوانات وإدارتها",
      "متانة تدوم لسنوات طويلة دون صيانة دورية مرهقة"
    ],
    badge: "مخصصة للمرابط"
  },
  {
    id: "fences-gates",
    title: "تصنيع وتركيب البوابات والمداخل الحديدية",
    eyebrow: "مداخل قوية وآمنة",
    description: "تصميم وتنفيذ بوابات سحب (Sliding) وبوابات مفصلية مزدوجة للمعدات الثقيلة والشاحنات، مع تجهيزها لأنظمة الفتح اليدوي أو الذكي.",
    features: [
      "بوابات سحب ومفصلية بمقاسات كبيرة (4م إلى 8م)",
      "دهانات إيبوكسي ومقاومة للعوامل الجوية والصدأ",
      "مفصلات ومزاليج صناعية ثقيلة تتحمل الاستخدام الشاق",
      "جاهزية تامة لربط المحركات والأنظمة الأوتوماتيكية"
    ],
    badge: "تفصيل مخصص"
  }
];

const palmsServices = [
  {
    id: "palms-dates",
    title: "توريد وغرس نخيل التمور العربي الأصيل",
    eyebrow: "سلالات نخيل فاخرة ومثمرة",
    description: "توريد وزراعة أجود أنواع النخيل المثمر من مزارع معتمدة (خلاص، سكري، برحي، مجدول، عجوة، صقعي)، خالية تماماً من الآفات ومفحوصة بيئياً.",
    features: [
      "سلالات نقية وموثوقة بنسب إثمار عالية ومذاق فاخر",
      "توفر مختلف المقاسات والأعمار (فسائل ونخيل بالغ)",
      "شهادات فحص زراعي وخلو تام من سوسة النخيل",
      "ضمان نجاح الغرس وتأسيس الجذور في الموقع"
    ],
    badge: "أجود السلالات"
  },
  {
    id: "palms-ornamental",
    title: "نخيل الزينة والواشنطونيا للقصور والمشاريع",
    eyebrow: "لمسة جمالية فارهة للمكان",
    description: "توريد وغرس نخيل الواشنطونيا ونخيل الزينة الفاخر للقصور، الفلل الحديثة، المنتجعات، والواجهات الفندقية، مع تشذيب احترافي للجذوع.",
    features: [
      "أطوال وأعمار متناسقة تمنح المداخل طابعاً ملوكياً",
      "تحمل فائق لدرجات الحرارة العالية وملوحة التربة",
      "تشذيب وتكريب هندسي أنيق يبرز جمال الجذع",
      "ترتيب وتوزيع متوازن يتناغم مع المخطط المعماري"
    ],
    badge: "للقصور والفلل"
  },
  {
    id: "palms-relocation",
    title: "قلع ونقل وغرس النخيل الكبير بالمعدات الثقيلة",
    eyebrow: "نقل احترافي آمن",
    description: "أسطول متخصص من الرافعات والأوناش لنقل وقلع النخيل العملاق والمعمر من موقع لآخر، مع حماية فائقة للجمارة والمجموع الجذري.",
    features: [
      "رافعات هيدروليكية متطورة ومجهزة لنقل الأشجار الضخمة",
      "تقليم الجذور وتغليفها بمواد حافظة للرطوبة",
      "تثبيت ودك هندسي بعد الغرس يمنع الميلان",
      "نسبة نجاح غرس قياسية تتجاوز 98%"
    ],
    badge: "معدات متخصصة"
  },
  {
    id: "palms-irrigation",
    title: "تأسيس شبكات الري وتنسيق الواحات والتربة",
    eyebrow: "بنية تحتية زراعية حديثة",
    description: "تخطيط جور النخيل وتوريد التربة الخصبة المعقمة، مع تمديد شبكات الري الحديثة بالتنقيط لتوفير استهلاك المياه وضمان نمو سريع وصحي.",
    features: [
      "حفر وتجهيز الجور بأبعاد قياسية وخلطات زراعية مسمدة",
      "شبكات ري أوتوماتيكية ذكية قابلة للتحكم بالمواعيد",
      "توفير كبير في استهلاك المياه ومنع الهدر",
      "تخطيط وتنسيق واحات وممرات بين النخيل"
    ],
    badge: "ري حديث"
  },
  {
    id: "palms-care",
    title: "العناية الدورية والتكريب ومكافحة الآفات",
    eyebrow: "استدامة وصحة النخيل",
    description: "خدمات صيانة دورية تشمل تكريب النخيل بأسلوب تراثي جميل، تنظيف الجمارة، التلقيح (البار)، وبرامج مكافحة متطورة ضد سوسة النخيل.",
    features: [
      "تكريب هندسي يعطي جذع النخلة مظهراً فخماً ومرتباً",
      "مكافحة وقائية وعلاجية دورية بأقوى المبيدات المرخصة",
      "تلقيح موسمي وتعديل العثاكيل لرفع جودة المحصول",
      "فريق عمالة زراعية خبيرة ومتمرسة لعقود"
    ],
    badge: "عناية متكاملة"
  }
];

const theelServices = [
  {
    id: "theel-natural",
    title: "توريد وفرش الثيل الطبيعي (C2000 وبسبالوم)",
    eyebrow: "مسطحات خضراء طبيعية طازجة",
    description: "توريد وزراعة أجود لفائف الثيل الطبيعي المقصوصة حديثاً من المزارع، مع معالجة وتسوية التربة وضمان التجذير والنمو الكثيف.",
    features: [
      "سلالات C2000 وبسبالوم وياباني عالية الكثافة والتحمل",
      "قص طازج ونقل سريع ومباشر في نفس يوم الزراعة",
      "تحمل ممتاز لحرارة الصيف وملوحة مياه الري",
      "ضمان نجاح التثبيت واخضرار المسطح بالكامل"
    ],
    badge: "ثيل طبيعي فاخر"
  },
  {
    id: "theel-artificial",
    title: "تركيب العشب والثيل الصناعي للحدائق والملاعب",
    eyebrow: "خضرة دائمة بدون استهلاك مياه",
    description: "تركيب عشب صناعي فائق النعومة والكثافة بسماكات تبدأ من 25 ملم حتى 50 ملم، مقاوم لأشعة الشمس والحرارة مع نظام تصريف مياه فعال.",
    features: [
      "شعيرات كثيفة ثلاثية الأبعاد تحاكي مظهر وملمس الثيل الطبيعي",
      "مقاومة للأشعة فوق البنفسجية UV تمنع بهتان اللون لسنوات",
      "تصريف ذاتي لمياه الأمطار والغسيل دون أي تجمع أو روائح",
      "آمن للأطفال والحيوانات الأليفة وخالٍ من المواد الضارة"
    ],
    badge: "خضرة تدوم طويلاً"
  },
  {
    id: "theel-irrigation",
    title: "تأسيس شبكات الري الذكية ورشاشات المسطحات",
    eyebrow: "ري أوتوماتيكي متوازن",
    description: "تصميم وتنفيذ شبكات ري متطورة للمسطحات الخضراء برشاشات دوارة وPop-up، متصلة بلوحات تحكم ذكية لتوفير استهلاك المياه.",
    features: [
      "رشاشات مدفونة ترتفع تلقائياً أثناء الري وتختفي بعده",
      "تغطية متجانسة 100% لجميع زوايا المسطح الأخضر",
      "مؤقتات إلكترونية ذكية تضبط مواعيد وكميات الري بدقة",
      "توفير كبير في استهلاك المياه ومنع هدر الفائض"
    ],
    badge: "ري ذكي وموفر"
  },
  {
    id: "theel-playgrounds",
    title: "تجهيز ملاعب كرة القدم ومسارات الاستراحات",
    eyebrow: "ملاعب واستراحات بمواصفات معتمدة",
    description: "تخطيط وتنفيذ ملاعب العشب الصناعي للمدارس والاستراحات والفلل، مع تخطيط الخطوط البيضاء وفرش حبيبات المطاط ورمل السيليكا.",
    features: [
      "عشب ملاعب مخصص يتحمل الاحتكاك الشديد واللعب المتواصل",
      "فرش طبقات الرمل والمطاط لامتصاص الصدمات وحماية اللاعبين",
      "تخطيط هندسي دقيق لخطوط الملعب مطابقة للمقاييس",
      "تسوير ملاعب وتركيب إنارة وشباك حماية متكاملة"
    ],
    badge: "مواصفات رياضية"
  },
  {
    id: "theel-landscaping",
    title: "تنسيق الحدائق وممرات الحجر والصيانة الدورية",
    eyebrow: "تصميم حدائق راقٍ ومتكامل",
    description: "دمج الثيل مع ممرات الحجر الطبيعي وأحواض الزهور والإضاءات الأرضية، مع خدمات القص الدوري والتسميد ومكافحة الحشرات.",
    features: [
      "تصميم ممرات حجرية وفواصل أنيقة بين العشب والزهور",
      "برامج تسميد دوري للمحافظة على اللون الأخضر الزاهي",
      "قص وتهذيب احترافي بارتفاعات مدروسة وموحدة",
      "مكافحة وقائية ضد الفطريات والحشرات الأرضية"
    ],
    badge: "تنسيق متكامل"
  }
];

const guarantees = [
  {
    icon: Award,
    title: "ضمان الجودة والمتانة",
    description: "نلتزم بأعلى المواصفات القياسية، مواد مجلفنة مقاومة للتآكل ونخيل مفحوص بيئياً مع ضمان ثبات ونجاح الغرس."
  },
  {
    icon: Ruler,
    title: "إشراف هندسي وتنفيذي",
    description: "معاينة دقيقة للموقع والرفع المساحي وتحديد نوع الشبك وأبعاد النخيل بما يلائم تضاريس الأرض."
  },
  {
    icon: Truck,
    title: "أسطول معدات متكامل",
    description: "رافعات هيدروليكية، شاحنات نقل مجهزة، ومعدات حفر حديثة تضمن سرعة الإنجاز ودقة التنفيذ دون تأخير."
  },
  {
    icon: CalendarCheck,
    title: "التزام صارم بالمواعيد",
    description: "تسليم الأعمال وفق جدول زمني دقيق وواضح متفق عليه مسبقاً مع العميل من أول يوم."
  }
];

export default async function ServicesPage() {
  const settings = await getPublicSiteSettings();
  const siteName = settings.siteName?.trim() || BRAND_NAME;
  
  const phone = settings.phone?.replace(/[^\d+]/g, "");
  const whatsapp = settings.whatsapp?.replace(/\D/g, "") || phone?.replace(/\D/g, "");

  const fenceCategory = categories.find(c => c.slug === "fences");
  const palmCategory = categories.find(c => c.slug === "palms");
  const theelCategory = categories.find(c => c.slug === "theel");

  const fenceImage = settings.categoryHomeImageUrls?.fences || fenceCategory?.image || "https://images.unsplash.com/photo-1745100671491-ce4e0b638d24?auto=format&fit=crop&w=1600&q=85";
  const palmImage = settings.categoryHomeImageUrls?.palms || palmCategory?.image || "https://images.unsplash.com/photo-1723482490939-528fc0d110fb?auto=format&fit=crop&w=1800&q=85";
  const theelImage = settings.categoryHomeImageUrls?.theel || theelCategory?.image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=85";

  return (
    <div className="min-h-screen bg-[#f3f5ef] text-[#173a31]" dir="rtl">
      <SiteNavbar />

      <main className="mx-auto max-w-[1400px] px-5 pb-24 pt-32 sm:px-9 sm:pt-40 lg:px-14">
        
        {/* ===================== الهيدر الرئيسي الفاخر ===================== */}
        <section className="relative overflow-hidden rounded-[2.5rem] bg-[#10291f] text-white px-6 py-14 sm:px-12 sm:py-20 lg:px-16 shadow-[0_25px_60px_rgba(16,41,31,0.25)]">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#d2bb83]/20 blur-3xl pointer-events-none" />
          <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-[#688747]/20 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-[#d2bb83] backdrop-blur-md">
              <Sparkles size={14} /> خدمات راقية ومتخصصة
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[1.3] sm:text-6xl lg:text-[4rem]">
              حلول متكاملة للشبوك والنخيل والثيل، <br />
              <span className="text-[#d2bb83]">بمعايير ترتقي بأرضك.</span>
            </h1>
            <p className="mt-6 text-base leading-8 text-white/85 sm:text-lg sm:leading-9 font-light">
              نجمع بين الدقة الهندسية في تسوير وحماية الأراضي بأقوى الشبوك، والخبرة الزراعية العريقة في توريد وغرس النخيل الأصيل وتوريد وتركيب الثيل الطبيعي والصناعي وتنسيق الحدائق.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a 
                href="#fences-section"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#d2bb83] px-6 text-sm font-black text-[#173a31] transition hover:bg-white shadow-md hover:-translate-y-0.5"
              >
                <Fence size={18} /> استكشف خدمات الشبوك
              </a>
              <a 
                href="#palms-section"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/20 backdrop-blur-sm hover:-translate-y-0.5"
              >
                <Sprout size={18} /> استكشف خدمات النخيل
              </a>
              <a 
                href="#theel-section"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/20 backdrop-blur-sm hover:-translate-y-0.5"
              >
                <Leaf size={18} /> استكشف خدمات الثيل
              </a>
            </div>
          </div>
        </section>

        {/* ===================== قسم الشبوك بالتفصيل ===================== */}
        <section id="fences-section" className="mt-16 sm:mt-24 scroll-mt-28">
          
          {/* بانر القسم */}
          <div className="relative overflow-hidden rounded-[2.2rem] bg-white p-7 sm:p-12 border border-[#e2e9de] shadow-[0_12px_40px_rgba(23,58,49,0.04)]">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf1df] px-4 py-1.5 text-xs font-black text-[#58793b]">
                  <Fence size={16} /> القسم الأول: الشبوك والتسوير
                </span>
                <h2 className="text-3xl font-black text-[#173a31] sm:text-5xl leading-tight">
                  خدمات الشبوك الفاخرة والأمنية
                </h2>
                <p className="text-sm leading-8 text-[#5c6e61] sm:text-base font-normal">
                  سياجات حديدية مجلفنة ومحمية ضد الصدأ، مصممة خصيصاً لتحديد ملكية الأراضي، وتأمين المنشآت الحيوية، وتسوير المزارع والمرابط بمواصفات متينة تدوم لعشرات السنين.
                </p>
                
                <div className="pt-2 flex flex-wrap gap-3 text-xs font-bold text-[#455749]">
                  <span className="flex items-center gap-1.5 bg-[#f5f8f2] px-3.5 py-2 rounded-xl border border-[#e2ebd9]">
                    <CheckCircle2 size={15} className="text-[#688747]" /> حديد مجلفن غمس ساخن
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#f5f8f2] px-3.5 py-2 rounded-xl border border-[#e2ebd9]">
                    <CheckCircle2 size={15} className="text-[#688747]" /> صب قواعد خرسانية مسلحة
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#f5f8f2] px-3.5 py-2 rounded-xl border border-[#e2ebd9]">
                    <CheckCircle2 size={15} className="text-[#688747]" /> أسلاك شائكة وحلزونية
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#dce4d2] shadow-inner">
                <Image 
                  src={fenceImage} 
                  alt="شبوك مزارع وأراضي" 
                  fill 
                  unoptimized 
                  className="object-cover transition duration-700 hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-4 right-4 text-xs font-black text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg">
                  تنفيذ متقن ومطابق للمخططات
                </span>
              </div>

            </div>
          </div>

          {/* شبكة خدمات الشبوك الفرعية */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {fencesServices.map((service, index) => (
              <article 
                key={service.id} 
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#e2e9de] bg-white p-7 sm:p-9 shadow-[0_10px_30px_rgba(23,58,49,0.03)] transition duration-300 hover:-translate-y-1 hover:border-[#d2bb83] hover:shadow-[0_20px_50px_rgba(23,58,49,0.09)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f3f6ee] px-3 py-1 text-[11px] font-black text-[#5e7747]">
                      {service.eyebrow}
                    </span>
                    <span className="rounded-full bg-[#d2bb83]/20 px-3 py-1 text-[11px] font-black text-[#85703f]">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#173a31] group-hover:text-[#527a33] transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="mt-3 text-sm leading-7 text-[#627265] font-light">
                    {service.description}
                  </p>

                  <div className="mt-6 space-y-2.5 pt-5 border-t border-[#f0f4ed]">
                    <span className="text-xs font-black text-[#173a31] block mb-2">أبرز المواصفات والتفاصيل:</span>
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs leading-6 text-[#526456] font-medium">
                        <Check size={16} className="text-[#688747] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-[#f0f4ed] flex items-center justify-between">
                  {whatsapp ? (
                    <a 
                      href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`السلام عليكم، أود الاستفسار وطلب عرض سعر لخدمة: ${service.title}`)}`}
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#173a31] px-5 py-3 text-xs font-black text-white transition hover:bg-[#2c5b4b]"
                    >
                      <MessageCircle size={15} className="text-[#d2bb83]" /> اطلب عرض سعر بالواتساب
                    </a>
                  ) : (
                    <Link 
                      href={`/contact?service=${service.id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#173a31] px-5 py-3 text-xs font-black text-white transition hover:bg-[#2c5b4b]"
                    >
                      اطلب الخدمة الآن <ArrowLeft size={14} />
                    </Link>
                  )}

                  <Link 
                    href="/gallery" 
                    className="text-xs font-bold text-[#62775a] hover:text-[#173a31] transition flex items-center gap-1"
                  >
                    صور من الأعمال <ArrowUpLeft size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </section>

        {/* ===================== قسم النخيل بالتفصيل ===================== */}
        <section id="palms-section" className="mt-20 sm:mt-28 scroll-mt-28">
          
          {/* بانر قسم النخيل */}
          <div className="relative overflow-hidden rounded-[2.2rem] bg-[#173a31] text-white p-7 sm:p-12 shadow-[0_20px_50px_rgba(23,58,49,0.18)]">
            <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-[#d2bb83]/15 blur-3xl pointer-events-none" />
            
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center relative z-10">
              
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-black text-[#d2bb83]">
                  <Sprout size={16} /> القسم الثاني: النخيل والواحات
                </span>
                <h2 className="text-3xl font-black text-white sm:text-5xl leading-tight">
                  توريد وغرس وتنسيق النخيل الفاخر
                </h2>
                <p className="text-sm leading-8 text-white/80 sm:text-base font-light">
                  نخيل تمور أصيل من أفضل السلالات المنتخبة، ونخيل واشنطونيا أمريكي وزينة للقصور والمشاريع، مع خدمات النقل بالمعدات الثقيلة وتمديد شبكات الري الحديثة.
                </p>
                
                <div className="pt-2 flex flex-wrap gap-3 text-xs font-bold text-white/90">
                  <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                    <CheckCircle2 size={15} className="text-[#d2bb83]" /> فحص بيئي وخلو من الآفات
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                    <CheckCircle2 size={15} className="text-[#d2bb83]" /> رافعات هيدروليكية متخصصة
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                    <CheckCircle2 size={15} className="text-[#d2bb83]" /> نسبة نجاح غرس تتجاوز 98%
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#0e241c] shadow-2xl">
                <Image 
                  src={palmImage} 
                  alt="مزارع ونخيل فاخر" 
                  fill 
                  unoptimized 
                  className="object-cover transition duration-700 hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 right-4 text-xs font-black text-white bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg">
                  نخيل مثمر وزينة بأعلى جودة
                </span>
              </div>

            </div>
          </div>

          {/* شبكة خدمات النخيل الفرعية */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {palmsServices.map((service) => (
              <article 
                key={service.id} 
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#e2e9de] bg-white p-7 shadow-[0_10px_30px_rgba(23,58,49,0.03)] transition duration-300 hover:-translate-y-1 hover:border-[#d2bb83] hover:shadow-[0_20px_50px_rgba(23,58,49,0.09)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f3f6ee] px-3 py-1 text-[11px] font-black text-[#5e7747]">
                      {service.eyebrow}
                    </span>
                    <span className="rounded-full bg-[#d2bb83]/20 px-2.5 py-1 text-[10px] font-black text-[#85703f]">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#173a31] group-hover:text-[#527a33] transition-colors leading-snug">
                    {service.title}
                  </h3>
                  
                  <p className="mt-3 text-xs leading-6 text-[#627265] font-light">
                    {service.description}
                  </p>

                  <div className="mt-5 space-y-2 pt-4 border-t border-[#f0f4ed]">
                    <span className="text-[11px] font-black text-[#173a31] block mb-1">المميزات والضمان:</span>
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs leading-5 text-[#526456]">
                        <Check size={14} className="text-[#688747] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#f0f4ed] flex items-center justify-between">
                  {whatsapp ? (
                    <a 
                      href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`السلام عليكم، أود الاستفسار عن خدمة: ${service.title}`)}`}
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#d2bb83] px-4 py-2.5 text-xs font-black text-[#173a31] transition hover:bg-white border border-[#d2bb83]"
                    >
                      <MessageCircle size={14} /> طلب الخدمة واتساب
                    </a>
                  ) : (
                    <Link 
                      href={`/contact?service=${service.id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#d2bb83] px-4 py-2.5 text-xs font-black text-[#173a31]"
                    >
                      طلب الخدمة <ArrowLeft size={13} />
                    </Link>
                  )}

                  <Link 
                    href="/gallery" 
                    className="text-xs font-bold text-[#62775a] hover:text-[#173a31] transition"
                  >
                    معرض الصور
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </section>

        {/* ===================== قسم الثيل بالتفصيل ===================== */}
        <section id="theel-section" className="mt-20 sm:mt-28 scroll-mt-28">
          
          {/* بانر قسم الثيل */}
          <div className="relative overflow-hidden rounded-[2.2rem] bg-[#0e291f] text-white p-7 sm:p-12 shadow-[0_20px_50px_rgba(23,58,49,0.18)]">
            <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-[#688747]/20 blur-3xl pointer-events-none" />
            
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center relative z-10">
              
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-black text-[#d2bb83]">
                  <Leaf size={16} /> القسم الثالث: الثيل والمسطحات الخضراء
                </span>
                <h2 className="text-3xl font-black text-white sm:text-5xl leading-tight">
                  توريد وتركيب الثيل الطبيعي والصناعي
                </h2>
                <p className="text-sm leading-8 text-white/80 sm:text-base font-light">
                  حلول متكاملة للمسطحات الخضراء: ثيل طبيعي طازج مزارع C2000 وبسبالوم، وعشب صناعي فائق الكثافة للحدائق والملاعب، مع تأسيس أنظمة الري الذكية والتنسيق الشامل.
                </p>
                
                <div className="pt-2 flex flex-wrap gap-3 text-xs font-bold text-white/90">
                  <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                    <CheckCircle2 size={15} className="text-[#d2bb83]" /> ثيل طبيعي مقصوص طازج
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                    <CheckCircle2 size={15} className="text-[#d2bb83]" /> عشب صناعي عالي الكثافة
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                    <CheckCircle2 size={15} className="text-[#d2bb83]" /> شبكات ري رشاشات ذكية
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#0e241c] shadow-2xl">
                <Image 
                  src={theelImage} 
                  alt="ثيل طبيعي وصناعي فاخر" 
                  fill 
                  unoptimized 
                  className="object-cover transition duration-700 hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 right-4 text-xs font-black text-white bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg">
                  مسطحات خضراء بأعلى مواصفات
                </span>
              </div>

            </div>
          </div>

          {/* شبكة خدمات الثيل الفرعية */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {theelServices.map((service) => (
              <article 
                key={service.id} 
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#e2e9de] bg-white p-7 shadow-[0_10px_30px_rgba(23,58,49,0.03)] transition duration-300 hover:-translate-y-1 hover:border-[#688747] hover:shadow-[0_20px_50px_rgba(23,58,49,0.09)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f3f6ee] px-3 py-1 text-[11px] font-black text-[#5e7747]">
                      {service.eyebrow}
                    </span>
                    <span className="rounded-full bg-[#eaf1df] px-2.5 py-1 text-[10px] font-black text-[#4b6d2e]">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#173a31] group-hover:text-[#527a33] transition-colors leading-snug">
                    {service.title}
                  </h3>
                  
                  <p className="mt-3 text-xs leading-6 text-[#627265] font-light">
                    {service.description}
                  </p>

                  <div className="mt-5 space-y-2 pt-4 border-t border-[#f0f4ed]">
                    <span className="text-[11px] font-black text-[#173a31] block mb-1">المميزات والضمان:</span>
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs leading-5 text-[#526456]">
                        <Check size={14} className="text-[#688747] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#f0f4ed] flex items-center justify-between">
                  {whatsapp ? (
                    <a 
                      href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`السلام عليكم، أود الاستفسار عن خدمة: ${service.title}`)}`}
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#173a31] px-4 py-2.5 text-xs font-black text-white transition hover:bg-[#2c5b4b]"
                    >
                      <MessageCircle size={14} /> طلب الخدمة واتساب
                    </a>
                  ) : (
                    <Link 
                      href={`/contact?service=${service.id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#173a31] px-4 py-2.5 text-xs font-black text-white transition hover:bg-[#2c5b4b]"
                    >
                      طلب الخدمة <ArrowLeft size={13} />
                    </Link>
                  )}

                  <Link 
                    href="/projects/theel" 
                    className="text-xs font-bold text-[#62775a] hover:text-[#173a31] transition"
                  >
                    معرض صور الثيل
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </section>

        {/* ===================== قسم الضمانات والمواصفات القياسية ===================== */}
        <section className="mt-20 sm:mt-28">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf1df] px-4 py-1.5 text-xs font-black text-[#58793b]">
              <ShieldCheck size={16} /> معايير العمل
            </span>
            <h2 className="mt-3 text-3xl font-black text-[#173a31] sm:text-4xl">
              لماذا تثق في خدماتنا؟
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#627265]">
              نلتزم بأعلى معايير التنفيذ في السوق السعودي لضمان سلامة مشروعك ورضاك التام.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index} 
                  className="rounded-3xl border border-[#e2e9de] bg-white p-7 shadow-sm transition hover:shadow-md hover:-translate-y-1"
                >
                  <div className="h-12 w-12 rounded-2xl bg-[#eaf1df] text-[#58793b] flex items-center justify-center mb-5">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-black text-[#173a31] mb-2">{item.title}</h3>
                  <p className="text-xs leading-6 text-[#627265] font-light">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===================== قسم دعوة التواصل السريع ===================== */}
        <section className="mt-20 sm:mt-28 relative overflow-hidden rounded-[2.5rem] bg-[#173a31] p-8 sm:p-14 text-center text-white shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-xs font-bold text-[#d2bb83] tracking-widest uppercase">
              استشارة مجانية للموقع
            </span>
            <h2 className="text-3xl sm:text-5xl font-black leading-tight">
              هل ترغب في تسوير أرضك أو زراعة مزرعتك؟
            </h2>
            <p className="text-sm sm:text-base leading-8 text-white/80 font-light">
              تحدث معنا الآن لمناقشة أبعاد موقعك والمواصفات المطلوبة، وسيقوم فريقنا بتقديم دراسة تقديرية وعرض سعر مخصص في أسرع وقت.
            </p>
            
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              {whatsapp && (
                <a 
                  href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`أهلاً بك، أود مناقشة مشروع تسوير / زراعة نخيل مع ${siteName}`)}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[#d2bb83] px-8 text-sm font-black text-[#173a31] shadow-lg transition hover:bg-white hover:-translate-y-0.5"
                >
                  <MessageCircle size={20} /> محادثة مباشرة عبر واتساب
                </a>
              )}
              {phone && (
                <a 
                  href={`tel:${phone}`}
                  className="inline-flex min-h-14 items-center gap-3 rounded-full border border-white/30 bg-white/10 px-8 text-sm font-black text-white backdrop-blur-sm transition hover:bg-white/20 hover:-translate-y-0.5"
                >
                  <PhoneCall size={18} className="text-[#d2bb83]" /> اتصال هاتفي مباشر
                </a>
              )}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
