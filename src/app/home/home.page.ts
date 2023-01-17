import { ApplicationRef, Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { OneSignalService } from '../services/one-signal.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notifacion: any[] = [];

  constructor(private applicationRef: ApplicationRef, private onesignal: OneSignalService) {
    this.onesignal.pushListener.subscribe((noti: any) => {
      console.log('Cargar mensajes de ngOnInit');
      this.notifacion.unshift(noti);
      this.applicationRef.tick();
    })
  }

  async ionViewWillEnter(){
    console.log('Cargar mensajes de ionViewWillEnter');
    this.notifacion= await this.onesignal.getMessage();
  }
  async delete(){ 
   await this.onesignal.deleteStorage();
   this.notifacion=[];
  }


}
