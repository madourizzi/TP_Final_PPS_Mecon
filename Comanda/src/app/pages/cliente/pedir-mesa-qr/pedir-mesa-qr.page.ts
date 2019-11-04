import { Component, OnInit } from '@angular/core';
import { MesasService } from 'src/app/services/mesas.service';
import { ArchivosService } from 'src/app/services/archivos.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedir-mesa-qr',
  templateUrl: './pedir-mesa-qr.page.html',
  styleUrls: ['./pedir-mesa-qr.page.scss'],
})
export class PedirMesaQrPage implements OnInit {

  constructor(private spinner: SpinnerService, private router: Router,
    private qr: BarcodeScanner,
    private archivos: ArchivosService,
    private mesasServ: MesasService) { }

  ngOnInit() {
    setTimeout(() => this.spinner.hide(), 500);
  }

  pedirMesaQr() {

    setTimeout(async () => {

      let resp = false;
      await this.mesasServ.asignarMesaDisponible(10).then((e) => {
    
        if (this.mesasServ.mesaActual.estado=="reservada") {
          this.router.navigate(['/ocupar-mesa']);
        }

      })

    }, 1000)
  }


}
