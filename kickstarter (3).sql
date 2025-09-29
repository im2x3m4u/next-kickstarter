-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 29 Sep 2025 pada 11.47
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kickstarter`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `activity`
--

CREATE TABLE `activity` (
  `id_activity` char(36) NOT NULL,
  `id_user` char(36) NOT NULL,
  `activity` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `activity`
--

INSERT INTO `activity` (`id_activity`, `id_user`, `activity`, `location`, `created_at`) VALUES
('07473e4e-2a16-4f46-9659-b624832c4a0d', '8fcc7248-85f6-47b6-a843-0caa6b3c6844', 'LOGOUT', 'Unknown', '2025-09-29 09:07:09'),
('4c43389b-d70a-40b3-a5db-4a8662aee52b', '5e513b0c-165b-4367-b51f-1ac869b2f42d', 'Pengguna Update Data', 'Localhost', '2025-09-29 09:46:59'),
('5f0f1a7a-fd5d-4b95-9ac7-9d04c585b78f', '8fcc7248-85f6-47b6-a843-0caa6b3c6844', 'LOGIN', 'Unknown', '2025-09-29 09:06:51'),
('c6ba71e6-0a7a-4da7-9c3f-21449a7f2874', '5e513b0c-165b-4367-b51f-1ac869b2f42d', 'Pengguna Logout', 'Unknown', '2025-09-29 09:47:18'),
('c7751e84-9a94-4379-b8ec-a37b4dcc9df4', '5e513b0c-165b-4367-b51f-1ac869b2f42d', 'Pengguna Login', 'Unknown', '2025-09-29 09:45:40'),
('d680b84a-06bf-43e0-a992-6df6036d67a8', '5e513b0c-165b-4367-b51f-1ac869b2f42d', 'LOGIN', 'Unknown', '2025-09-29 09:08:08'),
('f29ef2b6-912d-4234-9000-123e16f177cd', '5e513b0c-165b-4367-b51f-1ac869b2f42d', 'LOGOUT', 'Unknown', '2025-09-29 09:08:17');

-- --------------------------------------------------------

--
-- Struktur dari tabel `role`
--

CREATE TABLE `role` (
  `id_role` char(36) NOT NULL,
  `nama_role` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_aktif` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `role`
--

INSERT INTO `role` (`id_role`, `nama_role`, `created_at`, `updated_at`, `is_aktif`) VALUES
('5c9d73a8-91d4-11f0-bcb7-586c25927655', 'admin', '2025-09-15 01:36:12', '2025-09-15 01:36:12', 1),
('c538a182-9701-4ce6-afee-563c6e1d837e', 'user', '2025-09-22 04:02:26', '2025-09-22 04:02:26', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` char(36) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `no_telepon` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_aktif` tinyint(1) NOT NULL,
  `reset_token` text DEFAULT NULL,
  `login_token` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `nama`, `username`, `password`, `email`, `no_telepon`, `created_at`, `updated_at`, `is_aktif`, `reset_token`, `login_token`) VALUES
('48158df2-1735-4c1c-ab3e-faeeb7845ce7', 'Bidadari Anastasya', 'bidadari', 'U2FsdGVkX19+BSK5D69qJ/kNb/9EZyjXGNeDKuJkAXs=', 'bidadari@email.com', '081234567123', '2025-09-29 08:45:52', '2025-09-29 08:45:52', 1, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiNDgxNThkZjItMTczNS00YzFjLWFiM2UtZmFlZWI3ODQ1Y2U3IiwidXNlcm5hbWUiOiJiaWRhZGFyaSIsIm5hbWEiOiJCaWRhZGFyaSBBbmFzdGFzeWEiLCJpYXQiOjE3NTkxMzU1NTIsImV4cCI6MTc1OTEzOTE1Mn0.RRGdbM6qUcLBCg8T0HIIn86OjngWN15NJ9agdGg-ZCM'),
('5e513b0c-165b-4367-b51f-1ac869b2f42d', 'shela', 'shela', 'U2FsdGVkX18IBZBk3DsGAXWvhQRE28j8e9w8wpOXWk0=', 'setyakc@gmail.com', '098765432123', '2025-09-29 09:47:18', '2025-09-29 09:47:18', 1, NULL, NULL),
('8fcc7248-85f6-47b6-a843-0caa6b3c6844', 'Kalya Anastasya', 'kalya', 'U2FsdGVkX19aNF2g+oBVZutANwUnn1lhS+2H4/MVqjc=', 'kalya@email.com', '081234567234', '2025-09-29 09:47:12', '2025-09-29 09:47:12', 1, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiOGZjYzcyNDgtODVmNi00N2I2LWE4NDMtMGNhYTZiM2M2ODQ0IiwidXNlcm5hbWUiOiJrYWx5YSIsIm5hbWEiOiJLYWx5YSBBbmFzdGFzeWEiLCJpYXQiOjE3NTkxMzkyMzIsImV4cCI6MTc1OTE0MjgzMn0.3J9nF9Gz-nTKaV2DDa4YQjFZw2U6ZoaEjKyitqRUJnY');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_role`
--

CREATE TABLE `user_role` (
  `id_userRole` char(36) NOT NULL,
  `id_user` char(36) NOT NULL,
  `id_role` char(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user_role`
--

INSERT INTO `user_role` (`id_userRole`, `id_user`, `id_role`, `created_at`, `updated_at`) VALUES
('773d1891-87e4-4a5d-a055-39490e41bdd7', '8fcc7248-85f6-47b6-a843-0caa6b3c6844', '5c9d73a8-91d4-11f0-bcb7-586c25927655', '2025-09-29 09:06:12', '2025-09-29 09:06:12'),
('e9605157-a0d3-4010-9d47-6797eee7f15c', '48158df2-1735-4c1c-ab3e-faeeb7845ce7', '5c9d73a8-91d4-11f0-bcb7-586c25927655', '2025-09-29 08:45:47', '2025-09-29 08:45:47');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id_activity`),
  ADD KEY `fk_activity_user` (`id_user`);

--
-- Indeks untuk tabel `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_role`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- Indeks untuk tabel `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id_userRole`),
  ADD KEY `fk_user` (`id_user`),
  ADD KEY `fk_role` (`id_role`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `fk_activity_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Ketidakleluasaan untuk tabel `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `fk_role` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
