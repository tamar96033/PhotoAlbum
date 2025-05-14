import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiClientService } from '../../services/api-client.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-user',
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  addForm: FormGroup;
 
  constructor(private fb: FormBuilder, private apiClient: ApiClientService, private router: Router) {
    this.addForm = this.fb.group({
      name: [''],
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.addForm.valid) {
      console.log(this.addForm.value);
      
      try {
        const response = await this.apiClient.client.register(this.addForm.value)
        console.log('response', response);
        // localStorage.setItem('token', response.token)
        // this.router.navigate(['/'])
      } catch (error) {
        console.log('the login failed', error);
      }
    }
  }
}
