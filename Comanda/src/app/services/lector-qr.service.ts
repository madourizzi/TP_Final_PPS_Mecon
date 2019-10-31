import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Injectable({
  providedIn: 'root'
})
export class LectorQrService {

  constructor(private barcodeScanner: BarcodeScanner) { }


  abrirScanner() {
    
    return this.barcodeScanner.scan().then(barcodeData => {
       return barcodeData.text
    });
    }

    scan() {
      return this.barcodeScanner.scan({ "formats": "PDF_417" }).then(barcodeData => {
        return barcodeData;
      }).catch(err => {
        console.error('Error barcode', err);
        return err;
      });
    }

    readQR(){
      return this.barcodeScanner.scan();
  }



  }
