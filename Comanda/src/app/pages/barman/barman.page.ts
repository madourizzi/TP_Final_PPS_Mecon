import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-barman',
  templateUrl: './barman.page.html',
  styleUrls: ['./barman.page.scss'],
})
export class BarmanPage implements OnInit {

  title=" barra de tagos y vinos";
  constructor(private spinner: SpinnerService) { }

  ngOnInit() {
    this.spinner.hide();
  }


}
