import { Component } from '@angular/core';
import { BlogSliderComponent } from "../../../components/blog-slider/blog-slider.component";

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [BlogSliderComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {

}
