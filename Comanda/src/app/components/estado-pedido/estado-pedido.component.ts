import { Component, Input } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { LectorQrService } from 'src/app/services/lector-qr.service';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-estado-pedido',
  templateUrl: './estado-pedido.component.html',
  styleUrls: ['./estado-pedido.component.scss'],
})
export class EstadoPedidoComponent {

  @Input() pedido: Pedido;



  constructor(
    private pedidoService: PedidosService,
    private qrService: LectorQrService,
  ) { }


  async ConfirmarEntrega() {

    this.pedidoService.actualizarUnPedido(this.pedido.uid).update({

      'estado': 'recibido'

    }).then(() => {

      console.log('Documento editado exitósamente');

    }).catch(error => {
      console.log('Error editando documento', error);
    });

  }

  IndicarPropina() {
    this.qrService.scan().then(QRdata => {

      let gradoSafisfaccion: number;

      switch (QRdata.text) {
        case 'Excelente':
          gradoSafisfaccion = 0.20
          break;

        case 'Muy Bien':
          gradoSafisfaccion = 0.15
          break;

        case 'Bien':
          gradoSafisfaccion = 0.10
          break;

        case 'Regular':
          gradoSafisfaccion = 0.5
          break;

        case 'Malo':
          gradoSafisfaccion = 0
          break;
      }



      this.pedidoService.actualizarUnPedido(this.pedido.uid).update({

        'propina': Math.round((this.pedido.costo * gradoSafisfaccion) * 100) / 100

      }).then(() => {

        console.log('Documento editado exitósamente');

      }).catch(error => {
        console.log('error editando documento', error);


      });

    });

  }

  SolicitarCuenta() {


    this.pedidoService.actualizarUnPedido(this.pedido.uid).update({

      'estado': 'solicita_cuenta'

    }).then(() => {

      console.log('Documento editado exitósamente');

    }).catch(error => {
      console.log('Error editando documento', error);
    });

  }

}

