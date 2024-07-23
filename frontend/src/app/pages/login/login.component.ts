import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    user: User = { username: '', password: '' };
    errorMessage: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    login() {
        this.authService.login(this.user).subscribe({
            next: () => this.router.navigate(['/']),
            error: (err) => {
                this.errorMessage = err;
            },
        });
    }
}
