import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpServerService } from 'src/app/Services/http-server.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';

@Component({
	selector: 'app-register-account-dialog',
	templateUrl: './register-account-dialog.component.html',
	styleUrls: ['./register-account-dialog.component.scss']
})
export class RegisterAccountDialogComponent implements OnInit {
	public formRegister = this.formBuilder.group({
		username: ['', Validators.required],
		password: ['', Validators.required],
		confirmPassword: ['', Validators.required],
		role: ['manager', Validators.required],
	})

	constructor(
		private formBuilder: FormBuilder,
		private httpServerService: HttpServerService,
		private dialogRef: MatDialogRef<RegisterAccountDialogComponent>,
		private router: Router,
		private snackbar: SnackbarService
	) {

	}

	ngOnInit(): void {

	}

	public validateSubmit(){
		if(this.formRegister.controls['password'].value != this.formRegister.controls['confirmPassword'].value){
			return true;
		}else{
			return false;
		}
	}

	public submitRegister() {
		const formData = this.formRegister.value;
		const data = {
			username: formData.username,
			password: formData.password,
			role: formData.role
		}

		this.httpServerService.register(data).subscribe(response =>{
			console.log(response)
			this.dialogRef.close(true);
			this.snackbar.openSnackBar(response.message,"");
		},error =>{
			this.snackbar.openSnackBar(error.error.message,"error");
		})
	}
}
