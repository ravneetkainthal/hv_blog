// src/services/blogService.ts
export const fetchBlog = async (searchQuery: string = '') => {
    try {
      const url = searchQuery ? `/api/blogs?search=${searchQuery}` : '/api/blogs';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching blogs: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Fetched blogs:', data); // Debug log
      return data;
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      throw error;
    }
  };
  