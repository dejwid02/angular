import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Station } from '../../model/Station';
import { StationsGroup } from '../../model/StationsGroup';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.serviceUrl = baseUrl + 'stations';

        this.loadStattions();
       
    }

  ngOnInit() {
  }

    loadStattions() {
        this.http.get<Station[]>(this.serviceUrl).subscribe(result => {
            this.stations = result;
        }, error => console.error(error));
    }
    public stations: Station[];
    serviceUrl: string;

    newStation() {
        let station: Station = {
            name: "New station",
            category: "",
            id: -1,
            imageUrl: "",
            url: ""

        }

        this.http.post(this.serviceUrl, station).subscribe(res => {
            this.loadStattions();
        });
    }

    public delete(station: Station): void {
        console.log('deleting');
        this.http.request('delete', this.serviceUrl, { body: station }).subscribe(result => {
            this.loadStattions();
        }, error => console.error(error));
    }
 
}
