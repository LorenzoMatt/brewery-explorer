import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brewery } from '../models/brewery.model';

@Injectable({
    providedIn: 'root',
})
export class BreweryService {
    private apiUrl = 'http://localhost:8080/api/breweries';

    constructor(private http: HttpClient) {}

    getBreweries(page: number, size: number): Observable<Brewery[]> {
        return this.http.get<Brewery[]>(
            `${this.apiUrl}?page=${page}&size=${size}`
        );
    }

    getBreweryById(id: string): Observable<Brewery> {
        return this.http.get<Brewery>(`${this.apiUrl}/${id}`);
    }
}
