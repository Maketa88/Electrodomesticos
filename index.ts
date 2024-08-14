import express, { request, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Database } from "sqlite3";

dotenv.config();
const app = express()
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

const db = new Database("Electro.db", (err) => {
  if (err) {
    console.error("Error al abrir la base de datos" + err.message);
  } else {
    console.log("Conectado a la Base de Datos");
  }
});


  app.post ('/Api/Electrodomesticos',(req:Request, res:Response)=>{
    const {Id,Nombre,Marca,Modelo,Precio,Descripcion}=req.body

    db.run('INSERT INTO Electrodomesticos(Id,Nombre,Marca,Modelo,Precio,Descripcion) VALUES (?,?,?,?,?,?)',
        [Id,Nombre,Marca,Modelo,Precio,Descripcion],(err)=>{
            if (err) {
                res.status(500).json({ status: 'error', message: err.message });
              } else {
                res.status(200).json({ status: 'ok', message: 'Usuario registrado correctamente' });
              }
        })
})

app.get('/Api/Electrodomesticos', (req: Request, res: Response) => {
    db.all('SELECT * FROM Electrodomesticos', (err, rows) => {
      if (err) {
        res.status(500).json({ status: 'error', message: err.message });
      } else {
        res.status(200).json(rows);
      }
    });
  });
  
  app.get('/Api/Electrodomesticos/:Id', (req: Request, res: Response) => {
    const Id = req.params.Id;
    db.get('SELECT * FROM Electrodomesticos WHERE Id = ?', [Id], (err, row) => {
      if (err) {
        res.status(500).json({ status: 'error', message: err.message });
      } else if (row) {
        res.status(200).json(row);
      } else {
        res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
      }
    });
  });

  app.put('/Api/Electrodomesticos/:Id', (req: Request, res: Response) => {
    const Id = req.params.Id;
    const {Nombre,Marca,Modelo,Precio,Descripcion} = req.body;
  
    db.run(
      'UPDATE Electrodomesticos SET Nombre = ?, Marca = ?, Modelo = ?, Precio = ?, Descripcion = ? WHERE Id = ?',
      [Nombre,Marca,Modelo,Precio,Descripcion,Id],
      (err) => {
        if (err) {
          res.status(500).json({ status: 'error', message: err.message });
        } else {
          res.status(200).json({ status: 'ok', message: 'Electrodoméstico actualizado correctamente' });
        }
      }
    );
  });
  
   









app.listen(PORT, () => {
    console.log('Servidor ejecutándose en el puerto:', PORT);
  }).on('error', (error: any) => {
    throw new Error(error.message);
  });