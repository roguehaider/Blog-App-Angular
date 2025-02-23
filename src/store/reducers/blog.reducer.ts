import { createReducer, on } from '@ngrx/store';
import * as BlogActions from '../actions/blog.action';
import { Blog } from '../../app/models/blog.model';

export interface BlogState {
  blogs: Blog[];
  categories: string[];
  selectedCategory: string;
  searchQuery: string;
  loading: boolean;
  error: any;
  blogDetail: any | null;
  loaded: boolean;
}

export const initialState: BlogState = {
  blogs: [],
  categories: [],
  selectedCategory: 'all',
  searchQuery: '',
  loading: false,
  error: null,
  blogDetail: null,
  loaded: false,
};

export const blogReducer = createReducer(
  initialState,

  on(BlogActions.loadBlogs, (state) => ({ ...state, loading: true })),
  on(BlogActions.loadBlogsSuccess, (state, { blogs }) => ({
    ...state,
    blogs,
    loaded: true,
    categories: Array.from(new Set(blogs.map((blog) => blog.category))),
    loading: false,
  })),
  on(BlogActions.loadBlogsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(BlogActions.setSelectedCategory, (state, { category }) => ({
    ...state,
    selectedCategory: category,
  })),
  on(BlogActions.setSearchQuery, (state, { query }) => ({
    ...state,
    searchQuery: query,
  })),

  // Create Blog Reducer
  on(BlogActions.createBlogSuccess, (state, { blog }) => ({
    ...state,
    blogs: [...state.blogs, blog],
  })),

  on(BlogActions.createBlogFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Update Blog Reducer
  on(BlogActions.updateBlogSuccess, (state, { blog }) => ({
    ...state,
    blogs: state.blogs.map((b) => (b.id === blog.id ? blog : b)),
  })),

  on(BlogActions.updateBlogFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //Delete Blog
  on(BlogActions.deleteBlog, (state, { blogId }) => ({
    ...state,
    blogs: state.blogs.filter((blog) => blog.id !== blogId),
  })),

  on(BlogActions.deleteBlogSuccess, (state, { blogId }) => ({
    ...state,
    blogs: state.blogs.filter((blog) => blog.id !== blogId),
  })),

  //Detail Blog Reducer
  on(BlogActions.loadBlogDetail, (state) => ({
    ...state,
    blogDetail: null,
    error: null,
  })),

  on(BlogActions.loadBlogDetailSuccess, (state, { blog }) => ({
    ...state,
    blogDetail: blog,
  })),

  on(BlogActions.loadBlogDetailFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
