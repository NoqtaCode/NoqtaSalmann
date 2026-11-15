import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'صور المعرض',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'القسم',
      type: 'string',
      options: { list: [
        { title: 'الشبوك', value: 'fences' },
        { title: 'النخيل', value: 'palms' },
        { title: 'الثيل', value: 'theel' },
      ] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'image', title: 'الصورة', type: 'image', options: { hotspot: true }, validation: (rule) => rule.required() }),
  ],
})
