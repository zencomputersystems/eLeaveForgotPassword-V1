import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { InfoPopupService } from '../services/info-popup.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/**
 * error matcher
 * @export
 * @class MyErrorStateMatcher
 * @implements {ErrorStateMatcher}
 */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

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
   * This method is to bind current token value
   * @private
   * @memberof ResetPasswordPage
   */
  private currToken;

  /**
   * This method is to bind current login type
   * @memberof ResetPasswordPage
   */
  public currLoginType;

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
   * form group 
   * @type {FormGroup}
   * @memberof ResetPasswordPage
   */
  public myForm: FormGroup;

  /**
   * error matcher
   * @memberof ResetPasswordPage
   */
  public matcher = new MyErrorStateMatcher();

  /**
   * hide new password open-eye icon
   * @type {boolean}
   * @memberof ResetPasswordPage
   */
  public hideNew: boolean = false;

  /**
   * hide confirm password open-eye icon
   * @type {boolean}
   * @memberof ResetPasswordPage
   */
  public hideConfirm: boolean = false;

  /**
   *Creates an instance of ResetPasswordPage.
   * @param {ActivatedRoute} resetPassRoute This property is to get methods from ActivatedRoute
   * @param {ApiService} resetPassApi This property is to get methods from ApiService
   * @param {InfoPopupService} resetPassInfoPopup This property is to get methods from InfoPopupService
   * @param {FormBuilder} formBuilder form group builder
   * @memberof ResetPasswordPage
   */
  constructor(
    private resetPassRoute: ActivatedRoute,
    private resetPassApi: ApiService,
    private resetPassInfoPopup: InfoPopupService,
    private formBuilder: FormBuilder
  ) {
    this.myForm = this.formBuilder.group({
      newPass: ['', [Validators.required]],
      confirmPass: ['']
    }, { validator: this.checkPasswords });
  }

  /**
   * This method is to set initial value of properites
   * @memberof ResetPasswordPage
   */
  ngOnInit() {
    this.currToken = this.resetPassRoute.snapshot.paramMap.get('token');
    this.currLoginType = this.resetPassRoute.snapshot.paramMap.get('loginType');
  }

  /**
   * check similar of new npassword and confirm password
   * @param {FormGroup} group
   * @returns
   * @memberof ResetPasswordPage
   */
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.newPass.value;
    let confirmPass = group.controls.confirmPass.value;
    return pass === confirmPass ? null : { notSame: true }
  }

  /**
   * This method is to send request to API(patch) then handle
   * returned value from API
   * @memberof ResetPasswordPage
   */
  saveNewPassword() {
    const data = {
      "password": this.myForm.controls.confirmPass.value,
      "id": this.currToken
    };
    this.resetPassApi.patchInvitation(data).subscribe(res => console.log(res));
  }

  /**
   * activate user API
   * @memberof ResetPasswordPage
   */
  activateUser() {
    this.resetPassApi.getInvitation(this.currToken).subscribe(res => console.log(res));
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
          if (data.response === undefined) {
            this.resetPassInfoPopup.alertPopup('Password is successfully updated. Please login to your accout', 'alert-success');
            setTimeout(() => {
              window.location.href = data[0].HTTP_REFERER;
            }, 2500);
          } else {
            this.resetPassInfoPopup.alertPopup(data.response.message, 'alert-error');
          }
        }
      );
  }

}
