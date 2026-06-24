-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2026 at 09:22 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `workworm`
--

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (`id` INT primary key AUTO_INCREMENT not null, `migration` VARCHAR(255) not null, `batch` INT not null);

--
-- Dumping data for table `migrations`
--
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES 
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_01_01_000002_create_shop_tables', 1),
(5, '2026_06_21_205218_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (`id` INT primary key AUTO_INCREMENT not null, `name` VARCHAR(255) not null, `email` VARCHAR(255) not null, `phone` VARCHAR(255), `gender` ENUM('male', 'female', 'other'), `address` TEXT, `email_verified_at` DATETIME, `password` VARCHAR(255) not null, `otp` VARCHAR(255), `otp_expires_at` DATETIME, `remember_token` VARCHAR(255), `created_at` DATETIME, `updated_at` DATETIME);

--
-- Dumping data for table `users`
--
INSERT INTO `users` (`id`, `name`, `email`, `phone`, `gender`, `address`, `email_verified_at`, `password`, `otp`, `otp_expires_at`, `remember_token`, `created_at`, `updated_at`) VALUES 
(1, 'Fancy Roy', 'fancyroy@workworm.com', '+8801700000000', 'male', 'House 12, Road 5, Dhanmondi, Dhaka 1209', '2026-06-21 21:39:57', '$2y$12$W.XvOYnv0i9qTyd3UjTruOrqD6.4TE0xB1XWsrlkQK87ektsK1vna', NULL, NULL, NULL, '2026-06-21 21:39:57', '2026-06-21 21:39:57');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--
DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens` (`email` VARCHAR(255) not null, `token` VARCHAR(255) not null, `created_at` DATETIME, primary key (`email`));

--
-- Dumping data for table `password_reset_tokens`
--
-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (`id` VARCHAR(255) not null, `user_id` INT, `ip_address` VARCHAR(255), `user_agent` TEXT, `payload` TEXT not null, `last_activity` INT not null, primary key (`id`));

--
-- Dumping data for table `sessions`
--
-- --------------------------------------------------------

--
-- Table structure for table `cache`
--
DROP TABLE IF EXISTS `cache`;
CREATE TABLE `cache` (`key` VARCHAR(255) not null, `value` TEXT not null, `expiration` INT not null, primary key (`key`));

--
-- Dumping data for table `cache`
--
-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--
DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE `cache_locks` (`key` VARCHAR(255) not null, `owner` VARCHAR(255) not null, `expiration` INT not null, primary key (`key`));

--
-- Dumping data for table `cache_locks`
--
-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (`id` INT primary key AUTO_INCREMENT not null, `queue` VARCHAR(255) not null, `payload` TEXT not null, `attempts` INT not null, `reserved_at` INT, `available_at` INT not null, `created_at` INT not null);

--
-- Dumping data for table `jobs`
--
-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--
DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE `job_batches` (`id` VARCHAR(255) not null, `name` VARCHAR(255) not null, `total_jobs` INT not null, `pending_jobs` INT not null, `failed_jobs` INT not null, `failed_job_ids` TEXT not null, `options` TEXT, `cancelled_at` INT, `created_at` INT not null, `finished_at` INT, primary key (`id`));

--
-- Dumping data for table `job_batches`
--
-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (`id` INT primary key AUTO_INCREMENT not null, `uuid` VARCHAR(255) not null, `connection` VARCHAR(255) not null, `queue` VARCHAR(255) not null, `payload` TEXT not null, `exception` TEXT not null, `failed_at` DATETIME not null default CURRENT_TIMESTAMP);

--
-- Dumping data for table `failed_jobs`
--
-- --------------------------------------------------------

--
-- Table structure for table `products`
--
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (`id` INT primary key AUTO_INCREMENT not null, `name` VARCHAR(255) not null, `description` TEXT, `price` DECIMAL not null, `stock` INT not null default '0', `image` VARCHAR(255), `category` VARCHAR(255), `is_active` tinyint(1) not null default '1', `created_at` DATETIME, `updated_at` DATETIME);

--
-- Dumping data for table `products`
--
INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `image`, `category`, `is_active`, `created_at`, `updated_at`) VALUES 
(1, 'Wireless Earbuds Pro', NULL, 2499, 50, NULL, 'Electronics', 1, '2026-06-21 21:39:57', '2026-06-21 21:39:57'),
(2, 'Slim Leather Wallet', NULL, 899, 100, NULL, 'Accessories', 1, '2026-06-21 21:39:57', '2026-06-21 21:39:57'),
(3, 'Cotton Casual T-Shirt', NULL, 450, 200, NULL, 'Clothing', 1, '2026-06-21 21:39:57', '2026-06-21 21:39:57'),
(4, 'Smart Watch Lite', NULL, 3999, 30, NULL, 'Electronics', 1, '2026-06-21 21:39:57', '2026-06-21 21:39:57'),
(5, 'Running Shoes Air', NULL, 2200, 60, NULL, 'Footwear', 1, '2026-06-21 21:39:57', '2026-06-21 21:39:57');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (`id` INT primary key AUTO_INCREMENT not null, `user_id` INT not null, `order_number` VARCHAR(255) not null, `total` DECIMAL not null, `status` ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') not null default 'pending', `shipping_address` TEXT, `payment_method` VARCHAR(255), `payment_status` ENUM('unpaid', 'paid', 'refunded') not null default 'unpaid', `created_at` DATETIME, `updated_at` DATETIME, foreign key(`user_id`) references `users`(`id`) on delete cascade);

--
-- Dumping data for table `orders`
--
INSERT INTO `orders` (`id`, `user_id`, `order_number`, `total`, `status`, `shipping_address`, `payment_method`, `payment_status`, `created_at`, `updated_at`) VALUES 
(1, 1, 'WW-6A385A2DE2EAA', 3398, 'delivered', 'House 12, Road 5, Dhanmondi, Dhaka', 'bKash', 'paid', '2026-06-21 21:39:57', '2026-06-21 21:39:57'),
(2, 1, 'WW-6A385A2DE355E', 2200, 'shipped', 'House 12, Road 5, Dhanmondi, Dhaka', 'Cash on Delivery', 'unpaid', '2026-06-21 21:39:57', '2026-06-21 21:39:57'),
(3, 1, 'WW-6A385A2DE383D', 1500, 'processing', 'House 12, Road 5, Dhanmondi, Dhaka', 'Credit Card', 'paid', '2026-06-21 21:39:57', '2026-06-21 21:39:57'),
(4, 1, 'WW-6A385A2DE3AE0', 450, 'pending', 'House 12, Road 5, Dhanmondi, Dhaka', 'bKash', 'unpaid', '2026-06-21 21:39:57', '2026-06-21 21:39:57'),
(5, 1, 'WW-6A385A2DE3D6F', 899, 'delivered', 'House 12, Road 5, Dhanmondi, Dhaka', 'Cash on Delivery', 'unpaid', '2026-06-21 21:39:57', '2026-06-21 21:39:57');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (`id` INT primary key AUTO_INCREMENT not null, `order_id` INT not null, `product_id` INT not null, `product_name` VARCHAR(255) not null, `quantity` INT not null, `price` DECIMAL not null, `created_at` DATETIME, `updated_at` DATETIME, foreign key(`order_id`) references `orders`(`id`) on delete cascade, foreign key(`product_id`) references `products`(`id`) on delete cascade);

--
-- Dumping data for table `order_items`
--
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_name`, `quantity`, `price`, `created_at`, `updated_at`) VALUES 
(1, 1, 1, 'Wireless Earbuds Pro', 1, 2499, '2026-06-21 21:39:57', '2026-06-21 21:39:57'),
(2, 1, 2, 'Slim Leather Wallet', 1, 899, '2026-06-21 21:39:57', '2026-06-21 21:39:57');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (`id` INT primary key AUTO_INCREMENT not null, `user_id` INT not null, `product_id` INT not null, `product_name` VARCHAR(255) not null, `rating` INT not null, `comment` TEXT not null, `created_at` DATETIME, `updated_at` DATETIME, foreign key(`user_id`) references `users`(`id`) on delete cascade, foreign key(`product_id`) references `products`(`id`) on delete cascade);

