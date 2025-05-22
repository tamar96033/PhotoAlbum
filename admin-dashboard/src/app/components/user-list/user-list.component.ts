import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';
import { User } from '../../services/api-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  constructor(private apiClient: ApiClientService){}

  users:User[] = []

  async ngOnInit(): Promise<void> {
    const token = "Bearer " + localStorage.getItem('token')
    const result = await this.apiClient.client.allUsers(token)
    console.log(result);
    this.users = result
  }
}
