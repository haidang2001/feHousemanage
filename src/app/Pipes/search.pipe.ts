import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { HttpServerService } from '../Services/http-server.service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
 
  transform(va:any, data: any, searchTxt: string): Array<any> {
    // console.log(data)
    const getData = (value: any, index: any) => {
      // value=data
      // console.log(value)
      // this.httpServerService.getHouses().subscribe(resp => {
      //   value=[...resp]
        // console.log(value)
      // })

      // for (const v of value){
      //   console.log(v)
        // for (const property in v) {
        //     console.log(v[property])
        //     if (v[property].toString().toUpperCase().indexOf(searchTxt.toUpperCase()) > -1) {
        //       return va[index];
        //     }
          // }
      // }

      for (const property in value) {
        // console.log(value[property].toString().toUpperCase())
        if (value[property].toString().toUpperCase().indexOf(searchTxt.toUpperCase()) > -1) {
          return va[index];
        }
      }
    };
    return va.filter(getData);
    
  };

}
