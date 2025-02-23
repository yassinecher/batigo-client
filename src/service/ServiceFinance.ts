import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
 import {Observable} from "rxjs";
import { Account } from 'src/app/models/Account';

 

@Injectable({
  providedIn: 'root'  
})export class ServiceFinance {
  urlApi: string= "http://localhost:8080/batigo/Account";
  urlApiajout: string= "http://localhost:8080/batigo/Account/add";
  urlApi2: string= "http://localhost:8080/batigo/expense";
  constructor(private http:HttpClient) { }
 

 
 
  getAll(): Observable<Account[]> {
    return this.http.get<Account[]>(this.urlApi);
  }
  
  add(objet:Account):Observable<Account>{
    return this.http.post<Account>(this.urlApiajout,objet)
  }




}
