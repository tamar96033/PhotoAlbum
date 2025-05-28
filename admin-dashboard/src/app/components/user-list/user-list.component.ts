// import { Component, OnInit } from '@angular/core';
// import { ApiClientService } from '../../services/api-client.service';
// import { User } from '../../services/api-client';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-user-list',
//   imports: [],
//   templateUrl: './user-list.component.html',
//   styleUrl: './user-list.component.css'
// })
// export class UserListComponent implements OnInit {

//   constructor(private apiClient: ApiClientService){}

//   users:User[] = []

//   async ngOnInit(): Promise<void> {
//     const token = "Bearer " + localStorage.getItem('token')
//     const result = await this.apiClient.client.allUsers(token)
//     console.log(result);
//     this.users = result
//   }
// }






import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { ApiClientService } from '../../services/api-client.service';
import { User, UserDto } from '../../services/api-client';
// import { MatAvatarModule } from '@angular/material/avatar';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   avatar: string;
//   status: 'active' | 'suspended' | 'inactive';
//   photos: number;
//   albums: number;
//   joinDate: string;
// }

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatChipsModule,
    // MatAvatarModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css' 
})
export class UsersListComponent implements OnInit{

isLoading = true;
acc: any;
  
  constructor(private apiClient: ApiClientService){}

  users: WritableSignal<UserDto[]> = signal<UserDto[]>([])

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    const token = "Bearer " + localStorage.getItem('token')
    const result = await this.apiClient.client.allUsers(token)
    console.log(result);
    // this.users = signal(result)
    this.users.set(result);
    this.isLoading = false;
  }



  searchTerm = signal('');
  displayedColumns: string[] = ['user', 'status', 'photos', 'albums', 'joinDate', 'actions'];

  // users = signal<User[]>([
  //   {
  //     id: 1,
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     avatar: '',
  //     status: 'active',
  //     photos: 156,
  //     albums: 12,
  //     joinDate: '2024-01-15'
  //   },
  //   {
  //     id: 2,
  //     name: 'Jane Smith',
  //     email: 'jane@example.com',
  //     avatar: '',
  //     status: 'active',
  //     photos: 89,
  //     albums: 8,
  //     joinDate: '2024-02-20'
  //   },
  //   {
  //     id: 3,
  //     name: 'Mike Johnson',
  //     email: 'mike@example.com',
  //     avatar: '',
  //     status: 'suspended',
  //     photos: 234,
  //     albums: 18,
  //     joinDate: '2023-12-10'
  //   },
  //   {
  //     id: 4,
  //     name: 'Sarah Wilson',
  //     email: 'sarah@example.com',
  //     avatar: '',
  //     status: 'active',
  //     photos: 67,
  //     albums: 5,
  //     joinDate: '2024-03-05'
  //   },
  //   {
  //     id: 5,
  //     name: 'David Brown',
  //     email: 'david@example.com',
  //     avatar: '',
  //     status: 'inactive',
  //     photos: 12,
  //     albums: 2,
  //     joinDate: '2024-01-30'
  //   }
  // ]);

  

  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.users().filter(user =>
      user.name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term)
    );
  });

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  handleUserAction(userId: number, action: string) {
    console.log(`${action} user with ID: ${userId}`);
    // Here you would implement the actual user management logic
  }

  
  getTotalPictures(user: UserDto): number {
    if (!user.albums) return 0;
    return user.albums.reduce((acc, album) => acc + (album.pictures?.length || 0), 0);
  }
}










// import { Component, computed, signal } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   avatar: string;
//   status: 'active' | 'suspended' | 'inactive';
//   photos: number;
//   albums: number;
//   joinDate: string;
// }

// @Component({
//   selector: 'app-user-list',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   template: `
//     <div class="bg-white rounded-lg shadow">
//       <div class="px-6 py-4 border-b border-gray-200">
//         <h3 class="text-lg font-medium text-gray-900">User Management</h3>
//         <p class="text-sm text-gray-500">Manage users, view their activity, and control access</p>
        
//         <div class="mt-4 relative max-w-sm">
//           <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//             </svg>
//           </div>
//           <input
//             type="text"
//             [(ngModel)]="searchTerm"
//             placeholder="Search users..."
//             class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>
      
