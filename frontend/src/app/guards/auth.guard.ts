import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const currentUser = this.authService.currentUserValue;
        if (
            currentUser &&
            currentUser.jwt &&
            AuthGuard.isTokenValid(currentUser.expiration)
        ) {
            return true;
        }

        // Not logged in, redirect to login page
        this.router.navigate(['/auth']);
        return false;
    }

    private static isTokenValid(expiration: string): boolean {
        const currentDate = new Date();
        const expirationDate = new Date(expiration);
        return expirationDate > currentDate;
    }
}
