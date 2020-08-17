import { environment as ENV } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

/**
 * This component is to handle all service to be request to API
 * @export
 * @class ApiService
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   * Creates an instance of ApiService.
   * @param {Http} apiHttp This property is to get methods from Http
   * @param {HttpClient} apiHttpClient This property is to get methods from HttpClient
   * @memberof ApiService
   */
  constructor(
    private apiHttp: Http,
    private apiHttpClient: HttpClient
  ) { }

  /**
   * This property is bind value of request API's url
   * @memberof ApiService
   */
  public ROOT_URL = ENV.URL_BASE;

  /**
   * This property is bind value of request API's url
   * @type {string}
   * @memberof ApiService
   */
  public baseUrl: string = ENV.URL_API;

  /**
   * This method is to send post request to API without header
   * @param {*} data This paramter will store an array of requested post 
   * @param {string} address This parameter will store the string of requested addrest to be request in API
   * @returns
   * @memberof ApiService
   */
  postApiWoHeader(data: any, address: string) {
    return this.apiHttpClient.post(this.ROOT_URL + address, data)
      .pipe(map((data: any) => { return data; }));
  }

  /**
   * This method is to send patch request to API without header
   * @param {string} address This parameter will store the string of requested addrest to be request in API
   * @param {*} data This paramter will store an array of requested post
   * @returns
   * @memberof ApiService
   */
  patchApiWoHeader(address: string, data: any) {
    // return this.apiHttp.patch(this.ROOT_URL + address, data);
    return this.apiHttpClient.patch(this.ROOT_URL + address, data)
      //.pipe(map((res: Response) => res.json()));
      .pipe(map((data: any) => { return data; }));
  }

  /**
   * This method is to send get request to API
   * @param {string} address This parameter will store the string of requested addrest to be request in API
   * @returns
   * @memberof ApiService
   */
  getApi(address: string) {
    return this.apiHttp.get(this.baseUrl + address)
      .pipe(map((res: Response) => res.json()));
  }

  /**
   * patch api 
   * @param {*} patchData
   * @param {string} url
   * @returns
   * @memberof ApiService
   */
  patchApi(patchData: any, url: string) {
    return this.apiHttp.patch(this.baseUrl + url, patchData)
      .pipe(map((res: Response) => res.json()))
  }

  /**
   * change password for new user (local)
   * @param {*} data
   * @returns
   * @memberof ApiService
   */
  patchInvitation(data: any) {
    return this.patchApi(data, '/api/forgot-password');
  }

  /**
   * activate new user (AD)
   * @param {string} token
   * @returns
   * @memberof ApiService
   */
  getInvitation(token: string) {
    return this.getApi('/api/invitation/' + token);
  }

  // /**
  //  * This method is to send request 
  //  * @param {string} token
  //  * @param {string} passwordVal
  //  * @returns {Observable<any>}
  //  * @memberof ApiService
  //  */
  // reqPatchApi(token: string, passwordVal: string): Observable<any> {
  //   // return this.WoHeader(data, addr); 
  //   return this.apiHttpClient.patch('https://zencore.zen.com.my:3002/api/forgot-password', 
  //     { tokenId: token, password: passwordVal }).pipe(map((data: any) => { return data; }));

  // }

  // /**
  //  * This method is to 
  //  * @returns
  //  * @memberof ApiService
  //  */
  // forgotpasssuser() {
  //   return this.apiHttpClient.post('https://zencore.zen.com.my:3002/api/forgot-password', 
  //     {
  //       email: "lll@zen.com.my",
  //       role: "tenant"
  //     }).
  //     pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     )
  // }

}
