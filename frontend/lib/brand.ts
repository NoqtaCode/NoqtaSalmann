export const BRAND_NAME = "شبوك ونخيل وثيل";

export const BRAND_DESCRIPTION =
  "حلول متخصصة في تركيب الشبوك وتوريد وزراعة النخيل وتركيب الثيل، من التخطيط للموقع حتى اكتمال التنفيذ.";

export const categories = [
  {
    slug: "fences",
    title: "الشبوك",
    eyebrow: "حماية تحدد المساحة",
    description: "حلول شبوك تناسب حدود الأرض وطبيعة استخدامها، بتنفيذ مرتب وتفاصيل واضحة.",
    image: "https://images.unsplash.com/photo-1745100671491-ce4e0b638d24?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "شبك معدني يحدد حدود أرض مفتوحة",
  },
  {
    slug: "palms",
    title: "النخيل",
    eyebrow: "زراعة تنمو مع أرضك",
    description: "توريد وزراعة النخيل مع تنسيق المساحات واختيار ما يناسب طبيعة الأرض.",
    image: "https://images.unsplash.com/photo-1723482490939-528fc0d110fb?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "صفوف من أشجار النخيل في حقل زراعي",
  },
  {
    slug: "theel",
    title: "الثيل",
    eyebrow: "خضرة تكسو أرضك",
    description: "توريد وتركيب الثيل الطبيعي والصناعي لتنسيق الحدائق والمساحات الخضراء بأجمل صورة.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "مساحة خضراء مكسوة بالعشب والثيل",
  },
] as const;

export const sanityCategoryValues: Record<string, string[]> = {
  fences: ["fences", "shabouk"],
  palms: ["palms", "nakheel"],
  theel: ["theel"],
};

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}
