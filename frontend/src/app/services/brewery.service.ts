import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BreweryService {
    private apiUrl = 'http://localhost:8080/api/breweries';

    constructor(private http: HttpClient) {}

    getBreweries(page: number, size: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
    }
}
