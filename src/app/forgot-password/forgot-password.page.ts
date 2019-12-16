import { InfoPopupService } from './../services/info-popup.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(
    private forgotPassRoute: ActivatedRoute,
    private forgotPassApi: ApiService,
    private forgotPassInfoPopup: InfoPopupService,
  ) { }

  public userEmail = '';
  public resetErrorMsg;
  public pageRole;
  public prevPageUrl;

  ngOnInit() {
    console.log('forgot password history');
    // console.log(history.back())
    console.log(document.referrer);
    this.prevPageUrl = document.referrer;
    this.pageRole =  this.forgotPassRoute.snapshot.paramMap.get('role');
  }


  requestForgotPassword() {
    if (this.userEmail === '') {
      this.resetErrorMsg = 'Email is required';
    } else {
      this.processReqForgetPass();
    }
  }

  async processReqForgetPass() {
    this.forgotPassApi.postApiWoHeader({
      email: this.userEmail,
      role: this.pageRole,
      httpReferer: this.prevPageUrl
    }, '/api/forgot-password').subscribe(
      data => { 
        this.forgotPassInfoPopup.alertPopup('Request to reset password sent', 'alert-success');
        setTimeout(() => {
          window.location.href = this.prevPageUrl; // (this.pageRole === 'tenant') ? 'http://zencore.zen.com.my:8103/#/login' : 'http://zencore.zen.com.my:8102/#/';
        }, 2500);
      }
    );
  }
}
