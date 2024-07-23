import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
    user: User = { username: '', password: '' };
    isLogin = true;
    successMessage = '';
    errorMessage = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    onSubmit() {
        if (this.isLogin) {
            this.authService.login(this.user).subscribe(
                (response) => {
                    this.successMessage = 'Logged in successfully!';
                    this.router.navigate(['/']);
                },
                (error) => {
                    this.errorMessage = error;
                }
            );
        } else {
            this.authService.register(this.user).subscribe(
                (response) => {
                    this.successMessage = 'Registered successfully!';
                    this.toggleAuth();
                },
                (error) => {
                    this.errorMessage = error;
                }
            );
        }
    }

    toggleAuth() {
        this.isLogin = !this.isLogin;
        this.successMessage = '';
        this.errorMessage = '';
    }
}
