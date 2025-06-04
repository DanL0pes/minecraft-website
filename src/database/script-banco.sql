-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

drop database if exists CreeperGuide;

create database CreeperGuide;

use CreeperGuide;

create table usuario(
	id int not null primary key auto_increment,
    foto varchar(200),
    nome varchar(80) not null,
    email varchar(100) not null,
    senha varchar(50) not null,
    xp int not null,
    dt_cadastro datetime default current_timestamp
);

create table pergunta(
	id int not null auto_increment,
	fkusuario int not null,
    titulo varchar(70) not null,
    descricao text,
    data_post datetime default current_timestamp,
    estado varchar(30) not null default 'ativo',
    constraint usuario_pergunta foreign key(fkusuario) references usuario(id),
    primary key(id, fkusuario)
);

create table resposta(
	fkpergunta int not null,
    id int not null,
    usuario int not null,
    descricao varchar(200) not null,
    fkusuario int not null,
    constraint pergunta_resposta foreign key(fkpergunta, fkusuario) references pergunta(id, fkusuario),
    constraint usuario_resposta foreign key(usuario) references usuario(id),
    primary key (fkpergunta, id, usuario)
);

create table curso(
	id int primary key not null auto_increment,
    nome varchar(80) not null,
    tipo varchar(160) not null
);

create table aula(
	id int not null,
    fk_curso int,
    nome varchar(80) not null,
    duracao int not null,
    descricao varchar(120),
    conteudo mediumtext not null,
    constraint fk_aula_curso foreign key(fk_curso) references curso(id),
    primary key(id, fk_curso)
);

create table usuario_curso(
	fk_usuario int,
    fk_curso int,
    dt_inscricao datetime default current_timestamp,
    dt_conclusao datetime,
    constraint usuario_curso_usuario foreign key(fk_usuario) references usuario(id),
    constraint usuario_curso_curso foreign key(fk_curso) references curso(id),
    primary key(fk_usuario, fk_curso)
);

create table usuario_curso_aula(
	fk_usuario int,
    fk_curso int,
    fk_aula int,
    dt_conclusao datetime default current_timestamp,
    constraint usuario_curso_aula_usuario foreign key(fk_usuario) references usuario(id),
    constraint usuario_curso_aula_curso foreign key(fk_aula, fk_curso) references aula(id, fk_curso),
    primary key(fk_usuario, fk_curso, fk_aula)
);

create table item(
	id int auto_increment primary key,
    nome varchar(50) not null
);

create table crafting(
	id int auto_increment,
    pos int not null,
    fk_item int,
    constraint fk_crafting_item foreign key(fk_item) references item(id),
    primary key(id, pos)
);

create table jogo(
	id int primary key auto_increment,
    dt_jogo date unique not null,
    resultado varchar(50),
    fk_crafting_id int not null,
    constraint fk_jogo_crafting foreign key(fk_crafting_id) references crafting(id)
);

create table usuario_jogo(
	fk_usuario int,
    fk_jogo int,
    tentativa int,
    acerto boolean not null,
    constraint chk_tentativa check (tentativa between 1 and 5),
    constraint fk_usuariojogo_usuario foreign key(fk_usuario) references usuario(id),
    constraint fk_usuariojogo_jogo foreign key(fk_jogo) references jogo(id),
    primary key(fk_usuario, fk_jogo, tentativa)
);

-- Insert
INSERT INTO item (nome) VALUES
	('Cobblestone'),
    ('Redstone'),
    ('Stick'),
    ('Iron'),
    ('Diamond'),
    ('Coal'),
    ('Oak_Planks');

INSERT INTO crafting (id, fk_item, pos) VALUES
	(1, 6, 2), 
    (1, 3, 5); 

INSERT INTO crafting (id, fk_item, pos) VALUES
	(2, 1, 1),
    (2, 1, 2),
    (2, 1, 3),
    (2, 3, 5),
    (2, 3, 8);
    
INSERT INTO crafting (id, fk_item, pos) VALUES
	(3, 1, 1),
    (3, 1, 2),
    (3, 1, 3),
    (3, 1, 4),
    (3, 1, 6),
    (3, 1, 7),
    (3, 1, 8),
    (3, 1, 9);
    
INSERT INTO jogo (dt_jogo, fk_crafting_id, resultado) VALUES
	('2025-06-03', 1, 'Tocha'),
    ('2025-06-04', 2, 'Picareta_Pedra'),
    ('2025-06-05', 3, 'Fornalha'),
    ('2025-06-06', 1, 'Tocha'),
    ('2025-06-07', 2, 'Picareta_Pedra');
    

INSERT INTO curso (nome, tipo) VALUES 
	('Módulo 1: Fundamentos da Energia', 'Redstone 101 - O Despertar da Energia'),
	('Módulo 2: Mecanismos Interativos', 'Redstone 101 - O Despertar da Energia'),
	('Módulo 1: As Portas Lógicas Fundamentais', 'Engenharia Lógica - Pensando com Blocos'),
	('Módulo 2: Circuitos com Memória e Tempo', 'Engenharia Lógica - Pensando com Blocos'),
	('Módulo 1: Sistemas de Produção', 'Automação Avançada - A Fábrica Inteligente'),
	('Módulo 2: Logística e Computação', 'Automação Avançada - A Fábrica Inteligente');

