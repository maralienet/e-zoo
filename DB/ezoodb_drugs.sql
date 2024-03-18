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
-- Table structure for table `drugs`
--

DROP TABLE IF EXISTS `drugs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drugs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prodId` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `prodId` (`prodId`),
  CONSTRAINT `drugs_ibfk_1` FOREIGN KEY (`prodId`) REFERENCES `prods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drugs`
--

LOCK TABLES `drugs` WRITE;
/*!40000 ALTER TABLE `drugs` DISABLE KEYS */;
INSERT INTO `drugs` VALUES (1,41,'Tetra EasyBalanse - это жидкий кондиционер, который стабилизирует среду обитания рыб, а также поддерживает долгосрочное биологическое равновесие в аквариуме порядка 6 месяцев. При использовании средства можно снизить частоту замен воды в аквариуме.','2024-02-24 23:35:31','2024-02-24 23:35:31'),(2,42,'Это удобрение добавляет быстроусвояемые микроэлементы и витамины в доступной для растений форме. Жидкое удобрение способствует здоровой зеленой окраске листьев, поставляет все необходимые микроэлементы, которые способствуют оптимальному развитию растений','2024-02-24 23:35:31','2024-02-24 23:35:31'),(3,43,'В состав включены гуминовые кислоты, создающие эффект черной воды и предотвращающие развитие водорослей естественным путем. Правильное использование препарата гарантирует безопасность аквариумных рыб и других организмов.','2024-02-24 23:35:31','2024-02-24 23:35:31');
/*!40000 ALTER TABLE `drugs` ENABLE KEYS */;
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
