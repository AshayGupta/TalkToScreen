import { Injectable } from "@angular/core";

import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Injectable()
export class Utils {

  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController){}

  public basicAlert(title: string, msg: string){
    let alert = this.alertCtrl.create({
        title: title,
        message: msg,
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'OK',
            handler: () => {

            }
          }
        ]
      });
      alert.present();
  }

  public isBlank(str: any) {
      if (str == null || str == 'null' || str == undefined || str == 'undefined' || str.trim().length == 0) {
          return true;
      }
      else {
          return false;
      }
  }

  public showToast(msg: string, position: string) {
      let toast = this.toastCtrl.create({
          message: msg,
          duration: 4000,
          position: position,
          dismissOnPageChange: true
      });
      toast.present();
  }

  public showToastWithButton(msg: string, position: string, showCloseButton: boolean, closeButtonText: string) {
      let toast = this.toastCtrl.create({
          message: msg,
          duration: 4000,
          position: position,
          showCloseButton: showCloseButton,
          closeButtonText: closeButtonText,
          dismissOnPageChange: true
      });
      toast.present();
  }

  public removeNull(str: any) {
      if (str == "null" || str == null || str == undefined) {
          return "";
      } else {
          return str;
      }
  }

  public getDateTime(){
      return new Date().getTime();
  }

  public roundDigit(item: any, digits: number){
    return (Math.round(item * Math.pow(10, digits)) / Math.pow(10, digits)).toString();
  }

}
