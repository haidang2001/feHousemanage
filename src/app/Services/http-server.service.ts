import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HttpServerService {
	//private REST_API_SERVER2 = 'http://localhost:8080';
	private REST_API_SERVER2 = 'https://housemanage-f4f94a4bfa42.herokuapp.com';

	private currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'Basic ' + btoa(this.currentUser.username + ":" + this.currentUser.password)
		})
	}
	private httpOptions2 = {
		headers: new HttpHeaders({
			'Authorization': 'Basic ' + btoa(this.currentUser.username + ":" + this.currentUser.password)
		})
	}

	constructor(private httpClient: HttpClient) { }

	public getHouses(): Observable<any> {
		const url = `${this.REST_API_SERVER2}/api/house`;
		return this.httpClient.get<any>(url, this.httpOptions);
	}
	public getHousesPage(pageNumber: number = 0): Observable<any> {
		const url = `${this.REST_API_SERVER2}/api/house/page?page=${pageNumber}&size=5`;
		return this.httpClient.get<any>(url, this.httpOptions);
	}

	public getImage(idHouse: any): Observable<any> {
		const url = `${this.REST_API_SERVER2}/api/house/image/${idHouse}`;
		return this.httpClient.get<any>(url, this.httpOptions2);
	}
	public postHouse(payload: any): Observable<any> {
		const url = `${this.REST_API_SERVER2}/api/house`;
		return this.httpClient.post<any>(url, payload, this.httpOptions2);
	}

	public getHouseById(id: number): Observable<any> {
		const url = `${this.REST_API_SERVER2}/api/house/${id}`;
		return this.httpClient.get<any>(url, this.httpOptions);
	}

	public updateHouseById(id: number, payload: any): Observable<any> {
		const url = `${this.REST_API_SERVER2}/api/house/${id}`;
		return this.httpClient.put<any>(url, payload, this.httpOptions);
	}

	public deleteHouseById(id: any): Observable<any> {
		const url = `${this.REST_API_SERVER2}/api/house/${id}`;
		return this.httpClient.delete<any>(url, this.httpOptions);
	}
	////////////////////////////////////////////////////////////
	public getEmployees(): Observable<any> {
		const url = `${this.REST_API_SERVER2}/api/account`
		return this.httpClient.get<any>(url, this.httpOptions);
	}

	public getEmployeesManagerAndHouseNull(): Observable<any> {
		const url = `${this.REST_API_SERVER2}/api/account/managers`
		return this.httpClient.get<any>(url, this.httpOptions);
	}

	public postEmployee(payload: any): Observable<any> {
		const url = `${this.REST_API_SERVER2}/api/account/add`;
		return this.httpClient.post<any>(url, payload, this.httpOptions);
	}
	////////////////////////////////////////////////////////////
	public register(payload: any): Observable<any> {
		const url = `${this.REST_API_SERVER2}/api/acc/add`;
		return this.httpClient.post<any>(url, payload);
	}
	public getLastAcc(): Observable<any> {
		const url = `${this.REST_API_SERVER2}/api/acc/last`;
		return this.httpClient.get<any>(url, this.httpOptions);
	}
}
