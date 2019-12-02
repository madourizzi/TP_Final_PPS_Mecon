import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.page.html',
  styleUrls: ['./cocina.page.scss'],
})
export class CocinaPage implements OnInit {

  title="Cocina";
  constructor(private spinner: SpinnerService) { }

  ngOnInit() {
    this.spinner.hide();
  }

}
