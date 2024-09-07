import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./user.component";
import {EnrollmentComponent} from "./components/enrollment/enrollment.component";
import {DetailsComponent} from "./components/details/details.component";

const routes: Routes = [
  {path:'', component:UserComponent, children:[
      {path:'', redirectTo:'/user/enrollment', pathMatch:'full'},
      {path:'enrollment', component:EnrollmentComponent},
      {path:'detail', component:DetailsComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
