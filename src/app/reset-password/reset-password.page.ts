import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { InfoPopupService } from '../services/info-popup.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor(
    private resetPassRoute: ActivatedRoute,
    private resetPassApi: ApiService,
    private resetPassInfoPopup: InfoPopupService
  ) { }

  CryptoJS = require('crypto-js');

  private currToken;
  private currRole;
  public retPass1 = '';
  public retPass2 = '';
  public newPassword;
  public confirmNewPassword;
  public retMsg = '';

  ngOnInit() {
    this.currToken = this.resetPassRoute.snapshot.paramMap.get('token');
    this.currRole = this.resetPassRoute.snapshot.paramMap.get('role');
  }

  saveNewPassword() {
    if (this.verifyPassword(this.newPassword, this.confirmNewPassword) === 'notnull') {
      if (this.newPassword !== this.confirmNewPassword) {
        // console.log('password do not match');
        this.retMsg = 'Password do not match';
      } else {
        this.retMsg = '';
        // console.log('password to be saved');
        const encryptPass = (this.CryptoJS.SHA256(this.newPassword)).toString(this.CryptoJS.enc.Hex);
        this.resetPassApi.patchApiWoHeader('/api/forgot-password', 
          { tokenId: this.currToken, password: encryptPass })
          .subscribe(
            data => {
              console.log(data);
              if (data.response === undefined) {
                this.resetPassInfoPopup.alertPopup('Password is successfully updated. Please login to your accout', 'alert-success');
                console.log(data.HTTP_REFERER); 
                // window.location.href = (this.pageRole === 'tenat') ? 'zencore.zen.com.my:8103~' : 'zencore.zen.com.my:8103';    
                setTimeout(() => {
                  // window.location.href = (this.currRole === 'tenant') ? 'http://zencore.zen.com.my:8103/#/login' : 'http://zencore.zen.com.my:8102/#/';  
                  window.location.href = data.HTTP_REFERER;
                }, 2500);  
              } else {
                this.resetPassInfoPopup.alertPopup(data.response.message, 'alert-error');
              }
            }
          );
      }
    };
  }

  verifyPassword(pass1, pass2) {
    this.retPass1 = (pass1 === undefined || pass1 === null || pass1 === '') ? 'This field is required' : '';
    this.retPass2 = (pass2 === undefined || pass2 === null || pass2 === '') ? 'This field is required' : '';

    return (this.retPass1 === '' && this.retPass2 === '') ? 'notnull' : 'null'
  }
}
