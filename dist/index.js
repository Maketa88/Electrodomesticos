"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const sqlite3_1 = require("sqlite3");
dotenv_1.default.config();
const app = (0, express_1.default)()
    .use((0, cors_1.default)())
    .use(express_1.default.json())
    .use(express_1.default.urlencoded({ extended: true }));
const PORT = process.env.PORT || 4000;
const db = new sqlite3_1.Database("Electro.db", (err) => {
    if (err) {
        console.error("Error al abrir la base de datos" + err.message);
    }
    else {
        console.log("Conectado a la Base de Datos");
    }
});
app.post('/Api/Electrodomesticos', (req, res) => {
    const { Id, Nombre, Marca, Modelo, Precio, Descripcion } = req.body;
    db.run('INSERT INTO Electrodomesticos(Id,Nombre,Marca,Modelo,Precio,Descripcion) VALUES (?,?,?,?,?,?)', [Id, Nombre, Marca, Modelo, Precio, Descripcion], (err) => {
        if (err) {
            res.status(500).json({ status: 'error', message: err.message });
        }
        else {
            res.status(200).json({ status: 'ok', message: 'Usuario registrado correctamente' });
        }
    });
});
app.get('/Api/Electrodomesticos', (req, res) => {
    db.all('SELECT * FROM Electrodomesticos', (err, rows) => {
        if (err) {
            res.status(500).json({ status: 'error', message: err.message });
        }
        else {
            res.status(200).json(rows);
        }
    });
});
app.get('/Api/Electrodomesticos/:Id', (req, res) => {
    const Id = req.params.Id;
    db.get('SELECT * FROM Electrodomesticos WHERE Id = ?', [Id], (err, row) => {
        if (err) {
            res.status(500).json({ status: 'error', message: err.message });
        }
        else if (row) {
            res.status(200).json(row);
        }
        else {
            res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
        }
    });
});
app.put('/Api/Electrodomesticos/:Id', (req, res) => {
    const Id = req.params.Id;
    const { Nombre, Marca, Modelo, Precio, Descripcion } = req.body;
    db.run('UPDATE Electrodomesticos SET Nombre = ?, Marca = ?, Modelo = ?, Precio = ?, Descripcion = ? WHERE Id = ?', [Nombre, Marca, Modelo, Precio, Descripcion, Id], (err) => {
        if (err) {
            res.status(500).json({ status: 'error', message: err.message });
        }
        else {
            res.status(200).json({ status: 'ok', message: 'Electrodoméstico actualizado correctamente' });
        }
    });
});
app.listen(PORT, () => {
    console.log('Servidor ejecutándose en el puerto:', PORT);
}).on('error', (error) => {
    throw new Error(error.message);
});
