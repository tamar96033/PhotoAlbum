import { Component } from '@angular/core';
import { MenuComponent } from "../../components/menu/menu.component";
import { TopUsedTagsChartComponent } from '../../components/top-used-tags-chart/top-used-tags-chart.component';

@Component({
  selector: 'app-home-page',
  imports: [ TopUsedTagsChartComponent  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
