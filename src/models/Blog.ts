import mongoose, { Document, Schema } from 'mongoose';

interface BlogDocument extends Document {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

const BlogSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.models.Blog || mongoose.model<BlogDocument>('Blog', BlogSchema);
export default Blog;
export type { BlogDocument };
