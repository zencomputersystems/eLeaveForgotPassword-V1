import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  // {
  //   path: "reset-password/:token/:loginType",
  //   loadChildren: () =>
  //     import("./reset-password/reset-password.module").then(
  //       (m) => m.ResetPasswordPageModule
  //     ),
  // },
  {
    // https://resetpassword.beesuite.app/#/reset-password/aa4da910-e03b-11ea-9f3c-13c27951e99b/local
    path: "reset-password/:token/:loginType",
    loadChildren: () =>
      import("./reset-password/reset-password.module").then(
        (m) => m.ResetPasswordPageModule
      ),
  },
  {
    path: "forgot-password/:role",
    loadChildren: () =>
      import("./forgot-password/forgot-password.module").then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'account-verification/user/:token/:loginType',
    loadChildren: () => import('./account-verification/account-verification.module').then( m => m.AccountVerificationPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
