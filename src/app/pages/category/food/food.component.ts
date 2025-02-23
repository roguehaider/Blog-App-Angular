import { Component } from '@angular/core';
import { BlogSliderComponent } from '../../../components/blog-slider/blog-slider.component';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [BlogSliderComponent],
  templateUrl: './food.component.html',
  styleUrl: './food.component.scss'
})
export class FoodComponent {

}
