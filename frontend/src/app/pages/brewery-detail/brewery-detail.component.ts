import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brewery } from '../../models/brewery.model';
import { BreweryService } from '../../services/brewery.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-brewery-detail',
    templateUrl: './brewery-detail.component.html',
    styleUrls: ['./brewery-detail.component.css'],
})
export class BreweryDetailComponent implements OnInit {
    brewery: Brewery | null = null;

    constructor(
        private route: ActivatedRoute,
        private breweryService: BreweryService,
        private location: Location,
        private notificationService: NotificationService
    ) {}

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.breweryService.getBreweryById(id).subscribe(
                (data) => {
                    this.brewery = data;
                },
                (error) => {
                    this.notificationService.showError(
                        'Error fetching brewery details'
                    );
                    console.error(error);
                }
            );
        }
    }

    goBack() {
        this.location.back();
    }
}
