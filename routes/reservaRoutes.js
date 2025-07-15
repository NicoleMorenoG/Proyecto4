const express = require('express');
const router = express.Router();
const {
    crearReserva,
    obtenerReservas,
    obtenerReservaPorId,
    actualizarReserva,
    eliminarReserva
} = require('../controllers/reservasController');

/**
 * @swagger
 * tags:
 *   name: Reservas
 *   description: Gestión de reservas de habitaciones
 */

// 1️⃣ Crear una nueva reserva
/**
 * @swagger
 * /api/reservas:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - fecha
 *               - habitacion
 *             properties:
 *               nombre:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date
 *               habitacion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reserva creada correctamente
 */
router.post('/', crearReserva);

// 2️⃣ Obtener todas las reservas o filtradas por query
/**
 * @swagger
 * /api/reservas:
 *   get:
 *     summary: Obtener todas las reservas o aplicar filtros por query
 *     tags: [Reservas]
 *     parameters:
 *       - in: query
 *         name: hotel
 *         schema:
 *           type: string
 *         description: Nombre del hotel
 *       - in: query
 *         name: tipo_habitacion
 *         schema:
 *           type: string
 *         description: Tipo de habitación
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *         description: Estado de la reserva
 *       - in: query
 *         name: num_huespedes
 *         schema:
 *           type: integer
 *         description: Número de huéspedes
 *       - in: query
 *         name: fecha_inicio
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de inicio (para rango de fechas)
 *       - in: query
 *         name: fecha_fin
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de fin (para rango de fechas)
 *     responses:
 *       200:
 *         description: Lista de reservas (filtradas o no)
 */
router.get('/', obtenerReservas);

// 3️⃣ Obtener una reserva por ID
/**
 * @swagger
 * /api/reservas/{id}:
 *   get:
 *     summary: Obtener una reserva por ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Detalles de la reserva
 *       404:
 *         description: Reserva no encontrada
 */
router.get('/:id', obtenerReservaPorId);

// 4️⃣ Actualizar una reserva
/**
 * @swagger
 * /api/reservas/{id}:
 *   put:
 *     summary: Actualizar una reserva por ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               fecha:
 *                 type: string
 *               habitacion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reserva actualizada
 *       404:
 *         description: Reserva no encontrada
 */
router.put('/:id', actualizarReserva);

// 5️⃣ Eliminar una reserva
/**
 * @swagger
 * /api/reservas/{id}:
 *   delete:
 *     summary: Eliminar una reserva por ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Reserva eliminada
 *       404:
 *         description: Reserva no encontrada
 */
router.delete('/:id', eliminarReserva);

module.exports = router;
