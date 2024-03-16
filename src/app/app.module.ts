import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { HouseComponent } from './components/house/house.component';
import { HouseAddComponent } from './components/house-add/house-add.component';
import { HouseUpdateComponent } from './components/house-update/house-update.component';
import { HouseDeletePopupComponent } from './components/house-delete-popup/house-delete-popup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeComponent } from './components/employee/employee.component';
import { MaterialModule } from './shared/material-module';
import { SignupComponent } from './components/signup/signup.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { RegisterAccountDialogComponent } from './components/register-account-dialog/register-account-dialog.component';
import { SearchPipe } from './Pipes/search.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    HeaderComponent,
    LoginLayoutComponent,
    HomeLayoutComponent,
    HouseComponent,
    HouseAddComponent,
    HouseUpdateComponent,
    HouseDeletePopupComponent,
    DashboardComponent,
    EmployeeComponent,
    SignupComponent,
    EmployeeAddComponent,
    RegisterAccountDialogComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    MatIconModule,
    MaterialModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
