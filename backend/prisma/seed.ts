import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data with TRUNCATE to reset auto-increment IDs
  console.log('🗑️  Clearing existing data and resetting IDs...');
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      try {
        await prisma.$executeRawUnsafe(
          `TRUNCATE TABLE "public"."${tablename}" RESTART IDENTITY CASCADE;`,
        );
      } catch (error) {
        console.log(`Skipping truncate for ${tablename}: ${error.message}`);
      }
    }
  }

  // Create Roles
  console.log('👥 Creating roles...');
  const adminRole = await prisma.role.create({
    data: {
      name: 'Admin',
    },
  });

  const bartenderRole = await prisma.role.create({
    data: {
      name: 'Bartender',
    },
  });

  const waiterRole = await prisma.role.create({
    data: {
      name: 'Waiter',
    },
  });

  // Create Employees
  console.log('👨‍💼 Creating employees...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  await prisma.employee.create({
    data: {
      name: 'John',
      lastname: 'Doe',
      email: 'admin@yboost.com',
      password: hashedPassword,
      country: 'France',
      role_id: adminRole.role_id,
    },
  });

  await prisma.employee.create({
    data: {
      name: 'Jane',
      lastname: 'Smith',
      email: 'bartender@yboost.com',
      password: hashedPassword,
      country: 'France',
      role_id: bartenderRole.role_id,
    },
  });

  await prisma.employee.create({
    data: {
      name: 'Bob',
      lastname: 'Wilson',
      email: 'waiter@yboost.com',
      password: hashedPassword,
      country: 'France',
      role_id: waiterRole.role_id,
    },
  });

  // Create Tables
  console.log('🪑 Creating tables...');
  for (let i = 1; i <= 10; i++) {
    await prisma.table.create({
      data: {
        table_no: i,
      },
    });
  }

  // Create Ingredients
  console.log('🥃 Creating ingredients...');
  const vodka = await prisma.ingredient.create({
    data: {
      name: 'Vodka',
      image: '🍸',
      alcohol: true,
      stock: 100,
    },
  });

  const rum = await prisma.ingredient.create({
    data: {
      name: 'Rhum',
      image: '🥃',
      alcohol: true,
      stock: 80,
    },
  });

  const gin = await prisma.ingredient.create({
    data: {
      name: 'Gin',
      image: '🍸',
      alcohol: true,
      stock: 90,
    },
  });

  const tequila = await prisma.ingredient.create({
    data: {
      name: 'Tequila',
      image: '🥃',
      alcohol: true,
      stock: 75,
    },
  });

  const citronJuice = await prisma.ingredient.create({
    data: {
      name: 'Jus de Citron',
      image: '🍋',
      alcohol: false,
      stock: 200,
    },
  });

  const limeJuice = await prisma.ingredient.create({
    data: {
      name: 'Jus de Citron Vert',
      image: '🍋',
      alcohol: false,
      stock: 150,
    },
  });

  const cranberryJuice = await prisma.ingredient.create({
    data: {
      name: 'Jus de Cranberry',
      image: '🧃',
      alcohol: false,
      stock: 120,
    },
  });

  const orangeJuice = await prisma.ingredient.create({
    data: {
      name: 'Jus d\'Orange',
      image: '🍊',
      alcohol: false,
      stock: 180,
    },
  });

  const cola = await prisma.ingredient.create({
    data: {
      name: 'Coca Cola',
      image: '🥤',
      alcohol: false,
      stock: 200,
    },
  });

  const mint = await prisma.ingredient.create({
    data: {
      name: 'Menthe',
      image: '🌿',
      alcohol: false,
      stock: 50,
    },
  });

  const sugar = await prisma.ingredient.create({
    data: {
      name: 'Sucre',
      image: '🍬',
      alcohol: false,
      stock: 300,
    },
  });

  const tonic = await prisma.ingredient.create({
    data: {
      name: 'Tonic',
      image: '🥤',
      alcohol: false,
      stock: 150,
    },
  });

  // Create Cocktails
  console.log('🍹 Creating cocktails...');

  const mojito = await prisma.cocktail.create({
    data: {
      name: 'Mojito',
      price: 9.50,
      image: '🍹',
      description: 'Cocktail rafraîchissant à base de rhum, menthe et citron vert',
      alcohol: true,
    },
  });

  const cosmopolitan = await prisma.cocktail.create({
    data: {
      name: 'Cosmopolitan',
      price: 11.00,
      image: '🍸',
      description: 'Cocktail élégant à base de vodka et cranberry',
      alcohol: true,
    },
  });

  const margarita = await prisma.cocktail.create({
    data: {
      name: 'Margarita',
      price: 10.50,
      image: '🍹',
      description: 'Cocktail mexicain classique à la tequila',
      alcohol: true,
    },
  });

  const ginTonic = await prisma.cocktail.create({
    data: {
      name: 'Gin Tonic',
      price: 8.50,
      image: '🍸',
      description: 'Cocktail simple et rafraîchissant',
      alcohol: true,
    },
  });

  const rumCola = await prisma.cocktail.create({
    data: {
      name: 'Rhum Coca',
      price: 7.50,
      image: '🥤',
      description: 'Cocktail simple et populaire',
      alcohol: true,
    },
  });

  const screwdriver = await prisma.cocktail.create({
    data: {
      name: 'Screwdriver',
      price: 8.00,
      image: '🍊',
      description: 'Vodka et jus d\'orange',
      alcohol: true,
    },
  });

  const virginMojito = await prisma.cocktail.create({
    data: {
      name: 'Virgin Mojito',
      price: 6.50,
      image: '🍹',
      description: 'Mojito sans alcool',
      alcohol: false,
    },
  });

  // Link Ingredients to Cocktails
  console.log('🔗 Linking ingredients to cocktails...');

  // Mojito (quantités en ml ou unités)
  await prisma.cocktailIngredient.createMany({
    data: [
      { cocktail_id: mojito.cocktail_id, ingredient_id: rum.ingredient_id, quantity: 50 },
      { cocktail_id: mojito.cocktail_id, ingredient_id: limeJuice.ingredient_id, quantity: 25 },
      { cocktail_id: mojito.cocktail_id, ingredient_id: mint.ingredient_id, quantity: 10 },
      { cocktail_id: mojito.cocktail_id, ingredient_id: sugar.ingredient_id, quantity: 15 },
    ],
  });

  // Cosmopolitan
  await prisma.cocktailIngredient.createMany({
    data: [
      { cocktail_id: cosmopolitan.cocktail_id, ingredient_id: vodka.ingredient_id, quantity: 45 },
      { cocktail_id: cosmopolitan.cocktail_id, ingredient_id: cranberryJuice.ingredient_id, quantity: 30 },
      { cocktail_id: cosmopolitan.cocktail_id, ingredient_id: limeJuice.ingredient_id, quantity: 15 },
    ],
  });

  // Margarita
  await prisma.cocktailIngredient.createMany({
    data: [
      { cocktail_id: margarita.cocktail_id, ingredient_id: tequila.ingredient_id, quantity: 50 },
      { cocktail_id: margarita.cocktail_id, ingredient_id: limeJuice.ingredient_id, quantity: 30 },
    ],
  });

  // Gin Tonic
  await prisma.cocktailIngredient.createMany({
    data: [
      { cocktail_id: ginTonic.cocktail_id, ingredient_id: gin.ingredient_id, quantity: 50 },
      { cocktail_id: ginTonic.cocktail_id, ingredient_id: tonic.ingredient_id, quantity: 150 },
    ],
  });

  // Rhum Coca
  await prisma.cocktailIngredient.createMany({
    data: [
      { cocktail_id: rumCola.cocktail_id, ingredient_id: rum.ingredient_id, quantity: 50 },
      { cocktail_id: rumCola.cocktail_id, ingredient_id: cola.ingredient_id, quantity: 120 },
    ],
  });

  // Screwdriver
  await prisma.cocktailIngredient.createMany({
    data: [
      { cocktail_id: screwdriver.cocktail_id, ingredient_id: vodka.ingredient_id, quantity: 50 },
      { cocktail_id: screwdriver.cocktail_id, ingredient_id: orangeJuice.ingredient_id, quantity: 100 },
    ],
  });

  // Virgin Mojito
  await prisma.cocktailIngredient.createMany({
    data: [
      { cocktail_id: virginMojito.cocktail_id, ingredient_id: limeJuice.ingredient_id, quantity: 30 },
      { cocktail_id: virginMojito.cocktail_id, ingredient_id: mint.ingredient_id, quantity: 10 },
      { cocktail_id: virginMojito.cocktail_id, ingredient_id: sugar.ingredient_id, quantity: 15 },
    ],
  });

  console.log('✅ Database seeding completed successfully!');
  console.log(`
  📊 Summary:
  - ${await prisma.role.count()} roles created
  - ${await prisma.employee.count()} employees created
  - ${await prisma.table.count()} tables created
  - ${await prisma.ingredient.count()} ingredients created
  - ${await prisma.cocktail.count()} cocktails created
  - ${await prisma.cocktailIngredient.count()} cocktail-ingredient relations created
  
  🔑 Login credentials:
  - Admin: admin@yboost.com / password123
  - Bartender: bartender@yboost.com / password123
  - Waiter: waiter@yboost.com / password123
  `);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
