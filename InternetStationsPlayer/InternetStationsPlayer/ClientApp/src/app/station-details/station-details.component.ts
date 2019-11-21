import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Station } from '../../model/Station';
import { StationsGroup } from '../../model/StationsGroup';

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.component.html',
  styleUrls: ['./station-details.component.css']
})
export class StationDetailsComponent implements OnInit {
    public id: number;
    constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, @Inject('BASE_URL') baseUrl: string) {
        this.serviceUrl = baseUrl + 'stations';
    }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');

        this.http.get<Station[]>(this.serviceUrl).subscribe(result => {
            this.station = result.filter(g => g.id == this.id)[0];
        }, error => console.error(error));


    }
    public station: Station;
    serviceUrl: string;

    save(): void {
        this.http.put(this.serviceUrl, this.station).subscribe(result => { })
        this.router.navigate(['/stations']);
    }

}
