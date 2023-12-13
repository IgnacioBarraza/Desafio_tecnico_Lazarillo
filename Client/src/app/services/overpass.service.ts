import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OverpassService {

  constructor(
    private http: HttpClient
  ) { }

  searchByCategory(category: string, query: string) {
    const paramsWithQuery =
      ` 
    [out:json][timeout:25];
    area(id:3600239456)->.searchArea;
    nwr["${category}"="${query}"](area.searchArea);
    out geom;
    `

    const paramsWithOutQuery =
      ` 
    [out:json][timeout:25];
    area(id:3600167454)->.searchArea;
    nwr["${category}"](area.searchArea);
    out geom;
    `
    const paramsWithOutArea =
      ` 
    [out:json][timeout:25];
    nwr["${category}"="${query}"];
    out geom;
    `

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })

    const requestBody = new URLSearchParams();
    if (query) {
      requestBody.set('data', paramsWithQuery);
    } else {
      requestBody.set('data', paramsWithOutQuery);
    }
    

    return this.http.post(environment.overpassBaseUrl,requestBody.toString(), { headers })
  }
}
