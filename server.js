const express = require('express');
const dotenv = require('dotenv');
const reservasRoutes = require('./routes/reservaRoutes');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDocs = require('./swagger/swagger');

// Configuración dotenv
dotenv.config();
const app = express();
swaggerDocs(app); // Inicializar Swagger
const PORT = process.env.PORT || 3000;

// para leer JSON
app.use(express.json());

// Conectar rutas de reservas
app.use('/api/reservas', reservasRoutes);

// Ruta base para probar
app.get('/', (req, res) => {
  res.send('¡API de Reservas funcionando! Probando conexión...');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(` Servidor escuchando en el puerto ${PORT}`);
});
