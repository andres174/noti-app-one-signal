import { Component } from '@angular/core';
import { OneSignalService } from './services/one-signal.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private onesignal: OneSignalService) {
      onesignal.OneSignalInit();
  }

  
}
