import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ArchivosService } from 'src/app/services/archivos.service';
import { MesasService } from 'src/app/services/mesas.service';

@Component({
  selector: 'app-ocupar-mesa',
  templateUrl: './ocupar-mesa.page.html',
  styleUrls: ['./ocupar-mesa.page.scss'],
})
export class OcuparMesaPage implements OnInit {

  constructor(private spinner: SpinnerService, private router: Router, 
    private qr: BarcodeScanner,
        private archivos: ArchivosService,
    private mesasServ : MesasService) { }

  ngOnInit() {
  }
  confrimarMesa(){
    setTimeout(async() => {

    await  this.mesasServ.cambiarEstadoMesaOcupada().then((e) => {
      console.log("this.mesasServ.mesaActual.estado", this.mesasServ.mesaActual.estado);
      
        if (this.mesasServ.mesaActual.estado=="ocupada") {
          this.router.navigate(['/cliente']);
        }
      })
 
     }, 1000);
 
   }
   

}
