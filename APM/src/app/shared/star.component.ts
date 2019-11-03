import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})

export class StarComponent implements OnInit, OnChanges {
   @Input() rating: number = 4;
    starWidth: number;
    ngOnChanges(): void {
        this.starWidth = this.rating * 75 / 5;
    }
    constructor() { }

    ngOnInit() { }
    onClick() {

    }
}