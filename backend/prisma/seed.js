const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Create default admin user
  const adminUsername = 'admin';
  const adminExists = await prisma.user.findUnique({ where: { username: adminUsername } });
  if (!adminExists) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('1234', salt); // Default password is '1234'
    await prisma.user.create({
      data: {
        username: adminUsername,
        password: hashedPassword,
        displayName: 'Quản trị viên',
        role: 'ADMIN',
        avatarUrl: `https://i.pravatar.cc/150?u=${adminUsername}`,
      },
    });
    console.log('Created admin user');
  } else {
    console.log('Admin user already exists');
  }

  // Create default settings
  const settingsExist = await prisma.settings.findUnique({ where: { key: 'default' } });
  if (!settingsExist) {
    await prisma.settings.create({
      data: {
        key: 'default',
        value: {
          siteName: 'Trường Tiểu học Nguyễn Huệ',
          logoUrl: '',
          footerAddress: 'Nam Thanh - Đắk Wil - Lâm Đồng',
          footerPhone: '02613.709.333',
        },
      },
    });
    console.log('Created default settings');
  } else {
    console.log('Default settings already exist');
  }

  // Create default category
  const defaultCategoryName = 'Thông báo chung';
  const categoryExists = await prisma.category.findUnique({ where: { name: defaultCategoryName } });
  if (!categoryExists) {
      await prisma.category.create({
          data: { name: defaultCategoryName }
      });
      console.log('Created default category');
  } else {
      console.log('Default category already exists');
  }
  
  // Create placeholder page content
  const pageKeys = ['about', 'contact', 'history', 'missionVision', 'organization'];
  const initialPageContent = {
    about: { history: 'Chưa có nội dung', mission: 'Chưa có nội dung', vision: 'Chưa có nội dung', teachers: [] },
    contact: { address: 'Chưa có địa chỉ', phone: 'Chưa có số điện thoại' },
    history: { title: 'Lịch sử phát triển', subtitle: 'Hành trình xây dựng và trưởng thành của nhà trường.', milestones: [] },
    missionVision: { missionTitle: 'Sứ mệnh', missionText: 'Chưa có nội dung', visionTitle: 'Tầm nhìn', visionText: 'Chưa có nội dung' },
    organization: { title: 'Cơ cấu tổ chức', subtitle: 'Sơ đồ tổ chức và quản lý của nhà trường.', chart: [] }
  };

  for (const key of pageKeys) {
      const pageExists = await prisma.pageContent.findUnique({ where: { pageKey: key } });
      if (!pageExists) {
          await prisma.pageContent.create({
              data: {
                  pageKey: key,
                  content: initialPageContent[key]
              }
          });
          console.log(`Created placeholder content for page: ${key}`);
      } else {
          console.log(`Content for page ${key} already exists`);
      }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
