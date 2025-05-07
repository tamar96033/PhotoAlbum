import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { MenuComponent } from "./components/menu/menu.component";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'admin-dashboard';

  constructor(private router: Router){}

  ngOnInit(): void {
    this.router.navigate(['/login'])
  }
}
