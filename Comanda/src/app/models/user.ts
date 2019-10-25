export class User {
    private mail: String;
    private perfil: String;
    private sexo: String;
    email: string;
    password: string;
    /**
     *
     */
    constructor(mail: string, perfil: string, sexo: string) {
        this.mail = mail;
        this.perfil = perfil;
        this.sexo = sexo;
    }
}
