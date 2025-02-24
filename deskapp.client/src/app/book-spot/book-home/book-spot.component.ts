import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-book-spot',
  imports: [CommonModule],
  templateUrl: './book-spot.component.html',
  styleUrl: './book-spot.component.css',
  standalone: true

})
export class BookSpotComponent {
  isLoggedIn = false
  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn()
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToReservation(): void {
    this.router.navigate(['/reservation']);
  }
}

