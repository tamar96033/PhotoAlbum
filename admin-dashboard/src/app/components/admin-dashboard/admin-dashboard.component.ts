// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-admin-dashboard',
//   imports: [],
//   templateUrl: './admin-dashboard.component.html',
//   styleUrl: './admin-dashboard.component.css'
// })
// export class AdminDashboardComponent {

// }





import { Component, output, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
// import { AnalyticsChartsComponent } from '../analytics-charts/analytics-charts.component';
import { UsersListComponent } from "../user-list/user-list.component";
import {  AnalyticsChartsComponent } from "../analytics-charts-component/analytics-charts-component.component";
import { Router } from '@angular/router';

interface Stat {
  title: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    UsersListComponent,
    // AnalyticsChartsComponent,
    AnalyticsChartsComponent
],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  logout = output<void>();
 constructor(private router: Router) {}

 
  stats: Stat[] = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12% from last month',
      icon: 'people',
      color: '#3f51b5'
    },
    {
      title: 'Total Photos',
      value: '45,231',
      change: '+8% from last month',
      icon: 'photo_camera',
      color: '#4caf50'
    },
    {
      title: 'Total Albums',
      value: '8,942',
      change: '+15% from last month',
      icon: 'photo_library',
      color: '#ff9800'
    },
    {
      title: 'Storage Used',
      value: '2.4 TB',
      change: '+5% from last month',
      icon: 'storage',
      color: '#e91e63'
    }
  ];

  onLogout() {
    // this.logout.emit();
    localStorage.setItem('token', '')
     this.router.navigate(['/login']);
  }
}




// import { Component, output, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { UserListComponent } from '../user-list/user-list.component';
// import { AnalyticsChartsComponent } from '../analytics-charts-component/analytics-charts-component.component';

// interface Stat {
//   title: string;
//   value: string;
//   change: string;
//   icon: string;
// }

// interface Tab {
//   id: string;
//   label: string;
// }

// @Component({
//   selector: 'app-admin-dashboard',
//   standalone: true,
//   imports: [CommonModule, UserListComponent, AnalyticsChartsComponent, UserListComponent],
//   template: `
//     <div class="min-h-screen bg-gray-50">
//       <!-- Header -->
//       <header class="bg-white border-b border-gray-200">
//         <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div class="flex justify-between items-center h-16">
//             <div class="flex items-center">
//               <svg class="h-8 w-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
//               </svg>
//               <h1 class="text-xl font-semibold text-gray-900">Photo Album Admin</h1>
//             </div>
//             <button
//               (click)="onLogout()"
//               class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
//             >
//               <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
//               </svg>
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <!-- Main Content -->
//       <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <!-- Tabs -->
//         <div class="mb-6">
//           <nav class="flex space-x-8">
//             @for (tab of tabs; track tab.id) {
//               <button
//                 (click)="activeTab.set(tab.id)"
//                 [class]="getTabClass(tab.id)"
//               >
//                 {{ tab.label }}
//               </button>
//             }
//           </nav>
//         </div>

//         <!-- Tab Content -->
//         @switch (activeTab()) {
//           @case ('overview') {
//             <div class="space-y-6">
//               <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//                 @for (stat of stats; track stat.title) {
//                   <div class="bg-white p-6 rounded-lg shadow">
//                     <div class="flex items-center justify-between">
//                       <div>
//                         <p class="text-sm font-medium text-gray-600">{{ stat.title }}</p>
//                         <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
//                         <p class="text-xs text-gray-500">{{ stat.change }}</p>
//                       </div>
//                       <div [innerHTML]="stat.icon" class="text-gray-400"></div>
//                     </div>
//                   </div>
//                 }
//               </div>
//             </div>
//           }
//           @case ('users') {
//             <app-user-list></app-user-list>
//           }
//           @case ('analytics') {
//             <app-analytics-charts></app-analytics-charts>
//           }
//         }
//       </main>
//     </div>
//   `,
//   styleUrl: './admin-dashboard.component.css'
// })
// export class AdminDashboardComponent {
//   logout = output<void>();
  
//   activeTab = signal('overview');
  
//   tabs: Tab[] = [
//     { id: 'overview', label: 'Overview' },
//     { id: 'users', label: 'Users' },
//     { id: 'analytics', label: 'Analytics' }
//   ];

//   stats: Stat[] = [
//     {
//       title: 'Total Users',
//       value: '1,234',
//       change: '+12% from last month',
//       icon: '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg>'
//     },
//     {
//       title: 'Total Photos',
//       value: '45,231',
//       change: '+8% from last month',
//       icon: '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>'
//     },
//     {
//       title: 'Total Albums',
//       value: '8,942',
//       change: '+15% from last month',
//       icon: '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>'
//     },
//     {
//       title: 'Storage Used',
//       value: '2.4 TB',
//       change: '+5% from last month',
//       icon: '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z"></path></svg>'
//     }
//   ];

//   getTabClass(tabId: string): string {
//     const baseClass = 'py-2 px-1 border-b-2 font-medium text-sm';
//     return this.activeTab() === tabId
//       ? `${baseClass} border-blue-500 text-blue-600`
//       : `${baseClass} border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300`;
//   }

//   onLogout() {
//     this.logout.emit();
//   }
// }