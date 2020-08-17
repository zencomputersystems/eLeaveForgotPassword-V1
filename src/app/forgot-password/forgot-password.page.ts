import { InfoPopupService } from './../services/info-popup.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { ApiService } from '../services/api.service';


/**
 * This component is to setup page for forgot password
 * @export
 * @class ForgotPasswordPage
 * @implements {OnInit}
 */
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  /**
   * Creates an instance of ForgotPasswordPage.
   * @param {ActivatedRoute} forgotPassRoute This property is to get methods from ActivatedRoute
   * @param {ApiService} forgotPassApi This property is to get methods from ApiService
   * @param {InfoPopupService} forgotPassInfoPopup This property is to get methods from InfoPopupService
   * @memberof ForgotPasswordPage
   */
  constructor(
    private forgotPassRoute: ActivatedRoute,
    private forgotPassApi: ApiService,
    private forgotPassInfoPopup: InfoPopupService,
  ) { }

  /**
   * This property is to bind value of inserted email address
   * @memberof ForgotPasswordPage
   */
  public userEmail = '';

  /**
   * This property is to bind any error message returned from request post
   * @memberof ForgotPasswordPage
   */
  public resetErrorMsg;

  /**
   * This property is to bind value of page's role (tenant/user)
   * @memberof ForgotPasswordPage
   */
  public pageRole;

  /**
   * This property is to bind previous page url link
   * @memberof ForgotPasswordPage
   */
  public prevPageUrl;

  public image: string = "../../assets/icon/beesuite.png";

  /**
   * This method is to set initial value of properties
   * @memberof ForgotPasswordPage
   */
  ngOnInit() {
    this.prevPageUrl = document.referrer;
    this.pageRole =  this.forgotPassRoute.snapshot.paramMap.get('role');
  }

  /**
   * This method is to check the email status in form
   * @memberof ForgotPasswordPage
   */
  requestForgotPassword() {
    if (this.userEmail === '') {
      this.resetErrorMsg = 'Email is required';
    } else {
      this.processReqForgetPass();
    }
  }

  /**
   * This method is to send post request to API and process the returned result
   * @memberof ForgotPasswordPage
   */
  async processReqForgetPass() {
    this.forgotPassApi.postApiWoHeader({
      email: this.userEmail,
      role: this.pageRole,
      httpReferer: this.prevPageUrl
    }, '/api/forgot-password').subscribe(
      data => { 
        console.log(data);
        this.forgotPassInfoPopup.alertPopup('Request to reset password sent', 'alert-success');
        setTimeout(() => {
          window.location.href = this.prevPageUrl;
        }, 2500);
      },
      (error) => {
        console.log(error);
        this.resetErrorMsg = error.response.error + ". " + error.response.message;

      }
    );
  }
}
