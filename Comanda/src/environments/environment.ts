// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import * as firebase from 'firebase';
import { SpinnerPage } from '../app/pages/spinner/spinner.page';

export let spinner = undefined;

export let SPINNER_IMG = "assets/icon/icon.png";





export const environment = {
  production: false
};

export const firebaseConfig = {
  apiKey: "AIzaSyAVhwce5JmRFPQ9m8v-X0LECZjOo2IZk54",
  authDomain: "lacomandapps.firebaseapp.com",
  databaseURL: "https://lacomandapps.firebaseio.com",
  projectId: "lacomandapps",
  storageBucket: "lacomandapps.appspot.com",
  messagingSenderId: "1096979809038",
  appId: "1:1096979809038:web:114d99af33f8ae58a44d5f",
  measurementId: "G-2PF084EC23"

};

export const showAlert = async function (alertCtrl: any, title: string, message: string) {
  const alert = await alertCtrl.create({
    title: title,
    message: message,
    cssClass: 'alertConfirm',
    buttons: [
      {
        text: 'Ok',
        handler: () => {

        }
      }
    ]
  });
  alert.present();
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const spin = async function (modalCtrl: any, status: boolean) {
  if (spinner === undefined && status === true) {
    spinner = modalCtrl.create(SpinnerPage);
    spinner.present();
  } else if (spinner !== undefined && status === false) {
    spinner.dismiss();
    spinner = undefined;
  }
}

export const wait = function (ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

export const uploadImage = function (image: string, path: string): any {
  let data = getBlob(image);
  let storageRef = firebase.storage().ref();
  let imageRef = storageRef.child(path);
  imageRef.put(data).then((snapshot) => {
    console.log('Imagen subida exitosamente: ' + path);
  });
}

export const getBlob = function (b64Data): any {
  let contentType = '';
  let sliceSize = 512;

  b64Data = b64Data.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');

  let byteCharacters = atob(b64Data);
  let byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize);

    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    let byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  let blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

export const round = function (value, exp) {
  if (typeof exp === 'undefined' || +exp === 0)
    return Math.round(value);

  value = +value;
  exp = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
    return NaN;

  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}

export const getRandomColor = function () {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const getImageURL = function (path: string): any {
  let storageRef = firebase.storage().ref();
  let imageRef = storageRef.child(path);
  return imageRef.getDownloadURL();
}

export const replaceAll = function(text, str1, str2, ignore?) 
{
    return text.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 
