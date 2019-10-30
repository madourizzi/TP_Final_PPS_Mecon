export class User {
    // unificar los mail

    email: string;
    password: string;
    nombre: string;
    apellido: string;
    foto:string;
    dni:number;
    cuil:string;
    tipo:string;
    perfil: string;
    activo:boolean;
    uid;

    constructor() {
        this.tipo = "cliente";
        this.activo=true;
        this.foto ="assets/images/nofoto.jpg";
  
        
    }
}
