const reservas = [];

// Crear una nueva reserva (POST)
const crearReserva = (req, res) => {
    const nuevaReserva = req.body;
    nuevaReserva.id = Date.now(); 
    reservas.push(nuevaReserva);
    res.status(201).json(nuevaReserva);
};

// Obtener todas las reservas (GET)
const obtenerReservas = (req, res) => {
    res.json(reservas);
};

// Obtener una reserva por ID (GET)
const obtenerReservaPorId = (req, res) => {
    const { id } = req.params;
    const reserva = reservas.find((r) => r.id == id);
    if (reserva) {
    res.json(reserva);
    } else {
    res.status(404).json({ mensaje: "Reserva no encontrada" });
    }
};

// Actualizar una reserva por ID (PUT)
const actualizarReserva = (req, res) => {
    const { id } = req.params;
    const index = reservas.findIndex((r) => r.id == id);

    if (index !== -1) {
    reservas[index] = { ...reservas[index], ...req.body };
    res.json(reservas[index]);
    } else {
    res.status(404).json({ mensaje: "Reserva no encontrada" });
    }
};

// Eliminar una reserva por ID (DELETE)
const eliminarReserva = (req, res) => {
    const { id } = req.params;
    const index = reservas.findIndex((r) => r.id == id);

    if (index !== -1) {
    const reservaEliminada = reservas.splice(index, 1);
    res.json({ mensaje: "Reserva eliminada", reserva: reservaEliminada[0] });
    } else {
    res.status(404).json({ mensaje: "Reserva no encontrada" });
    }
};

module.exports = {
    crearReserva,
    obtenerReservas,
    obtenerReservaPorId,
    actualizarReserva,
    eliminarReserva,
};
