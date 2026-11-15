import { getSanityWriteError, safeFetchFresh, type SiteSettings } from "../../../lib/sanity";
import { updateGeneralSettings, updateAccountSettings } from "../../../actions/settings";
import SettingsSubmitButton from "../../../components/admin/SettingsSubmitButton"; 
import { Globe, Phone, ShieldCheck, ImageIcon, Key, ShieldAlert, Plus, ArrowUpLeft, Fence, Sprout, Leaf, ImagePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import CategoryImagePicker, { type CategoryImageOption } from "../../../components/admin/CategoryImagePicker";
import SettingsImageUpload from "../../../components/admin/SettingsImageUpload";
import { categories, sanityCategoryValues } from "../../../lib/brand";

export const revalidate = 0;

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  const status = await searchParams;
  const writeConfigError = getSanityWriteError();
  const [settingsResult, availableImages] = await Promise.all([
    safeFetchFresh<SiteSettings>(`*[_type == "settings"] | order(_updatedAt desc)[0]{
      ..., 
      "logoImageUrl": logo.asset->url,
      "heroImageUrl": heroImage.asset->url, 
      "aboutImageUrl": aboutImage.asset->url,
      "categoryHomeImageUrls": categoryHomeImages{
        "palms": palms.asset->url, "fences": fences.asset->url, "theel": theel.asset->url
      }
    }`, {}),
    safeFetchFresh<CategoryImageOption[]>(`*[_type == "gallery" || (_type == "project" && status == "published")] | order(_createdAt desc) {
      "assetId": coalesce(image.asset._ref, mainImage.asset._ref),
      "url": coalesce(image.asset->url, mainImage.asset->url),
      "title": coalesce(title, "صورة من المعرض"),
      category
    }[defined(assetId) && defined(url)]`, [])
  ]);

  const settings = settingsResult ?? {};
  const imageOptionsByCategory = Object.fromEntries(categories.map((category) => {
    const rawImages = availableImages.filter((image: CategoryImageOption & { category?: string }) => sanityCategoryValues[category.slug]?.includes(image.category || ""));
    const seen = new Set<string>();
    const uniqueImages: CategoryImageOption[] = [];
    for (const img of rawImages) {
      if (img.assetId && !seen.has(img.assetId)) {
        seen.add(img.assetId);
        uniqueImages.push(img);
      }
    }
    return [category.slug, uniqueImages];
  })) as Record<string, CategoryImageOption[]>;

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4" dir="rtl">
      <div className="mb-10 pt-8 text-right font-sans">
        <h1 className="text-3xl md:text-4xl font-black text-slate-800">إعدادات الموقع والصور</h1>
        <p className="text-slate-500 mt-2">تحكم في اسم الموقع، العنوان في صدارة الواجهة، وصور الموقع الأساسية.</p>
        {status.saved === "1" && <p role="status" className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 font-bold text-emerald-800">تم حفظ الإعدادات والصور بنجاح. ستظهر التغييرات في الموقع مباشرة.</p>}
        {writeConfigError === "missing-config" && <p role="alert" className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 font-bold text-amber-900">اتصال Sanity غير مكتمل على هذا الخادم. أضف NEXT_PUBLIC_SANITY_PROJECT_ID وNEXT_PUBLIC_SANITY_DATASET إلى متغيرات البيئة.</p>}
        {writeConfigError === "missing-token" && <p role="alert" className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 font-bold text-amber-900">الحفظ معطّل لأن SANITY_API_TOKEN غير مضبوط في متغيرات بيئة الخادم. أضف رمزًا بصلاحية Editor أو Administrator في إعدادات الاستضافة، ثم أعد تشغيل/نشر التطبيق.</p>}
        {status.error && <p role="alert" className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-bold text-red-700">{({ unauthorized: "رمز Sanity غير صحيح. حدّث SANITY_API_TOKEN في إعدادات الخادم.", forbidden: "الرمز متصل لكنه لا يملك صلاحية الكتابة أو رفع الصور. امنحه صلاحية Editor في Sanity.", "invalid-image": "تعذر رفع الصورة. استخدم JPG أو PNG أو WebP، وبحجم لا يتجاوز 15 ميجابايت.", "missing-config": "متغيرات اتصال Sanity غير مكتملة في إعدادات الخادم.", "missing-token": "رمز الكتابة SANITY_API_TOKEN غير موجود في إعدادات الخادم.", save: "فشل حفظ الإعدادات. تحقق من المشروع ومجموعة البيانات وصلاحيات Sanity ثم أعد المحاولة." } as Record<string, string>)[status.error] || "تعذر حفظ الإعدادات. تحقق من اتصال Sanity وصلاحيات الكتابة."}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* العمود الأيمن: اسم الموقع، عنوان الواجهة، والصور */}
        <div className="lg:col-span-2 space-y-10">
          <form action={async (formData) => {
            'use server';
            try {
              const result = await updateGeneralSettings(formData);
              redirect(result.success ? "/admin/settings?saved=1" : `/admin/settings?error=${encodeURIComponent(result.errorCode || "save")}`);
            } catch (err: any) {
              if (err?.message === 'NEXT_REDIRECT' || err?.digest?.startsWith?.('NEXT_REDIRECT')) {
                throw err;
              }
              console.error("Settings submission error:", err);
              redirect("/admin/settings?error=save");
            }
          }} className="space-y-10">
            
            {/* 1. اسم الموقع والعنوان في الواجهة */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2 mb-2">
                <Globe size={22} className="text-blue-500" /> اسم الموقع والواجهة الرئيسية
              </h2>
              <div className="space-y-5 font-sans">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 mr-1">اسم الموقع (يظهر في الهيدر، الفوتر، والتبويبة)</label>
                  <input name="siteName" defaultValue={settings.siteName || "شبوك ونخيل وثيل"} placeholder="مثال: شبوك ونخيل وثيل" className="w-full border-2 border-slate-100 rounded-2xl p-4 text-black outline-none focus:border-blue-500 bg-slate-50 transition font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 mr-1">الاسم / العنوان في صدارة الواجهة الرئيسية</label>
                  <input name="heroTitle" defaultValue={settings.heroTitle || "شبوك ونخيل وثيل،"} placeholder="مثال: شبوك ونخيل وثيل،" className="w-full border-2 border-slate-100 rounded-2xl p-4 text-black outline-none focus:border-blue-500 bg-slate-50 transition font-bold" />
                </div>
              </div>  
            </div>

            {/* 2. صور الموقع الأساسية */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2 mb-2">
                <ImageIcon size={22} className="text-blue-500" /> صور الموقع الأساسية
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-2"><ImageIcon size={14}/> شعار المؤسسة (الهيدر والتبويبة)</label>
                  <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    {settings.logoImageUrl ? (
                      <Image src={settings.logoImageUrl} alt="الشعار الحالي للمؤسسة" fill unoptimized className="object-contain p-4" />
                    ) : (
                      <span className="text-sm font-bold text-slate-400">لم يُرفع شعار بعد</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">ارفع صورة الشعار بصيغة PNG أو SVG أو WebP.</p>
                  <SettingsImageUpload name="logo" buttonText="اختر شعارًا جديداً" accept="image/png,image/webp,image/jpeg" emptyText="لم يتم اختيار ملف" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-2"> <ImageIcon size={14}/> خلفية الواجهة الرئيسية (Hero)</label>
                  <div className="relative h-36 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                    {settings.heroImageUrl ? (
                      <Image src={settings.heroImageUrl} alt="خلفية الواجهة الحالية" fill unoptimized className="object-cover" />
                    ) : (
                      <span className="flex h-full items-center justify-center text-sm font-bold text-slate-400">تُستخدم الصورة الافتراضية حاليًا</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">تظهر في أعلى الصفحة الرئيسية كخلفية رئيسية.</p>
                  <SettingsImageUpload name="heroImage" buttonText="اختر صورة الواجهة" emptyText="لم يتم اختيار ملف" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-2"> <ImageIcon size={14}/> صورة صفحة «من نحن» </label>
                  <div className="relative h-44 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                    <Image
                      src={settings.aboutImageUrl || categories[1].image}
                      alt="الصورة الحالية في صفحة من نحن"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs text-slate-500">الصورة البارزة في صفحة من نحن. اختر صورة جديدة لاستبدالها.</p>
                  <SettingsImageUpload name="aboutImage" buttonText="اختر صورة جديدة لصفحة من نحن" emptyText="لم يتم اختيار ملف" />
                </div>
              </div>
            </div>

            {/* 2.5 خانة رفع وإدخال صور المعرض الميداني */}
            <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/40 p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-blue-100 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-blue-950 flex items-center gap-2">
                    <ImagePlus size={22} className="text-blue-600" /> خانة إدخال صور المعرض (أعمالنا الميدانية)
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    أدخل صور أعمالك الميدانية لكل قسم من هنا لتظهر فوراً في معرض الموقع
                  </p>
                </div>
                <Link 
                  href="/admin/gallery" 
                  className="text-xs font-bold text-blue-700 bg-white px-4 py-2 rounded-xl border border-blue-200 hover:bg-blue-600 hover:text-white transition shadow-sm self-start sm:self-auto inline-flex items-center gap-1.5"
                >
                  <ImageIcon size={15} />
                  <span>معرض الصور الكامل</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <Link 
                  href="/admin/gallery/new?category=fences"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-blue-100 shadow-sm hover:border-blue-500 hover:shadow-md transition group"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 group-hover:scale-105 transition shrink-0">
                    <Fence size={18} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xs font-black text-slate-800">إدخال صور الشبوك</h3>
                    <span className="text-[10px] text-blue-600 font-bold block mt-0.5">+ إضافة صور جديدة</span>
                  </div>
                </Link>

                <Link 
                  href="/admin/gallery/new?category=palms"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-blue-100 shadow-sm hover:border-emerald-500 hover:shadow-md transition group"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 group-hover:scale-105 transition shrink-0">
                    <Sprout size={18} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xs font-black text-slate-800">إدخال صور النخيل</h3>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">+ إضافة صور جديدة</span>
                  </div>
                </Link>

                <Link 
                  href="/admin/gallery/new?category=theel"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-blue-100 shadow-sm hover:border-green-600 hover:shadow-md transition group"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700 group-hover:scale-105 transition shrink-0">
                    <Leaf size={18} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xs font-black text-slate-800">إدخال صور الثيل</h3>
                    <span className="text-[10px] text-green-700 font-bold block mt-0.5">+ إضافة صور جديدة</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* 3. صور واجهة العرض والمشاريع (الشبوك والنخيل والثيل) */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                  <ImageIcon size={22} className="text-blue-500" /> صور واجهة العرض والمشاريع (الشبوك والنخيل والثيل)
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  تظهر هذه الصور في صدارة الصفحة الرئيسية (مجالاتنا وقسم أعمالنا الميدانية) وترتبط مباشرة بصفحات وتفاصيل الأقسام.
                </p>
              </div>

              <div className="space-y-7">
                {categories.map((category) => {
                  const choices = imageOptionsByCategory[category.slug] || [];
                  const isFence = category.slug === "fences";
                  const isTheel = category.slug === "theel";
                  const categoryTitle = isFence ? "قسم الشبوك والتسوير" : isTheel ? "قسم توريد وتركيب الثيل" : "قسم توريد وزراعة النخيل";

                  return (
                    <section key={category.slug} className="space-y-4 border-t border-slate-100 pt-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-black text-slate-800">{categoryTitle}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            الصور المرفوعة هنا تُحفظ وترتبط تلقائياً بقسم {isFence ? "الشبوك" : isTheel ? "الثيل" : "النخيل"} وتظهر في واجهة العرض الميداني بالرئيسية.
                          </p>
                        </div>
                        <Link 
                          href={`/admin/gallery/new?category=${category.slug}`}
                          className="inline-flex items-center gap-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 text-xs font-black transition border border-blue-200/60 shadow-sm self-start sm:self-auto"
                        >
                          <Plus size={15} />
                          <span>رفع دفعة صور جديدة لعرض {isFence ? "الشبوك" : isTheel ? "الثيل" : "النخيل"}</span>
                          <ArrowUpLeft size={13} />
                        </Link>
                      </div>

                      {choices.length === 0 && (
                        <p className="rounded-xl bg-amber-50 px-4 py-3 text-xs font-bold leading-5 text-amber-800">
                          لا توجد صور لهذا القسم في المعرض بعد. يمكنك رفع صورة العرض من هنا مباشرة أو رفع دفعة صور.
                        </p>
                      )}

                      <div className="max-w-xl">
                        <CategoryImagePicker 
                          name={`categoryHomeImage_${category.slug}`} 
                          uploadName={`categoryHomeUpload_${category.slug}`} 
                          label="صورة الغلاف والعرض الرئيسية" 
                          choices={choices} 
                          currentAssetId={settings.categoryHomeImages?.[category.slug]?.asset?._ref} 
                          currentImageUrl={settings.categoryHomeImageUrls?.[category.slug]} 
                          fallbackUrl={category.image} 
                        />
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>

            {/* 4. أرقام التواصل (واتساب والاتصال) */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <h2 className="text-xl font-bold text-emerald-800 flex items-center gap-2 mb-2">
                <Phone size={22} className="text-emerald-600" /> أرقام التواصل السريع
              </h2>
              <p className="text-xs text-slate-500">تُستخدم لأزرار الاتصال والواتساب العائمة وصفحة التواصل.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">رقم واتساب</label>
                  <input name="whatsapp" type="tel" defaultValue={settings.whatsapp || ""} placeholder="مثال: 966500000000" className="w-full border-2 border-slate-100 rounded-2xl p-4 bg-slate-50 focus:bg-white outline-none transition text-black font-mono text-left" dir="ltr" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">رقم الاتصال المباشر</label>
                  <input name="phone" type="tel" defaultValue={settings.phone || ""} placeholder="مثال: 0500000000" className="w-full border-2 border-slate-100 rounded-2xl p-4 bg-slate-50 focus:bg-white outline-none transition text-black font-mono text-left" dir="ltr" />
                </div>
              </div>
              <SettingsSubmitButton />
            </div>

          </form>
        </div>

        {/* العمود الأيسر: أمان الحساب (Form 2) */}
        <div className="lg:col-span-1">
          <form action={async (formData) => {
            'use server';
            await updateAccountSettings(formData);
          }} className="lg:sticky lg:top-24 font-sans">
            
            <div className="bg-slate-900 p-8 rounded-[3rem] shadow-2xl text-white space-y-8 border border-white/10 relative overflow-hidden">
              <h2 className="text-2xl font-black flex items-center gap-3 text-yellow-500">
                <ShieldCheck size={28} /> أمان الحساب
              </h2>
              
              <div className="space-y-5 relative z-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 mr-2 uppercase tracking-widest">اسم المستخدم الجديد</label>
                  <input name="username" type="text" required className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-yellow-500 transition" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 mr-2 uppercase tracking-widest">كلمة المرور الجديدة</label>
                  <input name="password" type="password" required className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-yellow-500 transition" />
                </div>

                <div className="pt-6 border-t border-white/10">
                  <label className="text-xs font-bold text-red-400 flex items-center gap-2 mb-3">
                    <Key size={16} /> كود الأمان (مطلوب للتغيير)
                  </label>
                  <input name="securityCode" type="password" required placeholder="أدخل الكود السري" className="w-full bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-white outline-none focus:border-red-500 transition" />
                </div>
              </div>

              <button type="submit" className="relative z-10 w-full bg-yellow-500 text-slate-900 font-black py-5 rounded-2xl hover:bg-white transition-all shadow-xl active:scale-95">
                تحديث بيانات الدخول 🔐
              </button>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-start gap-3">
                 <ShieldAlert className="text-yellow-500 shrink-0" size={18} />
                 <p className="text-[11px] text-slate-400 leading-relaxed italic">سيتم خروجك من النظام تلقائياً بعد نجاح العملية لضمان تطبيق الحماية الجديدة.</p>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
