const express = require('express');
const dotenv = require('dotenv');
const reservasRoutes = require('./routes/reservaRoutes');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Configuración dotenv
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// para leer JSON
app.use(express.json());

// Conectar rutas de reservas
app.use('/api/reservas', reservasRoutes);

// Documentación Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Reservas',
      version: '1.0.0',
      description: 'Documentación de la API para gestión de reservas',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Ruta base para probar
app.get('/', (req, res) => {
  res.send('¡API de Reservas funcionando! Probando conexión...');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(` Servidor escuchando en el puerto ${PORT}`);
});
