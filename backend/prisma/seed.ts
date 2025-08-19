import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const categories = [
    { name: 'Technology', slug: 'technology', color: '#3B82F6' },
    { name: 'Design', slug: 'design', color: '#10B981' },
    { name: 'Business', slug: 'business', color: '#F59E0B' },
    { name: 'Writing', slug: 'writing', color: '#EF4444' },
    { name: 'Productivity', slug: 'productivity', color: '#8B5CF6' },
    { name: 'Lifestyle', slug: 'lifestyle', color: '#EC4899' },
    { name: 'Science', slug: 'science', color: '#06B6D4' },
    { name: 'Health', slug: 'health', color: '#84CC16' },
    { name: 'Education', slug: 'education', color: '#F97316' },
    { name: 'Travel', slug: 'travel', color: '#14B8A6' }
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })