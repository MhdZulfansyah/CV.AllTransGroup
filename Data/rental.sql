-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 29 Jul 2025 pada 10.39
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rental`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `username` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`username`, `password`) VALUES
('admin', 'admin');

-- --------------------------------------------------------

--
-- Struktur dari tabel `rental_data`
--

CREATE TABLE `rental_data` (
  `id` int(11) NOT NULL,
  `NamaPembooking` varchar(100) NOT NULL,
  `nohp` varchar(15) NOT NULL,
  `TanggalBooking` date NOT NULL,
  `TanggalPengembalian` date NOT NULL,
  `TypeUnit` varchar(50) NOT NULL,
  `HargaPerhari` int(11) NOT NULL,
  `Layanan` varchar(100) NOT NULL,
  `Keterangan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `rental_data`
--

INSERT INTO `rental_data` (`id`, `NamaPembooking`, `nohp`, `TanggalBooking`, `TanggalPengembalian`, `TypeUnit`, `HargaPerhari`, `Layanan`, `Keterangan`) VALUES
(2, 'RICARDO', '0895162736', '2025-06-11', '2025-06-14', 'Avanza New', 350000, 'LepasKunci', 'NO THING'),
(3, 'ade', '0895 1245 3455', '2025-06-18', '2025-06-20', 'Brio', 350000, 'LepasKunci', 'jaminan motor honda vario150 hitam'),
(4, 'gibrona', '0821 3567 8876', '2025-06-21', '2025-06-25', 'Terios', 400000, 'IncludeDriver', 'deposit 3000000'),
(5, 'RIDWAN', '0821 5476 2277', '2025-06-24', '2025-06-30', 'Ayla', 300000, 'LepasKunci', 'deposit 3000000 dan motor PCX');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `rental_data`
--
ALTER TABLE `rental_data`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `rental_data`
--
ALTER TABLE `rental_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
