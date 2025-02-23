import { Component } from '@angular/core';
import { BlogSliderComponent } from "../../../components/blog-slider/blog-slider.component";

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [BlogSliderComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {

}
