import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'/auth/login'},
  {path:'auth', loadChildren:()=> import("./core/modules/auth/auth.module").then(m => m.AuthModule)},
  {path:'admin', loadChildren:()=> import("./featured/modules/admin/admin.module").then(m => m.AdminModule)},
  {path:'user', loadChildren:()=> import("./featured/modules/user/user.module").then(m => m.UserModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
