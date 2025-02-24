import { Component } from "@angular/core"
import { Router } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-login',
  imports: [FormsModule, TableModule, ReactiveFormsModule, CommonModule, FloatLabelModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true

})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  }
  errorMessage: string = ''
  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.credentials.email, this.credentials.password).subscribe((response) => {
      localStorage.setItem('token', response.token)
      this.router.navigate([''])
    },
      (error) => {
        this.errorMessage = error.error
      })
  }

  ngAfterViewInit() {
    const input = document.getElementById('password') as HTMLInputElement;
    if (input) {
      input.type = 'password';
    }
  }
}


