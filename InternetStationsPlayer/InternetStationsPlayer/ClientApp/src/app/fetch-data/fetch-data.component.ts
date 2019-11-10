import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: Station[];
    serviceUrl: string;
    playerUrl: string;
    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.serviceUrl = baseUrl + 'stations';
        this.playerUrl = baseUrl + 'player';
        http.get<Station[]>(this.serviceUrl).subscribe(result => {
      this.forecasts = result;

    }, error => console.error(error));
    }

    public play(station: Station): void {
        this.http.get(this.playerUrl + "/play/" + station.id).toPromise();
    }

    public stop(): void {
        this.http.get(this.playerUrl + "/stop").toPromise();
    }

    public volumeUp(): void {
        this.http.get(this.playerUrl + "/volumeup").toPromise();
    }
    public volumeDown(): void {
        this.http.get(this.playerUrl + "/volumedown").toPromise();
    }
}

interface Station {
    id: number;
    url: string;
    imageUrl: string;
    name: string;
    category: string

}
