import { Utils } from './../../App Constants/utils';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ToastPosition } from '../../App Constants/constants';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private startListen: boolean = true

  constructor(public navCtrl: NavController, private speechRecognition: SpeechRecognition, private utils: Utils) {
    this.isSpeechRecognitionAvailable()
  }

  // ngOnInit() {
  //   let timer = Observable.timer(0, 5000);
  //   timer.subscribe(t => { 
  //     // if (this.startListen) {
  //     // }
  //   });
  // }

  private isSpeechRecognitionAvailable() {
    this.speechRecognition.isRecognitionAvailable().then((available: boolean) => {
      if (available) {
        this.utils.showToast("Recognition is Available", ToastPosition.BOTTOM)
        this.hasPermission()
      }
      else {
        this.utils.showToast("Recognition is not Available", ToastPosition.BOTTOM)
      }
    })
  }

  private hasPermission() {
    this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
      if (hasPermission) {
        this.utils.showToast("Recognition has Permission", ToastPosition.BOTTOM)
        this.startListening()
      }
      else {
        this.utils.showToast("Recognition does't has Permission", ToastPosition.BOTTOM)
        this.requestPermission()
      }
    })
  }

  private requestPermission() {
    this.speechRecognition.requestPermission().then(() => {
      this.utils.showToast("Permission Granted", ToastPosition.BOTTOM)
      this.startListening()
    },() => {
      this.utils.showToast("Permission Denied", ToastPosition.BOTTOM)
    })
  }

  private startListening() {
    this.utils.showToast("Start Listening", ToastPosition.BOTTOM)
    this.speechRecognition.startListening().subscribe((matches: Array<string>) => {
      console.log(matches)
      this.startListening()
    }, (onerror) => {
      console.log('error:', onerror)
      this.startListening()
    })
  }
}