-- Aulas para o Módulo 1 (fk_curso = 1)
INSERT INTO aula (id, fk_curso, nome, duracao, descricao, conteudo) VALUES
(1, 1, 'O que é Poeira de Redstone?', 10, 'Aprenda onde encontrar, como funciona a poeira e o conceito básico de sinal de energia.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]'),
(2, 1, 'Ligando e Desligando', 15, 'Apresentação das fontes de energia: Alavancas, Botões, Placas de Pressão e Tochas de Redstone.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]'),
(3, 1, 'Estendendo o Sinal', 15, 'Como usar Repetidores para amplificar e controlar o tempo (delay) do sinal de energia.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]'),
(4, 1, 'O Poder do Movimento', 15, 'Introdução aos Pistões (normais e aderentes) e como eles interagem com blocos para criar movimento.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]'),
(5, 1, 'Projeto Prático: A Passagem Secreta', 25, 'Passo a passo para criar uma porta escondida numa parede que abre com uma alavanca.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]');

-- Aulas para o Módulo 2 (fk_curso = 2)
INSERT INTO aula (id, fk_curso, nome, duracao, descricao, conteudo) VALUES
(1, 2, 'Portas, Portinholas e Música', 15, 'Usando Redstone para controlar Portas de Ferro, Alçapões e Blocos de Música para criar sons.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]'),
(2, 2, 'O Observador', 15, 'Como usar o Bloco Observador para detectar mudanças nos blocos e criar reações automáticas.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]'),
(3, 2, 'Defesa Básica com Ejetores', 20, 'Criando Ejetores e Liberadores para armadilhas simples ou sistemas de defesa automatizados.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]'),
(4, 2, 'Projeto Prático: A Campainha e a Porta Automática', 25, 'Construir uma entrada de casa com uma placa de pressão que abre a porta e um botão que toca um Bloco de Música.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]');

-- Aulas para o Módulo 3 (fk_curso = 3)
INSERT INTO aula (id, fk_curso, nome, duracao, descricao, conteudo) VALUES
(1, 3, 'O Inversor (Porta NOT)', 15, 'Entendendo o conceito de "não". Se o sinal está ligado, a saída está desligada. A base de toda a lógica.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]'),
(2, 3, 'A Condição "E" (Porta AND)', 20, 'Criando um circuito que só ativa se DUAS ou mais condições forem verdadeiras.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]'),
(3, 3, 'A Condição "OU" (Porta OR)', 20, 'Construindo um circuito que ativa se UMA OU OUTRA condição for verdadeira.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]'),
(4, 3, 'Projeto Prático: O Cofre de Segurança', 30, 'Construir uma porta de ferro que só abre com uma senha de 3 alavancas na posição correta.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]');

-- Aulas para o Módulo 4 (fk_curso = 4)
INSERT INTO aula (id, fk_curso, nome, duracao, descricao, conteudo) VALUES
(1, 4, 'Criando Pulsos (Clocks)', 20, 'Como construir circuitos que enviam sinais de energia repetidamente, a base da automação.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]'),
(2, 4, 'Memória RS Latch', 25, 'Como fazer um circuito "lembrar" de um estado (ligado ou desligado) com um botão para ligar e outro para desligar.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]'),
(3, 4, 'Elevadores e Pontes', 25, 'Combinando pistões, blocos de slime e circuitos para criar movimento vertical e horizontal.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]'),
(4, 4, 'Projeto Prático: A Ponte Retrátil', 30, 'Desenvolver uma ponte sobre um fosso de lava que pode ser estendida ou retraída com o toque de um botão.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]');

-- Aulas para o Módulo 5 (fk_curso = 5)
INSERT INTO aula (id, fk_curso, nome, duracao, descricao, conteudo) VALUES
(1, 5, 'A Fazenda Semiautomática', 25, 'Usando pistões e água para colher plantações (trigo, cenoura) com um único botão.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]'),
(2, 5, 'A Fazenda 100% Automática', 30, 'Usando Observadores e pistões para criar fazendas de cana-de-açúcar ou bambu que se colhem sozinhas.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]'),
(3, 5, 'Fornalha Industrial', 25, 'Criando um sistema que alimenta a fornalha com combustível e itens para cozinhar/derreter de forma contínua.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]'),
(4, 5, 'Projeto Prático: O Sistema de Comida Infinita', 35, 'Construir uma fazenda automática de galinhas que gera frango cozido sem intervenção do jogador.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]');

-- Aulas para o Módulo 6 (fk_curso = 6)
INSERT INTO aula (id, fk_curso, nome, duracao, descricao, conteudo) VALUES
(1, 6, 'O Organizador de Itens', 35, 'Como criar um sistema com funis que separa automaticamente diferentes itens e os guarda em baús específicos.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]'),
(2, 6, 'Displays e Telas', 30, 'Introdução ao uso de Lâmpadas de Redstone para criar displays de 7 segmentos para mostrar números.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]'),
(3, 6, 'A Calculadora Binária', 45, 'O desafio final: usar as portas lógicas para construir uma máquina que pode somar dois números de 1 bit.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]'),
(4, 6, 'Projeto Final: A Base Autossuficiente', 60, 'Projeto livre onde o aluno deve combinar pelo menos 3 sistemas avançados de automação.', '[Conteúdo completo da aula: texto, vídeo ou guia prático]');