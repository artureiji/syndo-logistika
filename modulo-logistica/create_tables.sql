CREATE TABLE Pedido (id_pedido VARCHAR(255), codigo_rastreio VARCHAR(36), PRIMARY KEY(id_pedido, codigo_rastreio));
CREATE TABLE Rastreio (id_pedido VARCHAR(255) PRIMARY KEY ASC, codigo_rastreio VARCHAR(36), endereco VARCHAR(50), data DATE, mensagem VARCHAR(100));
CREATE TABLE Distancia (uf_origem VARCHAR(2), uf_destino VARCHAR(2), distancia int, PRIMARY KEY(uf_origem, uf_destino));