import { Component } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-admin',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private apiClient: ApiClientService){
    this.registerForm = this.fb.group({
      name: [''],
      email: ['user@example.com', Validators.email],
      password: ["password", Validators.required],
      // "roleName": "string"
    })
  }

  onSubmit(){
    const token = "Bearer " + localStorage.getItem('token');
    const result = this.apiClient.client.registerAdmin(this.registerForm.value)
    console.log(result);
    
  }
}
