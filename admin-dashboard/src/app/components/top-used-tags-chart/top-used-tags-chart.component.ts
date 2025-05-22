import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Picture, User, UserWithPictureDto } from '../../services/api-client';
import { ApiClientService } from '../../services/api-client.service';
import { AddUserComponent } from "../add-user/add-user.component";


@Component({
  selector: 'app-top-used-tags-chart',
  imports: [AddUserComponent],
  templateUrl: './top-used-tags-chart.component.html',
  styleUrl: './top-used-tags-chart.component.css'
})
// export class TopUsedTagsChartComponent implements AfterViewInit {
//   @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

//   users: UserWithPictureDto[] = [];

//   constructor(private apiClient: ApiClientService){}

//   async ngOnInit(){
//     const token = "Bearer " + localStorage.getItem('token')
//     console.log(token);
    
//     const result = await this.apiClient.client.usersWithPictures(token ?? "")
//     console.log(result);
//     this.users = result

    
//   }
  
  

//   ngAfterViewInit(): void {
//     this.drawChart();
//   }

//   drawChart() {
//     const canvas = this.canvasRef.nativeElement;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const maxCount = Math.max(...this.users.map(user => user.pictures));
//     const canvasWidth = canvas.width;
//     const canvasHeight = canvas.height;
//     const barHeight = 30;
//     const gap = 15;

//     ctx.clearRect(0, 0, canvasWidth, canvasHeight);
//     ctx.font = '16px Arial';

//     this.users.forEach((user, index) => {
//       const barWidth = (user.count / maxCount) * (canvasWidth - 150);
//       const y = index * (barHeight + gap) + 30;

//       // Label
//       ctx.fillStyle = '#000';
//       ctx.fillText(user.name!, 10, y + barHeight / 1.5);

//       // Bar
//       ctx.fillStyle = '#4285f4';
//       ctx.fillRect(120, y, barWidth, barHeight);

//       // Count
//       ctx.fillStyle = '#000';
//       ctx.fillText(user.count.toString(), 130 + barWidth, y + barHeight / 1.5);
//     });
//   }
// }
export class TopUsedTagsChartComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  users: UserWithPictureDto[] = [];

  constructor(private apiClient: ApiClientService) {}

  async ngOnInit() {
    const token = "Bearer " + localStorage.getItem('token');
    console.log(token);

    const result = await this.apiClient.client.usersWithPictures(token ?? "");
    console.log(result);
    this.users = result;
    this.drawChart();
  }

  ngAfterViewInit(): void {
    // this.drawChart();
  }

  drawChart() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find the maximum number of pictures a user has
    const maxCount = Math.max(...this.users.map(user => user!.pictures!.length));
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const barHeight = 30;
    const gap = 15;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.font = '16px Arial';

    this.users.forEach((user, index) => {
      const barWidth = (user!.pictures!.length / maxCount) * (canvasWidth - 150);
      const y = index * (barHeight + gap) + 30;

      // Label (User's name)
      ctx.fillStyle = '#000';
      ctx.fillText(user.name!, 10, y + barHeight / 1.5);

      // Bar (Number of pictures)
      ctx.fillStyle = '#4285f4';
      ctx.fillRect(120, y, barWidth, barHeight);

      // Count (Number of pictures)
      ctx.fillStyle = '#000';
      ctx.fillText(user!.pictures!.length.toString(), 130 + barWidth, y + barHeight / 1.5);
    });
  }

  addUser: boolean = false;
}