import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpServerService } from 'src/app/Services/http-server.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { RegisterAccountDialogComponent } from '../register-account-dialog/register-account-dialog.component';

@Component({
	selector: 'app-employee-add',
	templateUrl: './employee-add.component.html',
	styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent {

	public randomIdNumber: number = Math.floor(100000 + Math.random() * 900000);
	public maxDate = new Date().toISOString().slice(0, 10);
	public listHouse: any = [];
	public position = '';
	public isRegister = false;
	public acc_id = 0;
	public formNewEmployee = this.formBuilder.group({
		name: ['', Validators.required],
		birthDate: ['', Validators.required],
		gender: ['', Validators.required],
		phone: ['', Validators.required],
		email: ['', Validators.required],
		idNumber: this.randomIdNumber,
		houseName: [null],
		position: this.position,
		startedDate: ['', Validators.required],
		status: ['Select Status', Validators.required],
		description: ['', Validators.required],
		image: ['', Validators.required],
		acc_id: this.acc_id,
	})

	constructor(
		private formBuilder: FormBuilder,
		private httpServerService: HttpServerService,
		private router: Router,
		private snackBar: SnackbarService,
		private matDialog: MatDialog
	) { }

	ngOnInit(): void {
		console.log(this.maxDate);
		this.httpServerService.getHouses().subscribe(data => {
			console.log(data)
			this.listHouse = [...data]
			// console.log(this.listHouse)
		})
	}

	public submitNewEmployee(): void {
		console.log(this.formNewEmployee.value);
		this.httpServerService.postEmployee(this.formNewEmployee.value).subscribe(data => {
			console.log(data)
			this.snackBar.openSnackBar(data.message, '')
			this.router.navigateByUrl('/employee')
		}, error => {
			this.snackBar.openSnackBar(error.error.message, 'error')
		})
	}

	public onChange(value: any) {
		this.position = value
	}

	public openRegister() {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.width = '500px';
		const dialogRef = this.matDialog.open(RegisterAccountDialogComponent, dialogConfig)

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				// console.log(result)
				// this.isRegister=true;
				this.httpServerService.getLastAcc().subscribe(data => {
					// console.log(data.id)
					this.acc_id=data.id;
					// this.formNewEmployee.controls['acc_id'] = data.id
					console.log(this.formNewEmployee.controls['acc_id'])
					console.log(this.formNewEmployee.value)
				})
			}
		});
	}
}
