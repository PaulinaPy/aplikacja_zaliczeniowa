import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button'
import { AccessRights, ChangePasswordRequest, Position, User } from '../models/Users';
import { AdminPanelService } from '../services/admin-panel.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { Toast } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { AdminPanelDeskComponent } from '../admin-panel-desk/admin-panel-desk.component';
import { AdminPanelReservationComponent } from '../admin-panel-reservation/admin-panel-reservation.component';
import { PaginatorModule } from 'primeng/paginator';
import { DividerModule } from 'primeng/divider'
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-admin-panel',
  imports: [Menu, CommonModule, ButtonModule, TableModule, DialogModule, InputTextModule, FormsModule, IconFieldModule, InputIconModule, SelectModule, TooltipModule, Toast, PasswordModule, AdminPanelDeskComponent, AdminPanelReservationComponent, PaginatorModule, DividerModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
  providers: [MessageService]
})
export class AdminPanelComponent implements OnInit {
  items: MenuItem[] = [];
  tableMenuItems: MenuItem[] = []
  showUserDialog: boolean = false
  showPasswordDialog: boolean = false
  isAddingUser: boolean = false
  allUsers: User[] = [];
  positions: { label: string; value: Position }[] = [];
  accessRights: { label: string; value: AccessRights }[] = [];
  currentlyEditedUser: User = { firstName: '', lastName: '', };
  changePasswordRequest: ChangePasswordRequest = {}
  teams: { label: string; value: string }[] = []
  isAdmin: boolean = false


  activeIndex: number = 0;
  constructor(
    private router: Router,
    private authService: AuthService,
    private adminPanelService: AdminPanelService,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
    if (this.authService.isAdmin()) {
      this.isAdmin = true
    }
    this.fetchData()

    this.positions = Object.values(Position).map(value => ({ label: value, value }));
    this.accessRights = Object.values(AccessRights).map(value => ({ label: value, value }));
    this.teams = [
      { label: 'Relationship Management', value: 'Relationship Management' },
      { label: 'Human Resources', value: 'Human Resources' },
      { label: 'Client & Business Services', value: 'Client & Business Services' },
      { label: 'IT Engineering', value: 'IT Engineering' },

    ]
    this.items = [


      {
        label: 'UŻYTKOWNICY',
        icon: 'pi pi-user',
        command: () => this.activeIndex = 0
      },
      {
        label: 'BIURKA',
        icon: 'pi pi-table',
        command: () => this.activeIndex = 1
      },
      {
        label: 'REZERWACJE',
        icon: 'pi pi-calendar-times',
        command: () => this.activeIndex = 2
      }
    ]
    this.tableMenuItems = [
      {
        label: 'Edytuj użytkownika',
        icon: 'pi pi-user-edit',
        command: () => this.router.navigate(['/edit-user'])
      },
      {
        label: 'Usuń użytkownika',
        icon: 'pi pi-user-minus',
        command: () => this.router.navigate(['/delate-user'])
      },
    ]
  }
  fetchData() {
    this.adminPanelService.getAllUsers().subscribe((result) => {
      this.allUsers = result
    },

      (error) => {
        // Error callback: handle the error
        console.error('Error occurred:', error);
      })

  }
  showDialog(user?: User) {
    this.currentlyEditedUser = {} as User;
    if (user) {
      this.currentlyEditedUser = { ...user }
    }
    this.showUserDialog = true
  }

  addUser() {
    this.isAddingUser = true
    this.showDialog()
  }
  deleteUser(user?: any) {
    this.adminPanelService.deleteUser(user.id).subscribe((result) => {
      this.fetchData()
    })
  }
  saveUser() {
    if (this.isAddingUser) {
      this.adminPanelService.addUser(this.currentlyEditedUser).subscribe((result) => {
        this.allUsers.push(result)
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Użytkownik został dodany.' });
        this.fetchData()
      },

        (error) => {
          // Error callback: handle the error
          console.error('Error occurred:', error);
          this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Użytkownik nie został dodany.' });
        })
    }
    else {
      this.adminPanelService.editUser(this.currentlyEditedUser).subscribe((result) => {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Użytkownik został zaktualizowany.' });
        this.fetchData()
      },

        (error) => {
          // Error callback: handle the error
          console.error('Error occurred:', error);
          this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Użytkownik nie został zaktualizowany.' });
        })
    }

    this.isAddingUser = false
    this.showUserDialog = false
  }

  resetPassword(user: User) {
    if (user) {
      this.changePasswordRequest.userId = user.id
    }
    this.showPasswordDialog = true

  }

  sendPasswordResetRequest() {
    this.adminPanelService.changePassword(this.changePasswordRequest).subscribe((result) => {
      this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Hasło zostało zmienione.' });
    })
    this.showPasswordDialog = false
  }
  clearData() {
    this.currentlyEditedUser = {} as User
    this.isAddingUser = false
    this.changePasswordRequest = {} as ChangePasswordRequest
  }

  transformHeader() {
    if (this.isAddingUser) return "Dodaj użytkownika"
    return "Edytuj użytkownika"
  }

}

