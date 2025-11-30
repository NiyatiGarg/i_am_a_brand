import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      passwordHash: adminPassword,
      role: 'admin',
      bio: 'Administrator of the personal brand website',
      socialLinks: JSON.stringify({
        github: 'https://github.com/admin',
        linkedin: 'https://linkedin.com/in/admin',
      }),
    },
  });

  console.log('Created admin user:', admin.email);

  // Create blog categories
  const categories = [
    { name: 'Technology' },
    { name: 'Fitness' },
    { name: 'Dance & Music' },
    { name: 'Lifestyle' },
    { name: 'Personal Development' },
  ];

  const createdCategories = [];
  for (const category of categories) {
    const created = await prisma.blogCategory.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
    createdCategories.push(created);
  }

  console.log(`Created ${createdCategories.length} categories`);

  // Create sample blog (check if it already exists)
  const existingBlog = await prisma.blog.findFirst({
    where: { title: 'Welcome to My Personal Brand Website' },
  });

  if (!existingBlog) {
    const sampleBlog = await prisma.blog.create({
      data: {
        title: 'Welcome to My Personal Brand Website',
        content: `# Welcome!

This is a sample blog post to demonstrate the blog functionality.

## Features

- **Markdown Support**: Write your blogs in markdown
- **Media Uploads**: Add images and videos to your posts
- **Categories**: Organize your content
- **Public/Private**: Control who can see your posts

## Getting Started

Start writing your own blog posts and share your journey!

---

*Happy blogging!*`,
        authorId: admin.id,
        isPublic: true,
        categoryId: createdCategories[0].id,
      },
    });

    console.log('Created sample blog:', sampleBlog.title);
  } else {
    console.log('Sample blog already exists');
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

