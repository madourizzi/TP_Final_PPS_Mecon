export class User {
    // unificar los mail

    email: string;
    password: string;
    perfil: String;
    uid;

    constructor() {
        this.perfil = "cliente";
    }
}
