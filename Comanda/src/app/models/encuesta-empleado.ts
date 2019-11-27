export class EncuestaEmpleado {

    empleadoId: string;
    estadoPuestoTrabajo: number;
    estadoBanos: number;
    estadoSalon: number;
    limpiaMesas: any;
    basuraPisos: any;
    timestamp: Date;

    constructor(){}

    dameJSON() {
        return JSON.parse(JSON.stringify(this));
    }
}
