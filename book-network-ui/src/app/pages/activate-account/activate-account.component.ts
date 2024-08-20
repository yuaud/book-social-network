import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { CommonModule } from '@angular/common';
import { CodeInputModule } from 'angular-code-input';


@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [CommonModule, CodeInputModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {
  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;


  constructor(
    private router: Router,
    private authService: AuthenticationService
  ){

  }

  onCodeCompleted(token: string): void {
    this.confirmAccount(token);
  }

  redirectToLogin(): void {
    this.router.navigate(['login']);
  }

  private confirmAccount(token: string): void {
    this.authService.confirm({
      token
    }).subscribe({
      next: ():void => {
        this.message = 'Your account has been successfully activated.\nNow you can proceed to login.';
        this.submitted = true;
        this.isOkay = true;
      },
      error: ():void => {
        this.message = 'Token has been expired or invalid.';
        this.submitted = true;
        this.isOkay = false;
      }
    });
  }

}
