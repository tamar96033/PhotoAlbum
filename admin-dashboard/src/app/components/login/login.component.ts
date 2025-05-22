import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiClientService } from '../../services/api-client.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
 
  constructor(private fb: FormBuilder, private apiClient: ApiClientService, private router: Router) {
    this.loginForm = this.fb.group({
      name: [''],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      
      try {
        const response = await this.apiClient.client.login(this.loginForm.value)
        console.log('response', response);
        localStorage.setItem('token', response.token)
        this.router.navigate(['/'])
      } catch (error) {
        console.log('the login failed', error);
      }
    }
  }

}
