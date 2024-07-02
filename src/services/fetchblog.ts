// src/services/blogService.ts
export const fetchBlog = async (query: string = ''): Promise<any> => {
  try {
    const searchQuery = query ? `?search=${encodeURIComponent(query)}` : '';
    const response = await fetch(`/api/auth/searchblog${searchQuery}`);
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
  