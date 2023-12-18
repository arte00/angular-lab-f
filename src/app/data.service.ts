import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "./user";
import {ItemsList} from "./items-list";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = "https://labjwt.zecer.wi.zut.edu.pl/api"

  constructor(
    private http: HttpClient
  ) { }

  public users(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`)
  }

  public items(): Observable<ItemsList> {
    return this.http.get<ItemsList>(`${this.baseUrl}/items`)
  }
}
