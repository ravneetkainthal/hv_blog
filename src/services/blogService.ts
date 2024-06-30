// // src/services/blogService.ts
export const fetchBlogs = async () => {
  try {
    const response = await fetch('/api/auth/blogs');
    if (!response.ok) {
      throw new Error(`Error fetching blogs: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Fetched blogs:', data); // Debug log
    return data.blogs;
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    throw error;
  }
};
