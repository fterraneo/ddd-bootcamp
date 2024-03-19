USE mysql;
CREATE DATABASE IF NOT EXISTS ddd_bootcamp;
USE ddd_bootcamp;
CREATE TABLE IF NOT EXISTS aircrafts(model VARCHAR(30), snapshot JSON, version integer, PRIMARY KEY (model));
CREATE TABLE IF NOT EXISTS seats(ID VARCHAR(30), snapshot JSON, version integer, PRIMARY KEY (ID));
