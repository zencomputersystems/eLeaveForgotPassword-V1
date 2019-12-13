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

  ngOnInit() {
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
      role: this.pageRole
    }, '/api/forgot-password').subscribe(
      data => { 
        this.forgotPassInfoPopup.alertPopup('Request to reset password sent', 'alert-success');
        setTimeout(() => {
          window.location.href = (this.pageRole === 'tenant') ? 'http://zencore.zen.com.my:8103/#/login' : (this.pageRole === 'user') ?
            'http://zencore.zen.com.my:8101/#/login' : 'http://zencore.zen.com.my:8102/#/login';
        }, 2500);
      }
    );
  }
}
