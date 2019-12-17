import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { InfoPopupService } from '../services/info-popup.service';

/**
 * This component is to set up reset password page
 * @export
 * @class ResetPasswordPage
 * @implements {OnInit}
 */
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  /**
   * Creates an instance of ResetPasswordPage.
   * @param {ActivatedRoute} resetPassRoute This property is to get methods from ActivatedRoute
   * @param {ApiService} resetPassApi This property is to get methods from ApiService
   * @param {InfoPopupService} resetPassInfoPopup This property is to get methods from InfoPopupService
   * @memberof ResetPasswordPage
   */
  constructor(
    private resetPassRoute: ActivatedRoute,
    private resetPassApi: ApiService,
    private resetPassInfoPopup: InfoPopupService
  ) { }

  /**
   * This property is to get methods from crypto-js
   * @memberof ResetPasswordPage
   */
  CryptoJS = require('crypto-js');

  /** 
   * This method is to bind current token value
   * @private
   * @memberof ResetPasswordPage
   */
  private currToken;

  /**
   * This method is to bind current role value
   * @private
   * @memberof ResetPasswordPage
   */
  private currRole;

  /**
   * This method is to bind verification of new password value
   * @private
   * @memberof ResetPasswordPage
   */
  public retPass1 = '';

  /**
   * This method is to bind verification of confirmation of new password value
   * @private
   * @memberof ResetPasswordPage
   */
  public retPass2 = '';

  /**
   * This method is to bind of new password value
   * @private
   * @memberof ResetPasswordPage
   */
  public newPassword;

  /**
   * This method is to bind of confirmation of new password value
   * @private
   * @memberof ResetPasswordPage
   */
  public confirmNewPassword;

  /**
   * This method is to set return error message value from requested API
   * @private
   * @memberof ResetPasswordPage
   */
  public retMsg = '';

  /**
   * This method is to set initial value of properites
   * @memberof ResetPasswordPage
   */
  ngOnInit() {
    this.currToken = this.resetPassRoute.snapshot.paramMap.get('token');
    this.currRole = this.resetPassRoute.snapshot.paramMap.get('role');
  }

  /**
   * This method is to check password validity, send request to API(patch) then handle
   * returned value from API
   * @memberof ResetPasswordPage
   */
  saveNewPassword() {
    if (this.verifyPassword(this.newPassword, this.confirmNewPassword) === 'notnull') {
      if (this.newPassword !== this.confirmNewPassword) {
        // console.log('password do not match');
        this.retMsg = 'Password do not match';
      } else {
        this.retMsg = '';
        // console.log('password to be saved');
        const encryptPass = (this.CryptoJS.SHA256(this.newPassword)).toString(this.CryptoJS.enc.Hex);
        this.requetResetPassword(encryptPass);
      }
    };
  }

  /**
   * This method is to send request to API to patch new password
   * @param {*} encryptPass This parameter is to pass new password to be updated
   * @memberof ResetPasswordPage
   */
  requetResetPassword(encryptPass) {
    this.resetPassApi.patchApiWoHeader('/api/forgot-password',
      { tokenId: this.currToken, password: encryptPass })
      .subscribe(
        data => {
          this.processRes(data);
          // if (data.response === undefined) {
          //   this.resetPassInfoPopup.alertPopup('Password is successfully updated. Please login to your accout', 'alert-success');
          //   setTimeout(() => {
          //     window.location.href = data[0].HTTP_REFERER;
          //   }, 2500);
          // } else {
          //   this.resetPassInfoPopup.alertPopup(data.response.message, 'alert-error');
          // }
        }
      );
  }

  /**
   * This method is to process returned response from patch request to update password 
   * @param {*} data This parameter is to pass response data from API
   * @memberof ResetPasswordPage
   */
  processRes(data) {
    if (data.response === undefined) {
      this.resetPassInfoPopup.alertPopup('Password is successfully updated. Please login to your accout', 'alert-success');
      setTimeout(() => {
        window.location.href = data[0].HTTP_REFERER;
      }, 2500);
    } else {
      this.resetPassInfoPopup.alertPopup(data.response.message, 'alert-error');
    }
  }

  // }
  /**
   * This method is to check validity between 2 password
   * @param {*} pass1 This parameter will pass password value
   * @param {*} pass2 This parameter will pass confirmation password's value
   * @returns
   * @memberof ResetPasswordPage
   */
  verifyPassword(pass1, pass2) {
    this.retPass1 = (pass1 === undefined || pass1 === null || pass1 === '') ? 'This field is required' : '';
    this.retPass2 = (pass2 === undefined || pass2 === null || pass2 === '') ? 'This field is required' : '';

    return (this.retPass1 === '' && this.retPass2 === '') ? 'notnull' : 'null'
  }
}
