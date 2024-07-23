import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
    user: User = { username: '', password: '' };
    errorMessage: string = '';
    successMessage: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    register() {
        this.authService.register(this.user).subscribe({
            next: () => {
                this.successMessage = 'Registration successful! Please login.';
                this.errorMessage = '';
            },
            error: (err) => {
                this.errorMessage = err;
                this.successMessage = '';
            },
        });
    }
}
