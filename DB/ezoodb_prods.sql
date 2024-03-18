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
-- Table structure for table `prods`
--

DROP TABLE IF EXISTS `prods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `brand` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `available` tinyint(1) NOT NULL,
  `petTypeId` int NOT NULL,
  `type` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `prods_ibfk_1` (`petTypeId`),
  CONSTRAINT `prods_ibfk_1` FOREIGN KEY (`petTypeId`) REFERENCES `pettypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prods`
--

LOCK TABLES `prods` WRITE;
/*!40000 ALTER TABLE `prods` DISABLE KEYS */;
INSERT INTO `prods` VALUES (1,'Veterinary Diets NF Консерва для собак при патологии почек',11.76,'ProPlan','Франция',1,1,'Диетический Корм','purina_veterinary_diets_nf.png','2024-02-24 23:35:31','2024-02-24 23:35:31'),(2,'Diabetic DS 37 Canine Корм сухой диетический для взрослых собак при сахарном диабете',52.72,'Farmina','Италия',1,1,'Диетический Корм','rc_dog_diet_diabetic.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(3,'Gastrointestinal Dog диета для собак при нарушении пищеварения',8.49,'Royal Canin','Австрия',1,1,'Диетический Корм','rc_dog_diet_gastrointestinal.png','2024-02-24 23:35:31','2024-02-24 23:35:31'),(4,'Anallergenic AN 18 Canine Корм сухой диетический для взрослых собак при пищевой аллергии',114.79,'Royal Canin','Россия/Франция',1,1,'Диетический Корм','rc_dog_diet_antiallergenic.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(5,'Корм сухой для щенков средних пород с чувствительной кожей',237.24,'ProPlan','Россия/Франция',1,1,'Корм','proplan_dog_feed_puppy.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(6,'Club HE Сухой корм для собак испытывающих нагрузки',199,'Royal Canin','Россия/Франция',1,1,'Корм','2.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(7,'Club CC корм для собак старше 12 месяцев с нормальной активностью',189.8,'Royal Canin','Россия/Франция',1,1,'Корм','1.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(8,'Миска Стрекоза, 450 мл',14.99,'Triol','Китай',1,1,'Содержание и уход','triol_dog_bowl_450.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(9,'Миска Рыбка, 150 мл',10.99,'Triol','Китай',1,1,'Содержание и уход','triol_dog_bowl_150.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(10,'Лежанка для животных ТОТО-2, серо-голубой, 50х50 см',103.99,'TotoPets','Беларусь',1,1,'Содержание и уход','toto_dog_bed.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(11,'Prescription Diet Metabolic Корм сухой диетический для кошек, способствует снижению и контролю веса',96.2,'Hills','Нидерланды',1,2,'Диетический Корм','hills_prescription_diet_cat.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(12,'Renal Feline Корм диетический для взрослых кошек для поддержания функции почек',3.69,'Royal Canin','Австрия',1,2,'Диетический Корм','rc_cat_renal_feline.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(13,'Urinary S/O Moderate Calorie Корм диетический для кошек при мочекаменной болезни',3.69,'Royal Canin','Австрия',1,2,'Диетический Корм','rc_urinary_cat_moderate_calorie.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(14,'\"Аппетитные кусочки\" Корм консервированный для кошек',0.99,'Felix','Россия',1,2,'Корм','3.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(15,'Cherie курица в подливке',5.47,'Pettric','Тайланд',1,2,'Корм','Cherie_cat_chichen.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(16,'Cherie Original taste Корм консервированный для кошек',5.25,'Pettric','Тайланд',1,2,'Корм','pettric_cherie_cat_original.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(17,'Наполнитель комкующийся для кошачьего туалета',11.19,'СиСиКэт','Россия',1,2,'Наполнители','sisicat_cat.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(18,'Наполнитель древесный для кошачьего туалета',5.99,'Сима','Беларусь',1,2,'Наполнители','sima_cat.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(19,'Наполнитель Tofu Natural (лаванда)',21.69,'FOR CATS','Китай',1,2,'Наполнители','for_cats_cat.png','2024-02-24 23:35:31','2024-02-24 23:35:31'),(20,'Удочка-дразнилка телескопическая \"Перо\"',28.99,'Triol','Китай',1,2,'Содержание и уход','triol_fishrod_cat.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(21,'Игрушка для кошек \"Мышь серая\", 45-50мм, 1шт',2.09,'Triol','Китай',1,2,'Содержание и уход','triol_cat_mouse1.png','2024-02-24 23:35:31','2024-02-24 23:35:31'),(22,'Игрушка для кошек \"Мяч для гольфа\", 40мм, 1шт',2.69,'Triol','Китай',1,2,'Содержание и уход','triol_cat_ball1.png','2024-02-24 23:35:31','2024-02-24 23:35:31'),(23,'Корм для канареек',11.98,'Fiory','Италия',1,3,'Корм','fiory_bird_canarini.png','2024-02-24 23:35:31','2024-02-24 23:35:31'),(24,'Корм для средних попугаев',9.89,'RIO','Россия',1,3,'Корм','rio_bird_parakeets.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(25,'Корм для волнистых попугаев Основной рацион - сбалансированная зерновая смесь.',8.69,'RIO','Россия',1,3,'Корм','rio_bird_budgies.png','2024-02-24 23:35:31','2024-02-24 23:35:31'),(26,'Игрушка для птиц \"Вертушка\"',22.99,'Triol','Китай',1,3,'Содержание и уход','triol_bird_toy.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(27,'Набор жердочек (4 шт) для птиц из натурального дерева',21.16,'Trixie','Китай',1,3,'Содержание и уход','trixie_bird_perches.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(28,'Клетка для птиц золотая 330G 40*70 см',199.99,'DAYAang','Китай',1,3,'Содержание и уход','DaYang_bird_cage.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(29,'Crispy Muesli Hamsters&Co Корм полноценный для хомяков и других грызунов',5.54,'Versele-Laga','Венгрия',1,4,'Корм','versele_laga_crispy_muesli_hamsters.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(30,'Корм для шиншилл',5.89,'Little One','Россия',1,4,'Корм','little_one_rodent.png','2024-02-24 23:35:31','2024-02-24 23:35:31'),(31,'Лакомство \"Витамин С\"',10.3,'Little One','Россия',1,4,'Корм','little_one_rodent_vitC.png','2024-02-24 23:35:31','2024-02-24 23:35:31'),(32,'игрушка для грызунов с колокольчиком нат. дерево 5х7см',13.99,'Trixie','Китай',1,4,'Содержание и уход','trixie_rodent_toy.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(33,'Игрушка для грызунов \"Плетеный мяч\", диам. 10 см.',11.99,'Trixie','Китай',1,4,'Содержание и уход','trixie_rodent_ball.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(34,'домик для грызунов, подвесной, 9x12x16см',21.99,'Trixie','Китай',1,4,'Содержание и уход','trixie_rodent_bed.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(35,'песок для купания шиншилл 1 кг',18.99,'Little One','Россия',1,4,'Наполнители','little_one_rodent_sand.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(36,'Аквариум 6-гранный 28л',107.99,'Куприянов','Беларусь',1,5,'Аквариумы','aquarium_fish1.png','2024-02-24 23:35:31','2024-02-24 23:35:31'),(37,'Leddy 40 Аквариум, 25л',422.99,'Aquael','Польша',1,5,'Аквариумы','aquael_leddy_fsh.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(38,'Корм Cichlid Algae Pellets',45.06,'Tetra','Нидерланды',1,5,'Корм','tetra_fish_cichlid_algae.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(39,'Корм Sachet Goldfish Colour',3.5,'Tetra','Германия',1,5,'Корм','tetra_fish_sachet_goldfish.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(40,'Корм Tortoise',15.09,'Tetra','Германия',1,5,'Корм','tetra_fish_tortoise.png','2024-02-24 23:35:31','2024-02-24 23:35:31'),(41,'Кондиционер EasyBalance Кондиционер для стабилизации среды обитания рыб, 250 мл',30.99,'Tetra','Германия',1,5,'Содержание и уход','tetra_fish_easybalance.png','2024-02-24 23:35:31','2024-02-24 23:35:31'),(42,'Удобрение PlantaPro Micro, 250 мл',32.49,'Tetra','Германия',1,5,'Содержание и уход','tetra_fish_plantapro_micro.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(43,'Средство AlquMin Plus',27.99,'Tetra','Германия',1,5,'Содержание и уход','tetra_fish_alqumin_plus.png','2024-02-24 23:35:31','2024-02-24 23:35:31'),(44,'Bio Ошейник для кошек и котят от 2-месяцев (от блох, клещей и комаров)',17.99,'Beaphar','Нидерланды',0,6,'Ветпрепараты','beaphar_bio_veterinary.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(45,'Антигельминтик для кошек',6,'ZООЛЕКАРЬ','Беларусь',1,6,'Ветпрепараты','veterinary_gelminty.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31'),(46,'антигельминтик для собак',7.2,'ZООЛЕКАРЬ','Беларусь',1,6,'Ветпрепараты','veterinary_gelminty1.jpg','2024-02-24 23:35:31','2024-02-24 23:35:31');
/*!40000 ALTER TABLE `prods` ENABLE KEYS */;
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
