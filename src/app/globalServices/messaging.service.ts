import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import firebase from 'firebase';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessagePayload } from './globalServices/dataModel/notification-interfaces';


@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  messagingFirebase: firebase.messaging.Messaging;

  constructor() {
    try {
      firebase.initializeApp(environment.firebase);
      this.messagingFirebase = firebase.messaging();
    } catch (error) {

    }
  }

  requestPermission = () => {
    return new Promise(async (resolve, reject) => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const tokenFirebase = await this.messagingFirebase.getToken();
        resolve(tokenFirebase);
      } else {
        reject(new Error("No permission"))
      }
    })
  }

  private messagingObservable = new Observable<MessagePayload>(observe => {
    this.messagingFirebase.onMessage(payload => {
      observe.next(payload)
    })
  })

  receiveMessage() {
    return this.messagingObservable;
  }

}
