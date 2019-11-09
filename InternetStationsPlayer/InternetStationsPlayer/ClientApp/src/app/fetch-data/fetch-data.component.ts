import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: Station[];
    serviceUrl: string;
    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.serviceUrl = baseUrl + 'weatherforecast';
        http.get<Station[]>(this.serviceUrl).subscribe(result => {
      this.forecasts = result;

    }, error => console.error(error));
    }

    Play(url: string): void {
        this.http.put(this.serviceUrl, );
    }
}

interface Station {
    url: string;
    imageUrl: string;
    name: string;

}
