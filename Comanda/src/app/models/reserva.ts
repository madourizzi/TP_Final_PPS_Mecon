import { User } from "./user";


export class Reserva {
  
    //MODELO USUARIO DE COMANDA
    id: string;              // id - key de FireBase
    mesas: number    // lista de las mesas reservadas	
    cliente: User;      // cliente 
    fecha: string;   // fecha y hora de la reserva ingresada por el usuario
    hora: string;
    estado: string;      // Valores = ["reservada","pendiente"]
    
    constructor(){
      
    }
  
    dameJSON() {
      return JSON.parse( JSON.stringify(this));
    }
  }