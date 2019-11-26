import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Station } from '../../model/Station';
import { StationsGroup } from '../../model/StationsGroup';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs'

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
    public id: number;
    constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, @Inject('BASE_URL') baseUrl: string) {
        this.serviceUrl = baseUrl + 'groups';
        this.stationsUrl = baseUrl + 'stations';

        this.id = +this.route.snapshot.paramMap.get('id');

        let groupsResponce = this.http.get<StationsGroup[]>(this.serviceUrl);
        let stattionsResponce = this.http.get<Station[]>(this.stationsUrl);

        forkJoin(groupsResponce, stattionsResponce).subscribe(responces => {
            this.group = responces[0].filter(g => g.id == this.id)[0];
            this.allStations = responces[1];
            this.updateAvailableStations()
        }, error => console.error(error));
       
    }

      

    ngOnInit() {
           
        
  }
    public group: StationsGroup;
    public availableStations: Station[];
    public allStations: Station[];
    serviceUrl: string;
    stationsUrl: string;

    updateAvailableStations(): void {
        this.availableStations = this.allStations.filter(s => !this.group.stations.map(s2 => s2.id).includes(s.id));
    }

    addStation(station: Station) {
        this.group.stations.push(station);
        this.updateAvailableStations();
    }

    removeStation(station: Station) {
        this.group.stations = this.group.stations.filter(s=>s.id!==station.id);
        this.updateAvailableStations();
    }

    moveUp(station: Station) {
        var index = this.group.stations.indexOf(station);
        if (index > 0) {
            let prevItem: Station = this.group.stations[index - 1];
            this.group.stations[index - 1] = station;
            this.group.stations[index] = prevItem;
        }
    }

    moveDown(station: Station) {
        var index = this.group.stations.indexOf(station);
        if (index < this.group.stations.length-1) {
            let nextItem: Station = this.group.stations[index + 1];
            this.group.stations[index + 1] = station;
            this.group.stations[index] = nextItem;
        }
    }

    save() : void{
        this.http.put(this.serviceUrl, this.group).subscribe(result => { })
        this.router.navigate(['']);
    }
    undo(): void {
        this.router.navigate(['']);
    }
}
