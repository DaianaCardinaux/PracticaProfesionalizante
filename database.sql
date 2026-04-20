CREATE DATABASE Instituto;

use Instituto;

CREATE TABLE Profesores (
    ID_Profesor INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(60),
    Email VARCHAR(50) UNIQUE
);

CREATE TABLE Carreras (
    ID_Carrera INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(60)
);

CREATE TABLE Alumnos (
    ID_Alumno INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(60),
    DNI VARCHAR(20) UNIQUE,
    Email VARCHAR(50) UNIQUE,
    ID_Carrera INT,

    FOREIGN KEY (ID_Carrera) REFERENCES Carreras(ID_Carrera)
);

CREATE TABLE Materias (
    ID_Materia INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(60),
    Curso VARCHAR(10),
    ID_Profesor INT,
    ID_Carrera INT,

    FOREIGN KEY (ID_Profesor) REFERENCES Profesores(ID_Profesor),
    FOREIGN KEY (ID_Carrera) REFERENCES Carreras(ID_Carrera)
);