import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/users`;
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    private tokenRefreshTimeout: any;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        const storedUser = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<any>(
            storedUser ? JSON.parse(storedUser) : null
        );
        this.currentUser = this.currentUserSubject.asObservable();

        if (this.currentUserValue) {
            this.scheduleTokenRefresh();
        }
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    register(user: User): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/register`, user, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        });
    }

    login(user: User): Observable<any> {
        return this.http
            .post<any>(`${this.apiUrl}/login`, user, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
            })
            .pipe(
                map((response) => {
                    if (response && response.jwt) {
                        localStorage.setItem(
                            'currentUser',
                            JSON.stringify(response)
                        );
                        this.currentUserSubject.next(response);
                        this.scheduleTokenRefresh();
                    }
                    return response;
                })
            );
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        if (this.tokenRefreshTimeout) {
            clearTimeout(this.tokenRefreshTimeout);
        }
        this.router.navigate(['/auth']);
    }

    refreshToken(): Observable<any> {
        const currentUser = this.currentUserValue;
        const token = currentUser ? currentUser.jwt : null;
        return this.http
            .post<any>(`${this.apiUrl}/refresh-token`, token, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
            })
            .pipe(
                map((response) => {
                    if (response && response.jwt) {
                        localStorage.setItem(
                            'currentUser',
                            JSON.stringify(response)
                        );
                        this.currentUserSubject.next(response);
                        this.scheduleTokenRefresh();
                    }
                    return response;
                })
            );
    }

    private scheduleTokenRefresh() {
        const jwtToken = this.currentUserValue?.jwt;
        const expiration = this.currentUserValue?.expiration;

        if (jwtToken && expiration) {
            const timeout = expiration - Date.now() - 5 * 60 * 1000; // 5 minutes before expiry
            if (this.tokenRefreshTimeout) {
                clearTimeout(this.tokenRefreshTimeout);
            }

            this.tokenRefreshTimeout = setTimeout(() => {
                this.refreshToken().subscribe();
            }, timeout);
        }
    }
}
