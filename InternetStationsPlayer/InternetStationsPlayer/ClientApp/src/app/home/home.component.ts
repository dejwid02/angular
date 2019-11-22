import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Station } from '../../model/Station';
import { StationsGroup } from '../../model/StationsGroup';
import { Usage } from '../../model/Usage';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
    public stations: StationsGroup[];
    public filteredStations: Station[];
    public usages: Usage[];
    public categories: string[];
    public selectedCategory: string;
    serviceUrl: string;
    playerUrl: string;
    usageUrl: string;
    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.serviceUrl = baseUrl + 'groups';
        this.playerUrl = baseUrl + 'player';
        this.usageUrl = baseUrl + 'usage';

        this.loadData(true);
    }

    private loadData(selectFirst: boolean) {
        this.http.get<StationsGroup[]>(this.serviceUrl).subscribe(result => {
            this.stations = result;
            this.buildGroups(selectFirst);
        }, error => console.error(error));
        this.http.get<Usage[]>(this.usageUrl).subscribe(result => {
            this.usages = result;
            this.buildGroups(selectFirst);
        }, error => console.error(error));
    }

    public buildGroups(selectFist: boolean) {
        if (this.usages) {
            let group: StationsGroup = {
                title: "Popularne",
                id: -1,
                stations: this.usages.sort((a, b) => b.noOfTimesPlayed - a.noOfTimesPlayed).map(u => u.station)
            };
            this.stations.splice(0, 0, group);
        }
        this.categories = Array.from(new Set(this.stations.map(s => s.title)));
        if (selectFist) {
            this.selectedCategory = this.categories[0];
            this.filteredStations = this.filterStations(this.selectedCategory);
        }
    }

    public play(station: Station): void {
        this.http.get(this.playerUrl + "/play/" + station.id).toPromise();
        this.http.put(this.usageUrl, station).toPromise();
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
        this.loadData(false);
        this.selectedCategory = category;
        this.filteredStations = this.filterStations(this.selectedCategory);
    }

    filterStations(filter: string): Station[] {
        return this.stations.filter(i => i.title === filter)[0].stations;
    } 
}

