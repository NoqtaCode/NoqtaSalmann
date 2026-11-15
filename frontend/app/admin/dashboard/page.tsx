import Link from "next/link";
import { 
  FolderKanban, 
  Plus, 
  ArrowUpRight, 
  Image as ImageIcon,
  ImagePlus,
  Settings as SettingsIcon,
  CheckCircle2,
  Fence,
  Sprout,
  Leaf
} from "lucide-react";
import { safeFetch } from "../../../lib/sanity";
import Image from "next/image";

export const revalidate = 0;

async function getStats() {
  const [projectsCount, galleryCount, latestProjects] = await Promise.all([
    safeFetch(`count(*[_type == "project"])`, 0),
    safeFetch(`count(*[_type == "gallery"])`, 0),
    safeFetch(`*[_type == "project"] | order(_createdAt desc)[0...4] { _id, title, category, "imageUrl": mainImage.asset->url }`, []),
  ]);
  return { projectsCount, galleryCount, latestProjects };
}

export default async function DashboardHome() {
  const { projectsCount, galleryCount, latestProjects } = await getStats();

  return (
    <div className="pb-10 font-sans rtl">
      
      {/* 1. الترحيب (Banner) */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 mb-10 text-white relative overflow-hidden shadow-2xl">
         <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-black mb-4">أهلاً بك في لوحة التحكم 👋</h1>
            <p className="text-slate-400 text-lg max-w-md font-light">إدارة اسم الموقع، الصور المضافة، والأعمال المنشورة.</p>
         </div>
         {/* خلفية جمالية */}
         <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-500 rounded-full blur-[80px] opacity-10"></div>
      </div>

      {/* 2. الإحصائيات (Quick Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-12">
        
        {/* بطاقة صور المعرض */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <ImageIcon size={24} />
          </div>
          <div>
            <p className="text-slate-500 font-bold text-xs md:text-sm uppercase tracking-wider">صور المعرض</p>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mt-1">{galleryCount}</h3>
          </div>
        </div>

        {/* بطاقة المشاريع */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-4">
            <FolderKanban size={24} />
          </div>
          <div>
            <p className="text-slate-500 font-bold text-xs md:text-sm uppercase tracking-wider">المشاريع والأعمال</p>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mt-1">{projectsCount}</h3>
          </div>
        </div>

      </div>

      {/* 3. الوصول السريع (Quick Actions) */}
      <div className="mb-12">
         <h2 className="text-xl font-black text-slate-800 mb-6 px-2 flex items-center gap-2">
            <CheckCircle2 className="text-blue-600" size={20} />
            إجراءات سريعة
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/gallery/new" className="group bg-blue-600 text-white p-6 rounded-[2rem] flex items-center justify-between hover:bg-blue-700 transition shadow-lg shadow-blue-900/20">
               <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-2xl"><Plus size={24} /></div>
                  <span className="font-black text-lg">رفع صور للمعرض</span>
               </div>
               <ArrowUpRight className="opacity-50 group-hover:opacity-100 transition" />
            </Link>

            <Link href="/admin/projects/new" className="group bg-emerald-700 text-white p-6 rounded-[2rem] flex items-center justify-between hover:bg-emerald-800 transition shadow-lg shadow-emerald-900/20">
               <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-2xl"><Plus size={24} /></div>
                  <span className="font-black text-lg">إضافة مشروع جديد</span>
               </div>
               <ArrowUpRight className="opacity-50 group-hover:opacity-100 transition" />
            </Link>
            
            <Link href="/admin/settings" className="group bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between hover:border-blue-600 transition shadow-sm">
               <div className="flex items-center gap-4 text-slate-700">
                  <div className="bg-slate-50 p-3 rounded-2xl text-slate-400 group-hover:text-blue-600 transition"><SettingsIcon size={24} /></div>
                  <span className="font-black text-lg">إعدادات الموقع والصور</span>
               </div>
               <ArrowUpRight className="opacity-20 group-hover:opacity-100 text-blue-600 transition" />
            </Link>
         </div>
      </div>

      {/* 3.5 خانة رفع صور المعرض المباشرة حسب القسم */}
      <div className="mb-12 bg-white rounded-[2.5rem] p-6 md:p-8 border border-slate-100 shadow-sm">
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
               <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <ImagePlus className="text-blue-600" size={22} />
                  خانة صور المعرض (إدخال الصور حسب القسم)
               </h2>
               <p className="text-xs text-slate-500 mt-1">اختر القسم لرفع دفعة صور تظهر تلقائياً في معرض الموقع الرئيسي</p>
            </div>
            <Link href="/admin/gallery" className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1 self-start sm:self-auto">
               استعراض كافة الصور ({galleryCount})
               <ArrowUpRight size={14} />
            </Link>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link 
               href="/admin/gallery/new?category=fences"
               className="group flex flex-col justify-between p-5 rounded-2xl border-2 border-slate-100 bg-slate-50/50 hover:border-blue-500 hover:bg-blue-50/30 transition shadow-sm"
            >
               <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700 group-hover:scale-110 transition">
                     <Fence size={20} />
                  </span>
                  <div>
                     <h3 className="font-black text-slate-800 text-sm">صور الشبوك والتسوير</h3>
                     <span className="text-[11px] text-slate-500 font-medium">مزارع، أراضي، أمنية</span>
                  </div>
               </div>
               <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-blue-700">
                  <Plus size={14} />
                  إدخال صور الشبوك
               </span>
            </Link>

            <Link 
               href="/admin/gallery/new?category=palms"
               className="group flex flex-col justify-between p-5 rounded-2xl border-2 border-slate-100 bg-slate-50/50 hover:border-emerald-500 hover:bg-emerald-50/30 transition shadow-sm"
            >
               <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 group-hover:scale-110 transition">
                     <Sprout size={20} />
                  </span>
                  <div>
                     <h3 className="font-black text-slate-800 text-sm">صور توريد وزراعة النخيل</h3>
                     <span className="text-[11px] text-slate-500 font-medium">واشنطونيا، تمور، قلع ونقل</span>
                  </div>
               </div>
               <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                  <Plus size={14} />
                  إدخال صور النخيل
               </span>
            </Link>

            <Link 
               href="/admin/gallery/new?category=theel"
               className="group flex flex-col justify-between p-5 rounded-2xl border-2 border-slate-100 bg-slate-50/50 hover:border-green-600 hover:bg-green-50/30 transition shadow-sm"
            >
               <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700 group-hover:scale-110 transition">
                     <Leaf size={20} />
                  </span>
                  <div>
                     <h3 className="font-black text-slate-800 text-sm">صور توريد وتركيب الثيل</h3>
                     <span className="text-[11px] text-slate-500 font-medium">طبيعي، صناعي، مسطحات</span>
                  </div>
               </div>
               <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-green-700 group-hover:text-green-800">
                  <Plus size={14} />
                  إدخال صور الثيل
               </span>
            </Link>
         </div>
      </div>

      {/* 4. أحدث المشاريع (Recent Projects Table) */}
      <div className="bg-white rounded-[2.5rem] p-6 md:p-10 border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-8">
           <h2 className="text-xl font-black text-slate-800">أحدث الأعمال المضافة</h2>
           <Link href="/admin/projects" className="text-blue-600 font-bold text-sm hover:underline">عرض الكل</Link>
        </div>
        
        <div className="space-y-4">
          {latestProjects.map((project: any) => (
            <div key={project._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition border border-transparent hover:border-slate-200">
              <div className="flex items-center gap-4">
                 {project.imageUrl ? (
                   <Image src={project.imageUrl} alt={project.title} width={50} height={50} className="rounded-xl object-cover h-12 w-12 border" />
                 ) : <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>}
                 <div>
                    <h4 className="font-bold text-slate-800 text-sm md:text-base line-clamp-1">{project.title}</h4>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">{project.category}</span>
                 </div>
              </div>
              <Link href={`/admin/projects`} className="p-2 text-slate-400 hover:text-blue-600 transition">
                 <ArrowUpRight size={20} />
              </Link>
            </div>
          ))}
          {latestProjects.length === 0 && <p className="text-center text-slate-400 py-10">لا توجد أعمال لعرضها</p>}
        </div>
      </div>

    </div>
  );
}
