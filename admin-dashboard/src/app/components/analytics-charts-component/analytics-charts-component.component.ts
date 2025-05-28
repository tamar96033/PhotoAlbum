// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-analytics-charts-component',
//   imports: [],
//   templateUrl: './analytics-charts-component.component.html',
//   styleUrl: './analytics-charts-component.component.css'
// })
// export class AnalyticsChartsComponentComponent {

// }




import { Component, AfterViewInit, ElementRef, ViewChild, signal, WritableSignal, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserDto } from '../../services/api-client';
import { ApiClientService } from '../../services/api-client.service';
import Chart from 'chart.js/auto';
interface ActivityMetric {
  label: string;
  value: string;
}

@Component({
  selector: 'app-analytics-charts',
  standalone: true,
  imports: [MatCardModule, MatGridListModule],
  templateUrl: './analytics-charts-component.component.html',
  styleUrl: './analytics-charts-component.component.css' 
})
// export class AnalyticsChartsComponent implements AfterViewInit {
//   @ViewChild('uploadsChart') uploadsChart!: ElementRef<HTMLCanvasElement>;
//   @ViewChild('userGrowthChart') userGrowthChart!: ElementRef<HTMLCanvasElement>;
//   @ViewChild('storageChart') storageChart!: ElementRef<HTMLCanvasElement>;

//   activityMetrics = signal<ActivityMetric[]>([
//     { label: 'Average photos per user', value: '36.7' },
//     { label: 'Average albums per user', value: '7.2' },
//     { label: 'Daily active users', value: '892' },
//     { label: 'Storage per user (avg)', value: '2.1 GB' }
//   ]);

//   ngAfterViewInit() {
//     setTimeout(() => {
//       this.createUploadsChart();
//       this.createUserGrowthChart();
//       this.createStorageChart();
//     }, 100);
//   }

//   private createUploadsChart() {
//     const canvas = this.uploadsChart.nativeElement;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const data = [1200, 1900, 1700, 2100, 2400, 2200];
//     const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
//     this.drawBarChart(ctx, data, labels, canvas.width, canvas.height);
//   }

//   private createUserGrowthChart() {
//     const canvas = this.userGrowthChart.nativeElement;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const data = [100, 150, 200, 280, 350, 420];
//     const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
//     this.drawLineChart(ctx, data, labels, canvas.width, canvas.height);
//   }

//   private createStorageChart() {
//     const canvas = this.storageChart.nativeElement;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const data = [
//       { label: 'Photos', value: 65, color: '#3f51b5' },
//       { label: 'Videos', value: 25, color: '#4caf50' },
//       { label: 'Documents', value: 10, color: '#ff9800' }
//     ];
    
//     this.drawPieChart(ctx, data, canvas.width, canvas.height);
//   }

//   private drawBarChart(ctx: CanvasRenderingContext2D, data: number[], labels: string[], width: number, height: number) {
//     const padding = 40;
//     const chartWidth = width - 2 * padding;
//     const chartHeight = height - 2 * padding;
//     const barWidth = chartWidth / data.length * 0.7;
//     const maxValue = Math.max(...data);

//     ctx.clearRect(0, 0, width, height);

//     // Draw bars
//     ctx.fillStyle = '#3f51b5';
//     data.forEach((value, index) => {
//       const barHeight = (value / maxValue) * chartHeight;
//       const x = padding + index * (chartWidth / data.length) + (chartWidth / data.length - barWidth) / 2;
//       const y = height - padding - barHeight;
      
//       ctx.fillRect(x, y, barWidth, barHeight);
      
//       // Draw labels
//       ctx.fillStyle = '#333';
//       ctx.font = '12px Arial';
//       ctx.textAlign = 'center';
//       ctx.fillText(labels[index], x + barWidth / 2, height - padding + 20);
//       ctx.fillStyle = '#3f51b5';
//     });
//   }

//   private drawLineChart(ctx: CanvasRenderingContext2D, data: number[], labels: string[], width: number, height: number) {
//     const padding = 40;
//     const chartWidth = width - 2 * padding;
//     const chartHeight = height - 2 * padding;
//     const maxValue = Math.max(...data);

//     ctx.clearRect(0, 0, width, height);

