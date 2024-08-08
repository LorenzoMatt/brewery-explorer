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
import { AuthService } from './auth.service';

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
        const currentUser = this.authService.currentUserValue;
        let newRequest = request;

        if (currentUser && currentUser.jwt) {
            newRequest = AuthInterceptor.addToken(request, currentUser.jwt);
        }

        return next.handle(newRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.router.navigate(['/auth']);
                }
                return AuthInterceptor.handleError(error);
            })
        );
    }

    private static addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    private static handleError(error: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';

        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else if (error.error && error.error.errors) {
            // Server-side error
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

        return throwError(errorMessage);
    }
}
