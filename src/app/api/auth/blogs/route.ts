import { dbConnect } from '@/utils/mongoodb';
import Blog from '@/models/Blog';
import { NextRequest, NextResponse } from 'next/server';

// Handler for GET method
export async function GET(req: NextRequest) {
  await dbConnect();
  
  // Parse the URL to extract query parameters
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search');

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

// Handler for POST method
export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { title, content, author } = await req.json();
    const createdAt = new Date();

    const newBlog = new Blog({ title, content, author, createdAt });
    await newBlog.save();

    return NextResponse.json({ message: 'Blog created successfully', blog: newBlog }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// Main handler function for different methods
export default async function handler(req: NextRequest) {
  if (req.method === 'GET') {
    return GET(req);
  } else if (req.method === 'POST') {
    return POST(req);
  } else {
    return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
  }
}
