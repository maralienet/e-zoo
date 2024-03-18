CREATE DATABASE  IF NOT EXISTS `ezoodb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ezoodb`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: ezoodb
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accessories`
--

DROP TABLE IF EXISTS `accessories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accessories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prodId` int NOT NULL,
  `type` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `material` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `prodId` (`prodId`),
  CONSTRAINT `accessories_ibfk_1` FOREIGN KEY (`prodId`) REFERENCES `prods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accessories`
--

LOCK TABLES `accessories` WRITE;
/*!40000 ALTER TABLE `accessories` DISABLE KEYS */;
INSERT INTO `accessories` VALUES (1,26,'Игрушки','Предмет способствует подвижности птицы и обеспечивает правильное развитие скелета и мускулатуры. Питомец больше не будет скучать, а его забавные развлечения зарядят вас позитивом даже в сложный день.','Дерево,Акрил,Карабин','2024-02-24 23:35:31','2024-02-24 23:35:31'),(2,27,'Жердочки','Набор жердочек Trixie сделан из натурального дерева, в качестве креплений к прутьям клетки предусмотрены пластиковые наконечники.','Дерево','2024-02-24 23:35:31','2024-02-24 23:35:31'),(3,32,'Игрушки','Игрушка TRIXIE для грызунов с колокольчиком. Размер: 5х7 см. Походит для морских свинок и кроликов.','Дерево','2024-02-24 23:35:31','2024-02-24 23:35:31'),(4,33,'Игрушки','Игрушка TRIXIE для грызунов \"Плетеный мяч\". Диаметр: 10 см. 100% натуральный материал. Идеально подходит для кроликов и морских свинок.','Ротанг','2024-02-24 23:35:31','2024-02-24 23:35:31'),(5,34,'Домики','Домик TRIXIE, для грызунов подвесной, 9 x 12 x 16см. Очень мягкое плюшевое покрытие, подвешивается в клетке, возможны различные варианты расцветки, предназначен для мышей и хомяков, ручная стирка при t 30 С.','Плюш','2024-02-24 23:35:31','2024-02-24 23:35:31');
/*!40000 ALTER TABLE `accessories` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-18  0:46:43
