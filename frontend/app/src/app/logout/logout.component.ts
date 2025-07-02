import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem('token');
    // Redirige al usuario a la página de login o inicio
    window.location.href = '/login';
  }
}
