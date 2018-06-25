import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private speechRecognition: SpeechRecognition) {
    this.isSpeechRecognitionAvailable()
  }

  private isSpeechRecognitionAvailable() {
    this.speechRecognition.isRecognitionAvailable().then((available: boolean) => {
      console.log(available)
      if (available) {
        this.hasPermission()
      }
    })
  }

  private hasPermission() {
    this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
      console.log(hasPermission)
      if (hasPermission) {
        this.startListening()
      }
      else {
        this.requestPermission()
      }
    })
  }

  private requestPermission() {
    this.speechRecognition.requestPermission().then(() => {
      console.log('Granted')
    },() => {
      console.log('Denied')
    })
  }

  private startListening() {
    this.speechRecognition.startListening().subscribe((matches: Array<string>) => {
      console.log(matches)
    }, (onerror) => {
      console.log('error:', onerror)
    })
  }
}