//       <div class="overflow-x-auto">
//         <table class="min-w-full divide-y divide-gray-200">
//           <thead class="bg-gray-50">
//             <tr>
//               <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
//               <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photos</th>
//               <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Albums</th>
//               <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
//               <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody class="bg-white divide-y divide-gray-200">
//             @for (user of filteredUsers(); track user.id) {
//               <tr>
//                 <td class="px-6 py-4 whitespace-nowrap">
//                   <div class="flex items-center">
//                     <div class="flex-shrink-0 h-10 w-10">
//                       <img class="h-10 w-10 rounded-full" [src]="user.avatar" [alt]="user.name">
//                     </div>
//                     <div class="ml-4">
//                       <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
//                       <div class="text-sm text-gray-500">{{ user.email }}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap">
//                   <span [class]="getStatusClass(user.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
//                     {{ user.status }}
//                   </span>
//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.photos }}</td>
//                 <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.albums }}</td>
//                 <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.joinDate }}</td>
//                 <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                   <div class="relative inline-block text-left">
//                     <button
//                       (click)="toggleDropdown(user.id)"
//                       class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
//                     >
//                       <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01"></path>
//                       </svg>
//                     </button>
                    
//                     @if (openDropdown() === user.id) {
//                       <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
//                         <div class="py-1">
//                           <button
//                             (click)="handleUserAction(user.id, 'view')"
//                             class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           >
//                             View Details
//                           </button>
//                           <button
//                             (click)="handleUserAction(user.id, 'suspend')"
//                             class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           >
//                             Suspend User
//                           </button>
//                           <button
//                             (click)="handleUserAction(user.id, 'delete')"
//                             class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                           >
//                             Delete User
//                           </button>
//                         </div>
//                       </div>
//                     }
//                   </div>
//                 </td>
//               </tr>
//             }
//           </tbody>
//         </table>
//       </div>
//     </div>
//   `,
//   styleUrl: './user-list.component.css'
// })
// export class UserListComponent {
//   searchTerm = signal('');
//   openDropdown = signal<number | null>(null);

//   users = signal<User[]>([
//     {
//       id: 1,
//       name: 'John Doe',
//       email: 'john@example.com',
//       avatar: '/placeholder.svg?height=40&width=40',
//       status: 'active',
//       photos: 156,
//       albums: 12,
//       joinDate: '2024-01-15'
//     },
//     {
//       id: 2,
//       name: 'Jane Smith',
//       email: 'jane@example.com',
//       avatar: '/placeholder.svg?height=40&width=40',
//       status: 'active',
//       photos: 89,
//       albums: 8,
//       joinDate: '2024-02-20'
//     },
//     {
//       id: 3,
//       name: 'Mike Johnson',
//       email: 'mike@example.com',
//       avatar: '/placeholder.svg?height=40&width=40',
//       status: 'suspended',
//       photos: 234,
//       albums: 18,
//       joinDate: '2023-12-10'
//     },
//     {
//       id: 4,
//       name: 'Sarah Wilson',
//       email: 'sarah@example.com',
//       avatar: '/placeholder.svg?height=40&width=40',
//       status: 'active',
//       photos: 67,
//       albums: 5,
//       joinDate: '2024-03-05'
//     },
//     {
//       id: 5,
//       name: 'David Brown',
//       email: 'david@example.com',
//       avatar: '/placeholder.svg?height=40&width=40',
//       status: 'inactive',
//       photos: 12,
//       albums: 2,
//       joinDate: '2024-01-30'
//     }
//   ]);

//   filteredUsers = computed(() => {
//     const term = this.searchTerm().toLowerCase();
//     return this.users().filter(user =>
//       user.name.toLowerCase().includes(term) ||
//       user.email.toLowerCase().includes(term)
//     );
//   });

//   getStatusClass(status: string): string {
//     switch (status) {
//       case 'active':
//         return 'bg-green-100 text-green-800';
//       case 'suspended':
//         return 'bg-red-100 text-red-800';
//       case 'inactive':
//         return 'bg-gray-100 text-gray-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   }

//   toggleDropdown(userId: number) {
//     this.openDropdown.set(this.openDropdown() === userId ? null : userId);
//   }

//   handleUserAction(userId: number, action: string) {
//     console.log(`${action} user with ID: ${userId}`);
//     this.openDropdown.set(null);
//     // Here you would implement the actual user management logic
//   }
// }