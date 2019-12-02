import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MesasService } from 'src/app/services/mesas.service';
import { ArchivosService } from 'src/app/services/archivos.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Router } from '@angular/router';
import { Mesa } from 'src/app/models/mesa';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-pedir-mesa-qr',
  templateUrl: './pedir-mesa-qr.page.html',
  styleUrls: ['./pedir-mesa-qr.page.scss'],
})
export class PedirMesaQrPage implements OnInit {

  esperando: boolean;
  @Output() terminar: EventEmitter<any>;
  comensales: number = 9;
  pedida: boolean;
  mesas;

  constructor(private spinner: SpinnerService, private router: Router,
    private qr: BarcodeScanner,     private toastServ: ToastService,
    private archivos: ArchivosService,
    private mesasServ: MesasService) {
    this.pedida = false;
    this.terminar = new EventEmitter();
  }

  ngOnInit() {
    this.spinner.hide();
    this.esperando = false;
    setTimeout(() => this.spinner.hide(), 500);
  }

  pedirMesaQr() {

    if(this.comensales>0 && this.comensales <=16)
    {
      this.mesas=[];
      this.spinner.show();
      setTimeout(async () => {
        this.mesas = new Array();
        let resp = false;
        this.mesasServ.traerTodasDisponible(this.comensales).forEach(e =>
          this.mesas.push(e));
          if (this.mesas.length > 0) {
            this.pedida = true;
            setTimeout(() => this.spinner.hide());
          }
        console.log("this.mesas", this.mesas);
      }, 1000);
    }
    else{
     this.toastServ.errorToast("ingrese entre 1 y 16 comensales por favor")
      this.comensales=1;      
    }


   

  }


  async elegirMesa(mesa) {
    await this.mesasServ.solicitarMesa(mesa).then((log) => {
      if (this.mesasServ.mesaActual != null) {
        this.router.navigate(['/cliente']);
      }
    }
    );

  }





}
