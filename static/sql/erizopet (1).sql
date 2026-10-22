-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 22-10-2026 a las 17:39:57
-- Versión del servidor: 8.0.46
-- Versión de PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `erizopet`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accesorio`
--

CREATE TABLE `accesorio` (
  `id_accesorio` int NOT NULL,
  `id_usuario` int NOT NULL,
  `nombre` varchar(100) COLLATE utf32_spanish_ci NOT NULL,
  `categoría` varchar(100) COLLATE utf32_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf32_spanish_ci NOT NULL,
  `precio` float NOT NULL,
  `stock` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `erizo`
--

CREATE TABLE `erizo` (
  `id_erizo` int NOT NULL,
  `id_usuario` int NOT NULL,
  `nombre` varchar(100) COLLATE utf32_spanish_ci NOT NULL,
  `color` varchar(30) COLLATE utf32_spanish_ci NOT NULL,
  `sexo` varchar(20) COLLATE utf32_spanish_ci NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `precio` float NOT NULL,
  `estado` varchar(20) COLLATE utf32_spanish_ci NOT NULL,
  `imagen` varchar(20) COLLATE utf32_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incluye_accesorio`
--

CREATE TABLE `incluye_accesorio` (
  `id_pedido` int NOT NULL,
  `id_accesorio` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio_unitario` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incluye_erizo`
--

CREATE TABLE `incluye_erizo` (
  `id_pedido` int NOT NULL,
  `id_erizo` int NOT NULL,
  `precio_venta` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int NOT NULL,
  `id_usuario` int NOT NULL,
  `fecha` date NOT NULL,
  `estado` varchar(70) COLLATE utf32_spanish_ci NOT NULL,
  `total` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `realiza`
--

CREATE TABLE `realiza` (
  `id_realiza` int NOT NULL,
  `id_usuario` int NOT NULL,
  `id_pedido` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int NOT NULL,
  `nombre` varchar(150) COLLATE utf32_spanish_ci NOT NULL,
  `correo` varchar(150) COLLATE utf32_spanish_ci NOT NULL,
  `clave` varchar(200) COLLATE utf32_spanish_ci NOT NULL,
  `perfil` char(1) CHARACTER SET utf32 COLLATE utf32_spanish_ci NOT NULL DEFAULT 'U'
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `correo`, `clave`, `perfil`) VALUES
(1, 'romina donají', 'romina.gomez3502@alumnos.udg.mx', 'scrypt:32768:8:1$Cr8G0QccrOX7hiEi$45a2bd563e294a67913724c592702b3e5ec2d0cd6a082377621f246fbc5f0c91e94d7f4696eab4c4961e6b3fb72e78cf2619eacc83b5afdb6befe2d2fd7df070', 'A'),
(3, 'samantha rodriguez', 'samantha.rodriguez3519@alumnos.udg.mx', 'scrypt:32768:8:1$tqfZy6OzP9ylYcYG$55c30e8dccd7b9274676e0bd44ab4d4593ee43dd2b6f7df101132e42e2ee24d2ba2964558d40f8c079a6db79c4d5697b397dd174165b0c8123621a0cc2220ba0', 'U');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accesorio`
--
ALTER TABLE `accesorio`
  ADD PRIMARY KEY (`id_accesorio`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `erizo`
--
ALTER TABLE `erizo`
  ADD PRIMARY KEY (`id_erizo`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `incluye_accesorio`
--
ALTER TABLE `incluye_accesorio`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_accesorio` (`id_accesorio`);

--
-- Indices de la tabla `incluye_erizo`
--
ALTER TABLE `incluye_erizo`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_erizo` (`id_erizo`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `realiza`
--
ALTER TABLE `realiza`
  ADD PRIMARY KEY (`id_realiza`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_pedido` (`id_pedido`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accesorio`
--
ALTER TABLE `accesorio`
  MODIFY `id_accesorio` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `erizo`
--
ALTER TABLE `erizo`
  MODIFY `id_erizo` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `incluye_accesorio`
--
ALTER TABLE `incluye_accesorio`
  MODIFY `id_pedido` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `incluye_erizo`
--
ALTER TABLE `incluye_erizo`
  MODIFY `id_pedido` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `realiza`
--
ALTER TABLE `realiza`
  MODIFY `id_realiza` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `accesorio`
--
ALTER TABLE `accesorio`
  ADD CONSTRAINT `accesorio_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `erizo`
--
ALTER TABLE `erizo`
  ADD CONSTRAINT `erizo_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `incluye_accesorio`
--
ALTER TABLE `incluye_accesorio`
  ADD CONSTRAINT `incluye_accesorio_ibfk_1` FOREIGN KEY (`id_accesorio`) REFERENCES `accesorio` (`id_accesorio`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `incluye_erizo`
--
ALTER TABLE `incluye_erizo`
  ADD CONSTRAINT `incluye_erizo_ibfk_1` FOREIGN KEY (`id_erizo`) REFERENCES `erizo` (`id_erizo`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `realiza`
--
ALTER TABLE `realiza`
  ADD CONSTRAINT `realiza_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
