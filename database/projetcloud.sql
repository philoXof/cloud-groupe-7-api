DROP DATABASE IF EXISTS `projetcloud`;
CREATE DATABASE `projetcloud`;

DROP TABLE IF EXISTS `image`
CREATE TABLE `image` (
    firstname varchar(80),
    lastname varchar(80),
    url varchar(255),
    timestamp date default CURRENT_DATE
);