//     // Draw line
//     ctx.strokeStyle = '#4caf50';
//     ctx.lineWidth = 3;
//     ctx.beginPath();

//     data.forEach((value, index) => {
//       const x = padding + (index / (data.length - 1)) * chartWidth;
//       const y = height - padding - (value / maxValue) * chartHeight;
      
//       if (index === 0) {
//         ctx.moveTo(x, y);
//       } else {
//         ctx.lineTo(x, y);
//       }
      
//       // Draw points
//       ctx.fillStyle = '#4caf50';
//       ctx.beginPath();
//       ctx.arc(x, y, 5, 0, 2 * Math.PI);
//       ctx.fill();
//     });

//     ctx.stroke();

//     // Draw labels
//     ctx.fillStyle = '#333';
//     ctx.font = '12px Arial';
//     ctx.textAlign = 'center';
//     labels.forEach((label, index) => {
//       const x = padding + (index / (data.length - 1)) * chartWidth;
//       ctx.fillText(label, x, height - padding + 20);
//     });
//   }

//   private drawPieChart(ctx: CanvasRenderingContext2D, data: any[], width: number, height: number) {
//     const centerX = width / 2;
//     const centerY = height / 2;
//     const radius = Math.min(width, height) / 2 - 30;
//     const total = data.reduce((sum, item) => sum + item.value, 0);

//     ctx.clearRect(0, 0, width, height);

//     let currentAngle = 0;

//     data.forEach((item) => {
//       const sliceAngle = (item.value / total) * 2 * Math.PI;
      
//       // Draw slice
//       ctx.fillStyle = item.color;
//       ctx.beginPath();
//       ctx.moveTo(centerX, centerY);
//       ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
//       ctx.closePath();
//       ctx.fill();

//       // Draw label
//       const labelAngle = currentAngle + sliceAngle / 2;
//       const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
//       const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
      
//       ctx.fillStyle = '#ffffff';
//       ctx.font = 'bold 12px Arial';
//       ctx.textAlign = 'center';
//       ctx.fillText(`${item.label}`, labelX, labelY - 5);
//       ctx.fillText(`${item.value}%`, labelX, labelY + 10);

//       currentAngle += sliceAngle;
//     });
//   }
// }


export class AnalyticsChartsComponent implements OnInit {
  @ViewChild('uploadsChart') uploadsChartRef!: ElementRef<HTMLCanvasElement>;
  users: WritableSignal<UserDto[]> = signal<UserDto[]>([]);
  activityMetrics: WritableSignal<ActivityMetric[]> = signal([]);
  isLoading = false;

