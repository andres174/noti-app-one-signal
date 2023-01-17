import { Storage } from '@ionic/storage-angular';
import { EventEmitter, Injectable } from '@angular/core';


import OneSignal from 'onesignal-cordova-plugin';

@Injectable({
  providedIn: 'root'
})
export class OneSignalService {

  arrayNotification:any[] = [];
  pushListener = new EventEmitter();


  constructor(private storagea: Storage) {
    this.createStorage();
    this.loadMessage();
  }

  async createStorage(){
    await this.storagea.create();
  }


  async OneSignalInit(){

    OneSignal.setAppId("724bea71-942d-43be-8da4-2c865e89ba03");
    
    OneSignal.setNotificationOpenedHandler((openedEvent) => {
      const { notification } = openedEvent;
        this.addNotificacion(notification);
      })

    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        let notification = notificationReceivedEvent.getNotification();
        this.addNotificacion(notification);
        notificationReceivedEvent.complete(notification);
      }
    );

    OneSignal.getDeviceState((response) => {
      console.log(response.userId);
    })
    
    OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
      console.log('User accepted notifications: ' + accepted);
    });
  }

  addNotificacion(noti:any){
    const existePush= this.arrayNotification.find(mensaje=> mensaje.notificationId === noti.notificationId);
    if(existePush){
        return;
    }
    this.arrayNotification.unshift(noti);
    //emite el observable
    this.pushListener.emit(noti);
    this.saveMessage();
  }

  saveMessage(){
    this.storagea.set('notification',this.arrayNotification);
  }

  async loadMessage(){
    this.arrayNotification= await this.storagea.get('notification') || [];
     return  this.arrayNotification;
  };
  async getMessage(){
    await this.loadMessage();
    return [...this.arrayNotification];
  }
 async deleteStorage(){
    await this.storagea.clear();
    this.arrayNotification=[];
    this.saveMessage();
  }
}
