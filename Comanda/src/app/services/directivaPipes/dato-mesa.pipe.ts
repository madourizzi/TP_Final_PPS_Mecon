import { Pipe, PipeTransform } from '@angular/core';
import { MesasService } from '../mesas.service';
import { Mesa } from 'src/app/models/mesa';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Pipe({
  name: 'datoMesa'
})
export class DatoMesaPipe implements PipeTransform {

  numero;

  constructor(private mesaSer: MesasService) {

  }

  transform(value: any, args?: any): Mesa {

      if (value != null) {
        this.traeDatoMesa(value).then(()=> {return this.numero});
  

          
      
      }
      else {
        return value;
      }
   
  }


  async  traeDatoMesa(value) {
    let resp;
    await this.mesaSer.traerUnaMesaUID(value).subscribe((e) => {
      let data = e.payload.data() as Mesa;
      console.log('dara', data);
      this.numero = data.numero;
    });

  }


}
