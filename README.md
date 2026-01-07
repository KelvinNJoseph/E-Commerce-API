# E-Commerce API

A full-featured e-commerce backend built with **TypeScript**, **Express**, **Prisma**, and **MySQL**.  
Supports user authentication, product management, cart operations, order processing, and admin functionalities.

---

## Features

### User Management
- Signup, login, and profile management
- Default billing and shipping addresses
- Role-based access (User / Admin)

### Product Management
- Add, update, delete, and list products
- Tags support for categorization
- Full-text search across `name`, `description`, and `tags`

### Cart & Orders
- Add items to cart
- Create orders from cart
- List, cancel, and update orders
- Admin can view all orders and update status

### Validation & Error Handling
- Zod-based input validation
- Centralized error handling with custom exceptions

### Database
- MySQL database
- Prisma ORM for type-safe queries
- Relations: Users, Products, CartItems, Orders, Addresses, OrderEvents

---

## Tech Stack
- **Backend:** Node.js, Express, TypeScript
- **Database:** MySQL
- **ORM:** Prisma
- **Authentication:** JWT
- **Validation:** Zod
- **Dev Tools:** Nodemon, ts-node

---

## Getting Started

### Prerequisites
- Node.js v18+
- MySQL
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd ecommerce

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env to include DATABASE_URL and JWT_SECRET

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Start development server
npm start
