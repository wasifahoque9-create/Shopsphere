# WorkWorm – Customer Management System

Full-stack customer portal built with **Next.js 15** (frontend) + **Laravel 12** (backend) + **MySQL**.

---

## Project Structure

```
workworm/
├── frontend/       ← Next.js 15 + Tailwind CSS
└── backend/        ← Laravel 12 REST API
```

---

## Brand Colors

| Name      | Hex       | Usage                            |
|-----------|-----------|----------------------------------|
| Primary   | `#121358` | Navbar, buttons, headings, sidebar |
| Secondary | `#F59E0B` | CTAs, accents, active nav states  |
| White     | `#FFFFFF` | Backgrounds, text on dark        |

---

## Features

### Customer Auth
- Register with email + phone → OTP email verification
- Login with email + password (Laravel Sanctum tokens)
- Forgot password → email reset link
- Password reset

### Customer Dashboard
- **Overview** – stats (total orders, delivered, pending) + recent orders
- **Profile** – edit name, email, phone, gender, address + change password
- **Orders** – view all orders, visual step tracker (pending → processing → shipped → delivered), download invoice
- **Reviews** – view submitted reviews, write new review (only for delivered orders)

---

## Backend Setup (Laravel)

### Requirements
- PHP 8.2+
- Composer
- MySQL 8+
- Laravel 12

### Installation

```bash
# 1. Create a new Laravel project (or copy the files in /backend into it)
composer create-project laravel/laravel workworm-api

# 2. Copy files from /backend into the Laravel project:
#    - app/Http/Controllers/Api/AuthController.php
#    - app/Http/Controllers/Api/CustomerController.php
#    - app/Models/{User,Order,OrderItem,Review,Product}.php
#    - database/migrations/
#    - database/seeders/DatabaseSeeder.php
#    - routes/api.php
#    - config/cors.php

# 3. Install Sanctum
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# 4. Configure .env
cp .env.example .env
php artisan key:generate
# Edit DB_DATABASE, DB_USERNAME, DB_PASSWORD

# 5. Run migrations & seed
php artisan migrate --seed

# 6. Start server
php artisan serve
# → http://localhost:8000
```

### API Endpoints

| Method | Path                              | Auth | Description            |
|--------|-----------------------------------|------|------------------------|
| POST   | /api/auth/register                | No   | Register customer      |
| POST   | /api/auth/verify-otp              | No   | Verify email OTP       |
| POST   | /api/auth/login                   | No   | Login → returns token  |
| POST   | /api/auth/forgot-password         | No   | Send reset link        |
| POST   | /api/auth/reset-password          | No   | Reset password         |
| GET    | /api/auth/me                      | Yes  | Get current user       |
| POST   | /api/auth/logout                  | Yes  | Logout                 |
| GET    | /api/customer/profile             | Yes  | Get profile            |
| PUT    | /api/customer/profile             | Yes  | Update profile         |
| PUT    | /api/customer/change-password     | Yes  | Change password        |
| GET    | /api/customer/orders              | Yes  | List orders            |
| GET    | /api/customer/orders/{id}         | Yes  | Order detail           |
| GET    | /api/customer/orders/{id}/invoice | Yes  | Download invoice PDF   |
| GET    | /api/customer/reviews             | Yes  | List my reviews        |
| POST   | /api/customer/reviews             | Yes  | Submit a review        |

---

## Frontend Setup (Next.js)

### Requirements
- Node.js 18+
- npm / yarn

### Installation

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Start dev server
npm run dev
# → http://localhost:3000
```

### Pages

| Route                    | Description              |
|--------------------------|--------------------------|
| `/login`                 | Login page               |
| `/register`              | Register + OTP verify    |
| `/forgot-password`       | Forgot password          |
| `/dashboard`             | Overview (stats + orders)|
| `/dashboard/profile`     | Edit profile & password  |
| `/dashboard/orders`      | Order history + tracker  |
| `/dashboard/reviews`     | View & write reviews     |

---

## Demo Credentials

After seeding, use:
- **Email:** `fancyroy@workworm.com`
- **Password:** `password`

---

## MySQL Schema

The migrations create these tables:

```sql
users            – id, name, email, phone, gender, address, password, otp, email_verified_at
products         – id, name, description, price, stock, category, is_active
orders           – id, user_id, order_number, total, status, shipping_address, payment_*
order_items      – id, order_id, product_id, product_name, quantity, price
reviews          – id, user_id, product_id, product_name, rating, comment
password_reset_tokens
```

---

## Production Checklist

- [ ] Set `APP_ENV=production`, `APP_DEBUG=false` in `.env`
- [ ] Configure real SMTP in `.env` (MAIL_*)
- [ ] Update `FRONTEND_URL` and `SANCTUM_STATEFUL_DOMAINS`
- [ ] Replace text invoice with dompdf for proper PDF generation
- [ ] Use HTTPS on both frontend and backend
- [ ] Add product image upload (Laravel Storage + S3)
