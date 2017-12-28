import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Camera, CameraOptions } from "@ionic-native/camera";

import Tesseract from 'tesseract.js';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  image: string = null;

  constructor(public navCtrl: NavController, private camera: Camera) {}

  getPicture() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100,
      correctOrientation: true,
    };
    this.camera
      .getPicture(options)
      .then(imageData => {
        console.log(imageData);
        this.image = imageData;
        Tesseract.recognize(imageData, {
          tessedit_char_whitelist: ':/-0123456789ABCDEFGHIGJKMNLOPQRSTVWXYZ'
        })
          .progress(p => {
            console.log("progress", p);
          })
          .then(result => {
            console.log("result", result);
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        console.error(error);
      });
  }
}
