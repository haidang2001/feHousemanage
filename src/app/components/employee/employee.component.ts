import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpServerService } from 'src/app/Services/http-server.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit{
  public employeeData: any = [];
  constructor(private dialog: MatDialog, private httpServerService: HttpServerService){}

  ngOnInit(): void {
    this.httpServerService.getEmployees().subscribe(data => {
      console.log(data)
      this.employeeData = [...data]
    })
  }

  // handleSignupAction(){
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.width = '550px';
  //   this.dialog.open(SignupComponent,dialogConfig);
  // }
}
