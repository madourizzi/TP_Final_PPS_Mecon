import { Component, OnInit } from '@angular/core';
import * as HighCharts from 'highcharts';
import { EncuestasService } from 'src/app/services/encuestas.service';
import { EncuestaCliente } from 'src/app/models/encuesta-cliente';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MesasService } from 'src/app/services/mesas.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-encuesta-admin',
  templateUrl: './encuesta-admin.page.html',
  styleUrls: ['./encuesta-admin.page.scss'],
})
export class EncuestaAdminPage implements OnInit {

  url: string;
  encuestas: EncuestaCliente[];

  constructor(private encuestaServ: EncuestasService,
    private authService: AuthService,
    private router: Router,
    private mesaServe: MesasService,
    private usuarioServ: UsersService) {


  }

  ngOnInit() {

    this.encuestaServ.traerTodasEncuestas().subscribe((actions => {
      this.encuestas = [];
      actions.map(a => {
        const data = a.payload.doc.data() as EncuestaCliente;
        const id = a.payload.doc.id;
        data.cliente = id;
        this.encuestas.push(data);
      });
    }));




  }


  ionViewDidEnter() {
    
    setTimeout(() => {
      console.log('respuesta encuestas 1', this.encuestas[0].valorMozo);
      console.log('respuesta encuestas 2', this.encuestas[1].valorMozo);
    }, 3000);

    this.plotSimpleBarChart(this.encuestas);
    this.plotStackedBarChart();
    this.plotNegativeBarChart();
    this.plotVerticalBarChart();
  }

  

  onLogout() {
    this.mesaServe.mesaActual = null;
    this.usuarioServ.limpiarUsuarioActual();
    this.authService.logout();

  }


  async plotSimpleBarChart(encuesta) {

    let encuestas: any[]=await encuesta;
    console.log('djiajds',encuestas)

    let myChart = HighCharts.chart('highcharts', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Satisfacción de usuarios'
      },
      xAxis: {
        categories: ['Mozos', 'Comida', 'Bebida']
      },
      yAxis: {
        title: {
          text: 'Puntajes'
        }
      },
      series: [
        {
          name: encuestas[0],
          type: undefined,
          data: [1, 0, 4]
        },
        {
          name: encuestas[1],
          type: undefined,
          data: [5, 7, 3]
        }]
    });
  }

  plotStackedBarChart() {
    let myChart = HighCharts.chart('stacked', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Stacked bar chart'
      },
      xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total fruit consumption'
        }
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      series: [{
        name: 'John',
        type: undefined,
        data: [5, 3, 4, 7, 2]
      }, {
        name: 'Jane',
        type: undefined,
        data: [2, 2, 3, 2, 1]
      }, {
        name: 'Joe',
        type: undefined,
        data: [3, 4, 4, 2, 5]
      }]
    });
  }

  plotNegativeBarChart() {
    let myChart = HighCharts.chart('negative', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Column chart with negative values'
      },
      xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'John',
        type: undefined,
        data: [5, 3, 4, 7, 2]
      }, {
        name: 'Jane',
        type: undefined,
        data: [2, -2, -3, 2, 1]
      }, {
        name: 'Joe',
        type: undefined,
        data: [3, 4, 4, -2, 5]
      }]
    });
  }

  plotVerticalBarChart() {
    let myChart = HighCharts.chart('vertical', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Fruit Consumption'
      },
      xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
        title: {
          text: 'Fruit eaten'
        }
      },
      series: [
        {
          name: 'Jane',
          type: undefined,
          data: [1, 0, 4]
        },
        {
          name: 'John',
          type: undefined,
          data: [5, 7, 3]
        }]
    });
  }

}
