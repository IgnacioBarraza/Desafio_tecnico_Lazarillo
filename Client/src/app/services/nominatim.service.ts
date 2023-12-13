import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NominatimService {

  constructor(
    private http: HttpClient
  ) { }

  searchNominatim(query: string) {
    const params = new HttpParams()
    .set('q', query)
    .set('format', 'json')
    .set('limit', 30)
    .set('addressdetails', 1)
    .set('extratags', 1)

    return this.http.get(`${environment.nominatimApiBaseUrl}search?`, {params});
  }
}
