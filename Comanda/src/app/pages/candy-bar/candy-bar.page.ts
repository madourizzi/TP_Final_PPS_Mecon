import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-candy-bar',
  templateUrl: './candy-bar.page.html',
  styleUrls: ['./candy-bar.page.scss'],
})
export class CandyBarPage implements OnInit {

  title ="postres";
  constructor(private spinner: SpinnerService) { }

  ngOnInit() {
    this.spinner.hide();
  }


}
