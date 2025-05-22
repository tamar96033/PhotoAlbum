import { Component } from '@angular/core';
import { MenuComponent } from "../../components/menu/menu.component";
import { TopUsedTagsChartComponent } from '../../components/top-used-tags-chart/top-used-tags-chart.component';
import { AddAdminComponent } from "../../components/add-admin/add-admin.component";
import { AboutComponent } from "../../components/about/about.component";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-home-page',
  imports: [TopUsedTagsChartComponent, AboutComponent, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
