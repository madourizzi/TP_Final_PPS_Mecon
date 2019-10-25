import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor( private spinner: SpinnerService) { }

  ngOnInit() {
    setTimeout(()=>    this.spinner.hide(), 1000  )
  }

}
