// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { ApiClientService } from '../../services/api-client.service';


// @Component({
//   selector: 'app-login',
//   imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {
//   loginForm: FormGroup;

//   constructor(private fb: FormBuilder, private apiClient: ApiClientService, private router: Router) {
//     this.loginForm = this.fb.group({
//       name: [''],
//       password: ['', Validators.required],
//     });
//   }

//   async onSubmit() {
//     if (this.loginForm.valid) {
//       console.log(this.loginForm.value);

//       try {
//         const response = await this.apiClient.client.login(this.loginForm.value)
//         console.log('response', response);
//         localStorage.setItem('token', response.token)
//         this.router.navigate(['/'])
//       } catch (error) {
//         console.log('the login failed', error);
//       }
//     }
//   }

// }


import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiClientService } from '../../services/api-client.service';
import { LoginUserDto } from '../../services/api-client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private apiClient: ApiClientService, private router: Router) { }

  loginSuccess = output<void>();

  name = '';
  password = '';
  hidePassword = true;
  loading = signal(false);

  async onSubmit() {
    this.loading.set(true);

    // Simulate API call
    try {
      const userLogin = new LoginUserDto(
        {
          name: this.name,
          password: this.password
        }
      )
      const response = await this.apiClient.client.login(userLogin)
      console.log('response', response);
      localStorage.setItem('token', response.token)
      this.loginSuccess.emit();
      this.router.navigate(['/dashboard'])

    } catch (error) {
      console.log('the login failed', error);
    }
    // await new Promise(resolve => setTimeout(resolve, 1000));

    // if (this.email === 'admin@photoalbum.com' && this.password === 'admin123') {
    //   this.loginSuccess.emit();
    // } else {
    //   alert('Invalid credentials. Use admin@photoalbum.com / admin123');
    // }

    this.loading.set(false);
  }
}
