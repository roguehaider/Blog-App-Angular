import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blogs.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { map, Observable, of, switchMap } from 'rxjs';
import { selectBlogById } from '../../../store/selectors/blog.selectors';
import { Blog } from '../../models/blog.model';
@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent, MatIconModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit {
  blog!: Blog;
  blog$!: Observable<any>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.blog = this.route.snapshot.data['blog'];
    this.blog$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      switchMap((id) => {
        if (id) {
          return this.store.pipe(select(selectBlogById(id)));
        } else {
          console.error('Blog ID is null');
          return of(null);
        }
      })
    );
  }

  goBack() {
    this.router.navigate(['/all-blogs']);
  }
}
