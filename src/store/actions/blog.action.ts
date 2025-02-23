import { createAction, props } from '@ngrx/store';
import { Blog } from '../../app/models/blog.model';

export const loadBlogs = createAction('[Blog] Load Blogs');
export const loadBlogsSuccess = createAction(
  '[Blog] Load Blogs Success',
  props<{ blogs: Blog[] }>()
);
export const loadBlogsFailure = createAction(
  '[Blog] Load Blogs Failure',
  props<{ error: any }>()
);

export const setSelectedCategory = createAction(
  '[Blog] Set Selected Category',
  props<{ category: string }>()
);
export const setSearchQuery = createAction(
  '[Blog] Set Search Query',
  props<{ query: string }>()
);

// Create Blog Action
export const createBlog = createAction(
  '[Blog] Create Blog',
  props<{ blog: Blog }>()
);

export const createBlogSuccess = createAction(
  '[Blog] Create Blog Success',
  props<{ blog: Blog }>()
);

export const createBlogFailure = createAction(
  '[Blog] Create Blog Failure',
  props<{ error: string }>()
);

// Update Blog Action
export const updateBlog = createAction(
  '[Blog] Update Blog',
  props<{ blog: Blog }>()
);

export const updateBlogSuccess = createAction(
  '[Blog] Update Blog Success',
  props<{ blog: Blog }>()
);

export const updateBlogFailure = createAction(
  '[Blog] Update Blog Failure',
  props<{ error: string }>()
);

//Delete Blog Action

export const deleteBlog = createAction(
  '[Blog] Delete Blog',
  props<{ blogId: string }>()
);

export const deleteBlogSuccess = createAction(
  '[Blog] Delete Blog Success',
  props<{ blogId: string }>()
);

export const deleteBlogFailure = createAction(
  '[Blog] Delete Blog Failure',
  props<{ error: string }>()
);

//Detail Blog Action

export const loadBlogDetail = createAction(
  '[Blog] Load Blog Detail',
  props<{ blogId: string }>()
);

export const loadBlogDetailSuccess = createAction(
  '[Blog] Load Blog Detail Success',
  props<{ blog: any }>()
);

export const loadBlogDetailFailure = createAction(
  '[Blog] Load Blog Detail Failure',
  props<{ error: string }>()
);
