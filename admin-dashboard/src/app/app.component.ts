// import { Component, OnInit } from '@angular/core';
// import { Router, RouterOutlet } from '@angular/router';
// import { LoginComponent } from "./components/login/login.component";
// import { MenuComponent } from "./components/menu/menu.component";

// @Component({
//   standalone: true,
//   selector: 'app-root',
//   imports: [MenuComponent],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent implements OnInit {
//   title = 'admin-dashboard';

//   constructor(private router: Router){}

//   ngOnInit(): void {
//     this.router.navigate(['/login'])
//   }
// }

import { Component, signal } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
       <router-outlet></router-outlet>
  `
})
export class AppComponent {

}


// import { Component, signal } from '@angular/core';
// import { LoginComponent } from "./components/login/login.component";
// import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [LoginComponent, AdminDashboardComponent],
//   template: `
//     <div class="min-h-screen bg-gray-50">
//       @if (!isAuthenticated()) {
//         <app-login (loginSuccess)="onLogin()"></app-login>
//       } @else {
//         <app-admin-dashboard (logout)="onLogout()"></app-admin-dashboard>
//       }
//     </div>
//   `,
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   isAuthenticated = signal(false);

//   onLogin() {
//     this.isAuthenticated.set(true);
//   }

//   onLogout() {
//     this.isAuthenticated.set(false);
//   }
// }