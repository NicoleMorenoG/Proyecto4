const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
    openapi: "3.0.0",
    info: {
        title: "API de Reservas",
        version: "1.0.0",
        description: "Documentación de la API para gestión de reservas",
    },
    servers: [
        {
        url: "http://localhost:3000", 
        },
    ],
    },
    apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("✨ Documentación Swagger activa en http://localhost:3000/api-docs");
}

module.exports = swaggerDocs;
