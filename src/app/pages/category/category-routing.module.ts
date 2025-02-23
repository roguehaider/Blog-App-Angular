import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { FashionComponent } from './fashion/fashion.component';
import { SportsComponent } from './sports/sports.component';
import { GamesComponent } from './games/games.component';
import { NewsComponent } from './news/news.component';
import { FoodComponent } from './food/food.component';
import { MovieComponent } from './movie/movie.component';
import { BlogDetailComponent } from '../../components/blog-detail/blog-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'all-blogs', pathMatch: 'full' },
  { path: 'all-blogs', component: AllBlogsComponent },
  { path: 'fashion', component: FashionComponent },
  { path: 'sports', component: SportsComponent },
  { path: 'games', component: GamesComponent },
  { path: 'news', component: NewsComponent },
  { path: 'food', component: FoodComponent },
  { path: 'movies', component: MovieComponent },
  { path: '**', redirectTo: 'all-blogs' },
  { path: 'blog/:id', component: BlogDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
