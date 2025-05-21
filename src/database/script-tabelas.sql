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

create table pergunta(
	id int not null,
	fkusuario int not null,
    titulo varchar(70) not null,
    descricao varchar(200) not null,
    data_post datetime default current_timestamp,
    estado varchar(30) not null default 'ativo',
    constraint usuario_pergunta foreign key(fkusuario) references usuario(id),
    primary key(id, fkusuario)
);

create table resposta(
	fkpergunta int not null,
    fkusuario int not null,
    id int not null,
    descricao varchar(200) not null,
    constraint usuario_pergunta_resposta foreign key(fkusuario, fkpergunta) references pergunta(fkusuario, id),
    primary key (fkpergunta, fkusuario, id)
);