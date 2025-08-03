import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Deleting all collections...');

    // Order matters due to foreign key relations
    await prisma.payment.deleteMany();
    await prisma.customer.deleteMany();
    await prisma.scheme.deleteMany();
    await prisma.user.deleteMany();

    console.log('✅ All data deleted successfully');
  } catch (error) {
    console.error('❌ Error deleting data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
