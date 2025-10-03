-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 03 Okt 2025 pada 03.38
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
('0f20f663-adb4-4b5a-898a-f21a0b7be4a0', 'db31e838-d31e-401b-bcc1-1a2b180edad6', 'Mengubah Data User', 'http://localhost:3000/api/user/db31e838-d31e-401b-bcc1-1a2b180edad6', '2025-10-02 07:10:41'),
('1e8b6f03-97d0-44b0-bc3a-23e4e2775e9e', 'db31e838-d31e-401b-bcc1-1a2b180edad6', 'Mengubah Data User', 'http://localhost:3000/api/user/db31e838-d31e-401b-bcc1-1a2b180edad6', '2025-10-02 09:10:36'),
('1ffcd610-a82c-4fff-b45a-0d56c432afb1', 'efae22b1-0e7b-450d-87a4-2d5671c9a3e1', 'Menghapus Data Role', 'http://localhost:3000/api/role/3437d4da-28c0-480c-970c-59fd94be8e8e', '2025-10-02 06:02:44'),
('269ed14e-f76b-49c7-a70d-3a90e51fffd7', 'db31e838-d31e-401b-bcc1-1a2b180edad6', 'Menambah Data User', 'http://localhost:3000/api/user', '2025-10-02 07:09:45'),
('4abde530-7300-4326-9c87-dba3b8391974', 'efae22b1-0e7b-450d-87a4-2d5671c9a3e1', 'Menambah Data Role', 'http://localhost:3000/api/role', '2025-10-02 06:00:11'),
('965c490b-4874-439f-815f-d493ad6ed60a', 'efae22b1-0e7b-450d-87a4-2d5671c9a3e1', 'Pengguna Login', '/dashboard', '2025-10-02 06:11:10'),
('c9757cd7-2494-4399-bc83-079119177954', 'efae22b1-0e7b-450d-87a4-2d5671c9a3e1', 'Pengguna Login', '/dashboard', '2025-10-02 07:09:40'),
('eafd5397-c88c-4c5f-a013-0106d6329108', 'efae22b1-0e7b-450d-87a4-2d5671c9a3e1', 'Mengubah Data Role', 'http://localhost:3000/api/role/3437d4da-28c0-480c-970c-59fd94be8e8e', '2025-10-02 06:02:34');

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
('db31e838-d31e-401b-bcc1-1a2b180edad6', 'vaniaria', 'vaniaria', 'U2FsdGVkX1/ksIUcKBgToNyVQs6QF+DO02QE9K0grog=', 'setya@gmail.com', '123456789098', '2025-10-02 09:10:36', '2025-10-02 09:10:36', 1, NULL, NULL),
('efae22b1-0e7b-450d-87a4-2d5671c9a3e1', 'shela', 'shela', 'U2FsdGVkX18By6J9CH6EyH/X3PHO+W5xahju8LdG/P4=', 'shelaw28@email.com', '081234567234', '2025-10-02 07:09:40', '2025-10-02 07:09:40', 1, NULL, '8c3f5dba30f1565c7cd552a32996893f248ca7d8825646a3972e32af9b317c7d');

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
('a4336576-ccae-40eb-8185-aeb8af98bc1b', 'db31e838-d31e-401b-bcc1-1a2b180edad6', 'c538a182-9701-4ce6-afee-563c6e1d837e', '2025-10-02 07:09:45', '2025-10-02 07:09:45'),
('cea641ce-55c9-46cc-bdf9-0294493f87bd', 'efae22b1-0e7b-450d-87a4-2d5671c9a3e1', '5c9d73a8-91d4-11f0-bcb7-586c25927655', '2025-10-01 04:20:31', '2025-10-01 04:20:31');

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
-- Ketidakleluasaan untuk tabel `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `fk_role` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
