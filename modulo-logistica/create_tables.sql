CREATE TABLE Pedido (id_pedido VARCHAR(255), codigo_rastreio VARCHAR(36), PRIMARY KEY(id_pedido, codigo_rastreio));
CREATE TABLE Rastreio (id_pedido VARCHAR(255) PRIMARY KEY ASC, codigo_rastreio VARCHAR(36), endereco VARCHAR(50), data DATE, mensagem VARCHAR(100));
