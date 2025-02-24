import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  imports: [Menubar],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  loginItems: MenuItem[] = [];
  authSubscription!: Subscription;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.generateMenuItems()

    this.authSubscription = this.authService.isLoggedIn$.subscribe(() => {
      this.generateMenuItems()
    })
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
  generateMenuItems() {
    console.log(localStorage.getItem('role'))
    this.loginItems = []
    this.items = [
      {
        label: 'Strona główna',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/'])
      },
      {
        label: 'Kontakt z administratorem',
        icon: 'pi pi-envelope',
        command: () => this.router.navigate(['/contact-panel'])
      },
      {
        label: 'O aplikacji',
        icon: 'pi pi-info-circle',
        command: () => this.router.navigate(['/about-us'])
      },

    ]

    if (this.authService.isLoggedIn()) {
      this.items.splice(1, 0,
        {
          label: 'Rezerwacje',
          icon: 'pi pi-calendar',
          command: () => this.router.navigate(['/reservation'])
        })
      if (this.authService.isAdmin()) {
        this.items.splice(2, 0,
          {
            label: 'Admin Panel',
            icon: 'pi pi-expand',
            command: () => this.router.navigate(['/admin-panel'])
          }
        )
      }

      this.loginItems.push({
        label: 'Wyloguj',
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.logout()
          this.router.navigate(['/login'])
          this.generateMenuItems()
        }
      })
    }
    else {
      this.loginItems.push({
        label: 'Zaloguj',
        icon: 'pi pi-sign-in',
        command: () => this.router.navigate(['/login'])
      })
    }
  }
}
