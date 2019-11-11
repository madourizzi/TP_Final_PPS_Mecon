import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';

@Injectable({
  providedIn: 'root'
})
export class HttpMailService {
  url= "https://us-central1-lacomandapps.cloudfunctions.net/sendMail?dest="
  constructor(public http: HttpClient) {
    console.log('Servicio de mail');
  }

  EnviarMail(mail: string, id:string)
  {
    let direccion= this.url+mail+"&id="+id;
    return this.http.get(direccion, {responseType:'text'}).toPromise();
  }
}
