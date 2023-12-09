import { Component } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  results: any[] = [];
  query: string;
  nominatimApiUrl: string = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  search() {
    let formatedQuery = this.formatQueryString(this.query)
    const params = new HttpParams()
      .set('q', formatedQuery)
      .set('format', 'json')
      .set('limit', 100)
    this.http.get(this.nominatimApiUrl, {params})
      .subscribe((response: any) => {
        console.log(response);
        this.results = response; // Adjust based on the actual API response structure
      });
                        
  }

  formatQueryString(query: string) {
    if(query.indexOf(' ') !== -1) {
      return query.replace(/ /g, '%');
    } else {
      return query
    }
  }

}
