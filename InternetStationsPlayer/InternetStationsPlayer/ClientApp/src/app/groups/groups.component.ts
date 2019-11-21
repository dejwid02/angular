import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Station } from '../../model/Station';
import { StationsGroup } from '../../model/StationsGroup';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
    ngOnInit() {
        this.loadGroups();
  }

    public groups: StationsGroup[];
    public title: string
    serviceUrl: string;
    playerUrl: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.serviceUrl = baseUrl + 'groups';

    }
    public loadGroups(): void {
        this.http.get<StationsGroup[]>(this.serviceUrl).subscribe(result => {
            this.groups = result;
        }, error => console.error(error));
    }

    public delete(group: StationsGroup): void {
        console.log('deleting');
        this.http.request('delete', this.serviceUrl, { body: group }).subscribe(result => {
            this.loadGroups();
        }, error => console.error(error));
    }
    public create(): void {
        const newItem: StationsGroup = {
            id: -1,
            stations: [],
            title: this.title
        }
        this.http.post(this.serviceUrl, newItem).subscribe(res => {
            this.loadGroups();
            this.title = "";
        });
    }

}
