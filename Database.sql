-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 01 jul 2020 om 12:11
-- Serverversie: 10.4.11-MariaDB
-- PHP-versie: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydb`
--
CREATE DATABASE IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mydb`;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `ingredients`
--

INSERT INTO `ingredients` (`id`, `name`) VALUES
(1, 'Kip'),
(2, 'Rijst'),
(3, 'Bloem'),
(4, 'Peper'),
(5, 'Zout'),
(6, 'Eieren'),
(7, 'Suiker'),
(8, 'Kaas'),
(9, 'Pasta'),
(15, 'wraps'),
(16, 'avocado\'s'),
(17, 'rode ui'),
(18, 'rode paprika'),
(19, 'komkommer'),
(20, 'kalkoen'),
(21, 'roomkaas');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `desc` varchar(600) DEFAULT NULL,
  `picture` varchar(100) DEFAULT NULL,
  `clicks` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `recipes`
--

INSERT INTO `recipes` (`id`, `name`, `desc`, `picture`, `clicks`) VALUES
(1, 'Appeltaart', 'Verwarm de oven voor tot 180 °C. Maak een deeg door bloem, boter, suiker en eieren goed door elkaar te kneden. Laat het deeg even rusten. Schil de appels en haal de klokhuizen eruit. Snijd de appels in blokjes en meng die met de suiker en de kaneel. Rol het deeg uit en leg het in een beboterde taart', 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/vimdb/72912_992-0-4311-4311.jpg', 227),
(2, 'Kip', 'Ui en knoflook pellen en snipperen. Spaanse peper schoonmaken, pitjes verwijderen en in kleine stukjes snijden. 1 eetlepel olijfolie in een kleine pan verwarmen en hierin de peperstukjes, ui en knoflook even aanzetten. Tomatenblokjes en witte wijn toevoegen en aan de kook brengen. Het geheel wat lat', 'https://culy.be/wp-content/uploads/2018/03/kip-teriyaki2.jpg', 88),
(3, 'Rijst', 'Bereid de rijst volgens de instructies op het pak. Snijd de kipfilet, paprika en ananas in stukjes. Snipper ook de ui en snijd de knoflook fijn. Breng de kip op smaak met zout en peper. Giet een scheutje olie in een pan en bak de kip rondom bruin. Voeg daarna de ui, knoflook en paprika toe.', 'https://www.lekkerensimpel.com/wp-content/uploads/2016/10/IMG_6916.jpg', 87),
(8, 'Quesadilla’s met avocado, roomkaas, rode ui, ', 'https://kookidee.nl/wp-content/uploads/2020/06/quesadillas-avocado-roomkaas-rode-ui-kalkoenfilet-kaas.jpghttps://kookidee.nl/wp-content/uploads/2020/06/quesadillas-avocado-roomkaas-rode-ui-kalkoenfilet-kaas.jpghttps://kookidee.nl/wp-content/uploads/2020/06/quesadillas-avocado-roomkaas-rode-ui-kalkoe', 'https://www.foody.nl/P139076/614x412/quesadilla-met-kip-mexicaanse-tostis.jpg', 13),
(9, '4 persoons taart met rood fruit', 'We bakken eerst de cake. Klop boter en suiker in een paar minuten romig.\nVoeg de eieren een voor een toe, mix tot ze zijn opgenomen.\nVoeg zelfrijzend bakmeel, zout en vanille-extract toe. Mix tot je het meel niet meer ziet.\nStort het beslag in een ingevette en met bloem bestoven (of met bakpapier be', 'https://www.foody.nl/P144468/614x412/4-persoons-taart-met-rood-fruit.jpg', 15),
(10, 'Pruimen frangipane taart', 'Minstens 30 minuten voor je klaar bent om te gaan uitrollen en bakken bereid je je deeg voor. In de kom van een keukenmachine, uitgerust met een plastic mes, doe je de bloem en het zout en druk een paar keer op de pulse knop. Voeg de boter toe en doe dit nogmaals, ongeveer 40-50 keer of tot de boter door de bloem is gemengd en het grof is en een beetje lijkt op de consistentie van kleine erwtjes.', 'https://i1.wp.com/simoneskitchen.nl/wp-content/uploads/2020/05/Pruimen-frangipane-taart-3.jpg', 16),
(11, 'Citroen-gember havermoutkoeken', 'Klop boter en suiker romig. De rest van de ingrediënten kun je tegelijk toevoegen, kneed tot een stevig deeg.', 'https://www.foody.nl/P144115/614x412/citroen-gember-havermoutkoeken.jpg', 12),
(12, 'Tulband kruidcake', 'Klop boter en suiker romig. Voeg de eieren stuk voor stuk toe en mix tot een gladde massa. Mix de melk, vanille extract en citroenrasp door het mengsel.', 'https://www.foody.nl/P30985/614x412/kruidcake.jpg', 11);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `recipes_has_ingredients`
--

CREATE TABLE `recipes_has_ingredients` (
  `recipes_id` int(11) NOT NULL,
  `ingredients_id` int(11) NOT NULL,
  `amount` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `recipes_has_ingredients`
--

INSERT INTO `recipes_has_ingredients` (`recipes_id`, `ingredients_id`, `amount`) VALUES
(1, 1, '40'),
(1, 2, '600'),
(1, 4, '80'),
(1, 5, '5'),
(2, 1, '50'),
(2, 7, '60'),
(2, 8, '100'),
(2, 9, '400'),
(3, 2, '30'),
(3, 4, '400'),
(3, 5, '60'),
(3, 9, '500'),
(8, 6, '10'),
(8, 16, '10'),
(8, 19, '10'),
(9, 3, '20'),
(9, 6, '5'),
(9, 7, '100'),
(10, 3, '200'),
(10, 4, '1'),
(10, 5, '1'),
(10, 6, '2'),
(10, 7, '300'),
(10, 16, '3'),
(11, 4, '1'),
(11, 16, '1'),
(11, 20, '1'),
(12, 3, '1'),
(12, 4, '1'),
(12, 9, '1');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `shoppinglist`
--

CREATE TABLE `shoppinglist` (
  `id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `ingredients_id` int(11) NOT NULL,
  `amount` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `shoppinglist`
--

INSERT INTO `shoppinglist` (`id`, `users_id`, `ingredients_id`, `amount`) VALUES
(21, 106, 8, '100');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `timers`
--

CREATE TABLE `timers` (
  `id` int(11) NOT NULL,
  `recipes_id` int(11) NOT NULL,
  `seconds` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `timers`
--

INSERT INTO `timers` (`id`, `recipes_id`, `seconds`) VALUES
(1, 1, 500),
(2, 1, 200),
(3, 1, 100),
(4, 2, 10),
(5, 2, 500),
(6, 3, 20),
(7, 3, 500),
(9, 8, 6000),
(10, 9, 120050),
(11, 9, 84000),
(12, 10, 600),
(13, 11, 600),
(14, 12, 600);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `pass` varchar(45) NOT NULL,
  `username` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `email`, `pass`, `username`) VALUES
(106, 'test2@mail', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'test2'),
(107, 'w@w', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'wiebren'),
(135, 'wiebrenvandervaart@gmail.com', 'fc925fee18e62065f6469fc7bc04d2f85ed1c308', 'w23232'),
(136, 'w@wefwe', '63d1d794577b7caa10ce77fb5ee54366611cd162', 'wewew'),
(137, 'wiebrenvandervaart@hotmail.com', 'aaa190278f5c9446801b6faf53f5c18ce8933015', 'wwqwqwqw'),
(138, '2wew@eww', 'd24c9bfe3590b17ad68a433e4cf1d8fcefebeb64', 'wewewe'),
(139, 'qwe@gerg.com', '6872976029cfe1a50c321cc5494f3da5dbb2a8b8', 'weqweqeq'),
(140, 'wwe@ggg.com', '21081bc7dec2773a4cf27109fdaa9971ab0894bb', 'wwwwww'),
(142, 'werwerw@gerge.com', 'a9f08b5b97027f4d70618898a32239fa8c986b73', '2222222'),
(143, 'wQeq@wegqw.com', 'b5fc5a6b1b4c45a769b23e7138ec687373b90d84', '324234123'),
(153, 'wew@g.com', 'de9ed388d12a473d816018da819b412421fba19b', 'wewwer'),
(154, 'w@wegew.com', '0c8f425a9133372d70a8610992428d571d19d1f5', 'wwwww');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `recipes_has_ingredients`
--
ALTER TABLE `recipes_has_ingredients`
  ADD PRIMARY KEY (`recipes_id`,`ingredients_id`),
  ADD KEY `fk_recipes_has_ingredients_ingredients1` (`ingredients_id`);

--
-- Indexen voor tabel `shoppinglist`
--
ALTER TABLE `shoppinglist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_users_has_ingredients1_ingredients1_idx` (`ingredients_id`),
  ADD KEY `fk_users_has_ingredients1_users1_idx` (`users_id`);

--
-- Indexen voor tabel `timers`
--
ALTER TABLE `timers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_timers_recipes1_idx` (`recipes_id`);

--
-- Indexen voor tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT voor een tabel `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT voor een tabel `shoppinglist`
--
ALTER TABLE `shoppinglist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=292;

--
-- AUTO_INCREMENT voor een tabel `timers`
--
ALTER TABLE `timers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=155;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `recipes_has_ingredients`
--
ALTER TABLE `recipes_has_ingredients`
  ADD CONSTRAINT `fk_recipes_has_ingredients_ingredients1` FOREIGN KEY (`ingredients_id`) REFERENCES `ingredients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_recipes_has_ingredients_recipes` FOREIGN KEY (`recipes_id`) REFERENCES `recipes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `shoppinglist`
--
ALTER TABLE `shoppinglist`
  ADD CONSTRAINT `fk_users_has_ingredients1_ingredients1` FOREIGN KEY (`ingredients_id`) REFERENCES `ingredients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_users_has_ingredients1_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `timers`
--
ALTER TABLE `timers`
  ADD CONSTRAINT `fk_timers_recipes1` FOREIGN KEY (`recipes_id`) REFERENCES `recipes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
