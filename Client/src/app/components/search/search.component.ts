import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, Validators, FormGroup, FormControl, ReactiveFormsModule } from "@angular/forms";
import { NominatimService } from '../../services/nominatim.service';
import { OverpassService } from '../../services/overpass.service';
import comunasList from '../../utils/comunas.json';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  results: any[] = [];
  searchEngines = ["Nominatim", "Overpass"]
  nominatimEngine: boolean = false;
  overpassEngine: boolean = false;
  overpassForm = new FormGroup({
    category: new FormControl('', [Validators.required]),
    query: new FormControl('', [Validators.required]),
  });
  nominatimForm = new FormGroup({
    query: new FormControl('', [Validators.required]),
  });
  searchEngineSelected = new FormControl('', [Validators.required])


  constructor(
    private nominatimService: NominatimService,
    private overpassService: OverpassService,
  ) {}

  search() {
    console.log(comunasList[0].regions);
  }

  searchNominatim(query: string) {
    this.nominatimService.searchNominatim(query).subscribe((response: any) => {
      const rawData = response
      this.results = rawData;
      console.log(rawData);
    })
  }

  onSubmit() {
    if (this.nominatimEngine) {
      let query = this.nominatimForm.value.query;
      console.log(query);
    } else {
      let category = this.overpassForm.value.category;
      let query = this.overpassForm.value.query;
      console.log(category, query);
    }
  }

  engineQuery() {
    const searchEngine = this.searchEngineSelected.value;
    if (searchEngine === this.searchEngines[0]) {
      console.log('nominatim selected');
      this.nominatimEngine = true;
      this.overpassEngine = false;
    } else if (searchEngine === this.searchEngines[1]) {
      console.log('overpass selected');
      this.overpassEngine = true;
      this.nominatimEngine = false;
    } else {
      console.log('error mamahuevo');
    }
  }

  searchOverpass(category: string, query: string) {
    this.overpassService.searchByCategory(category, query).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

formatQuery(query: string) {
  if (query.indexOf(' ') !== -1) {
    return query.replace(/ /g, '%');
  } else {
    return query
  }
}
}
