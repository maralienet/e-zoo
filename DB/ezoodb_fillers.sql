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
-- Table structure for table `fillers`
--

DROP TABLE IF EXISTS `fillers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fillers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prodId` int NOT NULL,
  `type` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `weight` float NOT NULL,
  `composition` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `prodId` (`prodId`),
  CONSTRAINT `fillers_ibfk_1` FOREIGN KEY (`prodId`) REFERENCES `prods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fillers`
--

LOCK TABLES `fillers` WRITE;
/*!40000 ALTER TABLE `fillers` DISABLE KEYS */;
INSERT INTO `fillers` VALUES (1,17,'Комкующийся','100% экологичен и безопасен для питомца, поглощает жидкости и сковывает неприятные запахи. Наполнитель очень экономичен, не прилипает к лапкам и не травмирует их. Помимо этого, он предотвращает размножение бактерий в лотке.',5.3,'бентонитовая глина 100%','2024-02-24 23:35:31','2024-02-24 23:35:31'),(2,18,'Древесный','Сделанный из натуральных опилок продукт, спрессованный по уникальной технологии. Приятный запах свежеспиленной древесины освежает воздух, а дезинфицирующие свойства хвойных пород способствуют устранению болезнетворных бактерий.',3,'натуральная древесина и целлюлоза','2024-02-24 23:35:31','2024-02-24 23:35:31'),(3,19,'Соевые','Наполнитель эффективно впитывает влагу, при попадании жидкости соевые гранулы образуют крепкий комок и надежно запирают запах внутри.',7,'спрессованные соевые волокна','2024-02-24 23:35:31','2024-02-24 23:35:31'),(4,35,'Комкующийся','Условия и сроки хранения: Дата изготовления, срок годности, номер партии, условия хранения указаны на упаковке.',1,'песок','2024-02-24 23:35:31','2024-02-24 23:35:31');
/*!40000 ALTER TABLE `fillers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-18  0:46:42
