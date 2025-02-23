import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgFor } from '@angular/common';
import { BlogService } from '../../services/blogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogDialogComponent } from '../blog-dialog/blog-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import Swal from 'sweetalert2';
import { SharedModuleModule } from '../../shared-module/shared-module.module';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Store, select } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState } from '../../../store/app.state';
import * as BlogActions from '../../../store/actions/blog.action';
import * as BlogSelectors from '../../../store/selectors/blog.selectors';
import {
  selectFilteredBlogs,
  selectCategories,
  selectSelectedCategory,
  selectSearchQuery,
} from '../../../store/selectors/blog.selectors';
import { combineLatest, of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { HighlightDirective } from '../../../highlight.directive';
import { TruncatePipe } from '../../Pipes/truncate.pipe';
@Component({
  selector: 'app-blog-slider',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    RouterModule,
    MatIconModule,
    FormsModule,
    SharedModuleModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HighlightDirective,
    TruncatePipe,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  templateUrl: './blog-slider.component.html',
  styleUrl: './blog-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogSliderComponent implements OnInit {
  @Input() showCategory: boolean = true;
  @Input() categoryFilter: string = 'all';
  isExpanded = false;
  showLeftArrow = false;
  showRightArrow = true;

  blogs$!: Observable<any[]>;
  categories$!: Observable<string[]>;
  selectedCategory$!: Observable<string>;
  searchQuery$!: Observable<string>;

  searchQuery: string = '';

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(BlogActions.loadBlogs());
    this.blogs$ = this.store.select(selectFilteredBlogs);
    this.categories$ = this.store.select(selectCategories);
    this.selectedCategory$ = this.store.select(selectSelectedCategory);
    this.searchQuery$ = this.store.select(selectSearchQuery);

    combineLatest([this.route.params, of(this.categoryFilter)])
      .pipe(
        map(
          ([params, categoryFilter]) =>
            params['category'] || categoryFilter || 'all'
        ),
        distinctUntilChanged()
      )
      .subscribe((category) => {
        this.store.dispatch(BlogActions.setSelectedCategory({ category }));
      });
  }

  onCategoryChange(category: string) {
    this.store.dispatch(BlogActions.setSelectedCategory({ category }));
  }

  // onSearchQueryChange(query: string) {
  //   this.store.dispatch(BlogActions.setSearchQuery({ query }));
  // }

  onSearchQueryChange(query: string) {
    this.searchQuery = query;
    this.store.dispatch(BlogActions.setSearchQuery({ query }));
  }

  openEditDialog(blog: any): void {
    const dialogRef = this.dialog.open(BlogDialogComponent, {
      width: '500px',
      data: { blog, isEdit: true },
    });
  }
  deleteBlog(blogId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this blog?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, Keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(BlogActions.deleteBlog({ blogId }));
      }
    });
  }

  navigateToBlogDetail(blogId: string): void {
    this.router.navigate(['/blog', blogId]);
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  scrollSlider(direction: number): void {
    const container = document.querySelector(
      '.slider-container'
    ) as HTMLElement;
    const scrollAmount = container.clientWidth * direction;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    setTimeout(() => {
      this.showLeftArrow = container.scrollLeft > 0;
      this.showRightArrow =
        container.scrollLeft + container.clientWidth < container.scrollWidth;
    }, 300);
  }
}
