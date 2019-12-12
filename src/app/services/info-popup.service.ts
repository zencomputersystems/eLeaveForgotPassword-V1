import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InfoPopupService {

  constructor(
    private alertController: AlertController
  ) { }

  async alertPopup(msg, cssTitle) {
    const alert = await this.alertController.create({
      message: (cssTitle === 'alert-success') ? '<img src="../../assets/icon/icon_tick.svg">' + msg :
        '<img src="../../assets/icon/icon_untick.svg">' + msg,
      cssClass: cssTitle// 'alert-success' / 'alert-error' 
    });

    await alert.present();
    setTimeout(() => {
      alert.dismiss();
    }, 2500);
  }
}
