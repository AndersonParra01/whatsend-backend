import "reflect-metadata";
import 'dotenv/config';
import express from "express";

import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";

import apiRoutes from "./routes/apiRoutes";
import { initWhatsapp } from "./libs/whatsapp";
import { setupSocket } from "./libs/socket.io";
import { AppDataSource } from "./database/data-source";

const app = express();
app.use(express.json());

// Middleware para CORS
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});
const port = 5000;


// Configurar WebSockets
setupSocket(io);

// Rutas con versionamiento: ejemplo /api/v1
app.use("/api/v1", apiRoutes);

// Iniciar WhatsApp
initWhatsapp(io);

// Inicializar la base de datos
AppDataSource.initialize().then(() => {
  console.log("Data source initialized");
  server.listen(port, () => {
    console.log(`Server is running on port more ${port}`);
  });

}).catch((err) => {
  console.error("Error inicializando la base de datos:", err);
});
