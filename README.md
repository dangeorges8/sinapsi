## Ambiente 

 Aplicação foi testada com JRE8, MVN, utilizando Spring-boot (back-end) e React Js (front-end).
 
## MySQL

O projeto usa MySQL e já deve existir o banco `sinapsi` (configurações adiconais do banco em: sinapsi-master/backend/src/main/resources/application.properties). Caso queira gerar as tabelas manualmente, abaixo desse README tem os comandos SQL.

## Compilação

 Para compilar importe o projeto no Eclipse (*Existing Maven Project*) 

## URL e Inicialização Back-end

Para executar na linha de comando, após o build e download das dependências pelo Eclipse, acessar sinapsi-master/backend e digitar:

	mvn spring-boot:run
	
Está configurada a seguinte URL **apenas** como servidor:

  http://localhost:8080/api/

Para testar apenas a parte back-end do CRUD pode ser utilizada alguma ferramenta para requisições http, como o https://insomnia.rest/download/, por exemplo.

Visualizar todas as subestações:
GET: http://localhost:8080/api/subestacoes

Filtrar por ID:
GET: http://localhost:8080/api/subestacoes/id

Incluir subestação:
POST: http://localhost:8080/api/subestacoes/
Enviar os dados no body (O código não pode ser repetido):
{
  "codigo": "LAP",
  "nome": "Subestação R",
  "latitude": 21.0,
  "longitude": 32.0
}

Editar:
PUT: http://localhost:8080/api/editar/id
{
  "codigo": "MIP",
  "nome": "Subestação A",
  "latitude": 21.0,
  "longitude": 32.0
}

Deletar:
DELETE: http://localhost:8080/api/subestacoes/id

## URL e Inicialização Front-end

Na pasta /sinapsi-master/sinapsi rodar o comando:
  
  npm install
  
  npm start
  
Está configurada a url:
  
  http://localhost:8081/subestacoes

## SQL para geração das tables

Seguem os comandos SQL para o banco MySQL:

```SQL
DROP TABLE IF EXISTS TB_SUBESTACAO;
DROP TABLE IF EXISTS TB_REDE_MT;
CREATE TABLE TB_SUBESTACAO (
  ID_SUBESTACAO int(11) NOT NULL AUTO_INCREMENT, 
  CODIGO        varchar(3) NOT NULL UNIQUE, 
  NOME          varchar(100), 
  LATITUDE      decimal(15, 13) NOT NULL, 
  LONGITUDE     decimal(15, 13), 
  PRIMARY KEY (ID_SUBESTACAO));
  
CREATE TABLE TB_REDE_MT (
  ID_REDE_MT     int(11) NOT NULL AUTO_INCREMENT, 
  ID_SUBESTACAO  int(11) NOT NULL, 
  CODIGO         varchar(5) NOT NULL UNIQUE, 
  NOME           varchar(100), 
  TENSAO_NOMINAL decimal(5, 2), 
  PRIMARY KEY (ID_REDE_MT));

ALTER TABLE TB_REDE_MT ADD CONSTRAINT FK_SUBESTACAO_REDE_MT FOREIGN KEY (ID_SUBESTACAO) REFERENCES TB_SUBESTACAO (ID_SUBESTACAO) ON DELETE Cascade;

--DADOS INICIAIS
INSERT INTO TB_SUBESTACAO(ID_SUBESTACAO, CODIGO, NOME, LATITUDE, LONGITUDE) VALUES (1,'AML','Subestação A', -23.2744134389987, -49.4702838173763);
INSERT INTO TB_SUBESTACAO(ID_SUBESTACAO, CODIGO, NOME, LATITUDE, LONGITUDE) VALUES (2,'MKP','Subestação B', -22.6999266804592, -46.996111878849);
INSERT INTO TB_SUBESTACAO(ID_SUBESTACAO, CODIGO, NOME, LATITUDE, LONGITUDE) VALUES (3,'ZFA','Subestação C', -23.0917377538889, -48.9241617522699);
```
