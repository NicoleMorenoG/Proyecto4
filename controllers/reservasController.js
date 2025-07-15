// Almacén temporal de reservas (solo en memoria)
const reservas = [];

// Crear una nueva reserva
const crearReserva = (req, res) => {
    const nuevaReserva = req.body;
    nuevaReserva.id = Date.now(); // ID único
    reservas.push(nuevaReserva);
    res.status(201).json(nuevaReserva);
};

// Obtener todas las reservas o filtrar por query params (Rúbrica 6️ a 10)
const obtenerReservas = (req, res) => {
    let resultado = [...reservas];
    const {
        hotel,
        tipo_habitacion,
        estado,
        num_huespedes,
        fecha_inicio,
        fecha_fin
    } = req.query;

    if (hotel) {
        resultado = resultado.filter(r => r.hotel?.toLowerCase() === hotel.toLowerCase());
    }

    if (tipo_habitacion) {
        resultado = resultado.filter(r => r.tipo_habitacion?.toLowerCase() === tipo_habitacion.toLowerCase());
    }

    if (estado) {
        resultado = resultado.filter(r => r.estado?.toLowerCase() === estado.toLowerCase());
    }

    if (num_huespedes) {
        resultado = resultado.filter(r =>
            r.num_huespedes && Number(r.num_huespedes) === Number(num_huespedes)
        );
    }

    if (fecha_inicio && fecha_fin) {
        const inicio = new Date(fecha_inicio);
        const fin = new Date(fecha_fin);

        resultado = resultado.filter(r => {
            const fechaReserva = new Date(r.fecha);
            return !isNaN(fechaReserva) && fechaReserva >= inicio && fechaReserva <= fin;
        });
    }

    // ✅ Si no hay resultados y se usaron filtros, enviar 404 con mensaje
    const seAplicaronFiltros = hotel || tipo_habitacion || estado || num_huespedes || (fecha_inicio && fecha_fin);
    if (seAplicaronFiltros && resultado.length === 0) {
        return res.status(404).json({ mensaje: "No se encontraron reservas con los criterios proporcionados" });
    }

    res.json(resultado);
};

// Obtener una reserva por su ID
const obtenerReservaPorId = (req, res) => {
    const { id } = req.params;
    const reserva = reservas.find((r) => r.id == id);
    if (reserva) {
        res.json(reserva);
    } else {
        res.status(404).json({ mensaje: "Reserva no encontrada" });
    }
};

// Actualizar una reserva por su ID
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

// Eliminar una reserva por su ID
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
    eliminarReserva
};
