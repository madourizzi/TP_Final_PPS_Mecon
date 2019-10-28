export class User {
    // unificar los mail

    email: string;
    password: string;
    nombre: string;
    apellido: string;
    perfil: string;
    foto:string;
    dni:number;
    cuil:number;
    uid;

    constructor() {
        this.perfil = "cliente";
        this.foto ="assets/images/nofoto.jpg";
  
        
    }
}
