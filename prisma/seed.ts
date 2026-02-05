// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clean up existing data (in correct order due to foreign keys)
  await prisma.inventoryChange.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.productCategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleared existing data');

  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'alice@example.com',
        name: 'Alice Johnson',
      },
    }),
    prisma.user.create({
      data: {
        email: 'bob@example.com',
        name: 'Bob Smith',
      },
    }),
    prisma.user.create({
      data: {
        email: 'charlie@example.com',
        name: 'Charlie Brown',
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Electronics' } }),
    prisma.category.create({ data: { name: 'Clothing' } }),
    prisma.category.create({ data: { name: 'Books' } }),
    prisma.category.create({ data: { name: 'Home & Garden' } }),
    prisma.category.create({ data: { name: 'Sports' } }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Create Products
  const products = await Promise.all([
    // Electronics
    prisma.product.create({
      data: {
        name: 'Wireless Headphones',
        description: 'High-quality Bluetooth headphones with noise cancellation',
        price: 12999,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Smart Watch',
        description: 'Fitness tracker with heart rate monitor',
        price: 24999,
      },
    }),
    prisma.product.create({
      data: {
        name: 'USB-C Cable',
        description: 'Fast charging cable, 6ft',
        price: 1499,
      },
    }),
    // Clothing
    prisma.product.create({
      data: {
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton tee',
        price: 1999,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Denim Jeans',
        description: 'Classic blue jeans',
        price: 4999,
      },
    }),
    // Books
    prisma.product.create({
      data: {
        name: 'The Pragmatic Programmer',
        description: 'Essential reading for software developers',
        price: 3999,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Clean Code',
        description: 'A handbook of agile software craftsmanship',
        price: 3499,
      },
    }),
    // Home & Garden
    prisma.product.create({
      data: {
        name: 'Plant Pot Set',
        description: 'Set of 3 ceramic plant pots',
        price: 2999,
      },
    }),
    // Sports
    prisma.product.create({
      data: {
        name: 'Yoga Mat',
        description: 'Non-slip exercise mat',
        price: 3499,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Water Bottle',
        description: 'Insulated stainless steel, 32oz',
        price: 2499,
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} products`);

  // Create Product-Category relationships
  await Promise.all([
    prisma.productCategory.create({
      data: { productId: products[0].id, categoryId: categories[0].id },
    }),
    prisma.productCategory.create({
      data: { productId: products[1].id, categoryId: categories[0].id },
    }),
    prisma.productCategory.create({
      data: { productId: products[2].id, categoryId: categories[0].id },
    }),
    prisma.productCategory.create({
      data: { productId: products[3].id, categoryId: categories[1].id },
    }),
    prisma.productCategory.create({
      data: { productId: products[4].id, categoryId: categories[1].id },
    }),
    prisma.productCategory.create({
      data: { productId: products[5].id, categoryId: categories[2].id },
    }),
    prisma.productCategory.create({
      data: { productId: products[6].id, categoryId: categories[2].id },
    }),
    prisma.productCategory.create({
      data: { productId: products[7].id, categoryId: categories[3].id },
    }),
    prisma.productCategory.create({
      data: { productId: products[8].id, categoryId: categories[4].id },
    }),
    prisma.productCategory.create({
      data: { productId: products[9].id, categoryId: categories[4].id },
    }),
  ]);

  console.log('✅ Created product-category relationships');

  // Create Inventory
  const inventoryData = [
    { productId: products[0].id, quantity: 50 },
    { productId: products[1].id, quantity: 30 },
    { productId: products[2].id, quantity: 100 },
    { productId: products[3].id, quantity: 75 },
    { productId: products[4].id, quantity: 40 },
    { productId: products[5].id, quantity: 25 },
    { productId: products[6].id, quantity: 20 },
    { productId: products[7].id, quantity: 60 },
    { productId: products[8].id, quantity: 45 },
    { productId: products[9].id, quantity: 80 },
  ];

  await Promise.all(
    inventoryData.map((inv) => prisma.inventory.create({ data: inv }))
  );

  console.log('✅ Created inventory records');

  // Create Inventory Changes
  await Promise.all([
    prisma.inventoryChange.create({
      data: {
        productId: products[0].id,
        delta: 50,
        reason: 'Initial stock',
      },
    }),
    prisma.inventoryChange.create({
      data: {
        productId: products[1].id,
        delta: 30,
        reason: 'Initial stock',
      },
    }),
    prisma.inventoryChange.create({
      data: {
        productId: products[0].id,
        delta: -5,
        reason: 'Sold',
      },
    }),
    prisma.inventoryChange.create({
      data: {
        productId: products[2].id,
        delta: 100,
        reason: 'Initial stock',
      },
    }),
  ]);

  console.log('✅ Created inventory changes');

  // Create Carts
  await prisma.cart.create({
    data: {
      userId: users[0].id,
      items: {
        create: [
          { productId: products[0].id, quantity: 1 },
          { productId: products[5].id, quantity: 2 },
        ],
      },
    },
  });

  await prisma.cart.create({
    data: {
      userId: users[1].id,
      items: {
        create: [
          { productId: products[3].id, quantity: 3 },
          { productId: products[8].id, quantity: 1 },
        ],
      },
    },
  });

  console.log('✅ Created carts with items');

  // Create Orders
  await prisma.order.create({
    data: {
      userId: users[0].id,
      total: 24999,
      status: 'completed',
      items: {
        create: [
          {
            productId: products[1].id,
            productName: products[1].name,
            price: products[1].price,
            quantity: 1,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: users[1].id,
      total: 8497,
      status: 'pending',
      items: {
        create: [
          {
            productId: products[6].id,
            productName: products[6].name,
            price: products[6].price,
            quantity: 1,
          },
          {
            productId: products[9].id,
            productName: products[9].name,
            price: products[9].price,
            quantity: 2,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: users[2].id,
      total: 5997,
      status: 'shipped',
      items: {
        create: [
          {
            productId: products[3].id,
            productName: products[3].name,
            price: products[3].price,
            quantity: 3,
          },
        ],
      },
    },
  });

  console.log('✅ Created orders with items');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });