import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { User } from 'src/app/models/user';
import { AlertController, NavController, NavParams, ModalController } from '@ionic/angular';
import { EncuestasService } from 'src/app/services/encuestas.service';
import { UsersService } from 'src/app/services/users.service';
import { EncuestaCliente } from 'src/app/models/encuesta-cliente';
import { round, getRandomColor } from 'src/environments/environment';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;

  encuestas: Array<any> = Array<any>();

  usuario: User;
  public encuestasClientes: EncuestaCliente[];
  public encuestaACargar: EncuestaCliente;

  encuestasCargadasUsuario: boolean = false;
  encuestaMostrada: boolean = false;
  graficoMostrado: boolean = false;

  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    public encuestaService: EncuestasService,
    public modalController: ModalController) {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));

    this.encuestaService.traerTodasEncuestas().subscribe((actions => {
      this.encuestas = [];
      actions.forEach((e) => {
        let data = e.payload.doc.data() as EncuestaCliente;
        this.encuestas.push(data);
      });

    }));

console.log('dale plis', this.encuestas)

  
      this.cargarEncuestas();
  

  }

  inicializarEncuesta() {
    this.encuestaACargar = new EncuestaCliente();
    this.encuestaACargar.valorRestaurant = 1;
  }

  cargarEncuestas() {

    this.encuestaService.traerEncuestas().subscribe(encuestas => {
      this.encuestasClientes = encuestas;
    });
  }

  public validarEncuestaCargada() {
    let encuestasFiltradaCliente: EncuestaCliente[] = new Array<EncuestaCliente>();

    if (this.usuario.perfil === "admin") {

      if (encuestasFiltradaCliente.length > 0) {
        this.encuestasCargadasUsuario = true;
      };

    }

  }

  ngOnInit() {
    /*  this.encuestaService.traerTodasEncuestas().subscribe((actions => {
      this.encuestas = [];
      actions.forEach((e) => {
        let data = e.payload.doc.data() as EncuestaCliente;
        this.encuestas.push(data);
      });

    }));

console.log('dale plis', this.encuestas) */
 
    setTimeout(() => {
      this.cargarGrafico();
    }, 3000);


  }


  async cargarGrafico() {

    let encuestasAGraficar: Array<EncuestaCliente>;

    console.log('encuestas clientes?', this.encuestasClientes)

    encuestasAGraficar = this.cargarMockData(this.encuestasClientes); //Comentar para testear


    var graphLabels = ["valorMozo", "valorCocinero", "valorBartender", "valorMesa", "valorRestaurant"];
    var data = [];
    var colors = [];

    //Por cada atributo, saco los numeros de todas las encuestas, y de la suma de todos esos numeros, saco el promedio.
    //Si el atributo es basuraPiso/usaBienBaño/limpiaMesa, que son checkbox, solamente los sumo, no saco el promedio
    if (encuestasAGraficar.length !== 0) {
      graphLabels.forEach(function (label) {
        console.log('encuestas? ',encuestasAGraficar)
        if (label === "valorc") {
          data.push(round((encuestasAGraficar.map(encuesta => { return encuesta[label] }).reduce(function (total, sum) { return total + sum })), 2))
        } else {
          data.push(round((encuestasAGraficar.map(encuesta => { return encuesta[label] }).reduce(function (total, sum) { return total + sum })) / encuestasAGraficar.length, 2))
        }
        colors.push(getRandomColor());
        /* if (label === "valorRestaurant") {
          data.push(round((encuestasAGraficar.map(encuesta => { return encuesta[label] }).reduce(function (total, sum) { return total + sum })), 2))
        } else {
          data.push(round((encuestasAGraficar.map(encuesta => { return encuesta[label] }).reduce(function (total, sum) { return total + sum })) / encuestasAGraficar.length, 2))
        }
        colors.push(getRandomColor()); */
      });
    }
    graphLabels[graphLabels.indexOf("valorMozo")] = "Atención de los mozos";
    graphLabels[graphLabels.indexOf("valorCocinero")] = "Comida";
    graphLabels[graphLabels.indexOf("valorBartender")] = "Bebida / tragos";
    graphLabels[graphLabels.indexOf("valorMesa")] = "Estado de la mesa";
    graphLabels[graphLabels.indexOf("valorRestaurant")] = "Restaurant";
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: graphLabels,
        datasets: [{
          label: '# promedio de calificacion',
          data: data,
          backgroundColor: colors
        }]
      },
      options: {
        legend: {
          display: true
        }
      }

    });
  }

  mostrarEncuesta() {
    if (this.encuestaMostrada)
      this.encuestaMostrada = false;
    else
      this.encuestaMostrada = true;
  }


  mostrarGrafico() {
    if (this.graficoMostrado) {
      this.graficoMostrado = false;
      document.getElementById('grafico').style.display = 'none';
    } else {
      this.graficoMostrado = true;
      document.getElementById('grafico').style.display = 'block';
      this.cargarGrafico();
    }
  }

  cargarMockData(encuestasAGraficar: Array<EncuestaCliente>) {
    let a: any = new Object();
    a.cliente = null;
    a.valorMozo = 8;
    a.valorCocinero = 7;
    a.valorBartender = 8;
    a.valorMesa = 8;
    a.valorRestaurant = 5;

    let b: any = new Object();
    b.cliente = null;
    b.valorMozo = 5;
    b.valorCocinero = 7;
    b.valorBartender = 8;
    b.valorMesa = 8;
    b.valorRestaurant = 6;

    encuestasAGraficar.push(a, b);
    return encuestasAGraficar;
  }

}
