import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-cervecero',
  templateUrl: './cervecero.page.html',
  styleUrls: ['./cervecero.page.scss'],
})
export class CerveceroPage implements OnInit {

  title="Cervecero"
  constructor(private spinner: SpinnerService) { }

  ngOnInit() {
    this.spinner.hide();
  }


}
