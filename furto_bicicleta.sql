-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 11-Jul-2023 às 03:39
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `furtos_bicicletas`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `furto_bicicleta`
--

CREATE TABLE `furto_bicicleta` (
  `id` int(11) NOT NULL,
  `marca` varchar(255) NOT NULL,
  `modelo` varchar(255) NOT NULL,
  `horario` datetime NOT NULL,
  `local` varchar(255) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `furto_bicicleta`
--

INSERT INTO `furto_bicicleta` (`id`, `marca`, `modelo`, `horario`, `local`, `latitude`, `longitude`) VALUES
(1, 'Caloi', 'Elite', '2021-12-15 10:30:00', 'Rua da Praia', '-30.02938000', '-51.22775000'),
(2, 'Monark', 'Barra Circular', '2021-12-14 15:45:00', 'Parque Farroupilha', '-30.03792000', '-51.21428000'),
(3, 'Oggi', 'Hacker Sport', '2021-12-13 18:00:00', 'Avenida Ipiranga', '-30.05667000', '-51.17583000'),
(4, 'Sense', 'Impact Pro', '2021-12-12 20:15:00', 'Avenida Assis Brasil', '-30.00722000', '-51.19306000'),
(5, 'Soul', 'SL 129', '2021-12-11 09:00:00', 'Avenida Osvaldo Aranha', '-30.03611000', '-51.21472000'),
(6, 'Caloi', 'Andes', '2021-12-10 12:30:00', 'Avenida Borges de Medeiros', '-30.03194000', '-51.23028000'),
(7, 'Monark', 'Tropical', '2021-12-09 16:45:00', 'Avenida João Pessoa', '-30.03917000', '-51.21639000'),
(8, 'Oggi', 'Big Wheel 7.0', '2021-12-08 19:00:00', 'Avenida Protásio Alves', '-30.04722000', '-51.18139000'),
(9, 'Sense', 'Fun SL', '2021-12-07 21:15:00', 'Avenida Sertório', '-29.99444000', '-51.19583000'),
(10, 'Soul', 'SL 900', '2021-12-06 08:00:00', 'Avenida Independência', '-30.02778000', '-51.22167000'),
(11, 'Caloi', 'Vulcan', '2021-12-05 11:30:00', 'Rua dos Andradas', '-30.02861000', '-51.22833000'),
(12, 'Monark', 'BMX Cross Aro 20\"', '2021-12-04 14:45:00', 'Parque Moinhos de Vento', '-30.02167000', '-51.20028000'),
(13, 'Oggi', 'Agile Sport Plus Carbon Pro XT M8100 12V Aro 29\"', '2021-12-03 17:00:00', 'Avenida Carlos Gomes', '-30.02472000', '-51.18944000'),
(14, 'Sense', 'Versa EVO', '2021-12-02 19:15:00', 'Avenida Cristóvão Colombo', '-30.01583000', '-51.19861000'),
(15, 'Soul', '3R2', '2021-12-01 07:00:00', 'Avenida Bento Gonçalves', '-30.06056000', '-51.17528000'),
(16, 'Caloi', 'Ceci', '2021-11-30 10:30:00', 'Rua Ramiro Barcelos', '-30.03139000', '-51.20972000'),
(17, 'Monark', 'Brisa Aro 26\"', '2021-11-29 13:45:00', 'Parque Marinha do Brasil', '-30.05278000', '-51.23417000'),
(18, 'Oggi', 'Float Sport', '2021-11-28 16:00:00', 'Avenida Wenceslau Escobar', '-30.09833000', '-51.24250000'),
(19, 'Sense', 'Rock Evo Pro', '2021-11-27 18:15:00', 'Avenida Juca Batista', '-30.12500000', '-51.20556000'),
(20, 'Soul', 'Zen SL', '2021-11-26 06:00:00', 'Avenida Cavalhada', '-30.10889000', '-51.22889000'),
(21, 'Caloi', 'Strada Racing', '2021-11-25 09:30:00', 'Avenida Nilo Peçanha', '-30.02806000', '-51.18417000'),
(22, 'Monark', 'Monareta Aro 20\"', '2021-11-24 12:45:00', 'Avenida Plínio Brasil Milano', '-30.01389000', '-51.17806000'),
(23, 'Oggi', 'Cadenza 500', '2021-11-23 15:00:00', 'Avenida Alberto Pasqualini', '-30.00556000', '-51.16389000'),
(24, 'Sense', 'Criterium Endurance Tiagra', '2021-11-22 17:15:00', 'Avenida Baltazar de Oliveira Garcia', '-29.98056000', '-51.14722000'),
(25, 'Soul', 'Flow Carbon', '2021-11-21 05:00:00', 'Avenida Manoel Elias', '-29.97167000', '-51.12500000'),
(26, 'Caloi', 'City Tour Comp', '2021-11-20 08:30:00', 'Avenida Icaraí', '-30.09167000', '-51.24583000'),
(27, 'Monark', 'Classic Aro 26\"', '2021-11-19 11:45:00', 'Avenida Diário de Notícias', '-30.08194000', '-51.24861000'),
(28, 'Oggi', 'Stimolla STI', '2021-11-18 14:00:00', 'Avenida Padre Cacique', '-30.06750000', '-51.23694000'),
(29, 'Sense', 'Impact Carbon Comp', '2021-11-17 16:15:00', 'Avenida Edvaldo Pereira Paiva', '-30.05694000', '-51.23083000'),
(30, 'Soul', 'SL 529', '2021-11-16 04:00:00', 'Avenida Loureiro da Silva', '-30.04167000', '-51.22722000'),
(31, 'Caloi', 'Ventura', '2021-11-15 07:30:00', 'Rua General Lima e Silva', '-30.03944000', '-51.22139000'),
(32, 'Monark', 'Monark BMX Aro 16\"', '2021-11-14 10:45:00', 'Rua José do Patrocínio', '-30.04028000', '-51.21944000'),
(33, 'Oggi', 'Hacker HDS', '2021-11-13 13:00:00', 'Rua da República', '-30.03583000', '-51.21806000'),
(34, 'Sense', 'Fun SL Alivio', '2021-11-12 15:15:00', 'Rua General Câmara', '-30.03028000', '-51.22750000'),
(35, 'Soul', 'SL 327', '2021-11-11 03:00:00', 'Rua Riachuelo', '-30.02750000', '-51.22861000'),
(36, 'Caloi', 'Elite Carbon Sport', '2021-11-10 06:30:00', 'Rua dos Andradas', '-30.02583000', '-51.22972000'),
(37, 'Monark', 'Monark BMX Aro 24\"', '2021-11-09 09:45:00', 'Rua Vigário José Inácio', '-30.02417000', '-51.23056000'),
(38, 'Oggi', 'Float Sport NX Eagle Aro 29\"', '2021-11-08 12:00:00', 'Rua Voluntários da Pátria', '-30.02250000', '-51.23139000'),
(39, 'Sense', 'Versa EVO', '2021-11-07 14:15:00', 'Rua Siqueira Campos', '-30.02083000', '-51.23222000'),
(40, 'Soul', 'SL 900', '2021-11-06 02:00:00', 'Rua General Bento Martins', '-30.01917000', '-51.23306000');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `furto_bicicleta`
--
ALTER TABLE `furto_bicicleta`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `furto_bicicleta`
--
ALTER TABLE `furto_bicicleta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
