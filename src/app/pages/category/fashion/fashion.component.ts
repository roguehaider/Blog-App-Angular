import { Component } from '@angular/core';
import { BlogSliderComponent } from '../../../components/blog-slider/blog-slider.component';

@Component({
  selector: 'app-fashion',
  standalone: true,
  imports: [BlogSliderComponent],
  templateUrl: './fashion.component.html',
  styleUrl: './fashion.component.scss'
})
export class FashionComponent {

}
