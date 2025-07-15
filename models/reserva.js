// models/Reserva.js

class Reserva {
    constructor(id, nombre, hotel, tipo_habitacion, estado, num_huespedes, fecha) {
        this.id = id;
        this.nombre = nombre;
        this.hotel = hotel;
        this.tipo_habitacion = tipo_habitacion;
        this.estado = estado;
        this.num_huespedes = num_huespedes;
        this.fecha = fecha;
    }

getInfo() {
    return {
        id: this.id,
        nombre: this.nombre,
        hotel: this.hotel,
        tipo_habitacion: this.tipo_habitacion,
        estado: this.estado,
        num_huespedes: this.num_huespedes,
        fecha: this.fecha
    };
    }
}

module.exports = Reserva;
