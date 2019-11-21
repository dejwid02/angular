import { Component, OnInit } from '@angular/core';
import { StationsGroup } from "../home/StationsGroup";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  ngOnInit() {
  }

    public stations: StationsGroup[];
    public filteredStations: Station[];
    public categories: string[];
    public selectedCategory: string;
    serviceUrl: string;
    playerUrl: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.serviceUrl = baseUrl + 'groups';
        this.playerUrl = baseUrl + 'player';


        http.get<StationsGroup[]>(this.serviceUrl).subscribe(result => {
            this.stations = result;
            this.categories = Array.from(new Set(this.stations.map(s => s.title)));
            this.selectedCategory = this.categories[0];
            this.filteredStations = this.filterStations(this.selectedCategory);
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

    public selectCategory(category: string): void {
        this.selectedCategory = category;
        this.filteredStations = this.filterStations(this.selectedCategory);
    }

    filterStations(filter: string): Station[] {
        return this.stations.filter(i => i.title === filter)[0].stations;
    } 

}
