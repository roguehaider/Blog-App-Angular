import { Component } from '@angular/core';
import { BlogSliderComponent } from "../../../components/blog-slider/blog-slider.component";

@Component({
  selector: 'app-all-blogs',
  standalone: true,
  imports: [BlogSliderComponent],
  templateUrl: './all-blogs.component.html',
  styleUrl: './all-blogs.component.scss'
})
export class AllBlogsComponent {

}
