import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { BlogService } from '../../services/blogs.service';
import { Store } from '@ngrx/store';
import * as BlogActions from '../../../store/actions/blog.action';
import { AppState } from '../../../store/app.state';
import { Observable } from 'rxjs';
import { selectSelectedCategory } from '../../../store/selectors/blog.selectors';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    CommonModule,
    MatIconModule,
    NgFor,
    RouterModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private isDarkTheme = false;
  selectedCategory$!: Observable<string>;
  constructor(
    private router: Router,
    private blogService: BlogService,
    private store: Store
  ) {
    // this.selectedCategory$ = this.store.select(selectSelectedCategory);
  }

  menuItems = [
    { name: 'All Blogs', icon: 'article', link: '/category/all-blogs' },
    { name: 'Fashion', icon: 'checkroom', link: '/category/fashion' },
    { name: 'Sports', icon: 'sports_soccer', link: '/category/sports' },
    { name: 'Games', icon: 'sports_esports', link: '/category/games' },
    { name: 'News', icon: 'newspaper', link: '/category/news' },
    { name: 'Food', icon: 'restaurant', link: '/category/food' },
    { name: 'Movies', icon: 'movie', link: '/category/movies' },
  ];

  // menuItems = [
  //   { name: 'All Blogs', icon: 'article', category: 'all' },
  //   { name: 'Fashion', icon: 'checkroom', category: 'fashion' },
  //   { name: 'Sports', icon: 'sports_soccer', category: 'sports' },
  //   { name: 'Games', icon: 'sports_esports', category: 'games' },
  //   { name: 'News', icon: 'newspaper', category: 'news' },
  //   { name: 'Food', icon: 'restaurant', category: 'food' },
  //   { name: 'Movies', icon: 'movie', category: 'movies' },
  // ];

  // filterByCategory(category: string) {
  //   const categoryParam = category.toLowerCase().replace(' ', '-');
  //   this.router.navigate(['/category', categoryParam]);
  // }

  onCategorySelect(category: string) {
    this.store.dispatch(BlogActions.setSelectedCategory({ category }));
  }

  isDarkMode(): boolean {
    return this.isDarkTheme;
  }
}
