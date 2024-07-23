import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let currentUser = this.authService.currentUserValue;

        if (currentUser && currentUser.jwt) {
            request = this.addToken(request, currentUser.jwt);
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.router.navigate(['/auth']);
                }
                return this.handleError(error);
            })
        );
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';

        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            if (error.error && error.error.errors) {
                const validationErrors = error.error.errors
                    .map(
                        (err: any) =>
                            `Field: ${err.field}, Error: ${err.error}, Value: ${err.value}`
                    )
                    .join('\n');
                errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}\n${validationErrors}`;
            } else {
                errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message || error.message}`;
            }
        }

        return throwError(errorMessage);
    }
}
