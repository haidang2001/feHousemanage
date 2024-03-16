import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpServerService } from 'src/app/Services/http-server.service';

@Component({
	selector: 'app-house-delete-popup',
	templateUrl: './house-delete-popup.component.html',
	styleUrls: ['./house-delete-popup.component.scss']
})
export class HouseDeletePopupComponent implements OnInit {

	constructor(
		private httpServerService: HttpServerService,

		private dialogRef: MatDialogRef<HouseDeletePopupComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) { }

	ngOnInit(): void {
		// console.log(this.data.houseId)
	}


	public deleteUser() {
		// console.log(this.houseId)
		this.httpServerService.deleteHouseById(this.data.houseId).subscribe(() => {
			
			this.dialogRef.close(true)

			// setTimeout(() =>{
			// 	window.location.reload();
			// },100)
		},
			error => console.error(error),
		  );
	}
}
