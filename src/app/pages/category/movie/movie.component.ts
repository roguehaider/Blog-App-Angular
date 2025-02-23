import { Component } from '@angular/core';
import { BlogSliderComponent } from "../../../components/blog-slider/blog-slider.component";

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [BlogSliderComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {

}
