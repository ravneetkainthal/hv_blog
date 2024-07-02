import { dbConnect } from '@/utils/mongoodb';
import Blog from '@/models/Blog';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    await dbConnect();
    
    const search = req.nextUrl.searchParams.get('search');
    const searchQuery = search ? { title: { $regex: search, $options: 'i' } } : {};
  
    try {
      const blogs = await Blog.find(searchQuery).lean();
      console.log('Blogs fetched:', blogs); // Debug log
      return NextResponse.json({ blogs }, { status: 200 });
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }