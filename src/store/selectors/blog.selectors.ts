import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BlogState } from '../reducers/blog.reducer';
import { Blog } from '../../app/models/blog.model';

export const selectBlogState = createFeatureSelector<BlogState>('blog');

export interface HighlightedBlog extends Blog {
  highlightedTitle: string;
  highlightedDescription: string;
  highlightedCategory: string;
  highlightedCreatedBy: string;
}

export const selectAllBlogs = createSelector(
  selectBlogState,
  (state: BlogState) => state.blogs
);

export const selectBlogById = (id: string) =>
  createSelector(selectAllBlogs, (blogs) =>
    blogs.find((blog) => blog.id === id)
  );

export const selectBlogsLoaded = createSelector(
  selectBlogState,
  (state: BlogState) => state.loaded
);

export const selectSelectedCategory = createSelector(
  selectBlogState,
  (state: BlogState) => state.selectedCategory
);

// export const selectSearchQuery = createSelector(
//   selectBlogState,
//   (state: BlogState) => state.searchQuery
// );

export const selectSearchQuery = createSelector(
  selectBlogState,
  (state) => state.searchQuery
);

export const selectFilteredBlogs = createSelector(
  selectAllBlogs,
  selectSelectedCategory,
  selectSearchQuery,
  (blogs, category, query): HighlightedBlog[] => {
    let filtered = blogs;

    if (category !== 'all') {
      filtered = filtered.filter(
        (blog) => blog.category.toLowerCase() === category.toLowerCase()
      );
    }

    const lowercaseQuery = query.toLowerCase().trim();

    if (lowercaseQuery) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(lowercaseQuery) ||
          blog.description.toLowerCase().includes(lowercaseQuery) ||
          blog.category.toLowerCase().includes(lowercaseQuery) ||
          blog.createdBy.toLowerCase().includes(lowercaseQuery)
      );
    }

    // Convert Blog[] to HighlightedBlog[]
    return filtered.map((blog) => ({
      ...blog,
      highlightedTitle: highlightText(blog.title, lowercaseQuery),
      highlightedDescription: highlightText(blog.description, lowercaseQuery),
      highlightedCategory: highlightText(blog.category, lowercaseQuery),
      highlightedCreatedBy: highlightText(blog.createdBy, lowercaseQuery),
    }));
  }
);

// Helper function to highlight matching text
function highlightText(text: string, query: string): string {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// ... (rest of the code remains the same)

// export const selectFilteredBlogs = createSelector(
//   selectAllBlogs,
//   selectSelectedCategory,
//   selectSearchQuery,
//   (blogs, category, query) => {
//     let filtered = blogs;

//     if (category !== 'all') {
//       filtered = filtered.filter(blog => blog.category.toLowerCase() === category.toLowerCase());
//     }

//     if (query.trim()) {
//       filtered = filtered.filter(blog =>
//         blog.title.toLowerCase().includes(query.toLowerCase()) ||
//         blog.description.toLowerCase().includes(query.toLowerCase()) ||
//         blog.category.toLowerCase().includes(query.toLowerCase()) ||
//         blog.createdBy.toLowerCase().includes(query.toLowerCase())
//       );
//     }

//     return filtered;
//   }
// );

export const selectCategories = createSelector(
  selectBlogState,
  (state: BlogState) => state.categories
);

export const selectBlogDetail = createSelector(
  selectBlogState,
  (state) => state.blogDetail
);
