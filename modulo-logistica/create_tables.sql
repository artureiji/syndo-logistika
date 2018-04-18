DROP TABLE IF EXISTS Pedido;
DROP TABLE IF EXISTS Rastreio;
DROP TABLE IF EXISTS Distancia;
DROP TABLE IF EXISTS Entrega;
DROP TABLE IF EXISTS Historico;
DROP TABLE IF EXISTS Chaves;



CREATE TABLE Entrega (codigo_rastreio VARCHAR(36) PRIMARY KEY, id_produto VARCHAR(255), tipo_entrega VARCHAR(20), valor INT, cep_origem VARCHAR(9), cep_destino VARCHAR(9), peso INT, tipo_pacote VARCHAR(10), altura INT, largura INT, comprimento INT, api_key VARCHAR(36));
CREATE TABLE Historico (id int PRIMARY KEY ASC, codigo_rastreio VARCHAR(36), endereco VARCHAR(50), data DATE, mensagem VARCHAR(100), api_key VARCHAR(36));
CREATE TABLE Distancia (uf_origem VARCHAR(2), uf_destino VARCHAR(2), distancia int, PRIMARY KEY(uf_origem, uf_destino));
CREATE TABLE Chaves (api_key VARCHAR(36), owner_name VARCHAR(20))
