import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import { LectorQrService } from 'src/app/services/lector-qr.service';
import { showAlert, spin } from 'src/environments/environment';

@Component({
  selector: 'app-listado-espera',
  templateUrl: './listado-espera.page.html',
  styleUrls: ['./listado-espera.page.scss'],
})
export class ListadoEsperaPage {
  registros: Array<any>;
  usuario;

  constructor(
    public alertCtrl: AlertController,
    public modalController: ModalController,
    public usuarioService: UsersService,
    private qrService: LectorQrService
  ) {
    this.usuario = JSON.parse(sessionStorage.getItem("usuario"));
    this.registros = new Array<any>();
    this.cargarLista();
  }

  agregarse() {

    if (
      this.registros.filter(function (registro) {
        return registro.nombre === JSON.parse(sessionStorage.getItem("usuario")).nombre
      }).length === 1
    ) {
      showAlert(this.alertCtrl, "Error", "Ya existe un usuario con su nombre en la lista de espera");
      return false;
    }

    this.qrService.readQR().then(barcodeData => {
      try {
        var data = JSON.parse(barcodeData.text);
        if (
          typeof (data.listaDeEspera) !== 'undefined' &&
          data.listaDeEspera === true
        ) {

          let registro: any = {
            nombre: JSON.parse(sessionStorage.getItem("usuario")).nombre,
            fecha: Date.now()
          };

          spin(this.modalController, true);

          this.usuarioService.cargarRegistroListaDeEspera(JSON.parse(JSON.stringify(registro))).then(() => {
            spin(this.modalController, false);
            showAlert(this.alertCtrl, "Exito", "Agregado a la lista de espera exitosamente");
          })
            .catch(error => {
              console.log(error);
              spin(this.modalController, false);
            });
        }
      } catch (err) {
        showAlert(this.alertCtrl, "Error", "QR invalido");
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  cargarLista() {
    this.usuarioService.traerListaDeEspera().subscribe(arr => {
      console.log(arr);
      this.registros = arr.map(function (registro, index) {
        return {
          nombre: JSON.parse(JSON.stringify(registro)).nombre,
          fecha: JSON.parse(JSON.stringify(registro)).fecha,
          indice: index + 1
        }
      });
    });;
  }
}
