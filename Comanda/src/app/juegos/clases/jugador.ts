export class Jugador {
    public uid:string;
    public descuento: number =0;
    public jugadas: number =0;

    constructor(uid?: string, descuento?: number,jugadas?:number) {
        this.uid = uid;
        if(jugadas > 0){
            this.jugadas=jugadas;
        }
        if(descuento > 0){
            this.descuento = descuento;
        }
       
       
      
      }
    
}
