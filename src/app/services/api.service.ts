import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators'; 
import { Observable } from '../../../node_modules/rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private apiHttp: Http,
    private apiHttpClient: HttpClient
  ) { }

  public ROOT_URL = 'http://zencore.zen.com.my:3002';

  postApiWoHeader(data: any, address: string ) {
    return this.apiHttpClient.post(this.ROOT_URL + address, data)
      .pipe(map((data: any) => { return data; }));
  }

  patchApiWoHeader(address: string, data: any) {
    // return this.apiHttp.patch(this.ROOT_URL + address, data);
    return this.apiHttpClient.patch(this.ROOT_URL + address, data)
    //.pipe(map((res: Response) => res.json()));
      .pipe(map((data: any) => { return data; }));


  }

  getApi(address: string) {
    return this.apiHttp.get(address);
  }

  reqPatchApi(token: string, passwordVal: string): Observable<any> {
    // return this.patchApiWoHeader(data, addr); 
    return this.apiHttpClient.patch('http://zencore.zen.com.my:3002/api/forgot-password', 
      { tokenId: token, password: passwordVal }).pipe(map((data: any) => { return data; }));

  }

  forgotpasssuser() {
    return this.apiHttpClient.post('http://zencore.zen.com.my:3002/api/forgot-password', 
      {
        email: "lll@zen.com.my",
        role: "tenant"
      }).
      pipe(
        map((data: any) => {
          return data;
        })
      )
  }

}
