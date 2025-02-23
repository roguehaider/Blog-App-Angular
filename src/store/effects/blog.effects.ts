import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BlogService } from '../../app/services/blogs.service';
import * as BlogActions from '../actions/blog.action';
import {
  catchError,
  filter,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { selectBlogsLoaded } from '../selectors/blog.selectors';

@Injectable()
export class BlogEffects {
  constructor(
    private actions$: Actions,
    private blogService: BlogService,
    private store: Store<AppState>
  ) {}

  loadBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadBlogs),
      withLatestFrom(this.store.select(selectBlogsLoaded)),
      filter(([_, loaded]) => !loaded),
      mergeMap(() =>
        this.blogService.getBlogs().pipe(
          map((blogs) => BlogActions.loadBlogsSuccess({ blogs })),
          catchError((error) => of(BlogActions.loadBlogsFailure({ error })))
        )
      )
    )
  );

  createBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.createBlog),
      mergeMap((action) =>
        this.blogService.createBlog(action.blog).pipe(
          map((blog) => {
            Swal.fire(
              'Created!',
              'The blog has been created successfully.',
              'success'
            );
            return BlogActions.createBlogSuccess({ blog });
          }),
          catchError((error) => {
            Swal.fire(
              'Error!',
              'There was an error creating the blog.',
              'error'
            );
            return of(BlogActions.createBlogFailure({ error: error.message }));
          })
        )
      )
    )
  );

  updateBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.updateBlog),
      mergeMap((action) =>
        this.blogService.updateBlog(action.blog.id, action.blog).pipe(
          map((blog) => {
            Swal.fire('Updated!', 'The blog has been updated.', 'success');
            return BlogActions.updateBlogSuccess({ blog });
          }),
          catchError((error) => {
            Swal.fire(
              'Error!',
              'There was an error updating the blog.',
              'error'
            );
            return of(BlogActions.updateBlogFailure({ error: error.message }));
          })
        )
      )
    )
  );

  deleteBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.deleteBlog),
      mergeMap((action) =>
        this.blogService.deleteBlog(action.blogId).pipe(
          map(() => {
            Swal.fire('Deleted!', 'The blog has been deleted.', 'success');
            return BlogActions.deleteBlogSuccess({ blogId: action.blogId });
          }),
          catchError((error) => {
            Swal.fire(
              'Error!',
              'There was an error deleting the blog.',
              'error'
            );
            return of(BlogActions.deleteBlogFailure({ error: error.message }));
          })
        )
      )
    )
  );

  loadBlogDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadBlogDetail),
      mergeMap((action) =>
        this.blogService.getBlogById(action.blogId).pipe(
          map((blog) => BlogActions.loadBlogDetailSuccess({ blog })),
          catchError((error) =>
            of(BlogActions.loadBlogDetailFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
