import { dbConnect } from '@/utils/mongoodb';
import Blog from '@/models/Blog';
import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';

// Handler for GET method
export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const blogs = await Blog.find({}).lean();
    console.log('Blogs fetched:', blogs); // Debug log
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// Handler for POST method
export async function POST(req: NextRequest, res: NextResponse) {
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
