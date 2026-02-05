```markdown
# E-Commerce Platform

A full-stack e-commerce application built with Next.js, Prisma, and PostgreSQL.

## Tech Stack

- **Next.js** 16.1.6 with TypeScript
- **PostgreSQL** with Prisma ORM 5.22.0
- **Tailwind CSS** 4
- **Node.js** 20.19.6

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```env
   # .env
   DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce"
   ```

3. **Setup database**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run seed
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

## Database Schema

- **Users** - Customer accounts
- **Products** - Product catalog (prices in cents)
- **Categories** - Many-to-many with Products
- **Cart/CartItems** - Shopping cart
- **Orders/OrderItems** - Order history with product snapshots
- **Inventory** - Stock tracking with audit trail

## Seed Data

- 3 users (Alice, Bob, Charlie)
- 10 products across 5 categories
- 2 active carts
- 3 sample orders

## Useful Commands

```bash
npm run dev          # Start dev server
npm run seed         # Seed database
npx prisma studio    # Browse database (localhost:5555)
npx prisma generate  # Regenerate Prisma Client
```

## Project Status

✅ Database schema and seeding complete  
🚧 API routes, frontend UI, and authentication in progress

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://prisma.io/docs)
```