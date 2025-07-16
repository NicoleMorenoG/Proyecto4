# Proyecto 4 

API de Reservas (Node.js + Express + Swagger) - Proyecto 4 | Bootcamp Desarrollo Web

---

Esta es una API RESTful para gestionar reservas hoteleras, desarrollada como parte de un proyecto académico. Está construida con **Node.js**, **Express** y documentada con **Swagger**. Está **desplegada en Render** y lista para recibir solicitudes.

---

## 🚀 Links importantes

- 🔗 **Render**: [https://proyecto4-29ai.onrender.com](https://proyecto4-29ai.onrender.com)
- 📘 **Documentación Interactiva Swagger**: [https://proyecto4-29ai.onrender.com/api-docs](https://proyecto4-29ai.onrender.com/api-docs)

---

## 📦 Tecnologías usadas

- Node.js
- Express
- Swagger JSDoc
- Render (para despliegue)
- Dotenv (para variables de entorno)
- Thunder Client

---

## ✨ Estructura del proyecto

```
Proyecto4/
├── controllers/
│   └── reservasController.js
├── data/
│   └── reservaData.js
├── models/
│   └── reserva.js
├── node_modules/
├── routes/
│   └── reservaRoutes.js
├── swagger/
│   └── swagger.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── server.js
```

---

## 📚 Endpoints disponibles

### 🔹 POST `/api/reservas`
Crea una nueva reserva. Ejemplo:

```json
{
  "nombre_cliente": "Nicole",
  "hotel": "HotelZ",
  "fecha_inicio": "2025-08-01",
  "fecha_fin": "2025-08-05",
  "tipo_habitacion": "suite",
  "estado": "confirmada",
  "num_huespedes": 2
}
```

---

### 🔹 GET `/api/reservas`
Obtiene todas las reservas o filtra con cualquiera de los siguientes parámetros (pueden combinarse):

| Parámetro         | Ejemplo                         |
|------------------|----------------------------------|
| `hotel`          | `?hotel=HOTEL`                 |
| `fecha`   | `?fecha_inicio=FECHA_INICIO&fecha_fin=FECHA_FIN`      |
| `tipo_habitacion`| `?tipo_habitacion=TIPO_HABITACION`        |
| `estado`         | `?estado=ESTADO`            |
| `num_huespedes`  | `?num_huespedes=NUM_HUESPEDES`              |

Nás abajo explico mi decisión y lógica de agrupar estos endpoints.

🔁 Combinables, por ejemplo:
```
GET /api/reservas?hotel=HotelZ&estado=confirmada&num_huespedes=2
```

---

### 🔹 GET `/api/reservas/:id`
Devuelve una reserva específica por su ID.

---

### 🔹 PUT `/api/reservas/:id`
Actualiza la información de una reserva.

---

### 🔹 DELETE `/api/reservas/:id`
Elimina una reserva.

---

## 🧠 Decisiones importantes de diseño

### ✅ ¿Por qué un solo endpoint con múltiples filtros por query?

En lugar de crear muchas rutas como `/api/reservas/hotel/:hotel`, `/api/reservas/estado/:estado`, etc., decidí agrupar **todos los filtros bajo un solo endpoint**:  
```
GET /api/reservas?hotel=HotelZ&estado=confirmada
```

Aunque varios de los endpoints comparten la misma ruta base (GET /api/reservas), cada uno representa una funcionalidad distinta al filtrar por distintos criterios (como hotel, fechas, tipo de habitación, estado o número de huéspedes). Por esta razón, cada uno se contabiliza como un endpoint individual.
En el caso específico del filtro por fechas, aunque se utilizan dos parámetros (fecha_inicio y fecha_fin), ambos operan en conjunto para definir un único rango de búsqueda, por lo que se consideran como un solo endpoint. Aunque en el Swagger se ven como dos.
Esta agrupación permite realizar búsquedas combinadas (por ejemplo, hotel + tipo de habitación), lo cual mejora la flexibilidad y eficiencia de la API, sin necesidad de crear múltiples rutas adicionales.

**Ventajas:**
- 🔍 Puedes buscar por varios criterios a la vez.
- ✅ Menor duplicación de código.
- 💡 Código más limpio y mantenible.
- 🧪 Swagger agrupa todo en un solo bloque, más ordenado y visual.

---


## ⚙️ Despliegue en Render

- Puerto definido en `.env` → `PORT=10000`
- En `server.js`, se usó:
  ```js
  const PORT = process.env.PORT || 3000;
  ```
  Esto permite que Render defina el puerto automáticamente.
- Comando de inicio:  
  ```
  node server.js
  ```
- Tipo de instancia: Free Tier (512MB RAM / 0.1 CPU)

---

## ✨ Créditos

Nicole Moreno. @NicoleMorenoG
