import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root'
})
export class SnackbarService {

	constructor(private snackbar: MatSnackBar) { }

	public openSnackBar(message: string, action: string) {
		// const snackbarConfig = new MatSnackBarConfig();
		// snackbarConfig.horizontalPosition = 'center';
		// snackbarConfig.verticalPosition = 'bottom';
		// snackbarConfig.duration = 2000;
		// snackbarConfig.panelClass = ["green-snackbar"]
		if(action == 'error'){
			this.snackbar.open(message,'',{
				horizontalPosition: 'center',
				verticalPosition: 'bottom',
				duration: 2000,
				panelClass:  ["black-snackbar"]
			})
		}else{
			this.snackbar.open(message,'',{
				horizontalPosition: 'center',
				verticalPosition: 'bottom',
				duration: 2000,
				panelClass: ['green-snackbar']
			})
		}
		// this.snackbar.open(message,'',{...snackbarConfig})
	}
}
