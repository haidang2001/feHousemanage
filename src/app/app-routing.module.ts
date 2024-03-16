import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HouseAddComponent } from './components/house-add/house-add.component';
import { HouseDeletePopupComponent } from './components/house-delete-popup/house-delete-popup.component';
import { HouseUpdateComponent } from './components/house-update/house-update.component';
import { HouseComponent } from './components/house/house.component';
import { LoginComponent } from './components/login/login.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: 'full' },
  {
    path: '', component: HomeLayoutComponent, canActivate: [AuthGuard],
    children: [

      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'house',
        component: HouseComponent
      },
      {
        path: 'house/add',
        component: HouseAddComponent
      },
      {
        path: 'house/update/:id',
        component: HouseUpdateComponent
      },
      {
        path: 'employee',
        component: EmployeeComponent
      },
      {
        path: 'employee/add',
        component: EmployeeAddComponent
      },

    ]
  },
  {
    path: '', component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent },  // co nhung sai 404 page
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
