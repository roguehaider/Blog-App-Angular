import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BlogService } from '../../../app/services/blogs.service';
import { Blog } from '../../../app/models/blog.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogDetailResolver implements Resolve<Blog | null> {
  constructor(
    private blogService: BlogService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Blog | null> {
    const id = route.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/all-blogs']);
      return of(null);
    }

    return this.blogService.getBlogById(id).pipe(
      catchError((error) => {
        console.error('Error fetching blog:', error);
        this.router.navigate(['/all-blogs']);
        return of(null);
      })
    );
  }
}
