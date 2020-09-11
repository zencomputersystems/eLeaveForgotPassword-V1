import { ApiService } from './../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MyErrorStateMatcher } from '../reset-password/reset-password.page';
import { ActivatedRoute } from '@angular/router';
import { InfoPopupService } from '../services/info-popup.service';

@Component({
  selector: "app-account-verification",
  templateUrl: "./account-verification.page.html",
  styleUrls: ["./account-verification.page.scss"],
})
export class AccountVerificationPage implements OnInit {
  public myForm: FormGroup;

  public matcher = new MyErrorStateMatcher();
  public hideConfirm: boolean = false;
  public hideNew: boolean = false;
  public resetSpinWait = false;
  public image: string = "../../assets/icon/beesuite.png";
  /**
   * This method is to bind current login type
   * @memberof ResetPasswordPage
   */
  public currLoginType;
  private currToken: string;
  public errorMsg: any = null;
  constructor(
    public accVerFormBuilder: FormBuilder,
    public accVerApi: ApiService,
    private accVerActivatedRoute: ActivatedRoute,
    private accVerInfoPopupService: InfoPopupService
  ) {
    this.myForm = this.accVerFormBuilder.group(
      {
        newPass: ["", [Validators.required]],
        confirmPass: [""],
      },
      { validator: this.checkPasswords }
    );
  }

  ngOnInit() {
    this.currToken = this.accVerActivatedRoute.snapshot.paramMap.get("token");
    this.currLoginType = this.accVerActivatedRoute.snapshot.paramMap.get(
      "loginType"
    );
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    const pass = group.controls.newPass.value;
    const confirmPass = group.controls.confirmPass.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  saveNewPassword() {
    const data = {
      // "password": window.btoa(this.myForm.controls.confirmPass.value),
      // "id": this.currToken
      password: window.btoa(this.myForm.controls.confirmPass.value),
      id: this.currToken,
    };
    this.errorMsg = null;
    console.log(data);
    console.log('eterreer')
    this.resetSpinWait = true;
    this.accVerApi.patchInvitation(data).subscribe(
      (res) => {
        console.log(res);
        // console.log(res[0].TOKEN_GUID);
        // console.log(res.response.statusCode );
        this.resetSpinWait = false;
        // if (
        //   res.response !== undefined
        //   // res.response.statusCode === 400 &&
        //   // res.response.statusCode !== undefined
        // ) {
        //   // this.errorMsg = res.response.error + ". " + res.response.message;
        //   this.accVerInfoPopupService.alertPopup(
        //     res.response.error + ". " + res.response.message,
        //     "alert-error"
        //   );
        // }

        if (res.status === true) {
          // if (res[0].TOKEN_GUID !== null && res[0].TOKEN_GUID !== undefined) {
          // this.errorMsg = null;
          this.accVerInfoPopupService.alertPopup(
            "Password is updated successfully. Please login to your account",
            "alert-success"
          );
          setTimeout(() => {
            // window.location.href = ENV.URL_EUSR;
            window.location.href = res.HTTP_REFERER;
          }, 3000);
        } else {
          if (res.response !== undefined) {
            this.accVerInfoPopupService.alertPopup(
              res.response.error + ". " + res.response.message,
              "alert-error"
            );
            this.errorMsg = res.response.error + ". " + res.response.message;
            console.log(this.errorMsg);
          }
          if (res.status === false) {
            this.errorMsg = res.message;
            console.log(this.errorMsg);
            this.accVerInfoPopupService.alertPopup(res.message, "alert-error");
          }
        }
      },
      (err) => {
        console.log(err);
        this.accVerInfoPopupService.alertPopup(
          JSON.parse(err._body).message,
          "alert-error"
        );
      }
    );
  }
}
