import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brewery } from 'src/app/models/brewery.model';
import { BreweryService } from 'src/app/services/brewery.service';

@Component({
    selector: 'app-brewery-detail',
    templateUrl: './brewery-detail.component.html',
    styleUrls: ['./brewery-detail.component.css'],
})
export class BreweryDetailComponent implements OnInit {
    brewery: Brewery | undefined;

    constructor(
        private route: ActivatedRoute,
        private breweryService: BreweryService,
        private router: Router
    ) {}

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.breweryService.getBreweryById(id).subscribe((brewery) => {
                this.brewery = brewery;
            });
        }
    }

    goBack() {
        this.router.navigate(['/']);
    }
}
