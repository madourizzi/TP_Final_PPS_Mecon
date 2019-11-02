export class User {
  
    uid: string;
    perfil: string;
    email: string;      
    nombre: string;      
    apellido: string;
    password: string;      
    dni: number;
    cuil: number;
    estado: string;
    codigoRegistro: number;
    foto: string;  
    activo:boolean;
    
    constructor() {
        this.perfil = "cliente";
        this.activo=true;
        this.foto ="assets/images/nofoto.jpg";      
    }
}
