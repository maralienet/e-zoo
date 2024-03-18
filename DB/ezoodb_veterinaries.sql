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
-- Table structure for table `veterinaries`
--

DROP TABLE IF EXISTS `veterinaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veterinaries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prodId` int NOT NULL,
  `type` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `testimony` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `prodId` (`prodId`),
  CONSTRAINT `veterinaries_ibfk_1` FOREIGN KEY (`prodId`) REFERENCES `prods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veterinaries`
--

LOCK TABLES `veterinaries` WRITE;
/*!40000 ALTER TABLE `veterinaries` DISABLE KEYS */;
INSERT INTO `veterinaries` VALUES (1,44,'Защита от блох и клещей','Ошейник прекрасно подходит даже для котят старше 2 месяцев, действует в течение 4 месяцев. Он имеет 2-ю ступень четырехступенчатой программы Beaphar, разработанной для защиты от паразитов. Животное можно купать, не снимая ошейника - продукт водостойкий.','35 см','Активные ингредиенты: масло маргозы, лавандовое масло.','2024-02-24 23:35:31','2024-02-24 23:35:31'),(2,45,'Средства от гельминтов','Антигельминтик «Zooлекарь» для кошек применяют для профилактической и терапевтической дегельминтизации кошек при нематодозах (токсокароз, токсаскариоз, унцинароз, анкилостомоз) и цестодозах (тениоз, эхинококкоз, дипилидиоз, дифилоботриоз, мезоцестоидоз).','6 табл.','25 мг празиквантела и 72 мг пирантела памоата.','2024-02-24 23:35:31','2024-02-24 23:35:31'),(3,46,'Средства от гельминтов','Препарат представляют собой плоские или двояковыпуклые таблетки округлой формы желтого цвета. В одной таблетке препарата для собак содержится 50 мг празиквантела и 144 мг пирантела памоата.','6 табл.','50 мг празиквантела и 144 мг пирантела памоата.','2024-02-24 23:35:31','2024-02-24 23:35:31');
/*!40000 ALTER TABLE `veterinaries` ENABLE KEYS */;
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
