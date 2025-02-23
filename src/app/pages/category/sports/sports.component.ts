import { Component } from '@angular/core';
import { BlogSliderComponent } from "../../../components/blog-slider/blog-slider.component";

@Component({
  selector: 'app-sports',
  standalone: true,
  imports: [BlogSliderComponent],
  templateUrl: './sports.component.html',
  styleUrl: './sports.component.scss'
})
export class SportsComponent {

}
