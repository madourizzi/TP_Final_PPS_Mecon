import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagesService } from 'src/app/services/images.service';
import { ToastService } from 'src/app/services/toast.service';
import { Image } from 'src/app/models/image';
import { TipoLista } from 'src/app/models/enums/tipo-lista.enum';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { ImageComponent } from 'src/app/components/image/image.component';
import { GalleryType } from 'src/app/models/enums/gallery-type.enum';
import { Voto } from 'src/app/models/voto';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  galleryType: GalleryType;
  title: string;
  tipoLista: TipoLista;
  allPhotos: Image[];
  currentUserId: string;
  galleryTypeEnum = GalleryType;
  PieChart = [];
  barChart = [];
  public votos: any;
  public refUserVote: any;

  constructor(private router: Router,
    private imagesService: ImagesService,
    private modalController: ModalController
  ) {

    if (this.router.url === '/list/cosasLindas/stats') {
      this.tipoLista = TipoLista.CosasLindas;
      this.title = 'Estadísticas - Cosas Lindas';

    } else {
      this.tipoLista = TipoLista.CosasFeas;
      this.title = 'Estadísticas - Cosas Feas';

    }

    this.imagesService.GetAllImagesByType(this.tipoLista).subscribe(images => {
      this.allPhotos = images;
      this.votos = this.allPhotos.map(x => x.votos.length);
      this.refUserVote = this.allPhotos.map(x => x.umail);
     
      this.crearGraficoNice(this.votos, this.refUserVote);
      this.crearGraficoUgly(this.votos, this.refUserVote);
    });

  }

  ngOnInit() {
    
  }

  crearGraficoNice(votos: any, reference: any) {
    //console.log(this.allPhotos);
    this.PieChart = new Chart('pieChart', {
      type: 'doughnut',
      data: {
        labels: reference,
        datasets: [{
          label: 'Las más votadas',
          data: votos,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.4)',
            'rgba(255, 159, 64, 0.3)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      
      options: {      
        scaleShowLabels: false,
        responsive: false,
        title: {
          text: "Las más votadas",
          display: true
        },
        scales: {
          yAxes: [{
            display: false
          }],
          xAxes: [{
            display: false
          }]
        }
        
      } 
    });

    
  }

  crearGraficoUgly(votos: any, reference: any) {

    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: reference,
        datasets: [{
          label: 'Las más votadas',
          data: votos,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.4)',
            'rgba(255, 159, 64, 0.3)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scaleShowLabels: false,
        responsive: false,
        title: {
          text: "Las más votadas",
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }


}
