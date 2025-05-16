-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE creeper_guide;

USE creeper_guide;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	foto VARCHAR,
	nome VARCHAR(60),
	email VARCHAR(80),
	senha VARCHAR(60),
	motivoCadastro VARCHAR(80),
);