--
-- Dumping data for table `reviews`
--
-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--
DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (`id` INT primary key AUTO_INCREMENT not null, `tokenable_type` VARCHAR(255) not null, `tokenable_id` INT not null, `name` TEXT not null, `token` VARCHAR(255) not null, `abilities` TEXT, `last_used_at` DATETIME, `expires_at` DATETIME, `created_at` DATETIME, `updated_at` DATETIME);

--
-- Dumping data for table `personal_access_tokens`
--
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES 
(2, 'App\Models\User', 1, 'auth_token', 'e4c937446790ae8b819c0757d16f9c47f05132db3221a68998eabb8db5ec8d9c', '["*"]', NULL, NULL, '2026-06-21 21:47:51', '2026-06-21 21:47:51'),
(6, 'App\Models\User', 1, 'auth_token', '9364399b234a87bab46accf3e11dfe8fd5ade103834daf20d24c3ca33f46ac2f', '["*"]', NULL, NULL, '2026-06-22 09:59:05', '2026-06-22 09:59:05');


-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customers_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `first_name`, `last_name`, `email`, `phone`, `company`, `status`, `created_at`, `updated_at`) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', '+1234567890', 'Acme Corp', 'active', '2026-06-22 09:00:00', '2026-06-22 09:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
CREATE TABLE `profiles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profiles_user_id_foreign` (`user_id`),
  CONSTRAINT `profiles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `user_id`, `avatar`, `bio`, `date_of_birth`, `city`, `country`, `created_at`, `updated_at`) VALUES
(1, 1, 'avatars/fancy.png', 'Tech enthusiast and gadget lover.', '1995-08-15', 'Dhaka', 'Bangladesh', '2026-06-22 09:00:00', '2026-06-22 09:00:00');


COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
