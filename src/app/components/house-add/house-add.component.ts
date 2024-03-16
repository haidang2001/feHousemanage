import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServerService } from 'src/app/Services/http-server.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
	selector: 'app-house-add',
	templateUrl: './house-add.component.html',
	styleUrls: ['./house-add.component.scss']
})
export class HouseAddComponent {
	public maxDate = new Date().toISOString().slice(0, 10);
	public managerData: any = [];
	public selectedFile: any='';

	public formNewHouse = this.formBuilder.group({
		name: ['', Validators.required],
		location: ['', Validators.required],
		establishDate: ['', Validators.required],
		totalRooms: ['', Validators.required],
		manager: this.managerData,
		status: ['Select Status', Validators.required],
		description: ['', Validators.required],
		image: this.selectedFile,
	})

	constructor(
		private formBuilder: FormBuilder,
		private httpServerService: HttpServerService,
		private router: Router,
		private snackBar: SnackbarService
	) { }

	ngOnInit(): void {
		console.log(this.maxDate);
		this.httpServerService.getEmployeesManagerAndHouseNull().subscribe(data => {
			console.log(data)
			this.managerData = [...data];
		})
	}

	onFileSelected(event:any) {
		console.log( event.target.files[0])
		this.selectedFile =  event.target.files[0];
	  }

	public submitNewHouse(): void {
		console.log(this.formNewHouse.value);

		const formData: any = new FormData();
		formData.append('houseResponse',new Blob([JSON.stringify(this.formNewHouse.value)],{type: "application/json"}));
		formData.append('image',this.selectedFile);
		for (var pair of formData.entries()) {
			console.log(pair[0]+ ', ' + pair[1]); 
		}

		this.httpServerService.postHouse(formData).subscribe(data => {
			console.log(data)
			this.snackBar.openSnackBar(data.message, '')
			// this.router.navigateByUrl('/house')
		}, error => {
			console.log(error)
			this.snackBar.openSnackBar(error.error.message, 'error')
		})
	}
}
