import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { MesasService } from 'src/app/services/mesas.service';
import { ListadoEsperaPage } from '../listado-espera/listado-espera.page';


@Component({
  selector: 'app-mozo',
  templateUrl: './mozo.page.html',
  styleUrls: ['./mozo.page.scss'],
})
export class MozoPage {

  listaEspera = ListadoEsperaPage;
  
  listaMesas;
  constructor(
    private mesasService: MesasService, public navCtrl: NavController) {
    this.TraerMesas();
  }

  ionViewDidLoad(){
  }

  ListaEspera() {
   // this.navCtrl.push(this.listaEspera);
   this.navCtrl.navigateRoot('/listado-espera');
  }

  TraerMesas() {/*
    this.listaMesas = this.mesasService.mesas;*/

    this.mesasService.TraerMesasMozo().subscribe(arr => {
   
      this.listaMesas = arr.map(function(mesa, index){
        return mesa;
      });
    });
    console.log(this.listaMesas);
  }

  PedidosPendientes() {
    //this.navCtrl.push(PagesPedidosPendientesMozoPage);
    this.navCtrl.navigateRoot('/PagesPedidosPendientesMozoPage');
  }


  Opciones(mesa) {

    if (mesa.estado == "ocupada") {
      //this.navCtrl.push(PagesMesaPage, { "mesa": mesa });
      this.navCtrl.navigateRoot('/PagesMesaPage');
    }
  }

}
