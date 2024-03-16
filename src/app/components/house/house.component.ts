import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServerService } from 'src/app/Services/http-server.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HouseDeletePopupComponent } from '../house-delete-popup/house-delete-popup.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit {
  public houseData: any = [];
  public houseDataFull: any = [];
  public currentPage = 0;
  public totalPages: any = 0;
  public searchText: any = '';
  public p: number = 1;
  // private currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  constructor(
    private httpServerService: HttpServerService,
    private router: Router,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.httpServerService.getHousesPage(0).subscribe(data => {
      console.log(data)
      this.houseData = [...data.content]
      this.totalPages = data.totalPages;
      // console.log(this.houseData);
    })
    this.httpServerService.getHouses().subscribe(resp => {
      this.houseDataFull = [...resp]
      // console.log(value)
    })
  }

  public deleteHouse(house_id: any): void {
    // console.log(house_id)
    const dialogRef = this.matDialog.open(HouseDeletePopupComponent, {
      data: { houseId: house_id }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        // Delete successful
        this.houseData = this.houseData.filter((house: { id: any; }) => house.id !== house_id)
      }
    });
  }

  public createRange(number: any) {
    // return new Array(number);
    return new Array(number).fill(0)
      .map((n, index) => index);
  }

  public updateHouse(id: any): void {
    // console.log(id)
    this.router.navigate(['house/update', id])
  }

  public prevPage() {
    this.currentPage = this.currentPage - 1;
    if (this.currentPage < 0) {
      this.currentPage = 0
    }
    this.httpServerService.getHousesPage(this.currentPage).subscribe(data => {
      this.houseData = [...data.content]
    })
  }

  public nextPage() {
    this.currentPage = this.currentPage + 1;
    if (this.currentPage >= this.totalPages) {
      this.currentPage = this.totalPages - 1;
    }
    this.httpServerService.getHousesPage(this.currentPage).subscribe(data => {
      this.houseData = [...data.content]
    })

  }

  public thisPage(i: any) {
    console.log(i)
    this.currentPage = i
    this.httpServerService.getHousesPage(this.currentPage).subscribe(data => {
      this.houseData = [...data.content]
    })
  }

  public getDetailHouse() {

  }
}
