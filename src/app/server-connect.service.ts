import { Injectable } from '@angular/core';
import { Observable } from '../../node_modules/rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerConnectService {

  private serverURL = "http://172.31.17.183:8080/";
  

  constructor(private http:HttpClient) { }


  userRegisteration(userData){
    let specificUrl = this.serverURL + 'cardholder/registration' + userData;
    let headers =  {headers: new  HttpHeaders({ 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Origin,Access-Control-Allow-Headers,Authorization, X-Requested-With'
                                                })};
    console.log(userData);
    return this.http.post(specificUrl, headers);
  }

  merchantRegisteration(merchantData){
    let specificUrl = this.serverURL + 'YET_TO_BE_GIVEN' + merchantData;
    let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/json'})};
    return this.http.put(specificUrl, headers);
  }

  paymentVerification(paymentData){
    let specificUrl = this.serverURL + 'paymentVerification' + paymentData;
    let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/json'})};
    return this.http.post(specificUrl, headers);
  }

  test(){
    let specificUrl = "/t/mv6yf-1603094470/post";
    // let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/json'})};
    return this.http.get(specificUrl);
  }

}
