import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

/**
 * This component is to set up information popup service
 * @export
 * @class InfoPopupService
 */
@Injectable({
  providedIn: 'root'
})
export class InfoPopupService {

  /**
   * Creates an instance of InfoPopupService.
   * @param {AlertController} alertController This property is to get methods from AlertController
   * @memberof InfoPopupService
   */
  constructor(
    private alertController: AlertController
  ) { }

  /**
   * This method is to set notification popup that to indicate the operatoion is successfull/fail
   * @param {*} msg This parameter is to pass message to be shown to popup
   * @param {*} cssTitle This parameter is to pass css title style (alert-success/alert-error)
   * @memberof InfoPopupService
   */
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