  constructor(private apiClient: ApiClientService) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    const token = 'Bearer ' + localStorage.getItem('token');
    const result = await this.apiClient.client.allUsers(token);
    this.users.set(result);
    this.calculateActivityMetrics(result);
    this.createUploadsChart(result);
    this.isLoading = false;
  }

  private calculateActivityMetrics(users: UserDto[]): void {
    const totalUsers = users.length;
    let totalAlbums = 0;
    let totalPictures = 0;

    users.forEach(user => {
      totalAlbums += user.albums?.length ?? 0;
      user.albums?.forEach(album => {
        totalPictures += album.pictures?.length ?? 0;
      });
    });

    this.activityMetrics.set([
      { label: 'Total Users', value: totalUsers.toString() },
      { label: 'Total Albums', value: totalAlbums.toString() },
      { label: 'Total Pictures', value: totalPictures.toString() },
      { label: 'Avg Pictures/User', value: totalUsers ? (totalPictures / totalUsers).toFixed(1) : '0' },
      { label: 'Avg Albums/User', value: totalUsers ? (totalAlbums / totalUsers).toFixed(1) : '0' },
    ]);
  }

  private createUploadsChart(users: UserDto[]): void {
    const monthlyCounts = new Map<string, number>();

    users.forEach(user => {
      user.albums?.forEach(album => {
        album.pictures?.forEach(picture => {
          if (picture?.createdAt) { const createdAt = new Date(picture?.createdAt);
          const key = `${createdAt?.getFullYear()}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}`;
          monthlyCounts.set(key, (monthlyCounts.get(key) || 0) + 1);
      }});
      });
    });

    const sortedMonths = Array.from(monthlyCounts.keys()).sort();
    const counts = sortedMonths.map(month => monthlyCounts.get(month)!);

    new Chart(this.uploadsChartRef.nativeElement.getContext('2d')!, {
      type: 'bar',
      data: {
        labels: sortedMonths,
        datasets: [
          {
            label: 'Photos Uploaded',
            data: counts,
            backgroundColor: 'rgba(63, 81, 181, 0.6)'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }
}





// import { Component, AfterViewInit, ElementRef, ViewChild, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';

// interface ActivityMetric {
//   label: string;
//   value: string;
// }

// @Component({
//   selector: 'app-analytics-charts',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div class="space-y-6">
//       <div class="grid gap-6 md:grid-cols-2">
//         <!-- Monthly Uploads Chart -->
//         <div class="bg-white p-6 rounded-lg shadow">
//           <h3 class="text-lg font-medium text-gray-900 mb-2">Monthly Photo Uploads</h3>
//           <p class="text-sm text-gray-500 mb-4">Number of photos uploaded each month</p>
//           <div class="h-64">
//             <canvas #uploadsChart width="400" height="200"></canvas>
//           </div>
//         </div>

//         <!-- User Growth Chart -->
//         <div class="bg-white p-6 rounded-lg shadow">
//           <h3 class="text-lg font-medium text-gray-900 mb-2">User Growth</h3>
//           <p class="text-sm text-gray-500 mb-4">New user registrations over time</p>
//           <div class="h-64">
//             <canvas #userGrowthChart width="400" height="200"></canvas>
//           </div>
//         </div>
//       </div>

//       <div class="grid gap-6 md:grid-cols-2">
//         <!-- Storage Usage -->
//         <div class="bg-white p-6 rounded-lg shadow">
//           <h3 class="text-lg font-medium text-gray-900 mb-2">Storage Usage Distribution</h3>
//           <p class="text-sm text-gray-500 mb-4">Breakdown of storage usage by file type</p>
//           <div class="h-64 flex items-center justify-center">
//             <canvas #storageChart width="300" height="300"></canvas>
//           </div>
//         </div>

//         <!-- Activity Summary -->
//         <div class="bg-white p-6 rounded-lg shadow">
//           <h3 class="text-lg font-medium text-gray-900 mb-2">Activity Summary</h3>
//           <p class="text-sm text-gray-500 mb-4">Key metrics and statistics</p>
//           <div class="space-y-4">
//             @for (metric of activityMetrics(); track metric.label) {
//               <div class="flex justify-between items-center">
//                 <span class="text-sm font-medium text-gray-600">{{ metric.label }}</span>
//                 <span class="text-2xl font-bold text-gray-900">{{ metric.value }}</span>
//               </div>
//             }
//           </div>
//         </div>
//       </div>
//     </div>
//   `,
//   styleUrl: './analytics-charts-component.component.css'
// })
// export class AnalyticsChartsComponent implements AfterViewInit {
//   @ViewChild('uploadsChart') uploadsChart!: ElementRef<HTMLCanvasElement>;
//   @ViewChild('userGrowthChart') userGrowthChart!: ElementRef<HTMLCanvasElement>;
//   @ViewChild('storageChart') storageChart!: ElementRef<HTMLCanvasElement>;

//   activityMetrics = signal<ActivityMetric[]>([
//     { label: 'Average photos per user', value: '36.7' },
//     { label: 'Average albums per user', value: '7.2' },
//     { label: 'Daily active users', value: '892' },
//     { label: 'Storage per user (avg)', value: '2.1 GB' }
//   ]);

//   ngAfterViewInit() {
//     // Initialize charts after view init
//     setTimeout(() => {
//       this.createUploadsChart();
//       this.createUserGrowthChart();
//       this.createStorageChart();
//     }, 100);
//   }

//   private createUploadsChart() {
//     const canvas = this.uploadsChart.nativeElement;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const data = [1200, 1900, 1700, 2100, 2400, 2200];
//     const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
//     this.drawBarChart(ctx, data, labels, canvas.width, canvas.height);
//   }

//   private createUserGrowthChart() {
//     const canvas = this.userGrowthChart.nativeElement;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const data = [100, 150, 200, 280, 350, 420];
//     const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
//     this.drawLineChart(ctx, data, labels, canvas.width, canvas.height);
//   }

//   private createStorageChart() {
//     const canvas = this.storageChart.nativeElement;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const data = [
//       { label: 'Photos', value: 65, color: '#3b82f6' },
//       { label: 'Videos', value: 25, color: '#10b981' },
//       { label: 'Documents', value: 10, color: '#f59e0b' }
//     ];
    
//     this.drawPieChart(ctx, data, canvas.width, canvas.height);
//   }

//   private drawBarChart(ctx: CanvasRenderingContext2D, data: number[], labels: string[], width: number, height: number) {
//     const padding = 40;
//     const chartWidth = width - 2 * padding;
//     const chartHeight = height - 2 * padding;
//     const barWidth = chartWidth / data.length * 0.8;
//     const maxValue = Math.max(...data);

//     // Clear canvas
//     ctx.clearRect(0, 0, width, height);

//     // Draw bars
//     ctx.fillStyle = '#3b82f6';
//     data.forEach((value, index) => {
//       const barHeight = (value / maxValue) * chartHeight;
//       const x = padding + index * (chartWidth / data.length) + (chartWidth / data.length - barWidth) / 2;
//       const y = height - padding - barHeight;
      
//       ctx.fillRect(x, y, barWidth, barHeight);
      
//       // Draw labels
//       ctx.fillStyle = '#374151';
//       ctx.font = '12px Arial';
//       ctx.textAlign = 'center';
//       ctx.fillText(labels[index], x + barWidth / 2, height - padding + 20);
//       ctx.fillStyle = '#3b82f6';
//     });
//   }

//   private drawLineChart(ctx: CanvasRenderingContext2D, data: number[], labels: string[], width: number, height: number) {
//     const padding = 40;
//     const chartWidth = width - 2 * padding;
//     const chartHeight = height - 2 * padding;
//     const maxValue = Math.max(...data);

//     // Clear canvas
//     ctx.clearRect(0, 0, width, height);

//     // Draw line
//     ctx.strokeStyle = '#10b981';
//     ctx.lineWidth = 2;
//     ctx.beginPath();

//     data.forEach((value, index) => {
//       const x = padding + (index / (data.length - 1)) * chartWidth;
//       const y = height - padding - (value / maxValue) * chartHeight;
      
//       if (index === 0) {
//         ctx.moveTo(x, y);
//       } else {
//         ctx.lineTo(x, y);
//       }
      
//       // Draw points
//       ctx.fillStyle = '#10b981';
//       ctx.beginPath();
//       ctx.arc(x, y, 4, 0, 2 * Math.PI);
//       ctx.fill();
//     });

//     ctx.stroke();

//     // Draw labels
//     ctx.fillStyle = '#374151';
//     ctx.font = '12px Arial';
//     ctx.textAlign = 'center';
//     labels.forEach((label, index) => {
//       const x = padding + (index / (data.length - 1)) * chartWidth;
//       ctx.fillText(label, x, height - padding + 20);
//     });
//   }

//   private drawPieChart(ctx: CanvasRenderingContext2D, data: any[], width: number, height: number) {
//     const centerX = width / 2;
//     const centerY = height / 2;
//     const radius = Math.min(width, height) / 2 - 20;
//     const total = data.reduce((sum, item) => sum + item.value, 0);

//     // Clear canvas
//     ctx.clearRect(0, 0, width, height);

//     let currentAngle = 0;

//     data.forEach((item) => {
//       const sliceAngle = (item.value / total) * 2 * Math.PI;
      
//       // Draw slice
//       ctx.fillStyle = item.color;
//       ctx.beginPath();
//       ctx.moveTo(centerX, centerY);
//       ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
//       ctx.closePath();
//       ctx.fill();

//       // Draw label
//       const labelAngle = currentAngle + sliceAngle / 2;
//       const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
//       const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
      
//       ctx.fillStyle = '#ffffff';
//       ctx.font = '12px Arial';
//       ctx.textAlign = 'center';
//       ctx.fillText(`${item.label} ${item.value}%`, labelX, labelY);

//       currentAngle += sliceAngle;
//     });
//   }
// }