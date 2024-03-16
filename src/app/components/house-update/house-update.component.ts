import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServerService } from 'src/app/Services/http-server.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-house-update',
	templateUrl: './house-update.component.html',
	styleUrls: ['./house-update.component.scss']
})
export class HouseUpdateComponent implements OnInit {
	// public href: string = '';
	private routeSub: Subscription | undefined;

	public currentHouse: any;
	public currentStatus: any;
	public currentManager: any;

	public managerData: any = [];

	public formNewHouse = this.formBuilder.group({
		name: ['', Validators.required],
		location: ['', Validators.required],
		establishDate: ['', Validators.required],
		totalRooms: ['', Validators.required],
		manager: ['', Validators.required],
		status: ['', Validators.required],
		description: ['', Validators.required],
		image: ['', Validators.required],
	})

	constructor(
		private httpServerService: HttpServerService,
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
		// this.href = this.router.url;

		// console.log(this.href.length)
		// console.log(this.href.split("/")[this.href.length-1]);

		// this.httpServerService.getHouseById
		this.routeSub = this.route.params.subscribe((params: Params): void => {
			const id = params['id'];

			this.httpServerService.getHouseById(id).subscribe(data => {
				console.log(data)
				this.currentHouse = data.data

				this.currentStatus = this.currentHouse.status;
				this.currentManager = this.currentHouse.manager;

				this.formNewHouse = this.formBuilder.group({
					name: [this.currentHouse.name, Validators.required],
					location: [this.currentHouse.location, Validators.required],
					establishDate: [this.currentHouse.establishDate, Validators.required],
					totalRooms: [this.currentHouse.totalRooms, Validators.required],
					manager: [this.currentHouse.manager, Validators.required],
					status: [this.currentHouse.status, Validators.required],
					description: [this.currentHouse.description, Validators.required],
					image: [this.currentHouse.image, Validators.required],
				})
			})
		});

		this.httpServerService.getEmployeesManagerAndHouseNull().subscribe(data => {
			console.log(data)
			this.managerData = [...data];
		  })
	}

	public updateHouse(){
		this.httpServerService.updateHouseById(this.currentHouse.id,this.formNewHouse.value).subscribe(result => {
			console.log(result)
		})
	}

}
