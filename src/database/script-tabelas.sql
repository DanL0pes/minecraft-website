-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

create database CreeperGuide;

use CreeperGuide;

create table usuario(
	id int not null primary key auto_increment,
    foto varchar(200),
    nome varchar(80) not null,
    email varchar(100) not null,
    senha varchar(50) not null,
    motivo_acesso varchar(70) not null,
    xp int not null
);